import React, { useState } from 'react';
import styled from 'styled-components';

const designSkills = [
  { 
    name: 'AutoCAD', 
    icon: '/icons/autocad.png', 
    percent: 90, 
    desc: '도면 작업 및 설계에 능숙합니다.',
    detailDesc: '2D 도면 작성부터 3D 모델링까지 전문적으로 다룰 수 있습니다. 건축 도면, 평면도, 입면도, 단면도 작성이 가능하며, 레이어 관리와 블록 활용을 통한 효율적인 작업이 가능합니다. 또한 AutoLISP를 활용한 자동화 작업도 경험이 있습니다.'
  },
  { 
    name: 'SketchUp', 
    icon: '/icons/sketchup.png', 
    percent: 85, 
    desc: '3D 모델링 및 렌더링이 가능합니다.',
    detailDesc: '실내외 공간의 3D 모델링과 V-Ray를 활용한 포토리얼리스틱 렌더링이 가능합니다. 컴포넌트와 그룹을 활용한 효율적인 모델링, 재질 적용, 조명 설정을 통해 클라이언트에게 직관적인 시각화 자료를 제공할 수 있습니다.'
  },
  { 
    name: 'Photoshop', 
    icon: '/icons/photoshop.png', 
    percent: 80, 
    desc: '이미지 보정 및 프레젠테이션 작업에 활용합니다.',
    detailDesc: '렌더링 이미지의 후보정, 프레젠테이션 보드 제작, 텍스처 편집 등의 작업이 가능합니다. 레이어 마스크, 블렌딩 모드, 필터 효과를 활용하여 전문적인 포트폴리오와 제안서를 제작할 수 있습니다.'
  },
  { 
    name: 'Revit', 
    icon: '/icons/revit.png', 
    percent: 70, 
    desc: 'BIM 설계 경험이 있습니다.',
    detailDesc: 'Building Information Modeling을 통한 통합 설계가 가능합니다. 패밀리 제작, 매개변수 설정, 스케줄 작성 등 BIM의 핵심 기능을 활용할 수 있으며, 다른 BIM 소프트웨어와의 연동 작업도 경험이 있습니다.'
  },
  { 
    name: 'Illustrator', 
    icon: '/icons/illustrator.png', 
    percent: 75, 
    desc: '벡터 그래픽 디자인 및 로고 제작이 가능합니다.',
    detailDesc: '프레젠테이션용 다이어그램, 평면도 심볼, 로고 디자인 등 벡터 기반 그래픽 작업을 전문적으로 다룰 수 있습니다. 패스파인더, 그라데이션 메시, 심볼 라이브러리 등을 활용하여 정확하고 확장 가능한 그래픽을 제작합니다.'
  },
];

const aiSkills = [
  { 
    name: 'ChatGPT', 
    icon: 'chatgpt',
    percent: 85, 
    desc: 'AI 기반 텍스트 생성 및 업무 자동화에 활용합니다.',
    detailDesc: '프로젝트 기획서 작성, 클라이언트 제안서 초안 작성, 아이디어 브레인스토밍 등에 활용하여 업무 효율성을 크게 향상시켰습니다. 프롬프트 엔지니어링을 통해 정확하고 전문적인 결과물을 얻을 수 있습니다.'
  },
  { 
    name: 'Midjourney', 
    icon: 'midjourney',
    percent: 75, 
    desc: 'AI 이미지 생성을 통한 컨셉 시각화가 가능합니다.',
    detailDesc: '초기 디자인 컨셉 개발, 무드보드 제작, 클라이언트 프레젠테이션용 이미지 생성에 활용합니다. 다양한 스타일과 매개변수를 조합하여 프로젝트에 맞는 고품질 이미지를 생성할 수 있습니다.'
  },
  { 
    name: 'Stable Diffusion', 
    icon: 'stablediffusion',
    percent: 65, 
    desc: '로컬 AI 이미지 생성 및 커스터마이징이 가능합니다.',
    detailDesc: '로컬 환경에서 AI 이미지 생성을 통해 더 세밀한 제어가 가능합니다. ControlNet, LoRA 등의 확장 기능을 활용하여 특정 스타일이나 요구사항에 맞는 이미지를 생성할 수 있습니다.'
  },
  { 
    name: 'Claude AI', 
    icon: 'claude',
    percent: 80, 
    desc: '복잡한 분석 및 문서 작업에 활용합니다.',
    detailDesc: '긴 문서 분석, 코드 리뷰, 복잡한 프로젝트 계획 수립 등에 활용합니다. 논리적 사고와 창의적 문제 해결이 필요한 업무에서 뛰어난 성능을 발휘합니다.'
  },
  { 
    name: 'DALL-E', 
    icon: 'dalle',
    percent: 70, 
    desc: 'OpenAI의 이미지 생성 AI로 창의적 시각화 작업에 활용합니다.',
    detailDesc: '텍스트 프롬프트를 통한 고품질 이미지 생성으로 초기 컨셉 스케치, 아이디어 시각화, 클라이언트 프레젠테이션 자료 제작에 활용합니다. 특히 추상적인 개념을 구체적인 이미지로 변환하는 작업에 뛰어난 성능을 보입니다.'
  },
  { 
    name: 'Runway ML', 
    icon: 'runway',
    percent: 60, 
    desc: 'AI 기반 비디오 편집 및 생성 도구입니다.',
    detailDesc: '프로젝트 프레젠테이션용 동영상 제작, 공간 워크스루 영상 생성, 타임랩스 효과 등 다양한 비디오 콘텐츠 제작에 활용합니다. AI를 활용한 자동 편집 기능으로 효율적인 영상 제작이 가능합니다.'
  },
  { 
    name: 'Gamma', 
    icon: 'gamma',
    percent: 75, 
    desc: 'AI 기반 프레젠테이션 제작 도구입니다.',
    detailDesc: '클라이언트 제안서, 프로젝트 발표 자료, 포트폴리오 프레젠테이션을 AI의 도움으로 빠르고 전문적으로 제작할 수 있습니다. 자동 레이아웃 생성과 디자인 제안 기능을 통해 시각적으로 완성도 높은 자료를 만들 수 있습니다.'
  },
];

const MainContainer = styled.div`
  margin: 4rem 0;
`;

const MainTitle = styled.h1`
  text-align: center;
  color: #1A202C;
  font-size: 3rem;
  margin-bottom: 4rem;
  text-shadow: 0 2px 10px rgba(26, 32, 44, 0.2);
`;

const SkillsSection = styled.section`
  margin: 3rem 0;
  
  h2 {
    text-align: left;
    color: #2D3748;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(45, 55, 72, 0.2);
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
      border-radius: 2px;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCard = styled.div<{ expanded: boolean }>`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(160, 174, 192, 0.3);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: ${({ expanded }) => expanded ? 'auto' : '280px'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.4);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const SkillIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.15));
  transition: all 0.3s ease;
  
  ${SkillCard}:hover & {
    transform: scale(1.1);
  }
`;

const AIIcon = styled.div<{ iconType: string }>`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem auto;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.15));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  background: ${({ iconType }) => {
    switch (iconType) {
      case 'chatgpt':
        return 'linear-gradient(135deg, #10A37F 0%, #1A7F64 100%)';
      case 'midjourney':
        return 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)';
      case 'stablediffusion':
        return 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
      case 'claude':
        return 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)';
      case 'dalle':
        return 'linear-gradient(135deg, #FF4081 0%, #E91E63 100%)';
      case 'runway':
        return 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)';
      case 'gamma':
        return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
      default:
        return 'linear-gradient(135deg, #7B9A6D 0%, #2C5530 100%)';
    }
  }};
  
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
  
  ${SkillCard}:hover & {
    transform: scale(1.1);
  }
  
  ${SkillCard}:hover &:before {
    left: 100%;
  }
`;

const getAIIconContent = (iconType: string) => {
  switch (iconType) {
    case 'chatgpt':
      return '🤖';
    case 'midjourney':
      return '🎨';
    case 'stablediffusion':
      return '⚡';
    case 'claude':
      return '🧠';
    case 'dalle':
      return '🖼️';
    case 'runway':
      return '🎬';
    case 'gamma':
      return '📊';
    default:
      return '🔮';
  }
};

const SkillName = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2D3748;
`;

const SkillBarContainer = styled.div`
  background: rgba(160, 174, 192, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 20px;
  position: relative;
`;

const SkillLevel = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  border-radius: 10px;
  position: relative;
  transition: width 1s ease-in-out;
`;

const PercentageLabel = styled.div<{ percent: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ percent }) => percent > 30 ? 'white' : '#2D3748'};
  font-weight: 700;
  font-size: 0.9rem;
  text-shadow: ${({ percent }) => percent > 30 ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)'};
  z-index: 2;
  pointer-events: none;
`;

const SkillDescription = styled.div`
  font-size: 0.9rem;
  color: #2D3748;
  line-height: 1.5;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const DetailDescription = styled.div<{ show: boolean }>`
  font-size: 0.8rem;
  color: #2D3748;
  line-height: 1.4;
  text-align: left;
  background: rgba(102, 126, 234, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  max-height: ${({ show }) => show ? '200px' : '0'};
  opacity: ${({ show }) => show ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const MoreButton = styled.button`
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const renderSkillSection = (skills: any[], sectionTitle: string, expandedCards: any, toggleExpand: any) => (
  <SkillsSection className="slide-up">
    <h2 className="bounce-in">{sectionTitle}</h2>
    <SkillsGrid>
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.name} 
          expanded={expandedCards[skill.name] || false}
          className="slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {sectionTitle === 'AI 기술' ? (
            <AIIcon iconType={skill.icon}>
              {getAIIconContent(skill.icon)}
            </AIIcon>
          ) : (
            <SkillIcon src={skill.icon} alt={skill.name} />
          )}
          <SkillName>{skill.name}</SkillName>
          <SkillBarContainer>
            <SkillLevel percent={skill.percent} />
            <PercentageLabel percent={skill.percent}>
              {skill.percent}%
            </PercentageLabel>
          </SkillBarContainer>
          <SkillDescription>{skill.desc}</SkillDescription>
          <MoreButton onClick={() => toggleExpand(skill.name)}>
            {expandedCards[skill.name] ? '간단히 보기' : '상세보기'}
          </MoreButton>
          <DetailDescription show={expandedCards[skill.name] || false}>
            {skill.detailDesc}
          </DetailDescription>
        </SkillCard>
      ))}
    </SkillsGrid>
  </SkillsSection>
);

export default function Skills() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (skillName: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  return (
    <MainContainer>
      <MainTitle>나의 기술</MainTitle>
      {renderSkillSection(designSkills, '디자인 스킬', expandedCards, toggleExpand)}
      {renderSkillSection(aiSkills, 'AI 기술', expandedCards, toggleExpand)}
    </MainContainer>
  );
} 