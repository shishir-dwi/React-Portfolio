import React, { useRef, useState, useEffect } from 'react';
import './Matrix.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MatrixContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
`;

const Matrix = ({ interactive = true }) => {
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [columns, setColumns] = useState([]);

    // Generate columns with random characters
    useEffect(() => {
        // Number of columns should be responsive to element width
        const columnCount = 25;
        const newColumns = Array.from({ length: columnCount }, (_, i) => ({
            id: i,
            delay: Math.random() * -4,
        }));
        setColumns(newColumns);
    }, []);

    // Add interactive features
    const handleMouseMove = (e) => {
        if (!interactive || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Adjust animation speed based on mouse position
        const newSpeed = 1 + y * 1.5; // Faster toward bottom
        setSpeed(newSpeed);
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setSpeed(1);
        setIsHovering(false);
    };

    return (
        <MatrixContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`matrix-container ${isHovering ? 'hovering' : ''}`}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ '--speed-factor': speed }}
            >

                <div className="matrix-pattern">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className="matrix-column"
                            style={{
                                animationDelay: `${column.delay}s`,
                                left: `${(column.id / columns.length) * 100}%`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </MatrixContainer>
    );
};

export default Matrix;