/**
 * Utility to fetch and parse Google Sheets CSV data.
 */

export interface GalleryItem {
  id: string | number;
  type: 'image' | 'video';
  src: string;
  category: string;
  title: string;
}

/**
 * Generic fetcher for Google Sheets CSV data.
 */
export async function fetchDataFromSheet<T>(sheetId: string, gid: string = '0', mapper: (columns: string[], index: number) => T): Promise<T[]> {
  try {
    if (!sheetId || sheetId.includes("REPLACE_WITH") || sheetId === "YOUR_SHEET_ID") {
      console.warn(`Google Sheet ID is not configured: ${sheetId}`);
      return [];
    }

    const url = sheetId.startsWith("http") 
      ? sheetId 
      : `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      // Handle the case where response is not OK (e.g. 404, 401)
      const status = response.statusText || `Status ${response.status}`;
      console.warn(`Failed to fetch sheet "${sheetId}": ${status}. Ensure the sheet is "Published to Web" as CSV.`);
      return [];
    }

    const csvText = await response.text();
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    
    // Skip header row
    const dataRows = rows.slice(1);

    return dataRows.map((row, index) => {
      // Improved CSV parsing to handle commas inside quotes
      const columns: string[] = [];
      let currentColumn = '';
      let insideQuotes = false;
      
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          columns.push(currentColumn.trim().replace(/^"(.*)"$/, '$1'));
          currentColumn = '';
        } else {
          currentColumn += char;
        }
      }
      columns.push(currentColumn.trim().replace(/^"(.*)"$/, '$1'));
      
      return mapper(columns, index);
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
}

/**
 * Specific fetcher for gallery items.
 */
export async function fetchGalleryFromSheet(sheetId: string, gid: string = '0'): Promise<GalleryItem[]> {
  return fetchDataFromSheet<GalleryItem>(sheetId, gid, (columns, index) => ({
    id: columns[0] || index,
    type: (columns[1]?.toLowerCase() === 'video' ? 'video' : 'image') as 'image' | 'video',
    src: columns[2] || '',
    category: columns[3] || 'General',
    title: columns[4] || ''
  }));
}
