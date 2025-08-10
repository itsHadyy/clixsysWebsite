import React, { useState, useEffect } from "react";
import '../style.css';
import logo from '../logo02.webp';

import Slideshow from '../components/Slideshow';
import '../components/features24.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCpu, FiSettings, FiShield, FiSmartphone } from 'react-icons/fi';
import { MdChair, MdLandscape, MdApartment, MdBuild, MdHome, MdOutlineLightbulb, MdDesk, MdDoorSliding, MdTouchApp, MdTv, MdOutlineVideocam, MdVolumeUp, MdPhoneIphone, MdOutlineSecurity, MdEventSeat } from 'react-icons/md';
import { GiTurnstile, GiSprout } from 'react-icons/gi';
import Counter from '../components/Counter';

function About() {
    const aboutCounterRef = React.useRef();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.team',
            { opacity: 0.5, y: -50 },
            {
                opacity: 1, y: 0, duration: 1, scrollTrigger: {
                    trigger: '.team',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

        gsap.fromTo('.team-members',
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1, scrollTrigger: {
                    trigger: '.team-members',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

        gsap.fromTo('.aboutCards',
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1, scrollTrigger: {
                    trigger: '.aboutCards',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

        // Counter animation for About page
        gsap.fromTo('.about-counter-container',
            { opacity: 0, y: 100 },
            {
                opacity: 1, y: 0, duration: 1,
                scrollTrigger: {
                    trigger: '.about-counter-container',
                    start: 'top 90%',
                    onEnter: () => {
                        if (aboutCounterRef.current && aboutCounterRef.current.startAnimation) {
                            aboutCounterRef.current.startAnimation();
                        }
                    }
                }
            }
        );

        return () => {
            // Cleanup ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const [selectedMember, setSelectedMember] = useState(null);

    const teamMembers = [
        {
            name: "Omar Sabbour",
            title: "Co-Founder",
            image: "./omar_sabbour.webp",
            description:
                "Omar Sabbour graduated from the American University in Cairo with a Bachelors’ degree in Construction Engineering. He then joined the family business that is a well-known pillar in the field of construction and real estate development. Chief Executive Officer of Sabbour Consulting, one of the largest Engineering Consulting firms in Egypt with over 60 years’ experience. An active member of the Egyptian business community, Omar Sabbour was the Chairman of the Egyptian Junior Business Association 2011 to 2013 and a member of the Egyptian Businessmen Association (EBA), the British Egyptian Business Association (BEBA) and the Egyptian German Chamber of Commerce.",
        },
        {
            name: "Hesham Fahmy",
            title: "Co-Founder & CEO",
            image: "./hesham_fahmy.webp",
            description:
                "Graduated from AAST with Bachelor’s degree in Electronics and Communications, Excellent with honor overall grade. He started his academic career as a Teacher Assistant in Smart Village campus and got his Master’s degree in 2016 and undergoing PhD degree in UCM Madrid, Spain. After Finishing Master’s degree his passion for smart systems design and implementation and his vision to make an Egyptian brand that can compete with the big tech. companies made him start working on the system right away choosing Hesham Tarek and Omar Alaa securing the technical development for their extensive know how. In June 2021 and with the joining of Eng. Ahmed Sabbour and Eng. Omar Sabbour as co-founders completing the big picture, the company was up and running with Hesham Fahmy as the CEO.",
        },
        {
            name: "Hesham Tarek",
            title: "Co-Founder & CTO Software",
            image: "./hesham_tarek.webp",
            description:
                "Graduated from AAST with Bachelor’s degree in Electronics and Communications, not only Excellent with Honor grade, he got the highest score in the department being the first upon his colleagues. He started his academic career and Master’s degree right after he graduated as a Teacher Assistant. Hesham is the one when tech. software issues are discussed in front of him, solutions pop up in no time. Brightness, self-taught experience and market experience gained over the years joining in 2016 in addition to tons of ideas, in addition to being a Co-Founder, made him the best person to be Clixsys, CTO-Software.",
        },
        {
            name: "Omar Alaa",
            title: "CO-FOUNDER & CTO HARDWARE",
            image: "./omar_alaa.webp",
            description:
                "Graduated from AAST, with Bachelor’s degree in Electronics and Communications, Omar was not only good at hardware design, he also is the one to ask in robotics and motors. With his extensive knowledge which was gained through his long term self-taught experience, was picked to take care of the Hardware and mechanisms design as a Co-Founder. June 2021 and with being the person having the solutions of complicated issues it was the time to be Clixsys, CTO-Hardware.",
        },
    ];

    const openModal = (member) => {
        setSelectedMember(member); // Set the selected member
        setTimeout(() => {
            gsap.fromTo(
                ".modalContainer",
                { opacity: 0, scale: 0.8 }, // Start state
                { opacity: 1, scale: 1, duration: 0.3, ease: "power3.inOut" } // End state
            );
        }, 10); // Short delay to ensure GSAP animates the modal
    };

    const closeModal = () => {
        gsap.to(".modalContainer", {
            opacity: 0,
            scale: 0.8,
            duration: 0.3, // Match the duration with the opening animation
            ease: "power3.inOut", // Match the ease with the opening animation
            onComplete: () => setSelectedMember(null), // Reset the selected member
        });
    };

    return (
        <div>
            <div className='container'>
                <div className='home01'>
                    <img src={logo} alt="Logo" className="logo02" loading="lazy" />
                    <p>Discover who we are and what we do.</p>
                    <div className='about01'>
                        <p>
                            We are a forward-thinking organization dedicated to developing
                            innovative systems that provide comfort, convenience, and intelligence
                            to our clients. With expertise across various disciplines, we aim to
                            lead the industry with cutting-edge solutions.
                        </p>
                    </div>
                </div>

            </div>

            {/* Scope of Work Section */}
            <section className="scope-of-work-section">
                <h2 className="scope-of-work-title">SCOPE OF WORK</h2>
                <p className="scope-of-work-desc">In Clixsys we have many main scopes of work that makes us who we are.</p>
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

                <Slideshow />

                <h2 className="products-services-title">PRODUCTS &amp; SERVICES</h2>
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

                <div className="about-counter-container">
                    <Counter
                        ref={aboutCounterRef}
                        counters={[
                            { title: "Smart Home Projects", end: 50, subtitle: "Projects" },
                            { title: "Custom Built Systems", end: 30, subtitle: "Projects" },
                            { title: "App Development", end: 20, subtitle: "Projects" },
                        ]}
                    />
                </div>
            </section>


            <div className='container'>

                <div className="aboutCards">
                    <div className="testimonial02 about02">
                        <div className="testimonial about02">
                            <h2>Mission</h2>
                            <p>
                                Our mission is to propose the most comprehensive systems to offer comfort,
                                facilitate usage, and become a leading organization pushing the world into the future.
                            </p>
                        </div>
                    </div>

                    <div className="testimonial02 about02">
                        <div className="testimonial about02">
                            <h2>Vision</h2>
                            <p>
                                Our vision is to deliver a wide range of innovative, intelligent services to all entities
                                with assorted disciplines and properties within all segments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* The Team Section */}
                <section className="team">
                    <div className="teamHeader">
                        <h2>Our Team</h2>
                        <p>
                            We’re a team of highly passionate engineers striving to take the
                            smart home industry to the next level. Through innovation,
                            dedication, and teamwork, we aim to revolutionize the way technology
                            integrates with daily life.
                        </p>
                    </div>
                    <div className="team-members">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="team-member"
                                onClick={() => openModal(member)}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    onError={(e) => (e.target.src = "../default-avatar.jpg")}
                                    loading="lazy"
                                />
                                <h3>{member.name}</h3>
                                <p>{member.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Modal for Team Member Description */}
                {selectedMember && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modalContainer">
                            <div className="modalContainer02">
                                <div
                                    className="modal"
                                    onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
                                >
                                    <button className="close-btn" onClick={closeModal}>
                                        ×
                                    </button>
                                    <img
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        className="modal-image"
                                        loading="lazy"
                                    />
                                    <h3>{selectedMember.name}</h3>
                                    <p className="modal-title">{selectedMember.title}</p>
                                    <p className="modal-description">{selectedMember.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='home01 ceoLetter'>
                <img src={logo} alt="Logo" className="logo02" loading="lazy" />
                <h2>CEO Open Letter</h2>
                <div className='about01'>
                    <p>
                        Having many years of experience as a R&D tech. company, our mission is to provide the most
                        innovative one of a kind smart systems products serving the residential and commercial sectors.
                        Our aim is to let people live and enjoy their daily life with a unique touch from the future.
                    </p>
                    <p>Sincerely,</p>
                    <img src='./hf.webp' alt="Logo" className="hk" loading="lazy" />
                </div>
            </div>
        </div >
    );
}

export default About;