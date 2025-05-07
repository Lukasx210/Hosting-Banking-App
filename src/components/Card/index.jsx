// components/ui/Card.jsx
import React from "react";

const Card = ({children, className = ""}) => {
    return (
        <div className={`rounded-2xl shadow-lg bg-white p-6 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
