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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: #2C3E50;
  font-size: 3rem;
  margin: 0;
  text-shadow: 0 2px 10px rgba(44, 62, 80, 0.2);
  flex: 1;
  text-align: center;
  margin-left: 150px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    flex: none;
    margin-left: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ResumeButton = styled.button`
  background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.7rem 1.3rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 62, 80, 0.5);
  }
  
  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.85rem;
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
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(245, 168, 159, 0.15);
    border-color: rgba(245, 168, 159, 0.4);
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
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(245, 168, 159, 0.3);
  
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
  color: #2C3E50;
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
  color: #2C3E50;
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
  color: #2C3E50;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #F5A89F;
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
  const handleResumeDownload = () => {
    // 이력서 다운로드 기능 - 나중에 이력서 파일로 연결 예정
    alert('이력서 다운로드 기능이 곧 추가될 예정입니다! 📄');
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContactSection className="fade-in">
          <TitleWrapper>
            <Title>연락처</Title>
            <ResumeButton onClick={handleResumeDownload}>
              📄 이력서 다운로드
            </ResumeButton>
          </TitleWrapper>
          
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
              <NotionLink href="https://holy-minibus-4ea.notion.site/All-1df3dd01256981e8ac19cc2cf2d92de4?source=copy_link" target="_blank" rel="noopener noreferrer">
                방문하기
              </NotionLink>
            </ContactCard>
            
            <ContactCard className="slide-up" style={{ animationDelay: '0.3s' }}>
              <ContactIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </ContactIcon>
              <ContactTitle>GitHub</ContactTitle>
              <NotionLink href="https://github.com/jiwon-0321?tab=repositories" target="_blank" rel="noopener noreferrer">
                방문하기
              </NotionLink>
            </ContactCard>
          </ContactGrid>
        </ContactSection>
      </Container>
    </>
  );
} 