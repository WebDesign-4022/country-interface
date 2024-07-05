import React from 'react';
import './Button.css';

const Button = ({label, hidden, onClick}) => {
    return (
        <button className="button" onClick={onClick} hidden={hidden}>
            {label}
        </button>
    );
};

export default Button;
