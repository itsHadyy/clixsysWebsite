import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const ContactP = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Projects = lazy(() => import('./pages/Projects'));
const Automation = lazy(() => import('./pages/Automation'));
const Smart = lazy(() => import('./pages/Smart'));
const Software = lazy(() => import('./pages/Software'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
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
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;