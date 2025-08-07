import React, { useRef, useEffect, useState } from "react";
import "./Slideshow.css";

const Slideshow = ({ direction = "left" }) => {
  const slideshowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Array of image paths with responsive variants
  const images = [
    {
      src: "./img01.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img02.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img03.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img04.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img05.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img06.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "./img07.webp",
      sizes: "(max-width: 768px) 300px, 600px"
    },
  ];

  // Duplicated array to create seamless looping
  const imagesToDisplay = [...images, ...images];

  useEffect(() => {
    let intervalId;

    const scrollStep = () => {
      const slideshow = slideshowRef.current;
      if (!slideshow) return; // Prevent error if not mounted
      const scrollAmount = direction === "left" ? 1 : -1;
      slideshow.scrollLeft += scrollAmount;
      if (
        direction === "left" &&
        slideshow.scrollLeft >= slideshow.scrollWidth / 2
      ) {
        slideshow.scrollLeft = 0;
      } else if (
        direction === "right" &&
        slideshow.scrollLeft <= 0
      ) {
        slideshow.scrollLeft = slideshow.scrollWidth / 2;
      }
    };

    if (!isHovered) {
      intervalId = setInterval(scrollStep, 1000 / 60); // 60fps
    }

    return () => clearInterval(intervalId);
  }, [isHovered, direction]);

  return (
    <div
      className="slideshow-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={slideshowRef}
    >
      <div className="slideshow-track">
        {imagesToDisplay.map((image, index) => (
          <img 
            key={index} 
            src={image.src} 
            sizes={image.sizes}
            alt={`Slide ${index + 1}`} 
            loading="lazy"
            width="600"
            height="400"
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;