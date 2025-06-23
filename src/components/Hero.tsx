import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(160, 174, 192, 0.3);
  padding: 4rem 3rem;
  margin: 8rem 0 4rem 0;
  box-shadow: 0 20px 60px rgba(160, 174, 192, 0.15);
  position: relative;
  overflow: hidden;
  gap: 3rem;
  

  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 3rem 2rem;
    margin-top: 6rem;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 50%;
  z-index: 2;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.8rem;
    color: #1A202C;
    text-shadow: 0 2px 10px rgba(26, 32, 44, 0.2);
    line-height: 1.3;
    
    span {
      background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
      line-height: 1.25;
    }
    
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #4A5568;
    margin-bottom: 2rem;
    line-height: 1.7;
    opacity: 0.9;
    font-weight: 400;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.8rem;
    font-size: 0.9rem;
  }
`;

const ProfileImageContainer = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25);
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

export default function Hero() {
  const router = useRouter();
  return (
    <HeroSection className="fade-in">
      <HeroContent className="slide-in-left">
        <h1>
          안녕하세요!<br/>
          실내건축 디자이너를 꿈꾸는<br/>
          취업 준비생 <span>조지원</span>입니다.
        </h1>
        <p>
          공간의 기능성과 감성을 함께 고려하는 디자인을 공부하며,<br/>
          사람의 행동에 긍정적인 영향을 주는 설계를 지향합니다.
        </p>
        <CTAButton className="pulse" onClick={() => router.push('/projects')}>
          포트폴리오 보기
        </CTAButton>
      </HeroContent>
      <ProfileImageContainer className="slide-in-right">
        <ProfileImage className="float" src="/images/profile.jpeg" alt="프로필 사진" />
      </ProfileImageContainer>
    </HeroSection>
  );
} 