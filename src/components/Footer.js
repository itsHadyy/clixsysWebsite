import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import { SlSocialInstagram, SlSocialLinkedin, SlSocialFacebook } from "react-icons/sl";

function Footer() {
    return (
        <footer>
            <hr />
            <div className="footer-container">
                <div className="footer-left">
                    <div className='social'>
                        <Link to="https://www.instagram.com/clixsys_co/" aria-label="Clixsys Instagram">
                            <SlSocialInstagram size={24} />
                        </Link>
                        <Link to="https://www.linkedin.com/company/clixsys/" aria-label="Clixsys LinkedIn">
                            <SlSocialLinkedin size={24} />
                        </Link>
                        <Link to="https://www.facebook.com/Clixsys-102724245572309" aria-label="Clixsys Facebook">
                            <SlSocialFacebook size={24} />
                        </Link>

                        <p>All rights reserved. | &copy;Copyright 2025 </p>
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
                        <p>info@clixsys.com</p>
                    </div>
                    <div>
                        <button>
                            <Link to="/Contact">Contact</Link>
                        </button> <br />
                        {/* <button>
                            <Link to="/Contact">Contact</Link>
                        </button> */}
                    </div>
                    {/* <form>
                        <input type="text" placeholder="Email" />
                        <input type="submit" value={"Subscribe"} />
                    </form>  */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;