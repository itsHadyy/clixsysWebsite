import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSend } from 'react-icons/md';

const MirrorQuote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get data passed from the mirrors page
    const { selectedMirror, selectedColor, mirrorOptions, frameColors } = location.state || {
        selectedMirror: { size: 'large', dimensions: '100cm x 50cm', touch: 'Premium Touch', price: '799' },
        selectedColor: 'black',
        mirrorOptions: [
            { size: 'small', dimensions: '60cm x 30cm', touch: 'Basic Touch', price: '299' },
            { size: 'medium', dimensions: '80cm x 40cm', touch: 'Advanced Touch', price: '499' },
            { size: 'large', dimensions: '100cm x 50cm', touch: 'Premium Touch', price: '799' }
        ],
        frameColors: [
            { name: 'black', label: 'Classic Black' },
            { name: 'silver', label: 'Elegant Silver' },
            { name: 'gold', label: 'Premium Gold' }
        ]
    };

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

    const [currentMirror, setCurrentMirror] = useState(selectedMirror);
    const [currentColor, setCurrentColor] = useState(selectedColor);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMirrorChange = (newSize) => {
        const newMirror = mirrorOptions.find(option => option.size === newSize);
        setCurrentMirror(newMirror);
    };

    const handleColorChange = (newColor) => {
        setCurrentColor(newColor);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Quote Request Submitted:', {
            customerInfo: formData,
            mirrorSelection: {
                size: currentMirror.size,
                color: currentColor,
                price: currentMirror.price,
                dimensions: currentMirror.dimensions,
                touch: currentMirror.touch
            }
        });
        
        // Here you would typically send the data to your backend
        alert('Quote request submitted successfully! We\'ll get back to you within 24 hours.');
        navigate('/mirrors');
    };

    const handleBack = () => {
        navigate('/mirrors');
    };

    return (
        <div className="quote-page">
            <div className="container">
                {/* Header */}
                <div className="quote-header">
                    <button className="back-button" onClick={handleBack}>
                        <MdArrowBack />
                        Back to Configurator
                    </button>
                    <h1 className="quote-title">Request Smart Mirror Quote</h1>
                    <p className="quote-subtitle">
                        Fill out the form below and we'll get back to you with a custom quote within 24 hours
                    </p>
                </div>

                <div className="quote-content">
                    {/* Current Selection Summary */}
                    <div className="selection-summary">
                        <h2>Your Current Selection</h2>
                        <div className="selection-details">
                            <div className="selection-item">
                                <span className="selection-label">Size:</span>
                                <span className="selection-value">{currentMirror.dimensions}</span>
                            </div>
                            <div className="selection-item">
                                <span className="selection-label">Touch Technology:</span>
                                <span className="selection-value">{currentMirror.touch}</span>
                            </div>
                            <div className="selection-item">
                                <span className="selection-label">Frame Color:</span>
                                <span className="selection-value">{frameColors.find(c => c.name === currentColor)?.label}</span>
                            </div>
                            <div className="selection-item">
                                <span className="selection-label">Starting Price:</span>
                                <span className="selection-value price">${currentMirror.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quote Form */}
                    <form className="quote-form" onSubmit={handleSubmit}>
                        {/* Mirror Configuration Section */}
                        <div className="form-section">
                            <h3>Mirror Configuration</h3>
                            <p className="section-description">
                                You can modify your selection here if needed
                            </p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Size</label>
                                    <select 
                                        className="form-select enhanced-dropdown"
                                        value={currentMirror.size}
                                        onChange={(e) => handleMirrorChange(e.target.value)}
                                    >
                                        {mirrorOptions.map((option) => (
                                            <option key={option.size} value={option.size}>
                                                {option.dimensions} - {option.touch} - ${option.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Color</label>
                                    <select 
                                        className="form-select enhanced-dropdown"
                                        value={currentColor}
                                        onChange={(e) => handleColorChange(e.target.value)}
                                    >
                                        {frameColors.map((color) => (
                                            <option key={color.name} value={color.name}>
                                                {color.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="form-section">
                            <h3>Contact Information</h3>
                            <p className="section-description">
                                Please provide your contact details so we can reach you
                            </p>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label required">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label required">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label required">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label required">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label required">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label required">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="form-section">
                            <h3>Additional Information</h3>
                            <p className="section-description">
                                Help us provide you with the best quote possible
                            </p>
                            
                            <div className="form-group">
                                <label className="form-label">Product of Interest</label>
                                <input
                                    type="text"
                                    name="productInterest"
                                    value={formData.productInterest}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="e.g., Smart Mirror for bathroom, living room, etc."
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Additional Information or Requests</label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    placeholder="Any specific requirements, installation preferences, questions, or additional features you'd like..."
                                    rows="5"
                                />
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="submit-section">
                            <div className="submit-info">
                                <p>By submitting this form, you agree to our terms of service and privacy policy.</p>
                                <p>We'll contact you within 24 hours with your custom quote.</p>
                            </div>
                            
                            <div className="submit-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={handleBack}
                                >
                                    Back to Configurator
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    <MdSend />
                                    Submit Quote Request
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MirrorQuote;
