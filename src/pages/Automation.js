import React from "react";
import "../style.css";
import Card from "../components/Card";
import Contact from "../components/Contact";

const Automation = () => {
  return (
    <div className="container">
        <div className="projects-page">
          <h1>
            Automation Systems
          </h1>
          <p>An Experience That Changes Your Life Vision.</p>
        </div>

        <div className="services02 service03">
          <Card>
            <img src="./media/slider/smartMirror.webp" />
            <h2>Smart Mirrors</h2>

          </Card>
          <Card>
            <img src="./media/slider/curtain.webp" />
            <h2>Curtain Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/access.webp" />
            <h2>Access Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/irrigation.webp" />
            <h2>Irrigation System</h2>
          </Card>
          <Card>
            <img src="./media/slider/tvControl.webp" />
            <h2>TV Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/mechanism.webp" />
            <h2>TV Mechanism</h2>
          </Card>
          <Card>
            <img src="./media/slider/turnstile.webp" />
            <h2>Turnstile Gate</h2>
          </Card>
          <Card>
            <img src="./media/slider/smartDesk.webp" />
            <h2>Smart Desk</h2>
          </Card>
          <Card>
            <img src="./media/slider/lightning.webp" />
            <h2>Lightning Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/ac.webp" />
            <h2>AC Control</h2>
          </Card>
        </div>

    </div>
  );
};

export default Automation;