import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(250, 249, 246, 0.3);
  padding: 4rem 3rem;
  margin: 8rem 0 4rem 0;
  box-shadow: 0 20px 60px rgba(245, 168, 159, 0.15);
  position: relative;
  overflow: hidden;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 2rem;
    margin: 6rem 0 3rem 0;
    gap: 2rem;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    margin: 5rem 0 2rem 0;
    gap: 1.5rem;
    border-radius: 15px;
  }
  
  @media (max-width: 360px) {
    padding: 1.5rem 1rem;
    margin: 4rem 0 2rem 0;
    gap: 1rem;
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
    color: #2C3E50;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.2);
    line-height: 1.3;
    
    span {
      background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
      line-height: 1.25;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.7rem;
      line-height: 1.2;
      margin-bottom: 1.2rem;
    }
    
    @media (max-width: 360px) {
      font-size: 1.5rem;
      line-height: 1.15;
      margin-bottom: 1rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #34495E;
    margin-bottom: 2rem;
    line-height: 1.7;
    opacity: 0.9;
    font-weight: 400;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 360px) {
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
  
  @media (max-width: 360px) {
    gap: 0.6rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(245, 168, 159, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
    box-shadow: 0 15px 40px rgba(245, 168, 159, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 280px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
    max-width: 260px;
  }
  
  @media (max-width: 360px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    max-width: 240px;
  }
`;

const BusinessCardButton = styled.button`
  background: linear-gradient(135deg, #16A085 0%, #48C9B0 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(22, 160, 133, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
    box-shadow: 0 15px 40px rgba(22, 160, 133, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 280px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
    max-width: 260px;
  }
  
  @media (max-width: 360px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    max-width: 240px;
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
    order: -1;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(245, 168, 159, 0.3);
  box-shadow: 0 15px 35px rgba(245, 168, 159, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(245, 168, 159, 0.25);
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
  
  @media (max-width: 360px) {
    width: 170px;
    height: 170px;
  }
`;

export default function Hero() {
  const router = useRouter();
  
  const handleBusinessCardView = () => {
    // 디지털 명함 보기 기능 - 나중에 디지털명함 페이지나 모달로 연결 예정
    alert('디지털 명함 기능이 곧 추가될 예정입니다! 📇');
  };

  return (
    <HeroSection className="fade-in">
      <HeroContent className="slide-in-left">
        <h1>
          안녕하세요!<br/>
          실내건축 디자이너를 꿈꾸는<br/>
          취업 준비생 <span>조지원</span>입니다.
        </h1>
        <p>
          공간의 기능성과 감성을 균형 있게 고려하여 사람 중심의 설계를 지향합니다.<br/>
          다양한 AI 디자인 툴을 적극 활용해 창의적인 아이디어 발굴부터 효율적인 설계 실행까지,<br/>
          혁신적인 방법으로 공간의 새로운 가능성을 탐구하고 있습니다.
        </p>
        <ButtonContainer>
          <CTAButton className="pulse" onClick={() => router.push('/projects')}>
            포트폴리오 보기
          </CTAButton>
          <BusinessCardButton className="pulse" onClick={handleBusinessCardView}>
            디지털 명함 보기
          </BusinessCardButton>
        </ButtonContainer>
      </HeroContent>
      <ProfileImageContainer className="slide-in-right">
        <ProfileImage className="float" src="/images/profile.jpeg" alt="프로필 사진" />
      </ProfileImageContainer>
    </HeroSection>
  );
} 