import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Counter = forwardRef((props, ref) => {
  // Use props.counters or fallback to default
  const counters = props.counters || [
    { label: 'Projects', end: 100 },
    { label: 'Staff', end: 20 },
    { label: 'Years of Experience', end: 9 },
  ];
  const counterSectionRef = useRef(null);
  // Create a ref for each counter
  const counterRefs = useRef(counters.map(() => React.createRef()));

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
    counters.forEach((counter, i) => {
      animateCounter(counterRefs.current[i], 0, counter.end);
    });
  }

  return (
    <div className="counter-container" ref={counterSectionRef}>
      {counters.map((counter, i) => (
        <div className="counter-item" key={i}>
          <h3 ref={counterRefs.current[i]} style={{ fontSize: '2.5rem', margin: '0.5rem 0 0 0' }}>
            0 +
          </h3>
          <p>
            {counter.title}
          </p>
        </div>
      ))}
    </div>
  );
});

export default Counter;