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
  

  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 3rem 2rem;
    margin-top: 6rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  z-index: 2;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1A202C;
    text-shadow: 0 2px 10px rgba(26, 32, 44, 0.2);
    
    span {
      background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #4A5568;
    margin-bottom: 2rem;
    line-height: 1.6;
    opacity: 0.9;
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
`;

const ProfileImageContainer = styled.div`
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.25);
  }
`;

export default function Hero() {
  const router = useRouter();
  return (
    <HeroSection className="fade-in">
      <HeroContent className="slide-in-left">
        <h1>
          안녕하세요!<br/>
          실내건축 디자이너 <span>홍길동</span>입니다.
        </h1>
        <p>창의적이고 실용적인 공간을 설계하여 사람들의 삶을 더욱 풍요롭게 만듭니다.</p>
        <CTAButton className="pulse" onClick={() => router.push('/projects')}>
          포트폴리오 보기
        </CTAButton>
      </HeroContent>
      <ProfileImageContainer className="slide-in-right">
        <ProfileImage className="float" src="/images/아이콘 사진.jpeg" alt="프로필" />
      </ProfileImageContainer>
    </HeroSection>
  );
} 