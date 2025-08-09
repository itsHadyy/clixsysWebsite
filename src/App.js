import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const ContactP = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Projects = lazy(() => import('./pages/Projects'));
const Automation = lazy(() => import('./pages/Automation'));
const Smart = lazy(() => import('./pages/Smart'));
const Software = lazy(() => import('./pages/Software'));
const Mirrors = lazy(() => import('./pages/Mirrors'));
const Tv = lazy(() => import('./pages/Tv'));
const Tables = lazy(() => import('./pages/Tables'));
function LoadingHandler({ setLoading }) {
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    // Simulate a short delay for smooth transition; adjust as needed
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location, setLoading]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <LoadingHandler setLoading={setLoading} />
      <Spinner show={loading} />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<Spinner show={true} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactP />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/smart" element={<Smart />} />
        <Route path="/software" element={<Software />} />
        <Route path="/mirrors" element={<Mirrors />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;