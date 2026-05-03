/**
 * ADMIN INSTRUCTIONS:
 * 1. To add a new achievement, copy an existing block (between { and }).
 * 2. Set 'id' to a unique value.
 * 3. Set 'title', 'month', 'academicYear', 'branch', and 'description'.
 * 4. (Optional) Provide an Unsplash or local image URL for 'image'.
 */
export type BranchName = "Lalgadi Malakpet" | "Kompally" | "Suraram" | "Shampur" | "Kundanpally" | "MB Grammar School";

export interface Achievement {
  id: string;
  title: string;
  month: string;
  academicYear: string;
  branch: BranchName;
  description: string;
  image?: string;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "1",
    title: "Won State Science Olympiad",
    month: "April",
    academicYear: "2025-26",
    branch: "Lalgadi Malakpet",
    description: "Our students secured the top spot in the inter-school Science Olympiad with their innovative solar-powered water filtration model.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800"
  },
  {
    id: "2",
    title: "National Chess Selection",
    month: "April",
    academicYear: "2025-26",
    branch: "Kompally",
    description: "Three students from our Kompally campus have been selected to represent the state at the National Chess Championship in Delhi.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800"
  },
  {
    id: "3",
    title: "District Athletics Champions",
    month: "March",
    academicYear: "2024-25",
    branch: "Suraram",
    description: "Our athletics team dominated the district meet, winning 5 gold and 3 silver medals across various track and field events.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800"
  },
  {
    id: "4",
    title: "Inter-School Coding Hackathon",
    month: "March",
    academicYear: "2024-25",
    branch: "MB Grammar School",
    description: "M.B. Grammar School students won the 'Best Innovation' award at the Regional Coding Hackathon for their AI-based library assistant.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"
  },
];
