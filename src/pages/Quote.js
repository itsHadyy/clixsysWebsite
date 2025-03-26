import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../style.css";

const Quote = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [placeholders, setPlaceholders] = useState({
    name: "Your Name",
    co: "Company Name",
    email: "Email Address",
    phone: "Phone Number",
    social: "Company Link",
    message: "Your Message",
  });
  const [descriptions, setDescriptions] = useState({
    name: "Please enter your full name",
    co: "Please enter your company name",
    email: "Please enter your email address",
    phone: "Please type a phone number that we can later communicate on, like: WhatsApp, Botim, Comera, Facetime..etc",
    social: "Website link, company social media, or anything that could help.",
    message: "Tell us about your project or request",
  });
  const inputRefs = useRef([]);
  const descriptionRefs = useRef({}); 

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation (basic example)
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }

    // Simulate a form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleFocus = (name) => {
    const descriptionRef = descriptionRefs.current[name];
    if (descriptionRef) {
      gsap.to(descriptionRef, {
        y: -2,
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  const handleBlur = (name) => {
    const descriptionRef = descriptionRefs.current[name];
    if (descriptionRef) {
      gsap.to(descriptionRef, {
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="contactContainer01">
      <div className="contactContainer02">
        <div className="contact-container">
          <h1 className="contact-title">Briefing & Onboarding</h1>
          <p className="contact-subtitle">
            Thank you for choosing to work with us on your project. To help us
            deliver a solution tailored to your needs, we've prepared this form
            to gather important details about your business, goals, and
            vision. Your responses will enable us to create an accurate project
            proposal, timeline, and scope.
          </p>

          {submitted ? (
            <div className="success-message">
              <h2>Thank you!</h2>
              <p>Your request has been submitted successfully. We’ll get in touch with you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {Object.keys(formData).map((name) => (
                <div key={name} className="input-container">
                  <input
                    type={name === "email" ? "email" : "text"}
                    id={name}
                    name={name}
                    placeholder={placeholders[name]} 
                    value={formData[name]}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus(name)}
                    onBlur={() => handleBlur(name)}
                    ref={(el) => (inputRefs.current[name] = el)}
                    required
                  />

                  <p
                    id={`desc-${name}`}
                    ref={(el) => (descriptionRefs.current[name] = el)}
                    className="input-description"
                  >
                    {descriptions[name]}
                  </p>
                  
                </div>
              ))}
              <br></br>

              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;