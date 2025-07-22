import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import ContactP from './pages/Contact';
import Quote from './pages/Quote';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import Automation from './pages/Automation';
import Smart from './pages/Smart';
import Software from './pages/Software';
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
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
      <Footer />
    </Router>
  );
}

export default App;