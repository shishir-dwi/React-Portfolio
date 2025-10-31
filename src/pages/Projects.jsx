import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  padding: 1rem 0;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--surface);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text);
`;

const ProjectDescription = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary);
    }
  }
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
  margin: 0 auto;
  color: var(--text-muted);
`;

const Projects = () => {
    const projectsData = [
        {
            id: 1,
            title: "HealPal Chatmate",
            description: "Medical assistant chatbot using LLMs and Langchain framework for symptom analysis and treatment recommendations",
            image: "/images/healpal.png",
            techStack: ["Python", "LLM", "Langchain", "NLP"],
            githubLink: "https://github.com/shishir-dwi/healpal-chatmate",
            liveLink: ""
        },
        {
            id: 2,
            title: "IAB News Classification",
            description: "News classification system using LLaMA 2 and deep learning with improved zero-shot performance on IAB categories",
            image: "/images/iab.jpg",
            techStack: ["Python", "LLaMA 2", "Deep Learning", "NLP"],
            githubLink: "https://github.com/shishir-dwi/TIL-NLP-Project",
            liveLink: ""
        },
        {
            id: 3,
            title: "Speech Emotion Recognition",
            description: "Deep learning model using TensorFlow's LSTM architecture to predict emotional states from voice recordings with MFCC features",
            image: "/images/ser.png",
            techStack: ["Python", "TensorFlow", "LSTM", "MFCC"],
            githubLink: "https://github.com/shishir-dwi/Speech-Emotion-Recognition",
            liveLink: ""
        },
        {
            id: 4,
            title: "Dog Breed Classification",
            description: "Computer vision model to identify dog breeds using convolutional neural networks and transfer learning",
            image: "/images/dog.jpg",
            techStack: ["Python", "PyTorch", "CNN", "Transfer Learning"],
            githubLink: "https://github.com/shishir-dwi/Dog-Breed-Classification",
            liveLink: ""
        }
    ];

    return (
        <ProjectsSection id="projects">
            <div className="container">
                <SectionTitle>My <span>Projects</span></SectionTitle>
                <SectionDescription>
                    Here are some of my key projects in AI, ML, and Software Development
                </SectionDescription>

                <ProjectGrid>
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <ProjectImage>
                                <img src={project.image || "/images/project-placeholder-image.jpg"} alt={project.title} />
                            </ProjectImage>
                            <ProjectContent>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>
                                <TechStack>
                                    {project.techStack.map((tech, index) => (
                                        <TechTag key={index}>{tech}</TechTag>
                                    ))}
                                </TechStack>
                                <ProjectLinks>
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                            <FaGithub /> GitHub
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                </ProjectLinks>
                            </ProjectContent>
                        </ProjectCard>
                    ))}
                </ProjectGrid>
            </div>
        </ProjectsSection>
    );
};

export default Projects;