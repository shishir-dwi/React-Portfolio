import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import AIBrainVisualizer from '../components/AIBrainVisualizer';
const Matrix = lazy(() => import('../components/Matrix'));

const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2.5rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
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

const RightPanel = styled(motion.div)`
  display: grid;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  background: var(--surface);
  border: 1px solid var(--surface-light);
  border-radius: var(--radius-lg);
  padding: 1rem 1rem;
`;

const BadgeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: .25rem .5rem;
  border-radius: var(--radius-full);
  background: var(--surface-light);
  color: var(--text);
  font-size: .85rem;
`;

const TypedText = ({ texts, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const prefersReducedMotion = useMemo(() =>
        typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    , []);

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(texts[0] || '');
            return;
        }
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
    }, [index, isDeleting, textIndex, texts, speed, prefersReducedMotion]);

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
                            Machine Learning / AI Engineer and Researcher with expertise in developing LLM-powered Agentic applications,
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
                            <a href="https://www.linkedin.com/in/shishir-dwi" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </SocialLinks>
                    </HeroContent>
                    <RightPanel>
                        <Card
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <h3>Highlights</h3>
                          <ul style={{ margin: '0.5rem 0 0 1rem' }}>
                            <li>ML Applications, GenAI apps, Agents, RAG, FineTuning</li>
                            <li>Production ML pipelines</li>
                            <li>Observation, MLOps/LLMOps</li>
                          </ul>
                        </Card>
                        <Card
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          <h3>Core Stack</h3>
                          <BadgeGrid>
                            <Badge>Python</Badge>
                            <Badge>FastAPI</Badge>
                            <Badge>HuggingFace</Badge>
                            <Badge>LangChain</Badge>
                            <Badge>Node</Badge>
                            <Badge>React</Badge>
                            <Badge>OpenAI</Badge>
                            <Badge>Postgres</Badge>
                            <Badge>Mongo</Badge>
                          </BadgeGrid>
                        </Card>
                    </RightPanel>
                </HeroContainer>
                <SectionBackground>
                    <Suspense fallback={null}>
                        <Matrix />
                    </Suspense>
                </SectionBackground>
            </div>
        </HeroSection>
    );
};

export default Home;