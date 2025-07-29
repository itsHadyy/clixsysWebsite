import React, { useState, useEffect, useRef, useCallback } from "react";
import "./slideshow02.css";

const slides = [];

for (let i = 1; i <= 31; i++) {
    const slideNumber = String(i).padStart(2, '0'); // Pad with leading zero
    const imagePath = `/media/slide${slideNumber.toString().padStart(2, '0')}.webp`;
    slides.push(imagePath);
}

const PDFSlideshow = () => {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(null); // index of next slide
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef();
    const autoFlipRef = useRef();

    // Slide change handler (memoized)
    const handleSlide = useCallback((targetIdx, dir) => {
        if (isAnimating || targetIdx === current) return;
        setDirection(dir);
        setNext(targetIdx);
        setIsAnimating(true);
        // Animation duration must match CSS
        timeoutRef.current = setTimeout(() => {
            setCurrent(targetIdx);
            setNext(null);
            setIsAnimating(false);
        }, 800); 
    }, [isAnimating, current]);

    // Auto-flip every 5s unless paused or animating
    useEffect(() => {
        if (!isPaused && !isAnimating) {
            autoFlipRef.current = setTimeout(() => {
                handleSlide(current === slides.length - 1 ? 0 : current + 1, 1);
            }, 5000);
        }
        return () => clearTimeout(autoFlipRef.current);
    }, [isPaused, isAnimating, current, handleSlide]);

    // Pause on user interaction
    const handleUserInteract = () => {
        setIsPaused(true);
        clearTimeout(autoFlipRef.current);
    };

    // Clean up
    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    // Indices for prev/next
    const prevIdx = current === 0 ? slides.length - 1 : current - 1;
    const nextIdx = current === slides.length - 1 ? 0 : current + 1;

    return (
        <div className="slideshow-container02" onMouseEnter={handleUserInteract} onTouchStart={handleUserInteract}>
            <div className="slide02-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                {/* Current image */}
                <img
                    src={slides[current]}
                    alt="Slide02"
                    className={`slide02-img${isAnimating && next !== null ? (direction === 1 ? ' animate-left-out' : ' animate-right-out') : ''}`}
                    style={{ zIndex: 1 }}
                    loading="lazy"
                />
                {/* Next image (only during animation) */}
                {isAnimating && next !== null && (
                    <img
                        src={slides[next]}
                        alt="Slide02"
                        className={`slide02-img${direction === 1 ? ' animate-left-in' : ' animate-right-in'}`}
                        style={{ zIndex: 2, position: 'absolute', top: 0, left: 0 }}
                        loading="lazy"
                    />
                )}
            </div>
            <button
                className="prev-btn02"
                onClick={() => { handleSlide(prevIdx, -1); handleUserInteract(); }}
                disabled={isAnimating}
            >
                ‹
            </button>
            <button
                className="next-btn02"
                onClick={() => { handleSlide(nextIdx, 1); handleUserInteract(); }}
                disabled={isAnimating}
            >
                ›
            </button>
        </div>
    );
};

export default PDFSlideshow;