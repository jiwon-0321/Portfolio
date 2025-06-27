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
    desc: '정밀한 2D 도면 작성 전문 도구로, 평면도, 입면도, 단면도 등 모든 건축 도면을 체계적으로 제작합니다. 레이어 관리와 블록 라이브러리 활용으로 효율적이고 일관된 도면 작업이 가능합니다.',
    detailDesc: '• 공간 실측 후 건축 설계 도면 작성\n\n• 기존 건물 리모델링을 위한 현황도 및 변경도면 제작'
  },
  { 
    name: 'SketchUp', 
    icon: '/icons/sketchup.png', 
    percent: 90, 
    desc: '직관적인 3D 모델링으로 설계 아이디어를 빠르게 구현하고, 다양한 플러그인을 활용한 전문적인 모델링 작업을 수행합니다.',
    detailDesc: '• 포트폴리오 제작\n\n• 개인 주거공간을 스케치업으로 설계 모델링한 후 시공업체와 협업하여 공간 개선 작업을 진행'
  },
    { 
    name: 'Khroma', 
    icon: '/icons/khroma.png',
    percent: 80,
    desc: 'AI 기반 색상 분석으로 공간의 특성에 맞는 최적의 컬러 팔레트를 생성하고, 트렌드를 반영한 색채 조합을 제안합니다.',
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
    desc: '래스터 이미지 편집 소프트웨어로 레이어 기반 합성, 색상 보정, 필터 효과, 마스킹, 리터칭, 텍스트 편집 등 전문적인 이미지 처리 및 그래픽 디자인 작업을 지원합니다.',
    detailDesc: '• 사진 리터칭 및 그래픽 디자인 기본 기능 숙달'
  },
  { 
    name: 'V-Ray', 
    icon: '/icons/V-ray.jpg', 
    percent: 70, 
    desc: '사실적인 조명과 재질 표현으로 포토리얼리스틱 렌더링을 제작합니다. 글로벌 일루미네이션과 물리 기반 재질로 공간의 실제 분위기를 완벽히 재현합니다.',
    detailDesc: '• 3D 모델링 후 기본 렌더링 및 시각화 작업 가능'
  },
  { 
    name: 'Enscape', 
    icon: '/icons/enscape.png',
    percent: 90, 
    desc: '실시간 렌더링으로 즉각적인 디자인 검토가 가능하며, VR 기술을 통해 클라이언트가 직접 공간을 체험할 수 있는 몰입형 프레젠테이션을 제공합니다.',
    detailDesc: '• 포트폴리오용 고품질 렌더링 이미지 제작\n\n• 개인 공간을 리모델링 할 때 현장에서 노트북으로 프로그램을 사용하여 실시간 렌더링 및 소통'
  },
];

const llmSkills: Skill[] = [
  { 
    name: 'ChatGPT', 
    icon: '/icons/chatgpt.svg',
    percent: 90, 
    desc: '대화형 AI 모델로 텍스트 생성, 번역, 요약, 질의응답, 코드 작성 등 다양한 언어 기반 작업을 수행하며, 멀티모달 기능으로 이미지 분석과 설명도 가능합니다.',
    detailDesc: '프로젝트 기획서 작성, 클라이언트 제안서 초안 작성, 아이디어 브레인스토밍 등에 활용하여 업무 효율성을 크게 향상시켰습니다. 프롬프트 엔지니어링을 통해 정확하고 전문적인 결과물을 얻을 수 있습니다.',
    detailItems: [
      {
        title: '개인 맞춤형 GPTs 개발 (논문 검색, 영어 학습, 토론 연습용등)',
        content: '🔍 논문 검색 GPT\n논문 제목, 저자, 키워드를 입력하면 관련 논문들을 체계적으로 검색하고 요약해주는 GPT를 개발했습니다. 학술 연구 효율성을 크게 향상시켰습니다.\n\n💬 영어 학습 GPT\n개인 수준에 맞춘 영어 대화 연습, 문법 교정, 어휘 확장을 제공하는 맞춤형 영어 튜터 GPT를 구축했습니다.\n\n🗣️ 토론 연습 GPT\n다양한 주제에 대해 체계적인 토론 연습을 도와주는 GPT로, 논리적 사고력과 설득력 향상에 활용하고 있습니다.\n\n',
        image: '/images/gpts.png',
        imageCaption: '💻 실제 사용 화면'
      },
      {
        title: '호텔 설계 포트폴리오 제작 시 프로젝트 기능을 통해 전반적인 피드백 및 신경건축학 이론 적용, 다양한 이미지 생성',
        content: '🏨 바이오필릭 호텔 프로젝트 피드백\nChatGPT의 프로젝트 기능을 활용하여 호텔 설계 전반에 대한 종합적인 피드백을 받았습니다. 공간 구성, 동선 계획, 기능성 등을 다각도로 분석했습니다.\n\n🧠 신경건축학 이론 적용\n공간이 인간의 심리와 행동에 미치는 영향을 분석하고, 신경건축학 관점에서 설계 요소들을 검토하여 더욱 인간 중심적인 공간을 설계했습니다.\n\n🎨 이미지 생성 및 시각화\nDALL-E 연동을 통해 컨셉 이미지, 야간모드, 가구 이미지를 생성하여 설계 아이디어를 구체화했습니다.\n\n',
        image: '/images/project.png',
        imageCaption: '💻 실제 사용 화면'
      },
      {
        title: '비전 기능을 통한 유명 건축물 실시간 분석 및 해설',
        content: ''
      }
    ]
  },
  { 
    name: 'Claude AI', 
    icon: '/icons/claude.png',
    percent: 90, 
    desc: '대용량 문서 분석, 복잡한 추론, 코드 리뷰, 창작 작업 등에 특화된 AI 어시스턴트로, 긴 맥락 이해와 안전성에 중점을 두고 설계되었습니다.',
    detailDesc: '',
    detailItems: [
      {
        title: 'MCP(Model Context Protocol)를 통한 File system 및 Notion 워크스페이스 등 다양한 프로그램 연동을 통해 자동화 및 기능 극대화',
        content: 'MCP를 활용하여 파일 시스템과 Notion 워크스페이스를 비롯한 다양한 외부 프로그램과의 연동을 구현했습니다. 이를 통해 작업 프로세스를 자동화하고 Claude AI의 기능을 극대화하여 생산성을 크게 향상시켰습니다.\n\n',
        image: '/images/claude.png',
        imageCaption: '💻 실제 사용 화면'
      },
      {
        title: '작문 및 문서 작성 시 Claude를 활용한 첨삭 및 피드백',
        content: ''
      }
    ]
  },
  { 
    name: 'Gemini', 
    icon: '/icons/gemini.png',
    percent: 90, 
    desc: 'Google의 멀티모달 AI로 텍스트, 이미지, 코드를 통합 처리하며, 실시간 정보 검색과 Google 서비스 연동을 통한 포괄적 업무 지원이 가능합니다.',
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
    icon: '/icons/Midjourney.png',
    percent: 80, 
    desc: '텍스트 프롬프트를 기반으로 고품질 AI 이미지를 생성하는 도구로, 예술적 스타일과 창의적 비주얼 콘텐츠 제작에 특화되어 있습니다.',
    detailDesc: '• 프롬프트 엔지니어링을 통한 고품질 AI 이미지 생성 및 컨셉 아트 제작\n\n• 다양한 스타일 파라미터와 버전별 모델 활용으로 원하는 비주얼 구현'
  },
  { 
    name: 'Runway ML', 
    icon: '/icons/Runwayml.png',
    percent: 80, 
    desc: 'AI 기반 비디오 편집 및 생성 플랫폼으로, 텍스트-투-비디오, 이미지-투-비디오, 배경 제거, 모션 브러시 등 다양한 영상 제작 도구를 제공합니다.',
    detailDesc: '• AI 기반 비디오 생성 및 편집으로 창작 워크플로우 최적화'
  },
  { 
    name: 'Suno', 
    icon: '/icons/suno.webp',
    percent: 80, 
    desc: '텍스트 프롬프트나 가사를 입력하면 완성된 음악 트랙을 생성하는 AI 음악 제작 도구로, 다양한 장르와 스타일의 곡 창작이 가능합니다.',
    detailDesc: 'AI 음악 생성을 통한 현재 웹페이지 배경음 제작 및 통합',
    detailItems: [
      {
        title: 'AI 음악 생성을 통한 현재 웹페이지 배경음 제작 및 통합',
        content: '🎵 웹페이지 배경음 제작\nSuno AI를 활용하여 포트폴리오 웹사이트용 배경음악을 직접 제작했습니다. 경쾌하고 팝적인 스타일의 음악으로 사용자에게 활력적이고 친근한 느낌을 주어 웹사이트 방문 경험을 더욱 즐겁게 만들었습니다.\n\n🔧 웹페이지 통합\n제작한 음악 파일을 React 컴포넌트로 통합하여 사용자가 직접 재생/정지를 제어할 수 있도록 구현했습니다.\n\n',
        image: '/images/music.png',
        imageCaption: '💻 실제 사용 화면'
      }
    ]
  },
];

const searchSkills: Skill[] = [
  { 
    name: 'Perplexity', 
    icon: '/icons/perplexity.png',
    percent: 85, 
    desc: '실시간 웹 검색과 AI 분석을 결합한 대화형 검색 엔진으로, 복잡한 질문에 대한 종합적인 답변과 출처를 제공합니다.',
    detailDesc: '• 음성 대화 기능으로 영어 회화 연습 및 실시간 정보 습득\n\n• 타 LLM 답변의 팩트체킹 및 2차 검증 도구로 활용\n\n• Perplexity Labs를 통한 투자 기업 보고서 생성 및 웹페이지 형식 분석'
  },
  { 
    name: 'Genspark', 
    icon: '/icons/genspark.jpg',
    percent: 80, 
    desc: 'AI 에이전트 엔진으로 실시간 맞춤형 "Sparkpages" 생성, 멀티 에이전트 시스템을 통한 자동화된 작업 수행(여행 계획, 콘텐츠 생성, 전화 통화 등), 9개의 특화된 대형 언어 모델과 80개 이상의 도구를 활용한 종합적 업무 처리가 가능합니다.',
    detailDesc: '• AI Slide 기능을 통한 팩트체크 기반 PPT 자동 생성\n\n• Call for Me 기능으로 AI 비서를 활용한 대리 통화 및 의견 전달',
    detailItems: [
      {
        title: 'AI Slide 기능을 통한 팩트체크 기반 PPT 자동 생성',
        content: '바이오필릭 호텔 공간 기획서를 AI Slide로 제작하며 논문과 실데이터 기반 팩트체킹 후 PPT 자동 생성\n\n',
        image: '/images/ppt.png',
        imageCaption: '💻 실제 사용 화면'
      },
      {
        title: 'Call for Me 기능으로 AI 비서를 활용한 대리 통화 및 의견 전달',
        content: ''
      }
    ]
  },
  {
    name: 'Scispace',
    icon: '/icons/scispace.jpeg',
    percent: 70,
    desc: '학술 논문 PDF 업로드 및 AI 기반 요약, 핵심 내용 추출, 질의응답 기능을 통한 연구 효율성 향상 도구입니다.',
    detailDesc: '신경건축학, 심리학 분야 전문 논문 검색 및 학술 자료 탐색',
    detailItems: [
      {
        title: '신경건축학, 심리학 분야 전문 논문 검색 및 학술 자료 탐색',
        content: '🧠 신경건축학 분야 연구\n공간이 인간의 뇌와 행동에 미치는 영향을 연구하는 신경건축학 분야의 최신 논문을 체계적으로 검색하고 분석합니다. 건축 환경이 인지 기능, 감정, 스트레스 수준에 미치는 영향에 대한 과학적 근거를 수집합니다.\n\n🧑‍💼 심리학 연구 탐색\n공간 디자인과 건축 환경이 인간의 인지, 감정, 행동에 미치는 다각적 영향을 분석하는 심리학 연구를 탐색합니다. 인지심리학, 환경심리학, 행동심리학 등 다양한 분야의 연구를 통해 공간과 인간 심리의 상관관계를 과학적으로 검증합니다.\n\n📚 학술 데이터베이스 활용\n• Nature Neuroscience, Journal of Environmental Psychology 등 주요 학술지 논문 검색\n• PubMed, PsycINFO 등 전문 데이터베이스 연동\n• 최신 연구 동향 및 메타분석 결과 수집\n• 실증적 데이터 기반 설계 의사결정 지원\n\n🔍 연구 결과 적용\n검색한 논문의 연구 결과를 실제 설계 프로젝트에 적용하여 과학적 근거에 기반한 공간 디자인을 구현합니다.\n\n',
        image: '/images/scispace.png',
        imageCaption: '💻 실제 사용 화면'
      }
    ]
  }
];

const codeAssistantSkills: Skill[] = [
  { 
    name: 'Cursor', 
    icon: '/icons/cursor.png',
    percent: 80, 
    desc: '코드 자동 완성, 리팩토링, 버그 수정 제안 등 AI 기반 통합 개발 환경(IDE)으로 프로그래밍 생산성을 극대화합니다.',
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
    name: 'LilysAI',
    icon: '/icons/lilys.jpeg',
    percent: 90,
    desc: 'YouTube 동영상, PDF, 웹페이지, 오디오 파일 등 다양한 형태의 콘텐츠를 구조화된 요약 노트로 변환하는 AI 요약 도구로, 마인드맵 생성, 다국어 지원(한국어/영어), 강의 노트 스타일 정리 기능을 제공합니다.',
    detailDesc: '• YouTube 콘텐츠와 PDF 문서의 핵심 내용 추출 및 계층적 구조 요약\n\n• 영상 및 문서 자료를 트리 형태로 체계화하여 효율적 정보 습득',
    detailItems: [
      {
        title: 'YouTube 콘텐츠와 PDF 문서의 핵심 내용 추출 및 계층적 구조 요약',
        content: '📹 YouTube 콘텐츠 분석\nYouTube 영상의 음성과 자막을 분석하여 핵심 내용을 자동으로 추출합니다. 긴 영상도 몇 분 안에 주요 포인트와 타임라인을 정리하여 효율적인 학습을 지원합니다.\n\n📄 PDF 문서 구조화\n복잡한 PDF 문서를 분석하여 목차, 핵심 개념, 중요한 데이터를 계층적으로 정리합니다. 학술 논문, 보고서, 매뉴얼 등 다양한 문서 유형에 대응 가능합니다.\n\n🌳 트리 구조 시각화\n• 정보를 트리 형태로 체계화하여 전체적인 맥락 파악 용이\n• 상위-하위 개념 관계를 명확하게 시각화\n• 필요한 정보로의 빠른 네비게이션 지원\n• 학습 효율성 극대화\n\n⚡ 효율적 정보 습득\n방대한 양의 정보를 짧은 시간에 체계적으로 정리하여 핵심만 빠르게 파악할 수 있도록 도와줍니다.\n\n',
        image: '/images/liys.png',
        imageCaption: '💻 실제 사용 화면'
      },
      {
        title: '영상 및 문서 자료를 트리 형태로 체계화하여 효율적 정보 습득',
        content: ''
      }
    ]
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
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.15));
  transition: all 0.3s ease;
  border-radius: 8px;
  
  ${SkillCard}:hover & {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 12px rgba(102, 126, 234, 0.25));
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
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
  
  background: ${({ iconType }) =>
    iconType.startsWith('/icons/')
      ? '#fff'
      : (() => {
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
        })()};
  
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
  background: rgba(245, 168, 159, 0.25);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 20px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(245, 168, 159, 0.15);
`;

const SkillLevel = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background: linear-gradient(135deg, #FFB6B9 0%, #F5A89F 50%, #F2998E 100%);
  border-radius: 10px;
  position: relative;
  transition: width 1s ease-in-out;
  box-shadow: 0 2px 8px rgba(245, 168, 159, 0.4);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent);
    border-radius: 10px 10px 0 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(242, 153, 142, 0.1) 0%, rgba(245, 168, 159, 0.05) 100%);
    border-radius: 10px;
  }
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
  opacity: 0.5;
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
  background: linear-gradient(135deg, #A4CEB0 0%, #7BB38A 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(123, 179, 138, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(123, 179, 138, 0.4);
    background: linear-gradient(135deg, #7BB38A 0%, #5A9B68 100%);
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
          <AIIcon iconType={skill.icon}>
            {skill.icon.startsWith('/icons/') ? (
              <img
                src={skill.icon}
                alt={skill.name}
                style={{
                  width: '48px',
                  height: '48px',
                  display: 'block',
                  background: '#fff',
                  borderRadius: skill.name === 'Photoshop' ? '12px' : '50%',
                }}
              />
            ) : (
              getAIIconContent(skill.icon)
            )}
          </AIIcon>
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