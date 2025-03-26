import React, { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
const Contact = () => {

    const [state, handleSubmit] = useForm("xrbelgwl");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    return (
        <div className="contactContainer01" id="contact">
            <div className="contactContainer02">
                <div className="contact-container">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        Have a question or need a quote? Reach out to us, and we'll get back to you shortly!
                    </p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            required
                        />
                        <ValidationError
                            prefix="Name"
                            field="name"
                            errors={state.errors}
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />

                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                        />
                        <ValidationError
                            prefix="Phone"
                            field="phone"
                            errors={state.errors}
                        />

                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message or request"
                            rows="5"
                            required
                        /> <br></br>
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />

                        <button type="submit" disabled={state.submitting} className="btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;