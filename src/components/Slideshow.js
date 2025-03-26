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
    let animationId;

    const startAnimation = () => {
      const slideshow = slideshowRef.current;
      const scrollAmount = direction === "left" ? 1 : -1;

      slideshow.scrollLeft += scrollAmount;

      // Check if the scroll reached the end of the first set
      if (
        direction === "left" &&
        slideshow.scrollLeft >= slideshow.scrollWidth / 2
      ) {
        slideshow.scrollLeft = 0; // Reset to start
      } else if (
        direction === "right" &&
        slideshow.scrollLeft <= 0
      ) {
        slideshow.scrollLeft = slideshow.scrollWidth / 2; // Reset to second set
      }

      animationId = requestAnimationFrame(startAnimation);
    };

    if (!isHovered) {
      animationId = requestAnimationFrame(startAnimation);
    }

    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
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
          <img key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;