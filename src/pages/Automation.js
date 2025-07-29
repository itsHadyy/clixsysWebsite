import React, { useState } from "react";
import "../style.css";
import Card from "../components/Card";

const serviceData = [
  {
    img: "/media/slider/smartMirror.webp",
    title: "Smart Mirrors",
    desc: "Our Smart Mirrors integrate IoT technology and custom UI overlays, providing real-time data such as weather, calendar, and notifications. Built with secure, low-power hardware and seamless Wi-Fi/Bluetooth connectivity, they are fully customizable for residential and commercial environments."
  },
  {
    img: "/media/slider/curtain.webp",
    title: "Curtain Control",
    desc: "Automated curtain systems using precision stepper motors and wireless controllers. Our solution supports scheduling, remote app control, and voice assistant integration, ensuring energy efficiency and privacy with robust fail-safe mechanisms."
  },
  {
    img: "/media/slider/access.webp",
    title: "Access Control",
    desc: "Enterprise-grade access control with RFID, biometric, and mobile authentication. Our platform features encrypted communication, real-time monitoring, and seamless integration with building management systems for maximum security and scalability."
  },
  {
    img: "/media/slider/irrigation.webp",
    title: "Irrigation System",
    desc: "Smart irrigation leveraging soil moisture sensors, weather APIs, and adaptive scheduling algorithms. Our system optimizes water usage, supports remote management, and provides analytics for sustainable landscape maintenance."
  },
  {
    img: "/media/slider/tvControl.webp",
    title: "TV Control",
    desc: "Centralized TV control using IR/RF blasters and app-based interfaces. Our solution enables scene automation, multi-device synchronization, and integration with home automation platforms for a seamless AV experience."
  },
  {
    img: "/media/slider/mechanism.webp",
    title: "TV Mechanism",
    desc: "Motorized TV lifts and mounts engineered for silent operation and precise positioning. Our mechanisms support custom installation, remote control, and safety sensors for both residential and commercial projects."
  },
  {
    img: "/media/slider/turnstile.webp",
    title: "Turnstile Gate",
    desc: "Automated turnstile gates with advanced access control integration. Features include anti-tailgating sensors, emergency override, and real-time entry logging, suitable for high-traffic and secure environments."
  },
  {
    img: "/media/slider/smartDesk.webp",
    title: "Smart Desk",
    desc: "Height-adjustable smart desks with memory presets, occupancy sensors, and health analytics. Our desks connect to mobile apps for personalized ergonomics and usage tracking, enhancing workplace productivity."
  },
  {
    img: "/media/slider/lighting.webp",
    title: "Lighting Control",
    desc: "Intelligent lighting systems with dimming, color tuning, and occupancy-based automation. Our platform supports DALI, Zigbee, and Wi-Fi protocols, offering energy monitoring and remote management."
  },
  {
    img: "/media/slider/ac.webp",
    title: "AC Control",
    desc: "Smart AC control with real-time temperature/humidity sensors, AI-driven scheduling, and remote diagnostics. Our solution integrates with major HVAC brands and supports energy-saving automation."
  }
];

const Automation = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="container">
      <div className="projects-page">
        <h1>Automation Systems</h1>
        <p>An Experience That Changes Your Life Vision.</p>
      </div>
      <div className="services02 service03">
        {serviceData.map((service, idx) => (
          <Card
            key={service.title}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{ position: 'relative', overflow: 'visible' }}
          >
            <div className={`service-fade${hovered === idx ? ' hide' : ''}`}>
              <img src={service.img} alt={service.title} loading="lazy" />
              <h2>{service.title}</h2>
            </div>
            <div className={`service-desc-card${hovered === idx ? ' show' : ''}`}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Automation;