import React, { useRef, useEffect, useState } from "react";
import "./Slideshow.css";

const Slideshow = ({ direction = "left" }) => {
  const slideshowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Array of image paths
  const images = [
    "./media/slider/img01.webp",
    "./media/slider/img02.webp",
    "./media/slider/img03.webp",
    "./media/slider/img04.webp",
    "./media/slider/img05.webp",
    "./media/slider/img06.webp",
    "./media/slider/img07.webp",
    "./media/slider/img01.webp",
    "./media/slider/img02.webp",
    "./media/slider/img03.webp",
    "./media/slider/img04.webp",
    "./media/slider/img05.webp",
    "./media/slider/img06.webp",
    "./media/slider/img07.webp",
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
          <img key={index} src={image} alt={`Slide ${index + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;