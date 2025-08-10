// File: src/pages/Tables.jsx

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdExpandMore, MdSend, MdTouchApp, MdOutlineWifi, MdOutlineLightbulb, MdOutlineSecurity } from 'react-icons/md';

const Tables = () => {
  const imageRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const quoteFormRef = useRef(null);

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

  // Data from screenshot: first 3 are tables, rest are desks
  const items = [
    { id: 'table-60-40-40-19', type: 'table', size: '60×40×40', touch: '19-inch', price: 1190, scale: 0.6 },
    { id: 'table-80-60-40-19', type: 'table', size: '80×60×40', touch: '19-inch', price: 1420, scale: 0.8 },
    { id: 'table-80-60-80-32', type: 'table', size: '80×60×80', touch: '32-inch', price: 1570, scale: 0.9 },
    { id: 'desk-120-60-80-19', type: 'desk', size: '120×60×80', touch: '19-inch', price: 1700, scale: 1.0 },
    { id: 'desk-120-60-80-32', type: 'desk', size: '120×60×80', touch: '32-inch', price: 1850, scale: 1.05 },
    { id: 'desk-160-60-80-19', type: 'desk', size: '160×60×80', touch: '19-inch', price: 1980, scale: 1.15 },
    { id: 'desk-160-60-80-32', type: 'desk', size: '160×60×80', touch: '32-inch', price: 2130, scale: 1.2 },
    { id: 'desk-200-80-80-19', type: 'desk', size: '200×80×80', touch: '19-inch', price: 2260, scale: 1.35 },
    { id: 'desk-200-80-80-32', type: 'desk', size: '200×80×80', touch: '32-inch', price: 2410, scale: 1.4 }
  ];

  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find(i => i.id === selectedId);
  const imageUrl = `/${selected.type === 'table' ? 'table.png' : 'desk.png'}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      '.mirror-configurator',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.mirror-configurator', start: 'top 80%' } }
    );
    gsap.fromTo(
      '.mirrors-features-grid',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: '.mirrors-features-grid', start: 'top 80%' } }
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.cool-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(v => !v);

  const selectItem = (item) => {
    setIsTransitioning(true);
    gsap.to(imageRef.current, {
      scale: item.scale,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => setIsTransitioning(false)
    });
    setSelectedId(item.id);
    setIsDropdownOpen(false);
  };

  const handleQuoteRequest = () => {
    setShowQuoteForm(true);
    setTimeout(() => {
      quoteFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ENDPOINT = '/api/send-quote.php';

    const payload = {
      formType: 'Desks & Tables Quote',
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      city: formData.city,
      productInterest: formData.productInterest,
      additionalInfo: formData.additionalInfo,
      selection_type: selected.type,
      selection_size: selected.size,
      selection_touch: selected.touch,
      selection_price: `$${selected.price}`,
      _subject: 'New Desks & Tables Quote Request',
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Quote request submitted successfully! We'll get back to you within 24 hours.");
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

  return (
    <div className="mirrors-page">
      <div className="container">
        {/* Hero */}
        <div className="mirrors-hero-section">
          <h1 className="mirrors-hero-title">Smart Interactive Desks & Tables</h1>
          <p className="mirrors-hero-description">
            Custom-built interactive touch desks and tables powered by Android. Ideal for automation control systems.
            Metal frame with custom electrostatic painting. Includes all accessories.
          </p>
        </div>

        {/* Configurator */}
        <div className="mirror-configurator">
          {/* Display */}
          <div className="mirror-image-container">
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${selected.type === 'table' ? 'Table' : 'Desk'} - ${selected.size}`}
              className={`mirror-image ${isTransitioning ? 'transitioning' : ''}`}
              onError={(e) => { e.target.src = '/table.png'; }}
            />

            <div className="mirror-specs-badge">
              <div className="mirror-specs-dimensions">{selected.size}</div>
              <div className="mirror-specs-touch">{selected.touch}</div>
            </div>
          </div>

          {/* Panel */}
          <div className="mirror-config-panel">
            <div>
              <h3 className="mirror-section-title">Choose Size</h3>
              <div className="cool-dropdown-container">
                <button className={`cool-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                  <div className="dropdown-selected-content">
                    <div className="dropdown-main-text">{selected.size}</div>
                    <div className="dropdown-sub-text">{selected.touch} - ${selected.price}</div>
                  </div>
                  <MdExpandMore className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
                </button>

                <div className={`cool-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                  <div className="dropdown-menu-content">
                    {items.map((opt) => (
                      <div key={opt.id} className={`dropdown-option ${selectedId === opt.id ? 'selected' : ''}`} onClick={() => selectItem(opt)}>
                        <div className="option-main">
                          <div className="option-dimensions">{opt.type === 'table' ? 'Table' : 'Desk'} — {opt.size}</div>
                          <div className="option-price">${opt.price}</div>
                        </div>
                        <div className="option-details">{opt.touch}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mirror-price-container" style={{ marginTop: '2rem' }}>
              <div className="mirror-price-label">Total Price</div>
              <div className="mirror-price-amount">${selected.price}</div>
              <div className="mirror-price-note">Includes all accessories and installation</div>
            </div>

            {/* CTA */}
            <button className="mirror-cta-button" onClick={handleQuoteRequest}>Contact Sales</button>
          </div>
        </div>

        {/* Features */}
        <div className="mirrors-features-section">
          <h2 className="mirrors-features-title">Features</h2>
          <div className="mirrors-features-grid">
            <div className="mirror-feature-card">
              <MdTouchApp className="mirror-feature-icon" />
              <h3 className="mirror-feature-title">Multi-touch Display</h3>
              <p className="mirror-feature-description">19-inch and 32-inch touch options powered by Android</p>
            </div>
            <div className="mirror-feature-card">
              <MdOutlineWifi className="mirror-feature-icon" />
              <h3 className="mirror-feature-title">Automation Ready</h3>
              <p className="mirror-feature-description">Ideal for controlling automation systems and smart devices</p>
            </div>
            <div className="mirror-feature-card">
              <MdOutlineLightbulb className="mirror-feature-icon" />
              <h3 className="mirror-feature-title">Custom Finishing</h3>
              <p className="mirror-feature-description">Metal frame with custom electrostatic painting</p>
            </div>
            <div className="mirror-feature-card">
              <MdOutlineSecurity className="mirror-feature-icon" />
              <h3 className="mirror-feature-title">Complete Package</h3>
              <p className="mirror-feature-description">Includes all accessories for a professional setup</p>
            </div>
          </div>
        </div>

        {/* Inline Quote Form */}
        <div ref={quoteFormRef} className={`quote-section ${showQuoteForm ? 'visible' : ''}`}>
          <div className="quote-section-header">
            <h2 className="quote-section-title">Request Your Quote</h2>
            <p className="quote-section-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <div className="quote-form-container">
            <form className="quote-modal-form" onSubmit={handleSubmit}>
              <div className="quote-form-section">
                <h3>Your Current Selection</h3>
                <div className="quote-selected-info">
                  <p>{selected.type === 'table' ? 'Table' : 'Desk'} — {selected.size} — {selected.touch} — ${selected.price}</p>
                </div>
              </div>

              <div className="quote-form-section">
                <h3>Contact Information</h3>
                <div className="quote-form-row">
                  <div className="quote-form-group">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="quote-form-input" required placeholder="First Name" />
                  </div>
                  <div className="quote-form-group">
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="quote-form-input" required placeholder="Last Name" />
                  </div>
                </div>
                <div className="quote-form-row">
                  <div className="quote-form-group">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="quote-form-input" required placeholder="Phone Number" />
                  </div>
                  <div className="quote-form-group">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="quote-form-input" required placeholder="Email Address" />
                  </div>
                </div>
                <div className="quote-form-row">
                  <div className="quote-form-group">
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="quote-form-input" required placeholder="Country" />
                  </div>
                  <div className="quote-form-group">
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="quote-form-input" required placeholder="City" />
                  </div>
                </div>
              </div>

              <div className="quote-form-section">
                <h3>Additional Information</h3>
                <div className="quote-form-group">
                  <label className="quote-form-label">Product of Interest</label>
                  <input type="text" name="productInterest" value={formData.productInterest} onChange={handleInputChange} className="quote-form-input" placeholder="e.g., Interactive desk for control room" />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">Additional Information or Requests</label>
                  <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} className="quote-form-textarea" placeholder="Any specific requirements, finishes, mounting, etc." rows="4" />
                </div>
              </div>

              <div className="quote-form-actions">
                <button type="button" className="quote-btn-secondary" onClick={() => setShowQuoteForm(false)}>Cancel</button>
                <button type="submit" className="quote-btn-primary">Submit Quote Request<MdSend /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;


