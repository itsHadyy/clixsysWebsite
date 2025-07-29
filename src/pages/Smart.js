import React from "react";
import "../style.css";
import Features24 from "../components/features24";
import Features25 from "../components/features25";
import Slideshow from "../components/Slideshow";

const Smart = () => {
  return (
    <div>
      <div className="container projFeatures">
        <div className="projects-page">
          <h1>
            Smart Products
          </h1>
          <p>An Experience That Changes Your Life Vision.</p>
        </div>

        <Features24
          feature1Description={<span className="home-text118">A revolutionary, free-standing modular system that defines spaces with intelligence and flexibility. Adaptable and sleek, it's the perfect blend of form and function for a smarter environment.</span>}
          feature1Title={<span className="home-text119">Smart Points</span>}
          feature1ImgSrc={"./media/img06.webp"}
          feature2Description={<span className="home-text120">Stop into the future with a groundbreaking way to enter your office. Featuring cutting-edge interactive technology seamlessly integrated into transparent surface, it's the ultimate blend of innovation and sophistication for your workspace.</span>}
          feature2Title={<span className="home-text123">aXess</span>}
          feature2ImgSrc={"./media/img01.webp"}
          feature3Description={<span className="home-text122">Redefine elegance with custom-built, interactive mirrors and walls. A futuristic masterpiece for your home or office, designed to seamlessly control every inch of your space while adding a touch of innovation and sophistication to your descor.</span>}
          feature3Title={<span className="home-text121">ReflectV</span>}
          feature3ImgSrc={"./media/img05.webp"}
        ></Features24>
      </div>

      <Slideshow direction="right" />

      <div className="container projFeatures">

        <Features25
          feature3Description={<span className="home-text118">Revolutionize the way you host your visitors with cutting-edge interactive technology. Browse the cafeteria menu and place your order effortlessly, all from the table. A smart and stylish way to impress your visitors while redefining convenience.</span>}
          feature3Title={<span className="home-text119">DigiServe</span>}
          feature3ImgSrc={"./media/img03.webp"}
          feature2Description={<span className="home-text120">Transform your meetings into unforgettable experiences! With cutting-edge technology at your fingertips, effortlessely control lighing, curtains, presentations, and so much more. A true blend of sophistication and innovation to impress every visitor.</span>}
          feature2Title={<span className="home-text123">DesQ</span>}
          feature2ImgSrc={"./media/img02.webp"}
          feature1Description={<span className="home-text122">Redefine your space with smart motorized solutions for TVs and projectors. Effortlessely conceal or reveal your devices with precision movements, unlocking creative ways to make the most of your space.</span>}
          feature1Title={<span className="home-text121">Elev8</span>}
          feature1ImgSrc={"./media/img04.webp"}
        ></Features25>

        <div className="services02">
          {/* <Card>
          <img src="./media/img06.webp" />
          <h2>Smart Points</h2>
          <p>A revolutionary, free-standing modular system that defines spaces with intelligence and flexibility. Adaptable and sleek, it's the perfect blend of form and function for a smarter environment.</p> <br />
        </Card> */}
          {/* <Card>
          <img src="./media/img01.webp" />
          <h2>aXess</h2>
          <p>Stop into the future with a groundbreaking way to enter your office. Featuring cutting-edge interactive technology seamlessly integrated into transparent surface, it's the ultimate blend of innovation and sophistication for your workspace.</p> <br />
        </Card> */}
          {/* <Card>
          <img src="./media/img05.webp" />
          <h2>ReflectV</h2>
          <p>Redefine elegance with custom-built, interactive mirrors and walls. A futuristic masterpiece for your home or office, designed to seamlessly control every inch of your space while adding a touch of innovation and sophistication to your descor.</p>
        </Card> */}
          {/* <Card>
          <img src="./media/img04.webp" />
          <h2>Elev8</h2>
          <p>Redefine your space with smart motorized solutions for TVs and projectors. Effortlessely conceal or reveal your devices with precision movements, unlocking creative ways to make the most of your space.</p> <br />
        </Card> */}
          {/* <Card>
          <img src="./media/img02.webp" />
          <h2>DesQ</h2>
          <p>Transform your meetings into unforgettable experiences! With cutting-edge technology at your fingertips, effortlessely control lighing, curtains, presentations, and so much more. A true blend of sophistication and innovation to impress every visitor.</p>
        </Card> */}
          {/* <Card>
          <img src="./media/img03.webp" />
          <h2>DigiServe</h2>
          <p>Revolutionize the way you host your visitors with cutting-edge interactive technology. Browse the cafeteria menu and place your order effortlessly, all from the table. A smart and stylish way to impress your visitors while redefining convenience.</p>
        </Card> */}
        </div>
      </div >
    </div>
  );
};

export default Smart;