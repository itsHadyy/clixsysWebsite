import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'

import './features25.css'

const Features25 = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className="featuresContainer" id="featuresContainer02">

      <div className="featuresTabsMenu">
        <div
          onClick={() => setActiveTab(0)}
          className="features24-tab-horizontal1"
        >
          <div className="features24-divider-container1">
            {activeTab === 0 && <div className="featuresDevider"></div>}
          </div>
          <div className="features24-content1">
            <h2 className="thq-heading-2">
              {props.feature1Title ?? (
                <Fragment>
                  <span className="features24-text4">Automation Systems</span>
                </Fragment>
              )}
            </h2>
            <span className="thq-body-small">
              {props.feature1Description ?? (
                <Fragment>
                  <span className="features24-text5">
                    Discover our cutting-edge automation systems that make
                    your life easier and more efficient.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div
          onClick={() => setActiveTab(1)}
          className="features24-tab-horizontal2"
        >
          <div className="features24-divider-container1">
            {activeTab === 1 && <div className="featuresDevider"></div>}
          </div>
          <div className="features24-content2">
            <h2 className="thq-heading-2">
              {props.feature2Title ?? (
                <Fragment>
                  <span className="features24-text6">
                    Product Customization Features
                  </span>
                </Fragment>
              )}
            </h2>
            <span className="thq-body-small">
              {props.feature2Description ?? (
                <Fragment>
                  <span className="features24-text3">
                    Customize your products with different glass colors,
                    lengths, widths, and frame materials in real time.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
        <div
          onClick={() => setActiveTab(2)}
          className="features24-tab-horizontal3"
        >
          <div className="features24-divider-container1">
            {activeTab === 2 && <div className="featuresDevider"></div>}
          </div>
          <div className="features24-content3">
            <h2 className="thq-heading-2">
              {props.feature3Title ?? (
                <Fragment>
                  <span className="features24-text2">Interactive Tools</span>
                </Fragment>
              )}
            </h2>
            <span className="thq-body-small">
              {props.feature3Description ?? (
                <Fragment>
                  <span className="features24-text1">
                    Explore our range of interactive tools that enhance your
                    smart home experience.
                  </span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="featuresImageContainer">
        {activeTab === 0 && (
          <img
            alt={props.feature1ImgAlt}
            src={props.feature1ImgSrc}
            className="features24-image1 thq-img-ratio-16-9"
            loading="lazy"
          />
        )}
        {activeTab === 1 && (
          <img
            alt={props.feature2ImgAlt}
            src={props.feature2ImgSrc}
            className="features24-image2 thq-img-ratio-16-9"
            loading="lazy"
          />
        )}
        {activeTab === 2 && (
          <img
            alt={props.feature3ImgAlt}
            src={props.feature3ImgSrc}
            className="features24-image3 thq-img-ratio-16-9"
            loading="lazy"
          />
        )}
      </div>
    </div>
  )
}

Features25.defaultProps = {
  feature1ImgAlt: 'Automation Systems Image',
  feature3Description: undefined,
  feature3Title: undefined,
  feature3ImgSrc:
    '/media/img05.jpeg',
  feature1ImgSrc:
    '/media/img06.jpeg',
  feature2Description: undefined,
  feature1Title: undefined,
  feature3ImgAlt: 'Interactive Tools Image',
  feature1Description: undefined,
  feature2ImgSrc:
    '/media/img04.jpeg',
  feature2ImgAlt: 'Product Customization Image',
  feature2Title: undefined,
}

Features25.propTypes = {
  feature3Description: PropTypes.element,
  feature1ImgAlt: PropTypes.string,
  feature1Description: PropTypes.element,
  feature3ImgAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  feature1Title: PropTypes.element,
  feature1ImgSrc: PropTypes.string,
  feature3ImgSrc: PropTypes.string,
  feature2Description: PropTypes.element,
  feature3Title: PropTypes.element,
  feature2ImgAlt: PropTypes.string,
  feature2ImgSrc: PropTypes.string,
}

export default Features25
