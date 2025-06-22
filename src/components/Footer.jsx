import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

const FooterContainer = styled.footer`
  background-color: var(--surface);
  padding: 4rem 0 2rem;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const FooterSection = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 30px;
      height: 2px;
      background-color: var(--primary);
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--primary);
      transform: translateY(-3px);
    }
  }
`

const FooterLinks = styled.ul`
  list-style: none;

  li {
    margin-bottom: 0.5rem;
    
    a {
      color: var(--text-muted);
      transition: all 0.3s ease;
      display: inline-block;

      &:hover {
        color: var(--primary);
        transform: translateX(3px);
      }
    }
  }
`

const ContactInfo = styled.div`
  div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: var(--text-muted);

    svg {
      margin-right: 0.75rem;
      color: var(--primary);
    }
  }
`

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  font-size: 0.9rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <FooterContainer>
            <div className="container">
                <FooterContent>
                    <FooterSection>
                        <h4>Shishir Dwivedi</h4>
                        <p>AI & ML Engineer specializing in developing intelligent systems and solutions.</p>
                        <SocialLinks>
                            <a href="https://github.com/shishir-dwi" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/shishir-spiral" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:shishir.spiral@gmail.com">
                                <FaEnvelope />
                            </a>
                        </SocialLinks>
                    </FooterSection>
                    <FooterSection>
                        <h4>Quick Links</h4>
                        <FooterLinks>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/experience">Experience</Link></li>
                            <li><Link to="/publications">Publications</Link></li>
                        </FooterLinks>
                    </FooterSection>
                    <FooterSection>
                        <h4>Contact</h4>
                        <ContactInfo>
                            <div>
                                <FaEnvelope />
                                <span>shishir.spiral@gmail.com</span>
                            </div>
                            <div>
                                <FaPhone />
                                <span>+91-7233875292</span>
                            </div>
                            <div>
                                <p>Kalkaji, New Delhi, India</p>
                            </div>
                        </ContactInfo>
                    </FooterSection>
                </FooterContent>
                <BottomBar>
                    <div>© {currentYear} Shishir Dwivedi. All rights reserved.</div>
                    <div>Designed & Built with React + Vite</div>
                </BottomBar>
            </div>
        </FooterContainer>
    );
};

export default Footer;