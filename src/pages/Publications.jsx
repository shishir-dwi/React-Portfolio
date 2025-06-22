import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaExternalLinkAlt } from 'react-icons/fa';

const PublicationsSection = styled.section`
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

const PublicationsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const PublicationCard = styled(motion.div)`
  background-color: var(--surface);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PublicationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  color: var(--primary);
  font-size: 1.5rem;
`;

const PublicationInfo = styled.div`
  flex: 1;
`;

const PublicationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text);
  line-height: 1.4;
`;

const PublicationMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.9rem;

  span {
    font-weight: 500;
    margin-right: 0.25rem;
  }
`;

const PublicationContent = styled.div``;

const Abstract = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: var(--text);
  }
  
  p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const Keywords = styled.div`
  margin-top: 1rem;
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: var(--text);
  }
  
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Keyword = styled.span`
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
    color: var(--text);
  }
`;

const PublicationLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary);
      color: var(--text);
      transform: translateY(-2px);
    }
  }
`;

const Publications = () => {
    const publicationsData = [
        {
            id: 1,
            title: "Healpal Chatmate: AI Driven Disease Diagnosis and Recommendation System",
            conference: "2024 2nd International Conference on Disruptive Technologies (ICDT)",
            year: "2024",
            abstract: "This paper introduces HealPal Chatmate, an innovative AI-powered medical assistant designed to provide accessible healthcare guidance through natural language conversations. Utilizing advanced Large Language Models (LLMs) and the Langchain framework, the system enables users to describe their symptoms and receive preliminary diagnoses, treatment recommendations, and preventive care advice. The system incorporates robust medical knowledge bases and integrates Natural Language Processing techniques to deliver personalized healthcare support. Evaluation results demonstrate the system's effectiveness in understanding medical queries and providing relevant medical guidance.",
            keywords: ["Healthcare AI", "Medical Chatbot", "LLM", "Langchain", "Disease Diagnosis"],
            link: "https://ieeexplore.ieee.org/document/10489509"
        },
        {
            id: 2,
            title: "Analysing the Impact of LSTM and MFCC on Speech Emotion Recognition Accuracy",
            conference: "2023 International Conference on Sustainable Emerging Innovations in Engineering and Technology (ICSEIET)",
            year: "2023",
            abstract: "This research paper investigates the effectiveness of Long Short-Term Memory (LSTM) neural networks combined with Mel-Frequency Cepstral Coefficients (MFCC) features for speech emotion recognition tasks. The study conducts a comprehensive analysis of how different LSTM architectures and MFCC parameter configurations affect recognition accuracy across multiple emotional states. Experiments on standard emotion recognition datasets reveal that properly tuned LSTM networks with optimized MFCC feature extraction significantly outperform conventional approaches, particularly for complex emotional distinctions.",
            keywords: ["Speech Emotion Recognition", "LSTM", "MFCC", "Deep Learning", "Audio Processing"],
            link: "https://ieeexplore.ieee.org/document/10303464"
        }
    ];

    return (
        <PublicationsSection id="publications">
            <div className="container">
                <SectionTitle>Research <span>Publications</span></SectionTitle>
                <SectionDescription>
                    My contributions to academic research in AI, ML, and related fields
                </SectionDescription>

                <PublicationsContainer>
                    {publicationsData.map((pub, index) => (
                        <PublicationCard
                            key={pub.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <PublicationHeader>
                                <IconContainer>
                                    <FaBook />
                                </IconContainer>
                                <PublicationInfo>
                                    <PublicationTitle>{pub.title}</PublicationTitle>
                                    <PublicationMeta>
                                        <MetaItem>
                                            <span>Conference:</span> {pub.conference}
                                        </MetaItem>
                                        <MetaItem>
                                            <span>Year:</span> {pub.year}
                                        </MetaItem>
                                    </PublicationMeta>
                                </PublicationInfo>
                            </PublicationHeader>
                            <PublicationContent>
                                <Abstract>
                                    <h4>Abstract</h4>
                                    <p>{pub.abstract}</p>
                                </Abstract>

                                <Keywords>
                                    <h4>Keywords</h4>
                                    <div>
                                        {pub.keywords.map((keyword, i) => (
                                            <Keyword key={i}>{keyword}</Keyword>
                                        ))}
                                    </div>
                                </Keywords>

                                <PublicationLinks>
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                        <FaExternalLinkAlt /> View Publication
                                    </a>
                                </PublicationLinks>
                            </PublicationContent>
                        </PublicationCard>
                    ))}
                </PublicationsContainer>
            </div>
        </PublicationsSection>
    );
};

export default Publications;