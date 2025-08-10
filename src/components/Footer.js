import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import { SlSocialInstagram, SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";

function Footer() {
    return (
        <footer role="contentinfo" aria-label="Site Footer">
            <hr />
            <div className="footer-container">
                <div className="footer-left">
                    <div className='social' style={{ minHeight: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Link to="https://www.instagram.com/clixsys_co/" aria-label="Clixsys Instagram">
                            <SlSocialInstagram size={32} style={{ width: 32, height: 32 }} />
                        </Link>
                        <Link to="https://www.linkedin.com/company/clixsys/" aria-label="Clixsys LinkedIn">
                            <SlSocialLinkedin size={32} style={{ width: 32, height: 32 }} />
                        </Link>
                        <Link to="https://www.facebook.com/Clixsys-102724245572309" aria-label="Clixsys Facebook">
                            <SlSocialFacebook size={32} style={{ width: 32, height: 32 }} />
                        </Link>

                    </div>
                    <div>
                        <h4>Address</h4>
                        <p>Nile Cornish, Cairo, Egypt</p>
                    </div>
                </div>
                <div className="footer-right">
                    <div>
                        <h4>General</h4>
                        <p>+2 011 005 12345</p>
                        <p>heshamafahmy@clixsys.com</p>
                    </div>
                    <div>
                        <Link to="/contact" className="btn01">Contact</Link>
                    </div>
                    {/* <form>
                        <input type="text" placeholder="Email" />
                        <input type="submit" value={"Subscribe"} />
                    </form>  */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>All rights reserved. | &copy;Copyright 2025 Clixsys</p>
            </div>
        </footer>
    );
}

export default Footer;