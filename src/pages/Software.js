import React from "react";
import "../style.css";
import Card from '../components/Card';
import Slideshow from "../components/Slideshow";
import Quote from "./Quote";
import PDFSlideshow from "../components/PDFSlideshow";

const Software = () => {
    return (
        <div>

            <div className="container">
                <div className="projects-page">
                    <h1>
                        Software Solutions
                    </h1>
                    <p>Innovation crafted for modern living.</p>
                </div>

                <div className="services01">
                    <Card>
                        <h2>Website Development</h2>
                    </Card>
                    <Card>
                        <h2>Mobile Applications Development</h2>
                    </Card>
                </div>
            </div>
            <Slideshow direction="right" />
            <PDFSlideshow />
            <div className="container">
                <Quote />
            </div >
        </div >
    );
};

export default Software;