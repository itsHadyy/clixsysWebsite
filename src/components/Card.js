import React from 'react';
import '../style.css';

const Card = ({ children, ...props }) => {
    return (
        <div className="cardContainer01" {...props}>
            <div className="cardContainer02">
                <div className="cardContainer">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;