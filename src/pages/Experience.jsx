import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const ExperienceSection = styled.section`
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

const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--text)' : 'var(--text-muted)'};
  border: 2px solid var(--primary);
  border-radius: ${props => props.position === 'left' ? '5px 0 0 5px' : props.position === 'right' ? '0 5px 5px 0' : '0'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'rgba(99, 102, 241, 0.1)'};
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: var(--primary-light);
    opacity: 0.3;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-left: 60px;
  padding-bottom: 2.5rem;
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.2rem;
`;

const TimelineContent = styled.div`
  background-color: var(--surface);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TimelinePeriod = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  border-radius: 1rem;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

const TimelineSubtitle = styled.h4`
  font-size: 1rem;
  color: var(--primary);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const TimelineDesc = styled.p`
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const TimelineLists = styled.ul`
  list-style-position: inside;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: 0.75rem;

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

const Experience = () => {
    const [activeTab, setActiveTab] = React.useState('work');

    const workExperience = [
        {
            id: 1,
            title: "AI Engineer",
            company: "Avalon EdTech Pvt Ltd",
            period: "June 2024 - Present",
            description: "",
            responsibilities: [
                "Built LLM-based features such as Test Generator and Content Summarization Module using Langchain and Langsmith, boosting user engagement across applications.",
                "Engineered internal tools for diagnostic level question generation and question tagging, increasing content team productivity by 53%.",
                "Fine-tuned LLMs using unsupervised and instruction-based techniques for Domain Adaptation, improving accuracy and adaptability.",
                "Created ReAct agents based chatbot to support Guided Practice, delivering a key feature for personalized learning in student applications."
            ]
        },
        {
            id: 2,
            title: "Software Developer Trainee",
            company: "Avis E Solutions",
            period: "March 2024 - June 2024",
            description: "",
            responsibilities: [
                "Optimized Cassandra queries for high-volume datasets, reducing latency and implementing server-side pagination.",
                "Developed a drag-and-drop chatbot builder enabling custom flow creation.",
                "Created a real-time chatbot with multilingual support and Intent Classification, powered by WebSockets."
            ]
        },
        {
            id: 3,
            title: "Machine Learning Intern",
            company: "Times Internet Ltd.",
            period: "August 2023 - November 2023",
            description: "",
            responsibilities: [
                "Led a team of 4 to develop an intent classification system using Deep Learning and fine-tuned Large Language Models (LLMs) with Langchain, enabling ad personalization.",
                "Utilized web scraping, pretrained models, and LLMs to build an end-to-end classification pipeline for production deployment."
            ]
        }
    ];

    const education = [
        {
            id: 1,
            title: "Bachelor of Technology",
            institution: "ABES Engineering College",
            period: "2020 - 2024",
            description: "Computer Science Engineering specializing in Artificial Intelligence and Machine Learning",
            achievements: []
        },
        {
            id: 2,
            title: "Senior Secondary",
            institution: "S.R. Public School",
            period: "2019 - 2020",
            description: "CBSE Board",
            achievements: []
        },
        {
            id: 3,
            title: "High School",
            institution: "S.R. Public School",
            period: "2017 - 2018",
            description: "CBSE Board",
            achievements: []
        }
    ];

    return (
        <ExperienceSection id="experience">
            <div className="container">
                <SectionTitle>My <span>Experience</span></SectionTitle>
                <SectionDescription>
                    My professional journey and educational background
                </SectionDescription>

                <ExperienceContainer>
                    <TabsContainer>
                        <Tab
                            active={activeTab === 'work'}
                            onClick={() => setActiveTab('work')}
                            position="left"
                        >
                            Work Experience
                        </Tab>
                        <Tab
                            active={activeTab === 'education'}
                            onClick={() => setActiveTab('education')}
                            position="right"
                        >
                            Education
                        </Tab>
                    </TabsContainer>

                    <TimelineContainer>
                        {activeTab === 'work' ? (
                            workExperience.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <TimelineIcon>
                                        <FaBriefcase />
                                    </TimelineIcon>
                                    <TimelineContent>
                                        <TimelinePeriod>{item.period}</TimelinePeriod>
                                        <TimelineTitle>{item.title}</TimelineTitle>
                                        <TimelineSubtitle>{item.company}</TimelineSubtitle>
                                        {item.description && <TimelineDesc>{item.description}</TimelineDesc>}
                                        {item.responsibilities && (
                                            <TimelineLists>
                                                {item.responsibilities.map((responsibility, i) => (
                                                    <li key={i}>{responsibility}</li>
                                                ))}
                                            </TimelineLists>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            ))
                        ) : (
                            education.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <TimelineIcon>
                                        <FaGraduationCap />
                                    </TimelineIcon>
                                    <TimelineContent>
                                        <TimelinePeriod>{item.period}</TimelinePeriod>
                                        <TimelineTitle>{item.title}</TimelineTitle>
                                        <TimelineSubtitle>{item.institution}</TimelineSubtitle>
                                        {item.description && <TimelineDesc>{item.description}</TimelineDesc>}
                                        {item.achievements && item.achievements.length > 0 && (
                                            <TimelineLists>
                                                {item.achievements.map((achievement, i) => (
                                                    <li key={i}>{achievement}</li>
                                                ))}
                                            </TimelineLists>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            ))
                        )}
                    </TimelineContainer>
                </ExperienceContainer>
            </div>
        </ExperienceSection>
    );
};

export default Experience;