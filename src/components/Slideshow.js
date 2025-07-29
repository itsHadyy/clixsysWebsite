import React, { useRef, useEffect, useState } from "react";
import "./Slideshow.css";

const Slideshow = ({ direction = "left" }) => {
  const slideshowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Array of image paths with responsive variants
  const images = [
    {
      src: "/media/img01.webp",
      srcSet: "/media/img01-300.webp 300w, /media/img01-600.webp 600w, /media/img01.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img02.webp",
      srcSet: "/media/img02-300.webp 300w, /media/img02-600.webp 600w, /media/img02.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img03.webp",
      srcSet: "/media/img03-300.webp 300w, /media/img03-600.webp 600w, /media/img03.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img04.webp",
      srcSet: "/media/img04-300.webp 300w, /media/img04-600.webp 600w, /media/img04.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img05.webp",
      srcSet: "/media/img05-300.webp 300w, /media/img05-600.webp 600w, /media/img05.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img06.webp",
      srcSet: "/media/img06-300.webp 300w, /media/img06-600.webp 600w, /media/img06.webp 1200w",
      sizes: "(max-width: 768px) 300px, 600px"
    },
    {
      src: "/media/img07.webp",
      srcSet: "/media/img07-300.webp 300w, /media/img07-600.webp 600w, /media/img07.webp 1200w",
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