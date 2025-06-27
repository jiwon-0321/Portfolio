import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  percent: number;
  desc: string;
  detailDesc: string;
  detailItems?: {
    title: string;
    content: string;
    image?: string;
    imageCaption?: string;
  }[];
}

const designTools = [
  { 
    name: 'AutoCAD', 
    icon: '/icons/autocad.png', 
    percent: 85, 
    desc: '도면 작업 및 설계에 능숙합니다.',
    detailDesc: '• 공간 실측 후 건축 설계 도면 작성\n\n• 기존 건물 리모델링을 위한 현황도 및 변경도면 제작'
  },
  { 
    name: 'SketchUp', 
    icon: '/icons/sketchup.png', 
    percent: 90, 
    desc: '3D 모델링 및 렌더링이 가능합니다.',
    detailDesc: '• 포트폴리오 제작\n\n• 개인 주거공간을 스케치업으로 설계 모델링한 후 시공업체와 협업하여 공간 개선 작업을 진행'
  },
    { 
    name: 'Khroma', 
    icon: '/icons/photoshop.png',
    percent: 80,
    desc: 'AI 색상 도구를 활용한 팔레트 생성이 가능합니다.',
    detailDesc: '• 웹사이트를 위한 브랜드 컬러 팔레트 생성\n\n• 포트폴리오 및 자료 제작을 위한 조화로운 색상 조합 발굴\n\n• 개인 패션 코디네이션을 위한 색상 조합 참고',
    detailItems: [
      {
        title: '웹사이트를 위한 브랜드 컬러 팔레트 생성',
        content: '🎨 네이비 블루 + 웜 화이트 + 피치 악센트\n\n🧩 콘셉트\n신뢰감과 따뜻함을 동시에 전달하는 전문가용 포트폴리오 색조합\n\n🧠 신경과학적 심리효과\n• 네이비: 전전두엽 자극 → 집중력과 신뢰 유도\n• 웜 화이트 + 피치: 편도체 활성 → 긍정적 정서 유발, 접근성 향상\n\n🗂️ 색상 비율 및 코드\n• 배경 (60%): 웜 화이트 #FAF9F6\n• 텍스트/프레임 (30%): 네이비 #2C3E50\n• 강조 요소 (10%): 피치 #F5A89F\n\n📝 적합성 요약\n• 전문성: 네이비는 고신뢰 분야에서 널리 사용\n• 감성 연결: 피치톤은 사용자와의 정서적 거리 축소\n• 포트폴리오 활용성: 실내건축 분야의 창의성과 신뢰 모두에 부합'
      },
      {
        title: '포트폴리오 및 자료 제작을 위한 조화로운 색상 조합 발굴',
        content: ''
      },
      {
        title: '개인 패션 코디네이션을 위한 색상 조합 참고',
        content: ''
      }
    ]
  },
];

const renderingTools = [
  { 
    name: 'Photoshop', 
    icon: '/icons/photoshop.png', 
    percent: 70, 
    desc: '이미지 보정 및 프레젠테이션 작업에 활용합니다.',
    detailDesc: '• 사진 리터칭 및 그래픽 디자인 기본 기능 숙달'
  },
  { 
    name: 'V-Ray', 
    icon: '/icons/vray.png', 
    percent: 70, 
    desc: '고품질 렌더링 및 재질 작업이 가능합니다.',
    detailDesc: '• 3D 모델링 후 기본 렌더링 및 시각화 작업 가능'
  },
  { 
    name: 'Enscape', 
    icon: '/icons/sketchup.png', 
    percent: 90, 
    desc: '실시간 렌더링 및 VR 시각화가 가능합니다.',
    detailDesc: '• 포트폴리오용 고품질 렌더링 이미지 제작\n\n• 개인 공간을 리모델링 할 때 현장에서 노트북으로 프로그램을 사용하여 실시간 렌더링 및 소통'
  },
];

const llmSkills: Skill[] = [
  { 
    name: 'ChatGPT', 
    icon: 'chatgpt',
    percent: 90, 
    desc: 'AI 기반 텍스트 생성 및 업무 자동화에 활용합니다.',
    detailDesc: '프로젝트 기획서 작성, 클라이언트 제안서 초안 작성, 아이디어 브레인스토밍 등에 활용하여 업무 효율성을 크게 향상시켰습니다. 프롬프트 엔지니어링을 통해 정확하고 전문적인 결과물을 얻을 수 있습니다.',
    detailItems: [
      {
        title: '개인 맞춤형 GPTs 개발 (논문 검색, 영어 학습, 토론 연습용등)',
        content: '🔍 논문 검색 GPT\n논문 제목, 저자, 키워드를 입력하면 관련 논문들을 체계적으로 검색하고 요약해주는 GPT를 개발했습니다. 학술 연구 효율성을 크게 향상시켰습니다.\n\n💬 영어 학습 GPT\n개인 수준에 맞춘 영어 대화 연습, 문법 교정, 어휘 확장을 제공하는 맞춤형 영어 튜터 GPT를 구축했습니다.\n\n🗣️ 토론 연습 GPT\n다양한 주제에 대해 체계적인 토론 연습을 도와주는 GPT로, 논리적 사고력과 설득력 향상에 활용하고 있습니다.',
        image: '/images/gpts.png'
      },
      {
        title: '호텔 설계 포트폴리오 제작 시 프로젝트 기능을 통해 전반적인 피드백 및 신경건축학 이론 적용, 다양한 이미지 생성',
        content: '🏨 바이오필릭 호텔 프로젝트 피드백\nChatGPT의 프로젝트 기능을 활용하여 호텔 설계 전반에 대한 종합적인 피드백을 받았습니다. 공간 구성, 동선 계획, 기능성 등을 다각도로 분석했습니다.\n\n🧠 신경건축학 이론 적용\n공간이 인간의 심리와 행동에 미치는 영향을 분석하고, 신경건축학 관점에서 설계 요소들을 검토하여 더욱 인간 중심적인 공간을 설계했습니다.\n\n🎨 이미지 생성 및 시각화\nDALL-E 연동을 통해 컨셉 이미지, 야간모드, 가구 이미지를 생성하여 설계 아이디어를 구체화했습니다.',
        image: '/images/project.png'
      },
      {
        title: '비전 기능을 통한 유명 건축물 실시간 분석 및 해설',
        content: ''
      }
    ]
  },
  { 
    name: 'Claude AI', 
    icon: 'claude',
    percent: 90, 
    desc: '복잡한 분석 및 문서 작업에 활용합니다.',
    detailDesc: '',
    detailItems: [
      {
        title: 'MCP(Model Context Protocol)를 통한 File system 및 Notion 워크스페이스 등 다양한 프로그램 연동을 통해 자동화 및 기능 극대화',
        content: 'MCP를 활용하여 파일 시스템과 Notion 워크스페이스를 비롯한 다양한 외부 프로그램과의 연동을 구현했습니다. 이를 통해 작업 프로세스를 자동화하고 Claude AI의 기능을 극대화하여 생산성을 크게 향상시켰습니다.',
        image: '/images/claude.png'
      },
      {
        title: '작문 및 문서 작성 시 Claude를 활용한 첨삭 및 피드백',
        content: ''
      }
    ]
  },
  { 
    name: 'Gemini', 
    icon: 'gemini',
    percent: 90, 
    desc: 'Google의 멀티모달 AI로 다양한 창의적 작업에 활용합니다.',
    detailDesc: '텍스트, 이미지, 코드 등 다양한 종류의 정보를 이해하고 생성하는 능력을 활용하여 복합적인 문제 해결에 사용합니다. 아이디어 구상부터 콘텐츠 생성, 코드 작성까지 다방면으로 활용하여 생산성을 높입니다.',
    detailItems: [
      {
        title: 'Veo 3를 통한 동영상 콘텐츠 생성',
        content: ''
      },
      {
        title: 'Gemini 2.5 Pro Deep Research 기능을 활용한 고품질 논문 및 학술 정보 탐색',
        content: ''
      },
      {
        title: 'Google AI Studio Stream를 통해 실시간으로 화면을 공유하고 문제 해결',
        content: ''
      }
    ]
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
    name: 'Perplexity', 
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
  {
    name: 'Scispace',
    icon: 'scispace',
    percent: 70,
    desc: 'AI 기반 연구 및 논문 분석 보조',
    detailDesc: 'Scispace를 사용하여 방대한 양의 논문을 빠르게 분석하고, 주요 내용을 요약하며, 관련 연구를 탐색하여 연구 효율성을 극대화합니다.'
  }
];

const codeAssistantSkills: Skill[] = [
  { 
    name: 'Cursor', 
    icon: 'cursor',
    percent: 80, 
    desc: 'AI 코드 에디터를 활용한 개발 생산성 향상',
    detailDesc: 'AI 페어 프로그래밍을 통해 코드 작성, 리팩토링, 디버깅 작업을 가속화하고, 복잡한 로직을 빠르게 구현하여 코드 품질을 높입니다.',
    detailItems: [
      {
        title: '바이브 코딩(Vibe Coding) 방식으로 현재 포트폴리오 웹사이트 제작',
        content: '🎨 바이브 코딩 접근법\n직관적이고 창의적인 바이브 코딩 방식을 통해 현재 보고 계신 포트폴리오 웹사이트를 제작했습니다. AI와의 자연스러운 대화를 통해 아이디어를 즉시 코드로 구현하는 새로운 개발 패러다임을 경험했습니다.\n\n🚀 개발 과정\n• 아이디어 구상과 동시에 실시간 코드 생성\n• 자연어로 기능 요청 후 즉시 구현\n• 반복적인 수정과 개선을 통한 완성도 향상\n• AI와의 협업을 통한 창의적 문제 해결\n\n⚡ 성과\n• 기존 대비 80% 빠른 개발 속도\n• 복잡한 애니메이션과 인터랙션 손쉽게 구현\n• 코드 품질과 가독성 동시 확보\n\n',
        image: '/images/cursor.png',
        imageCaption: '💻 실제 개발 화면'
      },
      {
        title: 'Playwright MCP 통합을 활용해 웹 크롤링 자동화 도구 사용 가능',
        content: '🤖 Playwright MCP 통합\nCursor의 MCP(Model Context Protocol) 기능과 Playwright를 연동하여 웹 크롤링 및 자동화 작업을 효율적으로 수행합니다.\n\n🛠️ 활용 분야\n• 웹사이트 정보 자동 수집\n• UI/UX 테스트 자동화\n• 웹 애플리케이션 성능 모니터링\n• 반복 작업 자동화\n\n📊 효과\n• 수동 작업 시간 90% 단축\n• 정확하고 일관된 데이터 수집\n• 실시간 웹사이트 모니터링 가능\n• 복잡한 웹 인터랙션 자동화'
      }
    ]
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

const aiMarketingSkills: Skill[] = [
  {
    name: 'Lily AI',
    icon: 'lilys',
    percent: 65,
    desc: '이커머스 상품 추천 및 검색 최적화',
    detailDesc: 'Lily AI를 활용하여 고객의 언어를 이해하고, 제품 속성을 자동으로 태깅하여 검색 정확도와 추천 개인화를 향상시킵니다.'
  }
];

const MainContainer = styled.div`
  margin: 4rem 0;
`;

const MainTitle = styled.h1`
  text-align: center;
  color: #2C3E50;
  font-size: 2.8rem;
  margin-bottom: 4rem;
  text-shadow: 0 2px 10px rgba(44, 62, 80, 0.2);
`;

const SkillsSection = styled.section`
  margin: 3rem 0;
  
  h2 {
    text-align: left;
    color: #2C3E50;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.2);
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
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
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(245, 168, 159, 0.3);
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
    background: linear-gradient(90deg, transparent, rgba(245, 168, 159, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(245, 168, 159, 0.15);
    border-color: rgba(245, 168, 159, 0.4);
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
  font-size: 1.7rem;
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
      case 'khroma':
        return 'linear-gradient(135deg, #F766AD 0%, #F73A8A 100%)';
      case 'lilys':
        return 'linear-gradient(135deg, #A076F9 0%, #8142F6 100%)';
      case 'scispace':
        return 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)';
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
    case 'khroma':
      return '🎨';
    case 'lilys':
      return '🛍️';
    case 'scispace':
      return '🔬';
    default:
      return '🔮';
  }
};

const SkillName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #2C3E50;
`;

const SkillBarContainer = styled.div`
  background: rgba(245, 168, 159, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 20px;
  position: relative;
`;

const SkillLevel = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  border-radius: 10px;
  position: relative;
  transition: width 1s ease-in-out;
`;

const PercentageLabel = styled.div<{ percent: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${({ percent }) => percent > 30 ? 'white' : '#2C3E50'};
  font-weight: 700;
  font-size: 0.8rem;
  text-shadow: ${({ percent }) => percent > 30 ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)'};
  z-index: 2;
  pointer-events: none;
`;

const SkillDescription = styled.div`
  font-size: 0.85rem;
  color: #2C3E50;
  line-height: 1.5;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const DetailDescription = styled.div<{ show: boolean }>`
  font-size: 0.75rem;
  color: #2C3E50;
  line-height: 1.4;
  text-align: left;
  background: rgba(245, 168, 159, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  opacity: ${({ show }) => (show ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: pre-wrap;
`;

const MoreButton = styled.button`
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 168, 159, 0.4);
  }
`;

const DetailItemContainer = styled.div`
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-left: 3px solid rgba(245, 168, 159, 0.5);
  background: rgba(245, 168, 159, 0.05);
  border-radius: 0 8px 8px 0;
`;

const DetailItemTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailToggleButton = styled.button`
  background: none;
  border: none;
  color: #F5A89F;
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #F2998E;
    transform: translateX(2px);
  }
`;

const DetailItemContent = styled.div`
  font-size: 0.75rem;
  color: #2C3E50;
  line-height: 1.4;
  white-space: pre-wrap;
  background: rgba(245, 168, 159, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const DetailItemImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.2);
  }
`;

const ImageModal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const ModalClose = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ModalTitle = styled.p`
  color: white;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const renderSkillSection = (skills: Skill[], sectionTitle: string, expandedCards: any, toggleExpand: any, detailExpandedCards: any, toggleDetailExpand: any, openImageModal: any) => (
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
            {expandedCards[skill.name] ? '닫기' : '활용 사례 보기'}
          </MoreButton>
          <AnimatePresence>
            {expandedCards[skill.name] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                {skill.detailItems ? (
                  <DetailItemContainer>
                    {skill.detailItems.map((item, itemIndex) => (
                      <DetailItem key={itemIndex}>
                        <DetailItemTitle>
                          • {item.title}
                          {item.content && (
                            <DetailToggleButton onClick={() => toggleDetailExpand(`${skill.name}-${itemIndex}`)}>
                              {detailExpandedCards[`${skill.name}-${itemIndex}`] ? '숨기기' : '자세히보기'}
                            </DetailToggleButton>
                          )}
                        </DetailItemTitle>
                        <AnimatePresence>
                          {item.content && detailExpandedCards[`${skill.name}-${itemIndex}`] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <DetailItemContent>
                                {item.content}
                                {item.image && (
                                  <div>
                                    {item.imageCaption && (
                                      <div style={{ 
                                        fontSize: '0.8rem', 
                                        fontWeight: '600', 
                                        color: '#2C3E50', 
                                        marginBottom: '0.5rem',
                                        textAlign: 'center'
                                      }}>
                                        {item.imageCaption}
                                      </div>
                                    )}
                                    <DetailItemImage 
                                      src={item.image} 
                                      alt={item.title}
                                      onClick={() => openImageModal(item.image!, item.title)}
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </DetailItemContent>  
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </DetailItem>
                    ))}
                  </DetailItemContainer>
                ) : (
                  <DetailItemContainer>
                    {skill.detailDesc.split('\n\n').map((item, itemIndex) => (
                      <DetailItem key={itemIndex}>
                        <DetailItemTitle>
                          {item.trim()}
                        </DetailItemTitle>
                      </DetailItem>
                    ))}
                  </DetailItemContainer>
                )}
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
  const [detailExpandedCards, setDetailExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const toggleExpand = (skillName: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const toggleDetailExpand = (detailKey: string) => {
    setDetailExpandedCards(prev => ({
      ...prev,
      [detailKey]: !prev[detailKey]
    }));
  };

  const openImageModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  // ESC 키로 모달 닫기
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeImageModal();
      }
    };
    
    if (modalImage) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  return (
    <MainContainer>
      <MainTitle>My Skills</MainTitle>
      {renderSkillSection(designTools, 'Design Tools', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(renderingTools, 'Rendering & Image Correction', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(llmSkills, 'LLM', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(generationSkills, 'Content Generation AI', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(searchSkills, 'Search & Multitool AI', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(codeAssistantSkills, 'Development Tools AI', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      {renderSkillSection(aiMarketingSkills, 'Summarization AI', expandedCards, toggleExpand, detailExpandedCards, toggleDetailExpand, openImageModal)}
      
      {/* 이미지 모달 */}
      <ImageModal show={!!modalImage} onClick={closeImageModal}>
        {modalImage && (
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={closeImageModal}>×</ModalClose>
            <ModalImage src={modalImage.src} alt={modalImage.alt} />
            <ModalTitle>{modalImage.alt}</ModalTitle>
          </ModalContent>
        )}
      </ImageModal>
    </MainContainer>
  );
} 