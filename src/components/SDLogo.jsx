// filepath: d:\PROJECTS\my-react-vite-app\src\components\SDLogo.jsx
import React from 'react';

const SDLogo = ({ color = "#6366f1", size = 32 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#sdGradient)" />
            <text x="16" y="22" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                SD
            </text>
        </svg>
    );
};

export default SDLogo;