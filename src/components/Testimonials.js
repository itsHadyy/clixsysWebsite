import React from "react";

const Testimonials = (props) => {
    return (
        <div id="testimonials">
            <h1>Testimonials</h1>
            <p>Here are some testimonials from our customers</p>
            <div className="testimonialsContainer">
                <div className="testimonial02">
                    <div className="testimonial">
                        <div className="testimonialHeader">
                            <img
                                alt={props.author1Alt}
                                src={props.author1Src}
                                loading="lazy"
                            />
                            <div className="testimonialData">
                                <h3>John Doe</h3>
                                <span>CEO, ABC Inc.</span>
                            </div>
                        </div>
                        <p>Clixsys automation systems have truly transformed our workplace. The efficiency and convenience they provide are unmatched.</p>
                    </div>
                </div>

                <div className="testimonial02">
                    <div className="testimonial">
                        <div className="testimonialHeader">
                            <img
                                alt={props.author2Alt}
                                src={props.author2Src}
                                loading="lazy"
                            />
                            <div className="testimonialData">
                                <h3>Jane Smith</h3>
                                <span>COO, XYZ Corp.</span>
                            </div>
                        </div>
                        <p>We are extremely satisfied with the smart products offered by Clixsys. They have enhanced our daily operations significantly.</p>
                    </div>
                </div>

                <div className="testimonial02">
                    <div className="testimonial">
                        <div className="testimonialHeader">
                            <img
                                alt={props.author3Alt}
                                src={props.author3Src}
                                loading="lazy"
                            />
                            <div className="testimonialData">
                                <h3>Sarah Brown</h3>
                                <span>CTO, LMN Co.</span>
                            </div>
                        </div>
                        <p>The customization features on Clixsys' products allowed us to tailor solutions to fit our exact needs. Highly recommended!</p>
                    </div>
                </div>

                <div className="testimonial02">
                    <div className="testimonial">
                        <div className="testimonialHeader">
                            <img
                                alt={props.author4Alt}
                                src={props.author4Src}
                                loading="lazy"
                            />
                            <div className="testimonialData">
                                <h3>David Johnson</h3>
                                <span>CFO, PQR Ltd.</span>
                            </div>
                        </div>
                        <p>Partnering with Clixsys for our automation needs was a game-changer. Their expertise and support have been invaluable.</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
Testimonials.defaultProps = {
    author2Position: undefined,
    author1Position: undefined,
    author3Alt: 'Image of David Johnson',
    author1Name: undefined,
    author1Src:
        'https://images.unsplash.com/photo-1702907155366-31d6c26a3938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczNzMxNjc3OXw&ixlib=rb-4.0.3&q=80&w=1080',
    author3Name: undefined,
    review2: undefined,
    author2Name: undefined,
    author4Position: undefined,
    author4Name: undefined,
    author4Src:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczNzMxNjc4MHw&ixlib=rb-4.0.3&q=80&w=1080',
    author1Alt: 'Image of John Doe',
    author2Src:
        'https://images.unsplash.com/photo-1501043920236-460e5bdfec3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczNzMxNjc4MHw&ixlib=rb-4.0.3&q=80&w=1080',
    author3Src:
        'https://images.unsplash.com/photo-1470406852800-b97e5d92e2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTczNzMxNjc4MHw&ixlib=rb-4.0.3&q=80&w=1080',
    author2Alt: 'Image of Jane Smith',
    author4Alt: 'Image of Sarah Brown',
    content1: undefined,
    author3Position: undefined,
    review1: undefined,
    heading1: undefined,
    review3: undefined,
    review4: undefined,
}
export default Testimonials;