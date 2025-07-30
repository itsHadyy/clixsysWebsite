import React, { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from "gsap";
import Contact from '../components/Contact';
import { FiCpu, FiSettings, FiShield, FiSmartphone } from 'react-icons/fi';
import { MdChair, MdLandscape, MdApartment, MdBuild, MdHome, MdOutlineLightbulb, MdDesk, MdDoorSliding, MdTouchApp, MdTv, MdOutlineVideocam, MdVolumeUp, MdPhoneIphone, MdOutlineSecurity, MdEventSeat } from 'react-icons/md';
import { GiTurnstile, GiSprout } from 'react-icons/gi';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null); // Store the clicked project
    const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide in the slideshow
    const modalRef = useRef(null); // Reference for the modal
    // const autoSlideInterval = useRef(null);

    const projects = [
        {
            name: "Smart Home Automation",
            description: "Comprehensive IoT-based home automation systems that seamlessly integrate lighting, climate control, security, and entertainment. Our solutions provide intelligent monitoring, energy optimization, and remote control capabilities, transforming ordinary homes into connected, efficient living spaces that adapt to your lifestyle.",
            images: ["/media/ac.png", "/media/curtain.png", "/media/access.png"],
        },
        {
            name: "Energy Efficiency Solutions",
            description: "Advanced energy management systems that monitor, analyze, and optimize power consumption across residential and commercial environments. Our smart solutions include automated lighting controls, HVAC optimization, and real-time energy analytics, delivering up to 40% reduction in energy costs while maintaining optimal comfort levels.",
            images: ["/media/lighting.png", "/media/smartDesk.png"],
        },
        {
            name: "Intelligent Office Spaces",
            description: "Next-generation workplace automation that enhances productivity, collaboration, and employee well-being. Our intelligent office solutions include smart meeting rooms, automated climate control, occupancy monitoring, and integrated communication systems, creating dynamic work environments that adapt to modern business needs.",
            images: ["/media/img03.png", "/media/img07.png", "/media/img05.png"],
        },
        {
            name: "Urban IoT Integration",
            description: "Comprehensive smart city infrastructure solutions that connect urban systems for enhanced efficiency and sustainability. Our IoT platforms integrate traffic management, environmental monitoring, public services, and infrastructure maintenance, creating intelligent urban ecosystems that improve quality of life and operational efficiency.",
            images: ["/media/irrigation.png", "/media/mechanism.png"],
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

            <section className="scope-of-work-section" style={{ backgroundColor: "transparent", color: "var(--black)" }}>
                <h2 className="scope-of-work-title">Scope of Work</h2>
                <div className="scope-of-work-grid">
                    <div className="scope-of-work-col">
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><FiCpu /></span>
                            <span>R&amp;D in technology</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><FiSettings /></span>
                            <span>Customized automation systems</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><MdApartment /></span>
                            <span>Smart buildings</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><FiShield /></span>
                            <span>Security &amp; surveillance solutions</span>
                        </div>
                    </div>
                    <div className="scope-of-work-col">
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><MdChair /></span>
                            <span>Interactive furniture</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><MdLandscape /></span>
                            <span>Smart landscape</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><MdBuild /></span>
                            <span>Customized mechanisms</span>
                        </div>
                        <div className="scope-of-work-item">
                            <span className="scope-icon"><FiSmartphone /></span>
                            <span>App development</span>
                        </div>
                    </div>
                </div>

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

                <h2 className="products-services-title">Products &amp; Services</h2>
                <div className="products-services-grid">
                    <div className="products-services-col">
                        <div className="products-services-item"><span className="products-icon"><MdHome /></span>Home automation systems</div>
                        <div className="products-services-item"><span className="products-icon"><MdOutlineLightbulb /></span>Smart mirrors</div>
                        <div className="products-services-item"><span className="products-icon"><MdDesk /></span>Smart desks</div>
                        <div className="products-services-item"><span className="products-icon"><MdDoorSliding /></span>Smart doors</div>
                        <div className="products-services-item"><span className="products-icon"><MdTouchApp /></span>Access control</div>
                    </div>
                    <div className="products-services-col">
                        <div className="products-services-item"><span className="products-icon"><GiTurnstile /></span>Turnstile gates</div>
                        <div className="products-services-item"><span className="products-icon"><MdTv /></span>TV mechanism</div>
                        <div className="products-services-item"><span className="products-icon"><MdOutlineVideocam /></span>Projector mechanism</div>
                        <div className="products-services-item"><span className="products-icon"><GiSprout /></span>Irrigation systems</div>
                        <div className="products-services-item"><span className="products-icon"><MdVolumeUp /></span>Sound system control</div>
                    </div>
                    <div className="products-services-col">
                        <div className="products-services-item"><span className="products-icon"><MdOutlineLightbulb /></span>Software solutions</div>
                        <div className="products-services-item"><span className="products-icon"><MdPhoneIphone /></span>Mobile app development</div>
                        <div className="products-services-item"><span className="products-icon"><FiSettings /></span>Customized systems</div>
                        <div className="products-services-item"><span className="products-icon"><MdOutlineSecurity /></span>Surveillance &amp; security</div>
                        <div className="products-services-item"><span className="products-icon"><MdEventSeat /></span>Customized interactive furniture</div>
                    </div>
                </div>
            </section>


            <Contact />
        </div>
    );
};

export default Projects;