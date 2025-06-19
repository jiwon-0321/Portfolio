import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 6rem;
`;

const ContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #1A202C;
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(26, 32, 44, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(160, 174, 192, 0.3);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem;
    border-radius: 12px;
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem auto;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 1.6rem;
  }
`;

const ContactTitle = styled.h3`
  color: #2D3748;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ContactInfo = styled.p`
  color: #4A5568;
  font-size: 1.1rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const NotionLink = styled.a`
  display: block;
  color: #4A5568;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667EEA;
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default function Contact() {
  return (
    <>
      <Navbar />
      <Container>
        <ContactSection className="fade-in">
          <Title>연락처</Title>
          
          <ContactGrid>
            <ContactCard className="slide-up">
              <ContactIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </ContactIcon>
              <ContactTitle>Email</ContactTitle>
              <ContactInfo>whwldnjs9@naver.com</ContactInfo>
            </ContactCard>
            
            <ContactCard className="slide-up" style={{ animationDelay: '0.1s' }}>
              <ContactIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </ContactIcon>
              <ContactTitle>Phone</ContactTitle>
              <ContactInfo>010-3443-5200</ContactInfo>
            </ContactCard>
            
            <ContactCard className="slide-up" style={{ animationDelay: '0.2s' }}>
              <ContactIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z"/>
                </svg>
              </ContactIcon>
              <ContactTitle>Notion</ContactTitle>
              <NotionLink href="https://www.notion.so/1ac36ffb21994669b0e7b1581898ca9b" target="_blank" rel="noopener noreferrer">
                방문하기
              </NotionLink>
            </ContactCard>
          </ContactGrid>
        </ContactSection>
      </Container>
    </>
  );
} 