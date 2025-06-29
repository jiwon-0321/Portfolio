import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 8rem auto 4rem auto;
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(245, 168, 159, 0.15);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(245, 168, 159, 0.1), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.3);
  }
  
  p {
    font-size: 1.1rem;
    color: #2C3E50;
    opacity: 0.8;
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled.div`
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(245, 168, 159, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(245, 168, 159, 0.15);
    border-color: rgba(245, 168, 159, 0.4);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const CertificateIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 8px 20px rgba(245, 168, 159, 0.3);
`;

const CertificateName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 0.5rem;
`;

const CertificateOrg = styled.div`
  color: #2C3E50;
  opacity: 0.8;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CertificateDate = styled.div`
  display: inline-block;
  background: rgba(245, 168, 159, 0.1);
  color: #2C3E50;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0;
`;

const CertificateDescription = styled.p`
  color: #2C3E50;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const CertificateDetails = styled.div`
  background: rgba(245, 168, 159, 0.2);
  padding: 1rem;
  border-radius: 10px;
  border-left: 3px solid #F5A89F;
  
  h4 {
    color: #2C3E50;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      color: #2C3E50;
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
      opacity: 0.9;
      
      &:before {
        content: '•';
        color: #F5A89F;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #2C3E50;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  
  &:hover {
    transform: translateX(-5px);
    color: #F5A89F;
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

export default function Certificate() {
  const certificates = [
    {
      name: '실내건축기사',
      organization: '한국산업인력공단',
      date: '2024.12.11',
      icon: '🏗️',
      description: '',
      details: {
        title: '',
        items: []
      }
    },
    {
      name: 'ACP(Adobe Photoshop)',
      organization: 'Adobe • 점수: 917 / 1000 (합격 기준: 700점 이상)',
      date: '2024.02',
      icon: '🎨',
      description: '',
      details: {
        title: '',
        items: []
      }
    },
    {
      name: '전산응용건축제도기능사',
      organization: '한국산업인력공단',
      date: '2019.12.27',
      icon: '📐',
      description: '',
      details: {
        title: '',
        items: []
      }
    },
    {
      name: '실내건축기능사',
      organization: '한국산업인력공단',
      date: '2019.06.28',
      icon: '🏗️',
      description: '',
      details: {
        title: '',
        items: []
      }
    },
    {
      name: 'PCMaster(정비사)',
      organization: '공인자격(국가/민간)',
      date: '2012.05.31',
      icon: '🖥️',
      description: '',
      details: {
        title: '',
        items: []
      }
    }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>자격증</h1>
            <p>전문성을 인정받은 자격증과 역량을 소개합니다</p>
          </Header>
          
          <CertificatesGrid>
            {certificates.map((cert, index) => (
              <CertificateCard 
                key={cert.name}
                className="slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CertificateIcon>{cert.icon}</CertificateIcon>
                <CertificateName>{cert.name}</CertificateName>
                <CertificateOrg>{cert.organization}</CertificateOrg>
                <CertificateDate>{cert.date} 취득</CertificateDate>
                {cert.description && <CertificateDescription>{cert.description}</CertificateDescription>}
                {cert.details.title && cert.details.items.length > 0 && (
                  <CertificateDetails>
                    <h4>{cert.details.title}</h4>
                    <ul>
                      {cert.details.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </CertificateDetails>
                )}
              </CertificateCard>
            ))}
          </CertificatesGrid>
        </Content>
      </Container>
    </>
  );
} 