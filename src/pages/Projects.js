import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from "gsap";
import Contact from '../components/Contact';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null); // Store the clicked project
    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide in the slideshow
    const modalRef = useRef(null); // Reference for the modal
    // const autoSlideInterval = useRef(null);

    const projects = [
        {
            name: "Smart Home Automation",
            description: "Integrated systems redefining the modern home.",
            images: ["./media/img05.webp", "./media/img02.webp", "./media/img03.webp"],
        },
        {
            name: "Energy Efficiency Solutions",
            description: "Optimizing energy for a sustainable future.",
            images: ["./media/img06.webp", "./media/img04.webp", "./media/img01.webp"],
        },
        {
            name: "Intelligent Office Spaces",
            description: "Creating workplaces of tomorrow.",
            images: ["./media/img03.webp", "./media/img07.webp", "./media/img05.webp"],
        },
        {
            name: "Urban IoT Integration",
            description: "Transforming cities into smart ecosystems. ",
            images: ["./media/img01.webp", "./media/img05.webp", "./media/img02.webp"],
        },
    ];


    const [isFading, setIsFading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentSlide(0);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsModalVisible(false);
            setSelectedProject(null);
        }, 300); // Match CSS transition duration
    };

    const handleNextSlide = () => {
        setIsFading(true);
        let frame;
        const animate = () => {
            setCurrentSlide((prevSlide) =>
                (prevSlide + 1) % selectedProject.images.length
            );
            setIsFading(false);
            cancelAnimationFrame(frame);
        };
        frame = requestAnimationFrame(() => setTimeout(animate, 300)); // 300ms fade
    };

    const handlePrevSlide = () => {
        setIsFading(true);
        let frame;
        const animate = () => {
            setCurrentSlide((prevSlide) =>
                (prevSlide - 1 + selectedProject.images.length) %
                selectedProject.images.length
            );
            setIsFading(false);
            cancelAnimationFrame(frame);
        };
        frame = requestAnimationFrame(() => setTimeout(animate, 300)); // 300ms fade
    };

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
        animateCounter(projectsRef, 0, 50);
        animateCounter(staffRef, 0, 30);
        animateCounter(yearsRef, 0, 20);

        // Cleanup: Kill all ScrollTriggers
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            const timer = setTimeout(() => setIsModalOpen(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsModalOpen(false);
        }
    }, [isModalVisible]);
    return (
        <div className="container proj">
            <div className="projects-page">
                <h1 className="projects-title">Our Futuristic Projects</h1>
                <p className="projects-tagline">
                    Shaping Tomorrow’s Innovations. Pushing Boundaries, One Project at a Time.
                </p>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            id={`project-${index}`}
                            className="project-card"
                            onMouseEnter={() =>
                                gsap.to(`#project-${index}`, { scale: 1.05, boxShadow: "0px 10px 30px rgba(92, 92, 92, 0.5)", duration: 0.3 })
                            }
                            onMouseLeave={() =>
                                gsap.to(`#project-${index}`, { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", duration: 0.3 })
                            }
                            onClick={() => openModal(project)}
                        >
                            <img src={project.images[0]} alt={project.name} className="project-image" loading="lazy" style={{ willChange: 'transform, opacity' }} />
                            <div className="project-info">
                                <h2 className="project-name">{project.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className={`modalContainer${isModalOpen ? ' open' : ' closed'}`}
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <div className="modalContainer02">
                            <div
                                ref={modalRef}
                                className="modal projectsModal"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                            >
                                <button className="close-btn" onClick={closeModal}>
                                    ×
                                </button>
                                <div className="slideshow">
                                    <button className="prev-btn" onClick={handlePrevSlide}>
                                        ‹
                                    </button>
                                    <img
                                        src={selectedProject?.images[currentSlide]}
                                        alt={`Slide ${currentSlide + 1}`}
                                        className={`slide-image ${isFading ? "fade-in" : ""}`}
                                        loading="lazy"
                                        style={{ willChange: 'transform, opacity' }}
                                    />
                                    <button className="next-btn" onClick={handleNextSlide}>
                                        ›
                                    </button>
                                </div>
                                <h2 className="modal-title">{selectedProject?.name}</h2>
                                <p className="modal-description">{selectedProject?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="counter-container" ref={counterSectionRef}>
                <div className="counter-item">
                    <h3 ref={projectsRef}>0</h3>
                    <p>Smart Home Projects</p>
                </div>
                <div className="counter-item">
                    <h3 ref={staffRef}> 0</h3>
                    <p>Custom Built Systems</p>
                </div>
                <div className="counter-item">
                    <h3 ref={yearsRef}>0</h3>
                    <p>App Development</p>
                </div>
            </div>

            <Contact />
        </div>
    );
};

export default Projects;