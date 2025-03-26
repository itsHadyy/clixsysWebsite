import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Counter = () => {
  const counterSectionRef = useRef(null);
  const projectsRef = useRef(null);
  const staffRef = useRef(null);
  const yearsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Function to animate a single counter
    const animateCounter = (ref, start, end) => {
      gsap.fromTo(
        ref.current,
        { textContent: start },
        {
          textContent: end,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            ref.current.innerHTML = Math.round(ref.current.textContent) + ' +';
          },
          scrollTrigger: {
            trigger: counterSectionRef.current,
            start: 'top 70%', // Trigger at 70% from the top
            toggleActions: 'play none none none', // Start the animation only once
          },
        }
      );
    };

    // Animate each counter
    animateCounter(projectsRef, 0, 100);
    animateCounter(staffRef, 0, 20);
    animateCounter(yearsRef, 0, 9);

    // Cleanup: Kill all ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="counter-container" ref={counterSectionRef}>
      <div className="counter-item">
        <h3 ref={projectsRef}>0 +</h3>
        <p>Projects</p>
      </div>
      <div className="counter-item">
        <h3 ref={staffRef}>0 +</h3>
        <p>Staff</p>
      </div>
      <div className="counter-item">
        <h3 ref={yearsRef}>0 +</h3>
        <p>Years of Experience</p>
      </div>
    </div>
  );
};

export default Counter;