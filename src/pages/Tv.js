// File: src/pages/Tv.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdTv, MdSettings, MdSmartphone, MdWifi, MdExpandMore, MdSend } from 'react-icons/md';

const Tv = () => {
    const imageRef = useRef(null);

    const [selectedModel, setSelectedModel] = useState('F-Model-32-50');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        country: '',
        city: '',
        productInterest: '',
        additionalInfo: ''
    });
    const quoteFormRef = useRef(null);

    const tvOptions = [
        { 
            model: 'F-Model-32-50', 
            name: 'F-Model', 
            maxTvSize: '32-50 inch', 
            price: 1650, 
            scale: 1.0, 
            image: 'F-Model.png',
            description: 'Motorized TV mechanisms controlled by Switch, sensor, remote control, or mobile app.'
        },
        { 
            model: 'F-Model-55-70', 
            name: 'F-Model', 
            maxTvSize: '55-70 inch', 
            price: 1820, 
            scale: 1.2, 
            image: 'F-Model.png',
            description: 'Motorized TV mechanisms controlled by Switch, sensor, remote control, or mobile app.'
        },
        { 
            model: 'T-Model-50', 
            name: 'T-Model', 
            maxTvSize: '50 inch', 
            price: 570, 
            scale: 0.8, 
            image: 'T-Model.png',
            description: 'Motorized TV mechanisms controlled by Switch, sensor, remote control, or mobile app.'
        },
        { 
            model: 'B-Model-50', 
            name: 'B-Model', 
            maxTvSize: '50 inch', 
            price: 1650, 
            scale: 1.0, 
            image: 'B-Model.png',
            description: 'Motorized TV mechanisms controlled by Switch, sensor, remote control, or mobile app.'
        }
    ];

    const selectedTv = tvOptions.find(option => option.model === selectedModel);
    const imageUrl = `/${selectedTv.image}`;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate elements on scroll
        gsap.fromTo('.mirror-configurator',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.mirror-configurator', start: 'top 80%' } }
        );

        gsap.fromTo('.mirrors-features-grid',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: '.mirrors-features-grid', start: 'top 80%' } }
        );
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.cool-dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleModelChange = (newModel) => {
        const newTv = tvOptions.find(option => option.model === newModel);

        setIsTransitioning(true);

        gsap.to(imageRef.current, {
            scale: newTv.scale,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                setIsTransitioning(false);
            }
        });

        setSelectedModel(newModel);
    };

    const handleQuoteRequest = () => {
        setShowQuoteForm(true);
        // Scroll to form after a brief delay for animation
        setTimeout(() => {
            quoteFormRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ENDPOINT = '/api/send-quote.php';

        const payload = {
            formType: 'TV Mechanism Quote',
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            productInterest: formData.productInterest,
            additionalInfo: formData.additionalInfo,
            selection_model: selectedTv.model,
            selection_name: selectedTv.name,
            selection_size: selectedTv.maxTvSize,
            selection_price: `$${selectedTv.price}`,
            _subject: 'New TV Mechanism Quote Request',
        };

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Quote request submitted successfully! We\'ll get back to you within 24 hours.');
                setShowQuoteForm(false);
                setFormData({ firstName: '', lastName: '', phone: '', email: '', country: '', city: '', productInterest: '', additionalInfo: '' });
            } else {
                console.error('Form submit error:', data);
                alert('There was a problem submitting your request. Please try again.');
            }
        } catch (err) {
            console.error('Network error submitting form:', err);
            alert('Network error. Please check your connection and try again.');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectTvOption = (option) => {
        handleModelChange(option.model);
        setIsDropdownOpen(false);
    };

    return (
        <div className="mirrors-page">
            <div className="container">
                {/* Hero Section */}
                <div className="mirrors-hero-section">
                    <h1 className="mirrors-hero-title">Motorized TV Mechanisms</h1>
                    <p className="mirrors-hero-description">
                        Experience the future of home entertainment with our motorized TV mechanisms.
                        Choose from our premium models featuring switch, sensor, remote control, or mobile app operation.
                        Contains Chinese high quality low noise motors and includes all accessories.
                    </p>
                </div>

                {/* TV Configurator */}
                <div className="mirror-configurator">
                    {/* TV Display */}
                    <div className="mirror-image-container">
                        <img
                            ref={imageRef}
                            src={imageUrl}
                            alt={`Motorized TV Mechanism - ${selectedTv.name}`}
                            className={`mirror-image ${isTransitioning ? 'transitioning' : ''}`}
                            onError={(e) => {
                                e.target.src = '/F-Model.png';
                            }}
                        />

                        {/* Specs Badge */}
                        <div className="mirror-specs-badge">
                            <div className="mirror-specs-dimensions">{selectedTv.name}</div>
                            <div className="mirror-specs-touch">Max TV Size: {selectedTv.maxTvSize}</div>
                        </div>
                    </div>

                    {/* Configuration Panel */}
                    <div className="mirror-config-panel">
                        {/* Model Selection - Cool Dropdown */}
                        <div>
                            <h3 className="mirror-section-title">Choose TV Model</h3>
                            <div className="cool-dropdown-container">
                                <button
                                    className={`cool-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    <div className="dropdown-selected-content">
                                        <div className="dropdown-main-text">{selectedTv.name} - {selectedTv.maxTvSize}</div>
                                        <div className="dropdown-sub-text">Motorized TV Mechanism - ${selectedTv.price}</div>
                                    </div>
                                    <MdExpandMore className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
                                </button>

                                <div className={`cool-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                    <div className="dropdown-menu-content">
                                        {tvOptions.map((option) => (
                                            <div
                                                key={option.model}
                                                className={`dropdown-option ${selectedModel === option.model ? 'selected' : ''}`}
                                                onClick={() => selectTvOption(option)}
                                            >
                                                <div className="option-main">
                                                    <div className="option-dimensions">{option.name} - {option.maxTvSize}</div>
                                                    <div className="option-price">${option.price}</div>
                                                </div>
                                                <div className="option-details">Motorized TV Mechanism</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="mirror-price-container" style={{ marginTop: '2rem' }}>
                            <div className="mirror-price-label">Total Price</div>
                            <div className="mirror-price-amount">${selectedTv.price}</div>
                            <div className="mirror-price-note">Includes all accessories and Chinese high quality low noise motors</div>
                        </div>

                        {/* CTA Button */}
                        <button className="mirror-cta-button" onClick={handleQuoteRequest}>
                            Contact Sales
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mirrors-features-section">
                    <h2 className="mirrors-features-title">Motorized TV Mechanism Features</h2>
                    <div className="mirrors-features-grid">
                        <div className="mirror-feature-card">
                            <MdTv className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Multiple Control Options</h3>
                            <p className="mirror-feature-description">
                                Control your TV mechanism via switch, sensor, remote control, or mobile app for ultimate convenience
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdSettings className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">High Quality Motors</h3>
                            <p className="mirror-feature-description">
                                Features Chinese high quality low noise motors for smooth and quiet operation
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdSmartphone className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Smart Integration</h3>
                            <p className="mirror-feature-description">
                                Seamlessly integrate with your smart home system and control via mobile app
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdWifi className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Complete Package</h3>
                            <p className="mirror-feature-description">
                                Includes all necessary accessories, mounting hardware, and installation components
                            </p>
                        </div>
                    </div>
                </div>

                {/* Inline Quote Form */}
                <div ref={quoteFormRef} className={`quote-section ${showQuoteForm ? 'visible' : ''}`}>
                    <div className="quote-section-header">
                        <h2 className="quote-section-title">Request Your Quote</h2>
                        <p className="quote-section-subtitle">
                            Fill out the form below and we'll get back to you with a custom quote within 24 hours
                        </p>
                    </div>

                    <div className="quote-form-container">
                        <form className="quote-modal-form" onSubmit={handleSubmit}>
                            {/* Current Selection Summary */}
                            <div className="quote-form-section">
                                <h3>Your Current Selection</h3>
                                <div className="quote-selected-info">
                                    <p>{selectedTv.name} - {selectedTv.maxTvSize} - Motorized TV Mechanism - ${selectedTv.price}</p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="quote-form-section">
                                <h3>Contact Information</h3>

                                <div className="quote-form-row">
                                    <div className="quote-form-group">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="quote-form-group">
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                <div className="quote-form-row">
                                    <div className="quote-form-group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="quote-form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <div className="quote-form-row">
                                    <div className="quote-form-group">
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="Country"
                                        />
                                    </div>
                                    <div className="quote-form-group">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="quote-form-input"
                                            required
                                            placeholder="City"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="quote-form-section">
                                <h3>Additional Information</h3>

                                <div className="quote-form-group">
                                    <label className="quote-form-label">Product of Interest</label>
                                    <input
                                        type="text"
                                        name="productInterest"
                                        value={formData.productInterest}
                                        onChange={handleInputChange}
                                        className="quote-form-input"
                                        placeholder="e.g., Motorized TV for bedroom, living room, etc."
                                    />
                                </div>

                                <div className="quote-form-group">
                                    <label className="quote-form-label">Additional Information or Requests</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleInputChange}
                                        className="quote-form-textarea"
                                        placeholder="Any specific requirements, installation preferences, questions, or additional features you'd like..."
                                        rows="4"
                                    />
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="quote-form-actions">
                                <button
                                    type="button"
                                    className="quote-btn-secondary"
                                    onClick={() => setShowQuoteForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="quote-btn-primary"
                                >
                                    Submit Quote Request
                                    <MdSend />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tv;