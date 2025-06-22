import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBrain, FaServer, FaTools, FaLightbulb, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 1rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;

  span {
    color: var(--primary);
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  color: var(--text-muted);
`;

const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BioSection = styled.div`
  margin-bottom: 4rem;
`;

const BioParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
`;

const SkillsSection = styled.div`
  margin-bottom: 4rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    width: 60%;
    height: 3px;
    background-color: var(--primary);
    bottom: -5px;
    left: 0;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background-color: var(--surface);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  font-size: 1.5rem;
`;

const SkillTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text);
`;

const SkillsList = styled.ul`
  list-style-position: inside;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  
  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;
    list-style-type: none;
    
    &::before {
      content: '•';
      color: var(--primary);
      position: absolute;
      left: 0;
    }
  }
`;

const PassionSection = styled.div`
  margin-bottom: 2rem;
  background-color: var(--surface);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PassionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: var(--primary);
  }
`;

const PassionText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
`;

const BioContainer = styled(motion.div)`
  background-color: var(--surface);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BioHeader = styled.div`
  padding: 1.5rem;
  border-bottom: ${props => props.isOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const BioTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  span {
    color: var(--primary);
  }
`;

const BioContent = styled(motion.div)`
  padding: ${props => props.isOpen ? '1.5rem' : '0 1.5rem'};
  overflow: hidden;
`;

const GlowingText = styled.span`
  color: var(--primary);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 10px;
    background: var(--primary);
    bottom: -5px;
    left: 0;
    filter: blur(10px);
    opacity: 0.5;
    z-index: -1;
  }
`;

const HighlightedList = styled(motion.ul)`
  list-style: none;
  margin: 2rem 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HighlightItem = styled(motion.li)`
  background: rgba(99, 102, 241, 0.1);
  border-radius: 2rem;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  color: var(--primary-light);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(99, 102, 241, 0.2);
    transform: translateY(-3px);
  }
`;

const ExperienceTimeline = styled(motion.div)`
  position: relative;
  margin: 2rem 0;
  padding-left: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--primary), rgba(99, 102, 241, 0.1));
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--primary);
    box-shadow: 0 0 10px 2px var(--primary);
  }
`;

const TimelineTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 0.25rem;
`;

const TimelineSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--primary-light);
  margin-bottom: 0.5rem;
`;

const TimelineText = styled.p`
  font-size: 0.95rem;
  color: var(--text-muted);
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'rgba(99, 102, 241, 0.1)'};
  color: ${props => props.active ? 'var(--text)' : 'var(--primary-light)'};
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'rgba(99, 102, 241, 0.2)'};
  }
`;

const About = () => {
    const [bioOpen, setBioOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('background');

    const tabContent = {
        background: (
            <BioParagraph
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                I'm <GlowingText>Shishir Dwivedi</GlowingText>, an AI Engineer with hands-on experience building scalable, real-time ML solutions and LLM-powered applications.
                With over 3 years of experience in Machine Learning and AI, and 1 year in the tech industry, I specialize in
                Natural Language Processing, Generative AI, and end-to-end ML system design.
            </BioParagraph>
        ),
        current: (
            <>
                <BioParagraph
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Currently, I'm working at <GlowingText>Avalon EdTech</GlowingText>, where I develop intelligent education solutions —
                    from LLM-based content generation tools to adaptive learning chatbots using ReAct agents and Langchain. My focus lies in
                    designing impactful AI systems that improve both user engagement and team productivity.
                </BioParagraph>

                <HighlightedList
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <HighlightItem whileHover={{ scale: 1.05 }}>LLM-based Test Generator</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>Content Summarization</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>ReAct Agents</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>Langsmith</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>LLM Fine-tuning</HighlightItem>
                </HighlightedList>
            </>
        ),
        journey: (
            <ExperienceTimeline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <TimelineItem
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <TimelineTitle>AI Engineer</TimelineTitle>
                    <TimelineSubtitle>Avalon EdTech - June 2024 to Present</TimelineSubtitle>
                    <TimelineText>Building LLM-based educational tools and personalized learning systems</TimelineText>
                </TimelineItem>

                <TimelineItem
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <TimelineTitle>Software Developer Trainee</TimelineTitle>
                    <TimelineSubtitle>Avis E Solutions - March 2024 to June 2024</TimelineSubtitle>
                    <TimelineText>Developed multilingual chatbot systems with WebSockets</TimelineText>
                </TimelineItem>

                <TimelineItem
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <TimelineTitle>Machine Learning Intern</TimelineTitle>
                    <TimelineSubtitle>Times Internet Ltd. - August 2023 to November 2023</TimelineSubtitle>
                    <TimelineText>Led a team building intent classification systems for ad personalization</TimelineText>
                </TimelineItem>
            </ExperienceTimeline>
        ),
        skills: (
            <>
                <BioParagraph
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    I bring strong coding skills (Python, Go, JavaScript) and experience with frameworks like FastAPI, React, TensorFlow, and PyTorch.
                    My experience spans across various domains of AI and software development.
                </BioParagraph>

                <HighlightedList
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <HighlightItem whileHover={{ scale: 1.05 }}>Python</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>Go</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>JavaScript</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>TensorFlow</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>PyTorch</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>FastAPI</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>React</HighlightItem>
                    <HighlightItem whileHover={{ scale: 1.05 }}>Langchain</HighlightItem>
                </HighlightedList>
            </>
        )
    };

    return (
        <AboutSection id="about">
            <div className="container">
                <SectionTitle>About <span>Me</span></SectionTitle>
                <SectionDescription>
                    Learn about my journey, skills and what drives me
                </SectionDescription>

                <AboutContainer>
                    <BioContainer
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <BioHeader onClick={() => setBioOpen(!bioOpen)}>
                            <BioTitle>
                                My <span>Story</span>
                            </BioTitle>
                            {bioOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </BioHeader>

                        <AnimatePresence>
                            {bioOpen && (
                                <BioContent
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    isOpen={bioOpen}
                                >
                                    <TabContainer>
                                        <Tab
                                            active={activeTab === 'background'}
                                            onClick={() => setActiveTab('background')}
                                        >
                                            Background
                                        </Tab>
                                        <Tab
                                            active={activeTab === 'current'}
                                            onClick={() => setActiveTab('current')}
                                        >
                                            Current Work
                                        </Tab>
                                        <Tab
                                            active={activeTab === 'journey'}
                                            onClick={() => setActiveTab('journey')}
                                        >
                                            Professional Journey
                                        </Tab>
                                        <Tab
                                            active={activeTab === 'skills'}
                                            onClick={() => setActiveTab('skills')}
                                        >
                                            Technical Skills
                                        </Tab>
                                    </TabContainer>

                                    <AnimatePresence mode="wait">
                                        {tabContent[activeTab]}
                                    </AnimatePresence>
                                </BioContent>
                            )}
                        </AnimatePresence>
                    </BioContainer>

                    <SkillsSection>
                        <SkillsTitle>Core Skills</SkillsTitle>
                        <SkillsGrid>
                            <SkillCard
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <IconContainer>
                                    <FaBrain />
                                </IconContainer>
                                <SkillTitle>AI & Machine Learning</SkillTitle>
                                <SkillsList>
                                    <li>Large Language Models (LLMs)</li>
                                    <li>Generative AI & NLP</li>
                                    <li>Fine-tuning & Domain Adaptation</li>
                                    <li>Deep Learning Architectures</li>
                                </SkillsList>
                            </SkillCard>

                            <SkillCard
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <IconContainer>
                                    <FaCode />
                                </IconContainer>
                                <SkillTitle>Development</SkillTitle>
                                <SkillsList>
                                    <li>Python (Advanced)</li>
                                    <li>Go, JavaScript/TypeScript</li>
                                    <li>C++, Java</li>
                                    <li>React, FastAPI</li>
                                </SkillsList>
                            </SkillCard>

                            <SkillCard
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <IconContainer>
                                    <FaTools />
                                </IconContainer>
                                <SkillTitle>Frameworks & Tools</SkillTitle>
                                <SkillsList>
                                    <li>Langchain & Langsmith</li>
                                    <li>TensorFlow & PyTorch</li>
                                    <li>Hugging Face Transformers</li>
                                    <li>Git, Linux</li>
                                </SkillsList>
                            </SkillCard>

                            <SkillCard
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <IconContainer>
                                    <FaServer />
                                </IconContainer>
                                <SkillTitle>Infrastructure</SkillTitle>
                                <SkillsList>
                                    <li>ML Pipelines & Production Systems</li>
                                    <li>Real-time ML Applications</li>
                                    <li>Databases (SQL, NoSQL)</li>
                                    <li>Monitoring & Optimization</li>
                                </SkillsList>
                            </SkillCard>
                        </SkillsGrid>
                    </SkillsSection>

                    <PassionSection>
                        <PassionTitle>
                            <FaLightbulb /> Driven by
                        </PassionTitle>
                        <PassionText
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Curiosity, creativity, and a passion for building AI products that solve real problems. I thrive in environments where I can apply cutting-edge AI techniques to create systems that make a meaningful impact. Let's connect if you're interested in AI innovation, product collaboration, or solving tough challenges with data-driven systems.
                        </PassionText>
                    </PassionSection>
                </AboutContainer>
            </div>
        </AboutSection>
    );
};

export default About;