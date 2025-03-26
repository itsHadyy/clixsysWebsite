import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./slideshow02.css";

const slides = [];

for (let i = 1; i <= 32; i++) {
    const slideNumber = String(i).padStart(2, '0'); // Pad with leading zero
    const imagePath = `./media/slides/slide${slideNumber}.webp`;
    slides.push(imagePath);
}

const PDFSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        gsap.fromTo(".slide02", { opacity: 0 }, { opacity: 1, duration: 0.8 });
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="slideshow-container02">
            <img src={slides[currentSlide]} alt="Slide02" className="slide02" />
            <button className="prev-btn02" onClick={prevSlide}>
                ‹
            </button>
            <button className="next-btn02" onClick={nextSlide}>
                ›
            </button>
        </div>
    );
};

export default PDFSlideshow;