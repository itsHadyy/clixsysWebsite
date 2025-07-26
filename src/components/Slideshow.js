import React, { useRef, useEffect, useState } from "react";
import "./Slideshow.css";

const Slideshow = ({ direction = "left" }) => {
  const slideshowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Array of image paths with responsive variants
  const images = [
    {
      src: "/media/slider/img01.webp",
      srcSet: "/media/slider/img01-300.webp 300w, /media/slider/img01-600.webp 600w, /media/slider/img01.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img02.webp",
      srcSet: "/media/slider/img02-300.webp 300w, /media/slider/img02-600.webp 600w, /media/slider/img02.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img03.webp",
      srcSet: "/media/slider/img03-300.webp 300w, /media/slider/img03-600.webp 600w, /media/slider/img03.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img04.webp",
      srcSet: "/media/slider/img04-300.webp 300w, /media/slider/img04-600.webp 600w, /media/slider/img04.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img05.webp",
      srcSet: "/media/slider/img05-300.webp 300w, /media/slider/img05-600.webp 600w, /media/slider/img05.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img06.webp",
      srcSet: "/media/slider/img06-300.webp 300w, /media/slider/img06-600.webp 600w, /media/slider/img06.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/slider/img07.webp",
      srcSet: "/media/slider/img07-300.webp 300w, /media/slider/img07-600.webp 600w, /media/slider/img07.webp 1200w",
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
            srcSet={image.srcSet}
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