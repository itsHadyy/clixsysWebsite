import React from 'react';
import '../style.css';

const Card = ({ children }) => {
    return (
        <div className="cardContainer01">
            <div className="cardContainer02">
                <div className="cardContainer">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;