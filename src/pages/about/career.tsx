import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const Content = styled.div`
  max-width: 900px;
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
  
  @media (max-width: 768px) {
    margin: 6rem auto 3rem auto;
    padding: 2rem;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    margin: 5rem auto 2rem auto;
    padding: 1.5rem;
    border-radius: 15px;
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
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    
    h1 {
      font-size: 1.6rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2C3E50;
  margin: 3rem 0 2rem 0;
  text-align: center;
  position: relative;
  z-index: 2;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem 0;
    
    &:after {
      width: 60px;
      height: 2px;
      bottom: -8px;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin: 2rem 0 1rem 0;
    
    &:after {
      width: 50px;
      height: 2px;
      bottom: -6px;
    }
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
    background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  }
  
  @media (max-width: 768px) {
    &:before {
      left: 20px;
    }
  }
  
  @media (max-width: 480px) {
    &:before {
      left: 15px;
      width: 1px;
    }
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
    background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
    border-radius: 50%;
    border: 3px solid rgba(250, 249, 246, 0.8);
    box-shadow: 0 4px 10px rgba(245, 168, 159, 0.3);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
    padding-left: 60px;
    
    &:before {
      left: 11px;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(250, 249, 246, 0.8);
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
    padding-left: 45px;
    
    &:before {
      left: 7px;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(250, 249, 246, 0.8);
    }
  }
`;

const Period = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.25rem 0.8rem;
    border-radius: 12px;
  }
`;

const Company = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
`;

const Position = styled.div`
  font-size: 1.1rem;
  color: #2C3E50;
  font-weight: 500;
  margin-bottom: 1rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const Description = styled.p`
  color: #2C3E50;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.3rem;
    margin-top: 0.8rem;
  }
`;

const SkillTag = styled.span`
  background: rgba(245, 168, 159, 0.3);
  color: #2C3E50;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    padding: 0.25rem 0.6rem;
    font-size: 0.75rem;
    border-radius: 10px;
  }
`;

const Achievements = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
  
  li {
    color: #2C3E50;
    margin-bottom: 0.5rem;
    opacity: 0.9;
    
    &:before {
      content: '▸';
      color: #F5A89F;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
  
  @media (max-width: 768px) {
    margin-top: 0.8rem;
    padding-left: 1.2rem;
    
    li {
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 0.6rem;
    padding-left: 1rem;
    
    li {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
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

export default function Career() {
  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>학력 및 경력</h1>
            <p>체계적인 교육과정과 다양한 프로젝트를 통해 쌓아온 경험을 소개합니다</p>
          </Header>
          
          <SectionTitle>학력</SectionTitle>
          <Timeline>
            <TimelineItem>
              <Period>2011.02.11 - 2014.02.07</Period>
              <Company>고척고등학교</Company>
              <Position>졸업</Position>
            </TimelineItem>
            
            <TimelineItem>
              <Period>2020.01.06 - 2024.02.23</Period>
              <Company>국가평생교육진흥원 (학점은행제)</Company>
              <Position>경영학사</Position>
            </TimelineItem>
          </Timeline>

          <SectionTitle>경력</SectionTitle>
          <Timeline>
            <TimelineItem>
              <Period>2015.10 - 2017.07</Period>
              <Company>대한민국 육군 제9사단</Company>
              <Position>병장 전역</Position>
              <Description>
                전산분대장으로 임무를 수행하며 분대원 지도 및 신병 교육을 담당했습니다.
                KCTC(한국전투훈련단) 및 호국훈련 등 주요 연합훈련에 참여하여 실전 역량을 쌓았으며,
                KCTC 훈련에서 우수한 성과로 사단장 표창을 수상했습니다. 
                극한 상황에서의 문제해결 능력과 강인한 정신력, 리더십 역량을 개발했습니다.
              </Description>
              <Achievements>
                <li>전산분대장 역임으로 분대원 지도 및 신병 교육 담당</li>
                <li>KCTC(한국전투훈련단) 및 호국훈련 등 주요 연합훈련 참여</li>
                <li>KCTC 훈련 우수 성과로 사단장 표창 수상</li>
                <li>극한 상황에서의 문제해결 능력과 강인한 정신력 개발</li>
                <li>리더십 역량 및 조직 관리 능력 향상</li>
              </Achievements>
            </TimelineItem>

            <TimelineItem>
              <Period>2019.02 - 2019.08</Period>
              <Company>영등포 청년건축단</Company>
              <Position>건축 기술 습득 및 봉사활동</Position>
              <Description>
                도배 및 소규모 수리 기술 습득을 통한 실무 기초 역량을 구축했습니다.
                저소득층 어르신을 대상으로 한 무료 주거환경 개선 봉사활동에 참여하며
                직접적인 공간 개선 작업을 통해 인테리어 디자인에 대한 관심과 사명감을 형성했습니다.
              </Description>
              <Achievements>
                <li>도배 및 소규모 수리 기술 실무 역량 구축</li>
                <li>저소득층 어르신 대상 무료 주거환경 개선 봉사활동 참여</li>
                <li>현장 실무 경험을 바탕으로 한 공간의 기능성과 거주자 만족도 이해 증진</li>
                <li>인테리어 디자인에 대한 관심과 사회적 사명감 형성</li>
              </Achievements>

            </TimelineItem>
            
            <TimelineItem>
              <Period>2020.05 - 2020.11</Period>
              <Company>LH 한국토지주택공사 도시재생 청년인턴</Company>
              <Position>도시재생사업 지원</Position>
              <Description>
                독산동 우시장 일대 도시재생활성화계획 수립 및 실행을 지원했습니다.
                주민 역량 강화를 위한 마을기록단 양성 교육 프로그램 기획 및 운영을 보조하고,
                지역 공동체 활성화를 위한 다양한 주민 참여형 프로그램을 기획·추진했습니다.
              </Description>
              <Achievements>
                <li>독산동 우시장 역사·문화 아카이빙 영상 제작 및 편집 담당</li>
                <li>'이웃만들기' 등 주민 참여형 프로그램 기획·추진</li>
                <li>마을기록단 양성 교육 프로그램 기획 및 운영 보조</li>
                <li>지역 주민과의 소통을 통한 참여형 도시계획 프로세스 경험</li>
              </Achievements>

            </TimelineItem>
            
            <TimelineItem>
              <Period>2021.03 - 2022.02</Period>
              <Company>LH 한국토지주택공사(계약직)</Company>
              <Position>토지보상 업무</Position>
              <Description>
                남양주 왕숙1지구 2구역(진관리·신원리) 토지보상 업무를 전담했습니다.
                공익사업을 위한 토지 등의 취득 및 보상에 관한 법률 등 관련 법규를 숙지하고 
                보상 대상자를 대상으로 보상 절차 및 기준 안내, 상담 업무를 수행했습니다.
              </Description>
              <Achievements>
                <li>감정평가사와 협업하여 지장물 조사, 영업손실 조사 등 현장 업무 담당</li>
                <li>우수한 업무 성과로 계약 기간 3개월 연장</li>
                <li>보상계약 체결 업무까지 확대 수행</li>
                <li>토지보상 관련 법규 및 실무 프로세스 전문성 확보</li>
              </Achievements>

            </TimelineItem>
            
            <TimelineItem>
              <Period>2022.05 - 현재</Period>
              <Company>전문 역량 강화 및 미래 준비 기간</Company>
              <Position>자기계발 및 전문성 향상</Position>
              <Description>
                실내건축기사 자격 취득을 통해 공간 설계에 대한 체계적인 이론 지식과 법규 이해를 완성했습니다.
                차세대 AI 도구 활용 능력 습득을 통해 업무 효율성을 혁신적으로 향상시켰으며,
                체계적 독서 습관과 영어 회화 능력 향상을 통해 종합적 역량을 확장했습니다.
              </Description>
              <Achievements>
                <li>실내건축기사 자격 취득을 통한 공간 설계 이론 지식 이해 완성</li>
                <li>ChatGPT, Claude, Midjourney 등 최신 AI 기술을 활용한 업무 프로세스 최적화</li>
                <li>연간 50권 이상 독서를 통한 자기계발, 심리학, 경영학, 사회학 등 다양한 분야 지식 축적</li>
                <li>기초 영어 회화 능력 향상을 통한 글로벌 정보 접근성 확보</li>
                <li>자기관리 및 지속적 성장 마인드셋 확립</li>
              </Achievements>

            </TimelineItem>
          </Timeline>
        </Content>
      </Container>
    </>
  );
} 