import React, { useRef, useState } from 'react';
import './MatrixBackground.css';

const MatrixBackground = () => {
    const containerRef = useRef(null);
    // Generate columns dynamically
    const columnCount = 40; // More columns for a background effect
    const columns = Array.from({ length: columnCount }, (_, i) => i);

    return (
        <div className="matrix-bg-container" ref={containerRef}>
            <div className="matrix-bg-pattern">
                {columns.map((index) => (
                    <div key={index} className="matrix-bg-column"></div>
                ))}
            </div>
        </div>
    );
};

export default MatrixBackground;