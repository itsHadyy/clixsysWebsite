import React, { useEffect, useRef } from 'react';
import '../style.css';
import { SlArrowDown } from "react-icons/sl";
import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';
import Features24 from '../components/features24';
import '../components/features24.css'
import Features25 from '../components/features25';
import CTA26 from '../components/cta26';
import Counter from '../components/Counter';
import Contact from '../components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link as ScrollLink } from "react-scroll";


function Home() {
  const counterRef = useRef();
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const handleVideoLoaded = () => setVideoLoaded(true);
  const handleVideoError = () => setVideoLoaded(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.heroContent',
      { opacity: 0, y: -50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '.hero',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    gsap.fromTo('.scrollText',
      { opacity: 0, y: -50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '.scrollText',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    gsap.fromTo('#featuresContainer',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '#featuresContainer',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

    gsap.fromTo('#featuresContainer02',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '#featuresContainer02',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

    gsap.fromTo('.home01',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '.home01',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

    gsap.fromTo('.slideshow-container',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '.slideshow-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

    // Testimonial animation
    gsap.fromTo('.thq-section-padding',
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '.thq-section-padding',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

    gsap.fromTo('.counter-container',
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: '.counter-container',
          start: 'top 90%',
          onEnter: () => {
            if (counterRef.current && counterRef.current.startAnimation) {
              counterRef.current.startAnimation();
            }
          }
        }
      }
    );

    gsap.fromTo('#testimonials',
      { opacity: 0, y: 100 },
      {
        opacity: 1, y: 0, duration: 1, scrollTrigger: {
          trigger: '#testimonials',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="hero" style={{ position: 'relative' }}>
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          poster="./media/slider/img01.webp"
          onCanPlayThrough={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src="./VideoTeaser.mp4" type="video/mp4" />
          Your browser does not support the videos.
        </video>
        {!videoLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'var(--black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              transition: 'opacity 0.5s',
            }}
          >
            <img
              src={'/logo02.jpg'}
              alt="Clixsys Logo"
              style={{ maxWidth: '60%', maxHeight: '60%' }}
            />
          </div>
        )}
        <div className="scrollText">
          <p>
            Scroll down to learn more about our services <br></br>
            <SlArrowDown />
          </p>
        </div>
      </div>

      <div className='container'>
        <div className='home01'>
          <h1>Discover Our Automation Systems</h1>
          <p>Experience the future with our cutting-edge automation systems that enhance convenience and efficiency in your daily life.</p>
          <div>
            <button className="btn01">
              <Link to="/Automation">Explore More</Link>
            </button>
            <button>
              <Link to="/Smart">Shop Smart Products</Link>
            </button>
          </div>
        </div>
      </div>

      <Slideshow direction="left" />
      <Slideshow direction="right" />

      <div className='container'>
        <Features24
          feature3Description={<span className="home-text118">Explore our range of interactive tools that enhance your smart home experience.</span>}
          feature3Title={<span className="home-text119">Interactive Tools</span>}
          feature2Description={<span className="home-text120">Customize your products with different glass colors, lengths, widths, and frame materials in real time.</span>}
          feature1Title={<span className="home-text121">Automation Systems</span>}
          feature1Description={<span className="home-text122">Discover our cutting-edge automation systems that make your life easier and more efficient.</span>}
          feature2Title={<span className="home-text123">Product Customization Features</span>}
          feature1ImgSrc={'./media/slider/mechanism.webp'}
          feature2ImgSrc={'./media/slider/smartMirror.webp'}
          feature3ImgSrc={'./media/slider/ac.webp'}
        ></Features24>

        <CTA26
          heading1={<h3>Ready to Automate Your Home or Business?</h3>}
          content1={<p>Explore our range of automation systems and smart products to enhance your space.</p>}
          action1={<span className="home-text126"><ScrollLink to="contact" smooth={true} duration={500}>Get Started</ScrollLink></span>}
        ></CTA26>

        <Counter
          ref={counterRef}
          counters={[
            { title: "Projects", end: 100, subtitle: "Projects" },
            { title: "Staff", end: 20, subtitle: "Staff" },
            { title: "Years of Experience", end: 9, subtitle: "Years of Experience" },
          ]}
        />
        {/* <Testimonials /> */}
        <Features25
          feature3Description={<span className="home-text118">Revolutionize the way you host your visitors with cutting-edge interactive technology. Browse the cafeteria menu and place your order effortlessly, all from the table. A smart and stylish way to impress your visitors while redefining convenience.</span>}
          feature3Title={<span className="home-text119">DigiServe</span>}
          feature3ImgSrc={"./media/slider/img03.webp"}
          feature2Description={<span className="home-text120">Transform your meetings into unforgettable experiences! With cutting-edge technology at your fingertips, effortlessely control lighing, curtains, presentations, and so much more. A true blend of sophistication and innovation to impress every visitor.</span>}
          feature2Title={<span className="home-text123">DesQ</span>}
          feature2ImgSrc={"./media/slider/img02.webp"}
          feature1Description={<span className="home-text122">Redefine your space with smart motorized solutions for TVs and projectors. Effortlessely conceal or reveal your devices with precision movements, unlocking creative ways to make the most of your space.</span>}
          feature1Title={<span className="home-text121">Elev8</span>}
          feature1ImgSrc={"./media/slider/img04.webp"}
        ></Features25> 

        <Contact />
      </div>
    </div>
  );
}

export default Home;