// File: src/pages/SmartMirrors.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdTouchApp, MdOutlineSecurity, MdOutlineLightbulb, MdOutlineWifi, MdExpandMore, MdSend } from 'react-icons/md';

// Static color definitions (module-level to avoid re-creating arrays and ESLint warnings)
const FRAME_COLORS = [
    { name: 'black', label: 'Black', hex: '#191919' },
    { name: 'gold', label: 'Gold', hex: '#efcb03' },
    { name: 'silver', label: 'Silver', hex: '#868686' }
];

const SmartMirrors = () => {
    const imageRef = useRef(null);

    // Calculate initial scale based on the largest mirror option
    const baseWidth = 200;
    const baseHeight = 80;

    const [selectedSize, setSelectedSize] = useState('200*80*10');
    const [selectedColor, setSelectedColor] = useState('black');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
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

    const mirrorOptions = [
        { size: '60*40*7', touch: '19-inch', price: 1140, scale: 0.6, dimensions: '60cm × 40cm x 7cm', width: 60, height: 40 },
        { size: '80*60*7', touch: '19-inch', price: 1370, scale: 0.8, dimensions: '80cm × 60cm x 7cm', width: 80, height: 60 },
        { size: '80*60*10', touch: '32-inch', price: 1520, scale: 0.8, dimensions: '80cm × 60cm x 10cm', width: 80, height: 60 },
        { size: '120*60*7', touch: '19-inch', price: 1650, scale: 1.0, dimensions: '120cm × 60cm x 7cm', width: 120, height: 60 },
        { size: '120*60*10', touch: '32-inch', price: 1800, scale: 1.0, dimensions: '120cm × 60cm x 10cm', width: 120, height: 60 },
        { size: '160*60*7', touch: '19-inch', price: 1930, scale: 1.2, dimensions: '160cm × 60cm x 7cm', width: 160, height: 60 },
        { size: '160*60*10', touch: '32-inch', price: 2080, scale: 1.2, dimensions: '160cm × 60cm x 10cm', width: 160, height: 60 },
        { size: '200*80*7', touch: '19-inch', price: 2210, scale: 1.4, dimensions: '200cm × 80cm x 7cm', width: 200, height: 80 },
        { size: '200*80*10', touch: '32-inch', price: 2360, scale: 1.4, dimensions: '200cm × 80cm x 10cm', width: 200, height: 80 },
    ];

    const frameColors = FRAME_COLORS;

    const selectedMirror = mirrorOptions.find(option => option.size === selectedSize);
    const imageName = `${selectedColor}.png`;
    const imageUrl = `/${imageName}`;

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
        // Preload mirror color images to avoid visible loading
        FRAME_COLORS.forEach((c) => {
            const pre = new Image();
            pre.src = `/${c.name}.png`;
        });
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

    const handleColorChange = (newColor) => {
        if (newColor === selectedColor) return;
        setSelectedColor(newColor);
        setIsTransitioning(true);
        setIsImageLoading(true);
        // End transform animation; the actual loading flag will be cleared on image onLoad
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const handleSizeChange = (newSize) => {
        const newMirror = mirrorOptions.find(option => option.size === newSize);

        // Calculate absolute scale based on area ratio
        const newArea = newMirror.width * newMirror.height;
        const baseArea = baseWidth * baseHeight;
        const absoluteScale = newArea / baseArea;

        setIsTransitioning(true);

        gsap.to(imageRef.current, {
            scale: absoluteScale,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                setIsTransitioning(false);
            }
        });

        setSelectedSize(newSize);
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
            formType: 'Smart Mirror Quote',
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            productInterest: formData.productInterest,
            additionalInfo: formData.additionalInfo,
            selection_size: selectedMirror.size,
            selection_color: selectedColor,
            selection_price: `$${selectedMirror.price}`,
            selection_dimensions: selectedMirror.dimensions,
            selection_touch: selectedMirror.touch,
            _subject: 'New Smart Mirror Quote Request',
        };

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Quote request submitted successfully! We\'ll get back to you within 24 hours.');
                setShowQuoteForm(false);
                setFormData({
                    firstName: '', lastName: '', phone: '', email: '', country: '', city: '', productInterest: '', additionalInfo: ''
                });
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

    const selectMirrorOption = (option) => {
        handleSizeChange(option.size);
        setIsDropdownOpen(false);
    };

    return (
        <div className="mirrors-page">
            <div className="container">
                {/* Hero Section */}
                <div className="mirrors-hero-section">
                    <h1 className="mirrors-hero-title">Smart Interactive Mirror</h1>
                    <p className="mirrors-hero-description">
                        Transform your space with our cutting-edge smart mirrors.
                        Choose your perfect size and frame color, featuring touch display,
                        Android system, and intelligent widgets.
                    </p>
                </div>

                {/* Mirror Configurator */}
                <div className="mirror-configurator">
                    {/* Mirror Display */}
                    <div className="mirror-image-container">
                        <img
                            ref={imageRef}
                            src={imageUrl}
                            alt={`Smart Mirror - ${selectedColor}`}
                            className={`mirror-image ${isTransitioning ? 'transitioning' : ''}`}
                            onError={(e) => {
                                e.target.src = '/black.png';
                            }}
                            onLoad={() => setIsImageLoading(false)}
                        />

                        {isImageLoading && (
                            <div className="img-loader">
                                <div className="spinner-circle" />
                            </div>
                        )}

                        {/* Specs Badge */}
                        <div className="mirror-specs-badge">
                            <div className="mirror-specs-dimensions">{selectedMirror.dimensions}</div>
                            <div className="mirror-specs-touch">{selectedMirror.touch} Touch Display</div>
                        </div>
                    </div>

                    {/* Configuration Panel */}
                    <div className="mirror-config-panel">
                        {/* Size Selection - Cool Dropdown */}
                        <div>
                            <h3 className="mirror-section-title">Choose Size</h3>
                            <div className="cool-dropdown-container">
                                <button
                                    className={`cool-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    <div className="dropdown-selected-content">
                                        <div className="dropdown-main-text">{selectedMirror.dimensions}</div>
                                        <div className="dropdown-sub-text">{selectedMirror.touch} Touch Display - ${selectedMirror.price}</div>
                                    </div>
                                    <MdExpandMore className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
                                </button>

                                <div className={`cool-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                    <div className="dropdown-menu-content">
                                        {mirrorOptions.map((option) => (
                                            <div
                                                key={option.size}
                                                className={`dropdown-option ${selectedSize === option.size ? 'selected' : ''}`}
                                                onClick={() => selectMirrorOption(option)}
                                            >
                                                <div className="option-main">
                                                    <div className="option-dimensions">{option.dimensions}</div>
                                                    <div className="option-price">${option.price}</div>
                                                </div>
                                                <div className="option-details">{option.touch} Touch Display</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="mirror-section-title">Choose Frame Color</h3>
                            <div className="mirror-color-container">
                                {frameColors.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`mirror-color-button ${selectedColor === color.name ? 'selected' : ''}`}
                                        onClick={() => handleColorChange(color.name)}
                                    >
                                        <div
                                            className="mirror-color-swatch"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        {color.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="mirror-price-container">
                            <div className="mirror-price-label">Total Price</div>
                            <div className="mirror-price-amount">${selectedMirror.price}</div>
                            <div className="mirror-price-note">Includes all accessories and installation</div>
                        </div>

                        {/* CTA Button */}
                        <button className="mirror-cta-button" onClick={handleQuoteRequest}>
                            Contact Sales
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mirrors-features-section">
                    <h2 className="mirrors-features-title">Smart Mirror Features</h2>
                    <div className="mirrors-features-grid">
                        <div className="mirror-feature-card">
                            <MdTouchApp className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Touch Display</h3>
                            <p className="mirror-feature-description">
                                Interactive touch screen with responsive controls for seamless user experience
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdOutlineWifi className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Android System</h3>
                            <p className="mirror-feature-description">
                                Full Android operating system with access to apps and smart home integration
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdOutlineLightbulb className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Smart Widgets</h3>
                            <p className="mirror-feature-description">
                                Weather, calendar, clock, and customizable widgets for your daily routine
                            </p>
                        </div>
                        <div className="mirror-feature-card">
                            <MdOutlineSecurity className="mirror-feature-icon" />
                            <h3 className="mirror-feature-title">Complete Package</h3>
                            <p className="mirror-feature-description">
                                Includes all necessary accessories, mounting hardware, and professional installation
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
                                    <p>{selectedMirror.dimensions} - {selectedMirror.touch} - {frameColors.find(c => c.name === selectedColor)?.label} Frame - ${selectedMirror.price}</p>
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
                                        placeholder="e.g., Smart Mirror for bathroom, living room, etc."
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
                                    <MdSend />
                                    Submit Quote Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartMirrors;