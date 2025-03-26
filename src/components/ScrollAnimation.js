import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StackingCards = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll(".card");

    // Create a ScrollTrigger for the header and cards container
    ScrollTrigger.create({
      trigger: ".stackingCards",
      start: "top 100px", // Start when the section hits the top of the viewport
      end: "+=100%", // End when the last card leaves the viewport
      pin: ".cardsContentHeader", // Pin the header
      markers: false, // Debug markers
    });

    cards.forEach((card, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 100px", // Trigger when the card hits the top of the viewport
          end: "+=100%", // The duration for which each card stays sticky
          scrub: true, // Smooth scrolling
          pin: true, // Keep the card pinned as it animates
          markers: false, // Debug markers
        },
      })
        .fromTo(
          card,
          {
            y: 0, // Cards start at their default position
            scale: 1, // Full size
            zIndex: cards.length - index, // Ensure the correct stacking order
          },
          {
            y: -index * 50, // Move upward based on index
            scale: 1 + index * 0.1, // Scale down progressively
            duration: 1, // Animation duration
          }
        );
    });

    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="stackingCards">
      <div className="cardsContentHeader">
        <h2>Discover the Power of Our Products</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
        <button className="btn01">
          <Link to="/Solutions">Explore More</Link>
        </button>
      </div>
      <div className="stacking-cards-container">
        <div className="card">Card 1: Discover</div>
        <div className="card">Card 2: Experience</div>
        <div className="card">Card 3: Customize</div>
        <div className="card">Card 4: Succeed</div>
      </div>
    </div>
  );
};

export default StackingCards;