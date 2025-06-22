import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled(motion.form)`
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const ContactItems = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  svg {
    color: var(--primary);
    font-size: 1.2rem;
    margin-right: 1rem;
    margin-top: 0.25rem;
  }

  div {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      color: var(--text);
    }

    p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--primary);
      transform: translateY(-3px);
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text);
    font-size: 0.95rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: var(--text);
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Alert = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background-color: ${props => props.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.type === 'success' ? 'var(--success)' : 'var(--error)'};
`;

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
    });

    const [alert, setAlert] = useState({
        show: false,
        type: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Form validation
        if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) {
            setAlert({
                show: true,
                type: 'error',
                message: 'Please fill in all fields'
            });
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.user_email)) {
            setAlert({
                show: true,
                type: 'error',
                message: 'Please enter a valid email address'
            });
            setIsSubmitting(false);
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm(
            'portfolio_mailing',        // Replace with your actual service ID
            'template_8oyyuqd',       // Replace with your actual template ID
            form.current,
            'omC5Xfg0Iw559MnKF'   // Replace with your actual public key
        )
            .then((result) => {
                setAlert({
                    show: true,
                    type: 'success',
                    message: 'Your message has been sent successfully!'
                });

                // Clear form
                setFormData({
                    user_name: '',
                    user_email: '',
                    subject: '',
                    message: ''
                });

                setIsSubmitting(false);
            }, (error) => {
                console.error('EmailJS error:', error);
                setAlert({
                    show: true,
                    type: 'error',
                    message: 'Failed to send message. Please try again later.'
                });
                setIsSubmitting(false);
            });
    };

    return (
        <ContactSection id="contact">
            <div className="container">
                <SectionTitle>Contact <span>Me</span></SectionTitle>
                <SectionDescription>
                    Get in touch with me for collaborations, opportunities, or just to say hello
                </SectionDescription>

                <ContactContainer>
                    <ContactInfo>
                        <InfoTitle>Let's Talk</InfoTitle>
                        <ContactItems>
                            <ContactItem>
                                <FaMapMarkerAlt />
                                <div>
                                    <h4>Location</h4>
                                    <p>Kalkaji, New Delhi, India</p>
                                </div>
                            </ContactItem>
                            <ContactItem>
                                <FaEnvelope />
                                <div>
                                    <h4>Email</h4>
                                    <p>shishir.spiral@gmail.com</p>
                                </div>
                            </ContactItem>
                            <ContactItem>
                                <FaPhone />
                                <div>
                                    <h4>Phone</h4>
                                    <p>+91-7233875292</p>
                                </div>
                            </ContactItem>
                        </ContactItems>

                        <InfoTitle>Connect With Me</InfoTitle>
                        <SocialLinks>
                            <a href="https://github.com/shishir-dwi" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/shishir-spiral" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </SocialLinks>
                    </ContactInfo>

                    <ContactForm
                        ref={form}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                    >
                        <InfoTitle>Send Me a Message</InfoTitle>

                        {alert.show && (
                            <Alert type={alert.type}>
                                {alert.message}
                            </Alert>
                        )}

                        <FormGroup>
                            <label htmlFor="name">Your Name</label>
                            <Input
                                type="text"
                                id="name"
                                name="user_name" // Important: match EmailJS template parameter
                                value={formData.user_name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="email">Your Email</label>
                            <Input
                                type="email"
                                id="email"
                                name="user_email" // Important: match EmailJS template parameter
                                value={formData.user_email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="subject">Subject</label>
                            <Input
                                type="text"
                                id="subject"
                                name="subject" // Important: match EmailJS template parameter
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Job Opportunity"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="message">Your Message</label>
                            <TextArea
                                id="message"
                                name="message" // Important: match EmailJS template parameter
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Hello Shishir, I'd like to discuss a project with you..."
                            />
                        </FormGroup>

                        <input type="hidden" name="time" value={new Date().toLocaleString()} />

                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </SubmitButton>
                    </ContactForm>
                </ContactContainer>
            </div>
        </ContactSection>
    );
};

export default Contact;