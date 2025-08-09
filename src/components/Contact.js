import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        formType: 'Contact Form',
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        _subject: 'New Contact Message',
      };
      const res = await fetch('/api/send-quote.php', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert('Thanks! Your message has been sent.');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        console.error('Contact error', data);
        alert('There was a problem sending your message. Please try again.');
      }
    } catch (err) {
      console.error('Network error', err);
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contactContainer01" id="contact">
      <div className="contactContainer02">
        <div className="contact-container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have a question or need a quote? Reach out to us, and we'll get back to you shortly!
          </p>
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="text" id="name" name="name" placeholder="Enter your full name" required value={form.name} onChange={onChange} />
            <input type="email" id="email" name="email" placeholder="Enter your email" required value={form.email} onChange={onChange} />
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={form.phone} onChange={onChange} />
            <textarea id="message" name="message" placeholder="Enter your message or request" rows="5" required value={form.message} onChange={onChange} />
            <br />
            <button type="submit" disabled={submitting} className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;