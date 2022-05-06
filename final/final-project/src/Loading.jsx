import React from 'react';
import loading from './logo192.png';

export default function Loading() {

    return (
        <div className="loading-container">
            <img src={loading} alt="" className="spinner" /><label> </label>
            <div className="loading">Loading</div>
        </div>
    )
}