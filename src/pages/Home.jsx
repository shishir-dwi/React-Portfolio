import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import AIBrainVisualizer from '../components/AIBrainVisualizer';
import Matrix from '../components/Matrix';

const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  @media screen and (max-width: 768px) {
    order: 2;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  span {
    color: var(--primary);
    display: inline-block;
  }

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 1.5rem;
    color: var(--text-muted);
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary);
      transform: translateY(-3px);
    }
  }
`;

const HeroImage = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
    order: 1;
  }
  
  @media screen and (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const TypedText = ({ texts, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        let timeout;

        const currentText = texts[textIndex];

        if (!isDeleting) {
            if (index <= currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.substring(0, index));
                    setIndex(index + 1);
                }, speed);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 1500);
            }
        } else {
            if (index > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.substring(0, index - 1));
                    setIndex(index - 1);
                }, speed / 2);
            } else {
                setIsDeleting(false);
                setTextIndex((textIndex + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting, textIndex, texts, speed]);

    return <span>{displayText}</span>;
};

const Home = () => {
    const roles = [
        "AI Engineer",
        "ML Practitioner",
        "NLP Specialist",
        "LLM Expert"
    ];

    return (
        <HeroSection id="home">
            <div className="container">
                <HeroContainer>
                    <HeroContent>
                        <HeroTitle
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Hi, I'm <span>Shishir Dwivedi</span>
                            <br />
                            <TypedText texts={roles} />
                        </HeroTitle>
                        <HeroSubtitle
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Machine Learning and AI practitioner with expertise in developing LLM-powered applications,
                            data-driven systems, and scalable ML pipelines.
                        </HeroSubtitle>
                        <ButtonGroup
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/projects" className="btn">View Projects</Link>
                            <a
                                href="https://drive.google.com/file/d/19nwQ3-kmvytpLgxFuGVuFJdDFJDY0sG2/view"
                                className="btn btn-outline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download CV
                            </a>
                        </ButtonGroup>
                        <SocialLinks
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <a href="https://github.com/shishir-dwi" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/shishir-spiral" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </SocialLinks>
                    </HeroContent>
                    <HeroImage>
                        {/* <AIBrainVisualizer /> */}
                        <Matrix />
                        {/* <img src="/src/assets/hero-image.png" alt="Hero" /> */}
                    </HeroImage>
                </HeroContainer>
            </div>
        </HeroSection>
    );
};

export default Home;