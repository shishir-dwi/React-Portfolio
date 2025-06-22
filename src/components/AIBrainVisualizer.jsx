import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const VisualizerContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0) 70%);
  border-radius: 20px;
  overflow: hidden;
`;

const BrainOutline = styled(motion.svg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  fill: none;
  stroke: var(--primary);
  stroke-width: 1px;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
`;

const BrainHemisphere = styled(motion.path)`
  fill: rgba(99, 102, 241, 0.1);
  stroke: var(--primary);
  stroke-width: 1;
  filter: blur(0.5px);
`;

const BrainConnection = styled(motion.path)`
  fill: none;
  stroke: var(--primary-light);
  stroke-width: 1;
  opacity: 0.6;
`;

const NeuralNode = styled(motion.circle)`
  fill: var(--primary);
  opacity: 0.8;
`;

const DataPoint = styled(motion.circle)`
  fill: white;
  r: 2;
  opacity: 0.8;
`;

const InteractionPrompt = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
  background-color: rgba(30, 41, 59, 0.7);
  padding: 8px 16px;
  border-radius: 20px;
  opacity: 0.8;
`;

// SVG paths for brain hemispheres
const leftHemisphere = "M120,70 C90,80 70,100 60,130 C50,160 50,190 60,220 C70,250 90,270 120,280 C115,260 115,240 115,220 C115,200 115,180 120,160 C125,140 135,120 150,100 C140,90 130,80 120,70Z";
const rightHemisphere = "M180,70 C210,80 230,100 240,130 C250,160 250,190 240,220 C230,250 210,270 180,280 C185,260 185,240 185,220 C185,200 185,180 180,160 C175,140 165,120 150,100 C160,90 170,80 180,70Z";

// SVG paths for brain connections
const connections = [
    "M120,120 C135,130 145,140 150,150",
    "M180,120 C165,130 155,140 150,150",
    "M120,170 C135,165 145,160 150,160",
    "M180,170 C165,165 155,160 150,160",
    "M120,220 C135,215 145,210 150,200",
    "M180,220 C165,215 155,210 150,200",
    "M120,250 C135,240 145,230 150,220",
    "M180,250 C165,240 155,230 150,220"
];

const AIBrainVisualizer = ({ interactive = true }) => {
    const containerRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [dataPoints, setDataPoints] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [pulseIntensity, setPulseIntensity] = useState(1);

    // Generate nodes positioned along the brain's neural pathways
    useEffect(() => {
        const nodePositions = [
            { x: 90, y: 100 },
            { x: 210, y: 100 },
            { x: 80, y: 140 },
            { x: 220, y: 140 },
            { x: 70, y: 180 },
            { x: 230, y: 180 },
            { x: 80, y: 220 },
            { x: 220, y: 220 },
            { x: 90, y: 260 },
            { x: 210, y: 260 },
            { x: 120, y: 120 },
            { x: 180, y: 120 },
            { x: 120, y: 170 },
            { x: 180, y: 170 },
            { x: 120, y: 220 },
            { x: 180, y: 220 },
            { x: 150, y: 150 },
            { x: 150, y: 200 },
            { x: 150, y: 250 }
        ];

        const newNodes = nodePositions.map((pos, index) => ({
            id: index,
            x: pos.x,
            y: pos.y,
            radius: Math.random() * 3 + 2,
            pulseDelay: index * 0.1
        }));

        setNodes(newNodes);

        // Create data points that travel along connections
        const createDataPoints = () => {
            const points = [];
            connections.forEach((_, connIndex) => {
                // Add 2-3 data points per connection
                const pointCount = Math.floor(Math.random() * 2) + 2;
                for (let i = 0; i < pointCount; i++) {
                    points.push({
                        id: `${connIndex}-${i}`,
                        connectionIndex: connIndex,
                        progress: Math.random(),
                        speed: Math.random() * 0.01 + 0.005
                    });
                }
            });
            return points;
        };

        setDataPoints(createDataPoints());

        // Animation loop for data points
        let animationFrameId;

        const updateDataPoints = () => {
            setDataPoints(prevPoints => {
                return prevPoints.map(point => {
                    let progress = point.progress + point.speed * (isHovering ? 2 : 1);

                    if (progress > 1) {
                        progress = 0;
                    }

                    return {
                        ...point,
                        progress
                    };
                });
            });

            animationFrameId = requestAnimationFrame(updateDataPoints);
        };

        animationFrameId = requestAnimationFrame(updateDataPoints);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovering]);

    // Handle mouse interaction
    const handleMouseMove = (e) => {
        if (!containerRef.current || !interactive) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Adjust pulse intensity based on mouse position
        const distanceFromCenter = Math.sqrt(
            Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2)
        );

        setPulseIntensity(1 + (1 - distanceFromCenter) * 1.5);
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setPulseIntensity(1);
        setIsHovering(false);
    };

    // Calculate point position along SVG path
    const getPointAlongPath = (pathIndex, progress) => {
        const connection = connections[pathIndex];
        if (!connection) return { x: 0, y: 0 };

        // This is a simplified approach - for production we'd use a proper SVG path interpolation
        // For now, we'll do a simple linear interpolation of the control points
        const points = connection.split(' ')
            .filter(p => p.includes(','))
            .map(p => {
                const [x, y] = p.replace('C', '').replace('M', '').split(',');
                return { x: parseFloat(x), y: parseFloat(y) };
            });

        if (points.length < 2) return { x: 0, y: 0 };

        // For cubic bezier paths (which we have), we need to properly interpolate
        // This is a very simplified version that just interpolates start and end points
        const startPoint = points[0];
        const endPoint = points[points.length - 1];

        return {
            x: startPoint.x + (endPoint.x - startPoint.x) * progress,
            y: startPoint.y + (endPoint.y - startPoint.y) * progress
        };
    };

    return (
        <VisualizerContainer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <BrainOutline
                viewBox="0 0 300 350"
                animate={isHovering ? {
                    scale: [1, 1.03, 1],
                    filter: [
                        'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))',
                        'drop-shadow(0 0 12px rgba(99, 102, 241, 0.8))',
                        'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))'
                    ]
                } : {
                    scale: 1,
                    filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))'
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: isHovering ? Infinity : 0,
                    repeatType: "reverse"
                }}
            >
                {/* Brain structure */}
                <BrainHemisphere
                    d={leftHemisphere}
                    animate={{
                        opacity: [0.6, 0.8, 0.6],
                        fillOpacity: [0.1, 0.15 * pulseIntensity, 0.1]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <BrainHemisphere
                    d={rightHemisphere}
                    animate={{
                        opacity: [0.6, 0.8, 0.6],
                        fillOpacity: [0.1, 0.15 * pulseIntensity, 0.1]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5
                    }}
                />

                {/* Neural connections between brain regions */}
                {connections.map((d, index) => (
                    <BrainConnection
                        key={index}
                        d={d}
                        strokeDasharray="4 2"
                        animate={{
                            opacity: [0.4, 0.7 * pulseIntensity, 0.4],
                            strokeWidth: [0.5, 1 * pulseIntensity, 0.5]
                        }}
                        transition={{
                            duration: 2 + index * 0.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}

                {/* Neural nodes/synapses */}
                {nodes.map((node) => (
                    <NeuralNode
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.radius}
                        animate={{
                            r: [node.radius, node.radius * 1.5 * pulseIntensity, node.radius],
                            opacity: [0.6, 0.9 * pulseIntensity, 0.6],
                            filter: [
                                'blur(0.5px)',
                                `blur(${1 * pulseIntensity}px)`,
                                'blur(0.5px)'
                            ]
                        }}
                        transition={{
                            duration: 3,
                            delay: node.pulseDelay,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}

                {/* Data points moving through neural pathways */}
                {dataPoints.map((point) => {
                    const position = getPointAlongPath(point.connectionIndex, point.progress);

                    return (
                        <DataPoint
                            key={point.id}
                            cx={position.x}
                            cy={position.y}
                            animate={{
                                opacity: [0.6, 0.9, 0.6],
                                r: [1.5, 2.5 * pulseIntensity, 1.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    );
                })}

                {/* Central corpus callosum connection (brain middle part) */}
                <motion.path
                    d="M150,100 C150,120 150,140 150,160 C150,180 150,200 150,220 C150,240 150,260 150,280"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="none"
                    animate={{
                        opacity: [0.4, 0.8 * pulseIntensity, 0.4],
                        strokeWidth: [1.5, 3 * pulseIntensity, 1.5]
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                {/* Brain stem */}
                <motion.path
                    d="M135,280 C140,290 145,300 150,310 C155,300 160,290 165,280"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="none"
                    animate={{
                        opacity: [0.4, 0.8 * pulseIntensity, 0.4],
                        strokeWidth: [1.5, 3 * pulseIntensity, 1.5]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </BrainOutline>

            <InteractionPrompt
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 0 : 0.8 }}
                transition={{ duration: 0.5 }}
            >
                Move your cursor over the brain to interact
            </InteractionPrompt>
        </VisualizerContainer>
    );
};

export default AIBrainVisualizer;