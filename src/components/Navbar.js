import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import logo from "../logo02.webp";
import "../style.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for sideNav visibility
  const sideNavRef = useRef(null);
  const location = useLocation();

  // Scroll listener to toggle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setShowNavbar(window.scrollY > 50);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // GSAP Animation for SideNav
  useEffect(() => {
    if (isOpen) {
      gsap.to(sideNavRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(sideNavRef.current, { x: "100%", duration: 0.5, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className={`nav ${showNavbar ? "visible" : "hidden"}`}>
      <div className="links">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" loading="lazy" />
        </Link>
        <ul>
          <li><Link to="/" className="animated-link">Home</Link></li>
          <li className="dropdown" onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
            <span className="animated-link">Products</span>
            <ul className={`dropdown-menu ${dropdownVisible ? "open" : "closed"}`}>
              <li><Link to="/mirrors">Smart Interactive Mirrors</Link></li>
              <li><Link to="/smart">Smart Products</Link></li>
              <li><Link to="/software">Software Solutions</Link></li>
            </ul>
          </li>
          <li className="dropdown" onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
            <span className="animated-link">Services</span>
            <ul className={`dropdown-menu ${dropdownVisible ? "open" : "closed"}`}>
              <li><Link to="/automation">Automation Systems</Link></li>
              <li><Link to="/smart">Smart Products</Link></li>
              <li><Link to="/software">Software Solutions</Link></li>
            </ul>
          </li>
          <li><Link to="/Projects" className="animated-link">Projects</Link></li>
          <li><Link to="/About" className="animated-link">About</Link></li>
        </ul>
      </div>

      <div className="nav-btns">
        <Link to="/contact" className="btn01">Contact Us</Link>
      </div>

      {/* Hamburger Button - Visible only on Mobile */}
      <div className="mobile-menu">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>

      {/* Side Navigation Menu */}
      <div ref={sideNavRef} className="sideNav">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/automation" onClick={() => setIsOpen(false)}>Automation Systems</Link></li>
          <li><Link to="/smart" onClick={() => setIsOpen(false)}>Smart Products</Link></li>
          <li><Link to="/software" onClick={() => setIsOpen(false)}>Software Solutions</Link></li>
          <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link to="/mirrors" onClick={() => setIsOpen(false)}>Smart Mirrors</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        </ul>
        <button className="btn01">
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;