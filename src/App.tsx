import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import './index.css';

// Pages
import Home from './pages/Home';
import LifeAtSchool from './pages/LifeAtSchool';
import Curriculum from './pages/Curriculum';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Admission from './pages/Admission';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Utility from './pages/Utility';
import Achievers from './pages/Achievers';
import Labs from './pages/Labs';
import Careers from './pages/Careers';

// AnimatedRoutes needs to be a child of Router so useLocation() works
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/life" element={<LifeAtSchool />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/about" element={<About />} />
        <Route path="/principal" element={<About />} />
        <Route path="/management" element={<About />} />
        <Route path="/vision" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/utility" element={<Utility />} />
        <Route path="/achievers" element={<Achievers />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Router>
        <div className="app-container">
          {!loading && (
            <>
              <Navbar />
              <main>
                <AnimatedRoutes />
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
