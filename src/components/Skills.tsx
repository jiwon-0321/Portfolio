import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  percent: number;
  desc: string;
  detailDesc: string;
}

const designTools = [
  { 
    name: 'AutoCAD', 
    icon: '/icons/autocad.png', 
    percent: 80, 
    desc: '도면 작업 및 설계에 능숙합니다.',
    detailDesc: 'AutoCAD 프로그램에 능숙하여 건축 설계 도면 작업을 전문적으로 수행합니다. 평면도, 단면도, 천정도 작성은 물론, 치수 표기, 문자 입력, 블록 및 심볼 활용, 레이어 체계 구성, 해치 패턴 적용 등 도면 완성에 필요한 모든 요소를 정확하고 신속하게 처리할 수 있습니다.'
  },
  { 
    name: 'SketchUp', 
    icon: '/icons/sketchup.png', 
    percent: 90, 
    desc: '3D 모델링 및 렌더링이 가능합니다.',
    detailDesc: 'SketchUp을 능숙하게 다루어 복잡한 3D 모델링과 공간 시각화 작업을 수행합니다. 정밀한 모델링, 고급 컴포넌트 활용, 플러그인 사용, Layout을 통한 도면 작성, 엔스케이프 등 렌더링 프로그램 연동을 통해 포토리얼리스틱한 결과물을 제작할 수 있습니다.\n\n• 포트폴리오 제작\n\n• 개인 주거공간 리모델링 시뮬레이션 (가구 배치 및 동선 검토)'
  },
];

const renderingTools = [
  { 
    name: 'Photoshop', 
    icon: '/icons/photoshop.png', 
    percent: 80, 
    desc: '이미지 보정 및 프레젠테이션 작업에 활용합니다.',
    detailDesc: '렌더링 이미지의 후보정, 프레젠테이션 보드 제작, 텍스처 편집 등의 작업이 가능합니다. 레이어 마스크, 블렌딩 모드, 필터 효과를 활용하여 전문적인 포트폴리오와 제안서를 제작할 수 있습니다.'
  },
  { 
    name: 'V-Ray', 
    icon: '/icons/vray.png', 
    percent: 60, 
    desc: '고품질 렌더링 및 재질 작업이 가능합니다.',
    detailDesc: '재질을 만들거나 외부 사이트를 통해 적용하고 고화질의 랜더링 사진을 만들 수 있습니다.'
  },
  { 
    name: 'Enscape', 
    icon: '/icons/enscape.png', 
    percent: 85, 
    desc: '실시간 렌더링 및 VR 시각화가 가능합니다.',
    detailDesc: 'Enscape를 활용하여 SketchUp 모델을 실시간으로 렌더링하고, 고객에게 즉각적인 시각적 피드백을 제공할 수 있습니다. VR 헤드셋을 연동하여 가상 공간을 직접 체험하는 듯한 몰입감 높은 프레젠테이션을 진행할 수 있습니다.'
  },
];

const llmSkills: Skill[] = [
  { 
    name: 'ChatGPT', 
    icon: 'chatgpt',
    percent: 85, 
    desc: 'AI 기반 텍스트 생성 및 업무 자동화에 활용합니다.',
    detailDesc: '프로젝트 기획서 작성, 클라이언트 제안서 초안 작성, 아이디어 브레인스토밍 등에 활용하여 업무 효율성을 크게 향상시켰습니다. 프롬프트 엔지니어링을 통해 정확하고 전문적인 결과물을 얻을 수 있습니다.'
  },
  { 
    name: 'Claude AI', 
    icon: 'claude',
    percent: 80, 
    desc: '복잡한 분석 및 문서 작업에 활용합니다.',
    detailDesc: '긴 문서 분석, 코드 리뷰, 복잡한 프로젝트 계획 수립 등에 활용합니다. 논리적 사고와 창의적 문제 해결이 필요한 업무에서 뛰어난 성능을 발휘합니다.'
  },
  { 
    name: 'Gemini', 
    icon: 'gemini',
    percent: 75, 
    desc: 'Google의 멀티모달 AI로 다양한 창의적 작업에 활용합니다.',
    detailDesc: '텍스트, 이미지, 코드 등 다양한 종류의 정보를 이해하고 생성하는 능력을 활용하여 복합적인 문제 해결에 사용합니다. 아이디어 구상부터 콘텐츠 생성, 코드 작성까지 다방면으로 활용하여 생산성을 높입니다.'
  },
];

const generationSkills: Skill[] = [
  { 
    name: 'Midjourney', 
    icon: 'midjourney',
    percent: 75, 
    desc: 'AI 이미지 생성을 통한 컨셉 시각화가 가능합니다.',
    detailDesc: '초기 디자인 컨셉 개발, 무드보드 제작, 클라이언트 프레젠테이션용 이미지 생성에 활용합니다. 다양한 스타일과 매개변수를 조합하여 프로젝트에 맞는 고품질 이미지를 생성할 수 있습니다.'
  },
  { 
    name: 'Runway ML', 
    icon: 'runway',
    percent: 60, 
    desc: 'AI 기반 비디오 편집 및 생성 도구입니다.',
    detailDesc: '프로젝트 프레젠테이션용 동영상 제작, 공간 워크스루 영상 생성, 타임랩스 효과 등 다양한 비디오 콘텐츠 제작에 활용합니다. AI를 활용한 자동 편집 기능으로 효율적인 영상 제작이 가능합니다.'
  },
  { 
    name: 'Suno', 
    icon: 'suno',
    percent: 70, 
    desc: 'AI를 활용한 음악 생성 및 작곡',
    detailDesc: 'Suno를 이용해 다양한 장르와 스타일의 음악을 생성합니다. 프로젝트 배경음악, 효과음 제작 등에 활용하여 콘텐츠의 완성도를 높입니다.'
  },
];

const searchSkills: Skill[] = [
  { 
    name: 'Perplexity AI', 
    icon: 'perplexity',
    percent: 70, 
    desc: '대화형 AI 검색 엔진으로 리서치와 정보 탐색에 활용합니다.',
    detailDesc: '정확한 출처를 기반으로 정보를 요약하고 질문에 답변해주어, 프로젝트 관련 리서치, 최신 트렌드 분석, 기술 자료 탐색 시간을 단축합니다. 신뢰도 높은 정보를 바탕으로 기획의 깊이를 더합니다.'
  },
  { 
    name: 'Genspark', 
    icon: 'genspark',
    percent: 70, 
    desc: 'AI 기반 검색 및 아이디어 생성',
    detailDesc: 'Genspark를 통해 아이디어를 구체화하고 관련 정보를 종합하여 새로운 프로젝트 계획을 수립합니다. 리서치 초기 단계에서 인사이트를 얻는 데 효과적입니다.'
  },
];

const codeAssistantSkills: Skill[] = [
  { 
    name: 'Cursor', 
    icon: 'cursor',
    percent: 80, 
    desc: 'AI 코드 에디터를 활용한 개발 생산성 향상',
    detailDesc: 'AI 페어 프로그래밍을 통해 코드 작성, 리팩토링, 디버깅 작업을 가속화하고, 복잡한 로직을 빠르게 구현하여 코드 품질을 높입니다.'
  },
];

const presentationSkills: Skill[] = [
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
  object-fit: cover;
  object-position: center;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.15));
  transition: all 0.3s ease;
  border-radius: 8px;
  
  ${SkillCard}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 12px rgba(102, 126, 234, 0.25));
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
      case 'perplexity':
        return 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)';
      case 'claude':
        return 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)';
      case 'gemini':
        return 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)';
      case 'runway':
        return 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)';
      case 'gamma':
        return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
      case 'cursor':
        return 'linear-gradient(135deg, #17B2F1 0%, #1788F1 100%)';
      case 'suno':
        return 'linear-gradient(135deg, #FF6B6B 0%, #D43D3D 100%)';
      case 'genspark':
        return 'linear-gradient(135deg, #6BFFB8 0%, #3DD48D 100%)';
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
    case 'perplexity':
      return '❓';
    case 'claude':
      return '🧠';
    case 'gemini':
      return '✨';
    case 'runway':
      return '🎬';
    case 'gamma':
      return '📊';
    case 'cursor':
      return '🖱️';
    case 'suno':
      return '🎵';
    case 'genspark':
      return '💡';
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
  opacity: ${({ show }) => (show ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: pre-wrap;
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

const renderSkillSection = (skills: Skill[], sectionTitle: string, expandedCards: any, toggleExpand: any) => (
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
          {sectionTitle.startsWith('AI') || sectionTitle === 'LLM' ? (
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
            {expandedCards[skill.name] ? '닫기' : '상세보기'}
          </MoreButton>
          <AnimatePresence>
            {expandedCards[skill.name] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
          <DetailDescription show={expandedCards[skill.name] || false}>
            {skill.detailDesc}
          </DetailDescription>
              </motion.div>
            )}
          </AnimatePresence>
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
      <MainTitle>My Skills</MainTitle>
      {renderSkillSection(designTools, 'Design Tools', expandedCards, toggleExpand)}
      {renderSkillSection(renderingTools, 'Rendering & Image Correction', expandedCards, toggleExpand)}
      {renderSkillSection(llmSkills, 'LLM', expandedCards, toggleExpand)}
      {renderSkillSection(generationSkills, 'AI Content Generation', expandedCards, toggleExpand)}
      {renderSkillSection(searchSkills, 'AI Search & Multitool', expandedCards, toggleExpand)}
      {renderSkillSection(codeAssistantSkills, 'AI Development Tools', expandedCards, toggleExpand)}
    </MainContainer>
  );
} 