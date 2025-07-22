import React from "react";
import "../style.css";
import Card from "../components/Card";

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
            <img src="./media/slider/smartMirror.webp" alt="Smart Mirrors" />
            <h2>Smart Mirrors</h2>

          </Card>
          <Card>
            <img src="./media/slider/curtain.webp" alt="Curtain Control" />
            <h2>Curtain Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/access.webp" alt="Access Control" />
            <h2>Access Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/irrigation.webp" alt="Irrigation System" />
            <h2>Irrigation System</h2>
          </Card>
          <Card>
            <img src="./media/slider/tvControl.webp" alt="TV Control" />
            <h2>TV Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/mechanism.webp" alt="TV Mechanism" />
            <h2>TV Mechanism</h2>
          </Card>
          <Card>
            <img src="./media/slider/turnstile.webp" alt="Turnstile Gate" />
            <h2>Turnstile Gate</h2>
          </Card>
          <Card>
            <img src="./media/slider/smartDesk.webp" alt="Smart Desk" />
            <h2>Smart Desk</h2>
          </Card>
          <Card>
            <img src="./media/slider/lightning.webp" alt="Lightning Control" />
            <h2>Lightning Control</h2>
          </Card>
          <Card>
            <img src="./media/slider/ac.webp" alt="AC Control" />
            <h2>AC Control</h2>
          </Card>
        </div>

    </div>
  );
};

export default Automation;