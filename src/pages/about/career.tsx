import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 8rem auto 4rem auto;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(196, 215, 155, 0.3);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(74, 20, 140, 0.15);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(196, 215, 155, 0.1), transparent);
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
    color: #4A148C;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(74, 20, 140, 0.3);
  }
  
  p {
    font-size: 1.1rem;
    color: #4A148C;
    opacity: 0.8;
  }
`;

const Timeline = styled.div`
  position: relative;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(135deg, #C4D79B 0%, #4A148C 100%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 80px;
  
  &:before {
    content: '';
    position: absolute;
    left: 21px;
    top: 0;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #C4D79B 0%, #4A148C 100%);
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 10px rgba(74, 20, 140, 0.3);
  }
`;

const Period = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #C4D79B 0%, #4A148C 100%);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Company = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #4A148C;
  margin-bottom: 0.5rem;
`;

const Position = styled.div`
  font-size: 1.1rem;
  color: #4A148C;
  font-weight: 500;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const Description = styled.p`
  color: #4A148C;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background: rgba(196, 215, 155, 0.3);
  color: #4A148C;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Achievements = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
  
  li {
    color: #4A148C;
    margin-bottom: 0.5rem;
    opacity: 0.9;
    
    &:before {
      content: '▸';
      color: #C4D79B;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #2D3748;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  
  &:hover {
    transform: translateX(-5px);
    color: #7B9A6D;
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

export default function Career() {
  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>경력</h1>
            <p>다양한 프로젝트를 통해 쌓아온 실무 경험을 소개합니다</p>
          </Header>
          
          <Timeline>
            <TimelineItem>
              <Period>2022.03 - 현재</Period>
              <Company>(주)OO건축사사무소</Company>
              <Position>실내건축 디자이너</Position>
              <Description>
                상업공간 및 주거공간의 실내건축 설계를 담당하며, 클라이언트 미팅부터 
                시공 감리까지 프로젝트 전 과정을 관리하고 있습니다. 
                특히 카페, 레스토랑 등 상업공간 프로젝트에서 우수한 성과를 거두었습니다.
              </Description>
              <Achievements>
                <li>연간 15개 이상의 상업공간 프로젝트 완료</li>
                <li>클라이언트 만족도 95% 이상 달성</li>
                <li>사내 우수 디자이너상 수상 (2023)</li>
                <li>신입 직원 멘토링 담당</li>
              </Achievements>
              <Skills>
                <SkillTag>AutoCAD</SkillTag>
                <SkillTag>SketchUp</SkillTag>
                <SkillTag>V-Ray</SkillTag>
                <SkillTag>Photoshop</SkillTag>
                <SkillTag>프로젝트 관리</SkillTag>
              </Skills>
            </TimelineItem>
            
            <TimelineItem>
              <Period>2020.06 - 2022.02</Period>
              <Company>XX디자인스튜디오</Company>
              <Position>주니어 디자이너</Position>
              <Description>
                주거공간 인테리어 전문 스튜디오에서 아파트, 빌라 등 다양한 주거공간의 
                인테리어 디자인을 담당했습니다. 3D 모델링과 렌더링 업무를 주로 맡아 
                시각화 전문성을 키웠습니다.
              </Description>
              <Achievements>
                <li>월평균 8개 프로젝트 3D 모델링 완료</li>
                <li>포토리얼리스틱 렌더링 전문성 확보</li>
                <li>고객 프레젠테이션 참여 및 제안서 작성</li>
                <li>인테리어 트렌드 리서치 및 자료 정리</li>
              </Achievements>
              <Skills>
                <SkillTag>SketchUp</SkillTag>
                <SkillTag>V-Ray</SkillTag>
                <SkillTag>Photoshop</SkillTag>
                <SkillTag>InDesign</SkillTag>
                <SkillTag>3D 모델링</SkillTag>
              </Skills>
            </TimelineItem>
            
            <TimelineItem>
              <Period>2019.09 - 2020.05</Period>
              <Company>프리랜서</Company>
              <Position>실내건축 디자이너</Position>
              <Description>
                개인 클라이언트를 대상으로 소규모 주거공간 리모델링 프로젝트를 진행했습니다. 
                기획부터 시공까지 전 과정을 직접 관리하며 실무 경험을 쌓았습니다.
              </Description>
              <Achievements>
                <li>총 12개의 주거공간 리모델링 프로젝트 완료</li>
                <li>개인 포트폴리오 웹사이트 구축</li>
                <li>SNS 마케팅을 통한 고객 확보</li>
                <li>시공업체 네트워크 구축</li>
              </Achievements>
              <Skills>
                <SkillTag>AutoCAD</SkillTag>
                <SkillTag>SketchUp</SkillTag>
                <SkillTag>고객 상담</SkillTag>
                <SkillTag>견적 산출</SkillTag>
                <SkillTag>시공 관리</SkillTag>
              </Skills>
            </TimelineItem>
          </Timeline>
        </Content>
      </Container>
    </>
  );
} 