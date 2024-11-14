import React from 'react';

export default function InputBox({ headerName, description, type, placeholder }) {
    return (
        <div className="input-box">
            <label className="input-box-label">{headerName}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="input-box-field"
                required
            />
            <small className="input-box-description">{description}</small>
        </div>
    );
}
