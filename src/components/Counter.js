import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Counter = forwardRef((props, ref) => {
  const counterSectionRef = useRef(null);
  const projectsRef = useRef(null);
  const staffRef = useRef(null);
  const yearsRef = useRef(null);

  // Expose startAnimation to parent via ref
  useImperativeHandle(ref, () => ({
    startAnimation
  }));

  function startAnimation() {
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
          }
        }
      );
    };
    // Animate each counter
    animateCounter(projectsRef, 0, 100);
    animateCounter(staffRef, 0, 20);
    animateCounter(yearsRef, 0, 9);
  }

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
});

export default Counter;