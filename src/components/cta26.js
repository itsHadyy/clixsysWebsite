import React, { Fragment } from 'react';

import PropTypes from 'prop-types';


const CTA26 = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta26-accent2-bg">
          <div className="cta26-accent1-bg">
            <div className="cta26-container2">
              <div className="cta26-content">
                <span className="thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <h4>
                        Ready to Automate Your Home or Business?
                      </h4>
                    </Fragment>
                  )}
                </span>
                <p className="thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="cta26-text5">
                        Explore our range of automation systems and smart
                        products to enhance your space.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
              <div className="cta26-actions">
                {props.action1 ? (
                <button
                  type="button"
                  className="thq-button-filled cta26-button"
                >
                    <span>{props.action1}</span>
                  </button>
                ) : (
                  <a
                    href="/contact"
                    className="thq-button-filled cta26-button"
                    style={{ minWidth: 48, minHeight: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Get Started
                  </a>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA26.defaultProps = {
  heading1: undefined,
  content1: undefined,
  action1: undefined,
}

CTA26.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action1: PropTypes.element,
}

export default CTA26
