import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Navbar from '../../components/Navbar';

// 상수 정의
const COLORS = {
  primary: '#2C3E50',
  secondary: '#F5A89F',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FAF9F6',
} as const;

const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.secondary} 0%, #F2998E 100%)`,
} as const;

const GLASSMORPHISM = css`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(245, 168, 159, 0.3);
  box-shadow: 0 20px 60px rgba(44, 62, 80, 0.15);
`;

const TRANSITION = 'all 0.3s ease';
const CAROUSEL_TRANSITION = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';

// 타입 정의
interface CarouselState {
  currentIndex: number;
  translateX: number;
  isTransitioning: boolean;
  isDragging: boolean;
  startX: number;
  currentX: number;
  slideWidth: number;
}

interface ModalImageIndex {
  sectionIndex: number;
  imageIndex: number;
}

interface ProjectSection {
  title: string;
  images: string[];
  description: string;
  materials: string[];
  details: string;
  citations: number[];
}

interface OverviewItem {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  targets?: string[];
  segments?: string[];
}

interface ProjectData {
  title: string;
  category: string;
  location: string;
  floors?: string;
  role?: string;
  area?: string;
  period?: string;
  client: string;
  overview: {
    concept: OverviewItem;
    objective: OverviewItem;
    target: OverviewItem;
  };
  sections: ProjectSection[];
  references: Array<{
    title: string;
    author: string;
    journal?: string;
    year: string;
    volume?: string;
    pages?: string;
    description?: string;
  }>;
}

// 프로젝트 데이터
const projectData: Record<string, ProjectData> = {
  1: {
    title: 'The Habi (자연 + 바이오필릭 컨셉 호텔)',
    category: '숙박공간',
    location: '경기도 가평',
    floors: '지상 1층',
    role: '공간 기획, 컨셉 디자인, 인테리어 설계',
    client: '개인 프로젝트',
    overview: {
      concept: {
        title: "Natural Harmony",
        subtitle: "자연과 인간이 조화를 이루는 바이오필릭 디자인",
        description: "신경건축학적 근거를 기반으로 한 심리적 안정과 웰빙 증진을 위한 실용적이고 비용 효율적인 자연 친화적 공간",
        features: [
          "병에 담긴 소량의 식물 - 관리가 쉬운 자연 요소",
          "큰 창을 통한 자연 채광 - 서카디안 리듬 조절",
          "천연 소재 활용 - 목재와 자연 텍스타일",
          "자연 조망 확보 - 외부 정원과의 시각적 연결"
        ]
      },
      objective: {
        title: "Project Goals",
        subtitle: "단순하면서도 강력한 치유 공간 창조",
        description: "신경건축학적 효과를 통한 투숙객의 심리적 웰빙과 만족도 향상",
        targets: [
          "투숙객 만족도 30% 향상 및 재방문률 25% 증가",
          "객실 프리미엄 가격 15-20% 상향 책정 가능",
          "스트레스 감소 및 수면의 질 향상 효과",
          "지속가능 호텔 인증 획득 및 브랜드 가치 상승"
        ]
      },
      target: {
        title: "Target Audience",
        subtitle: "자연과의 연결을 통해 진정한 휴식을 추구하는 여행객",
        description: "웰빙과 자연 친화적 경험을 중시하는 다양한 연령층의 고객",
        segments: [
          "자연 친화적 레저 여행객 - 지속가능한 여행 경험 선호",
          "혁신적 경험 추구 MZ세대 - 차별화된 특별한 숙박 경험 원함",
          "스트레스 해소가 필요한 직장인 - 심리적 회복과 휴식 추구",
          "30-60대 웰빙 추구층 - 자연스러운 편안함 중시"
        ]
      }
    },
    sections: [
      {
        title: '공간 계획 및 구성',
        images: ['/main images/평면도 layout.PNG', '/main images/스케치.jpg', '/main images/iso.jpg'],
        description: '개인화된 휴식 경험을 제공하기 위해 각 객실의 공간을 효율적으로 구성하고, 자연 채광을 고려하여 설계했습니다.',
        materials: ['친환경 마감재', '스마트 조명 시스템', '빌트인 가구'],
        details: '평면도는 공간의 흐름과 기능성을 보여주며, 아이소메트릭 뷰는 전체적인 공간 구조를 입체적으로 이해하는 데 도움을 줍니다.',
        citations: [1]
      },
      {
        title: '객실 및 디테일',
        images: ['/main images/main.png.png', '/main images/1-1.jpg', '/main images/1-2.png', '/main images/7-1.jpg', '/main images/7-2.png'],
        description: '자연 소재를 적극적으로 활용하고, 창밖의 풍경을 내부로 끌어들여 투숙객에게 깊은 휴식과 영감을 주는 공간을 디자인했습니다.',
        materials: ['원목 마루', '테라조 타일', '맞춤 제작 가구'],
        details: '객실은 휴식의 본질에 집중할 수 있도록 미니멀하게 구성되었으며, 곳곳에 배치된 예술 작품과 디자인 조명이 공간에 깊이를 더합니다.',
        citations: [2]
      },
      {
        title: '욕실 및 위생 공간',
        images: ['/main images/4-1.jpg', '/main images/4-2.png'],
        description: '하루의 피로를 풀 수 있는 편안하고 고급스러운 욕실 공간입니다. 자연 채광과 간결한 디자인이 조화를 이룹니다.',
        materials: ['이탈리아산 타일', '매립형 수전', '간접 조명', '스마트 미러'],
        details: '자연 채광이 들어오는 넓은 창과 독립형 욕조를 배치하여, 마치 개인 스파에 온 듯한 기분을 느낄 수 있도록 디자인했습니다.',
        citations: [2]
      },
      {
        title: '부대시설 (레스토랑 & 바)',
        images: ['/main images/3-1.jpg', '/main images/3-2.png', '/main images/3-3.jpg', '/main images/3-4.png'],
        description: '고급스러운 레스토랑과 바로, 투숙객에게 특별한 다이닝 경험을 제공합니다. 자연의 모티프를 현대적으로 재해석한 디자인이 특징입니다.',
        materials: ['황동 마감재', '벨벳 가구', '대형 거울', '천연석 바닥'],
        details: '레스토랑은 개방형 주방으로 요리 과정을 직접 볼 수 있어 신뢰감을 주며, 바는 도시의 야경을 감상할 수 있는 파노라마 뷰를 자랑합니다.',
        citations: [1]
      },
      {
        title: '외부 공간 및 조경',
        images: ['/main images/5.jpg', '/main images/5=1.png', '/main images/6.jpg'],
        description: '자연을 만끽할 수 있는 옥상 정원과 산책로입니다. 바이오필릭 디자인을 외부 공간까지 확장했습니다.',
        materials: ['데크 목재', '자연석', '계절별 식물', '수경시설'],
        details: '옥상 정원에는 작은 인피니티 풀과 휴식 공간이 마련되어 있으며, 호텔 주변을 둘러싼 산책로는 투숙객에게 평온한 아침을 선사합니다.',
        citations: [2]
      }
    ],
    references: [
      {
        title: 'The Experience of Landscape',
        author: 'Appleton, J.',
        year: '1975',
        description: '제이 애플턴(Jay Appleton)의 저서 "The Experience of Landscape"는 조망-피난처 이론(Prospect-Refuge Theory)을 처음으로 제시한 기념비적인 연구입니다. 이 이론은 인간이 생존 본능에 따라 시야가 확보되면서도(조망) 보호받는(피난처) 공간을 동시에 선호한다는 점을 핵심으로 합니다.\n\n📊 핵심 연구 데이터\n\n✨ 웰빙 및 생산성 향상\n최근의 생체친화적 디자인(Biophilic Design) 연구에 따르면, 조망과 피난처 원리가 적용된 자연 친화적 환경에서 근무하는 직원은 웰빙 수준이 15% 더 높고, 생산성은 6%, 창의성은 15% 더 높은 것으로 보고되었습니다.\n\n🏢 업무 환경에서의 효과\n자연광이 풍부하고 외부 조망이 가능한 사무실의 직원은 그렇지 않은 직원에 비해 생산성이 최대 15%까지 향상될 수 있다는 연구 결과도 있습니다.'
      },
      {
        title: 'Design, productivity and well-being: What are the links?',
        author: 'Heerwagen, J.H.',
        year: '1998',
        description: '주디스 히어바겐(Judith H. Heerwagen)의 이 연구는 건축 환경이 인간의 생산성과 웰빙에 미치는 영향을 탐구한 중요한 논문입니다. 특히 자연광이 인지기능과 스트레스 반응에 미치는 영향에 대한 생태심리학적 연구를 수행했습니다.\n\n📊 핵심 연구 데이터\n\n📈 업무 및 학습 성과 향상\n자연광에 더 많이 노출되는 환경은 업무 공간에서 성과를 최대 10%까지, 학교에서는 9~18%까지 향상시킬 수 있습니다.\n\n🏥 의료 환경에서의 회복 효과\n병원 환경에서 자연광이 잘 드는 병실의 환자는 그렇지 않은 환자에 비해 회복 속도가 8% 더 빠르고, 진통제 요구량도 더 적었습니다.\n\n🪟 자연 조망의 심리적 효과\n창문을 통해 자연 경관을 볼 수 있는 직원은 그렇지 않은 직원에 비해 좌절감을 덜 느끼고 더 높은 인내심을 보이며, 전반적인 삶의 만족도와 건강 상태가 더 양호하다고 보고했습니다.'
      },
      {
        title: 'Wood and Human Stress in the Built Indoor Environment',
        author: 'Burnard, M. D., & Kutnar, A.',
        year: '2015',
        description: '마이클 버나드(Michael D. Burnard)와 안드레이 쿠트나르(Andreja Kutnar)의 이 연구는 실내 환경에서 목재 사용이 인간의 스트레스 반응에 미치는 영향을 과학적으로 검증한 논문입니다. 연구진은 다양한 재료 표면에 대한 인간의 생리적 반응을 측정하여 목재의 스트레스 완화 효과를 실증적으로 입증했습니다.\n\n📊 핵심 연구 데이터\n\n🧠 신경학적 반응\n참나무(white oak) 표면 접촉 시 대리석, 타일, 스테인리스 스틸 대비 전두엽 피질의 스트레스 반응이 유의미하게 감소하는 것으로 관찰되었습니다.\n\n🌿 자율신경계 조절\n목재 접촉 시 교감신경계가 억제되고 부교감신경계가 활성화되어 자연스러운 휴식 상태가 유도되는 것을 확인했습니다.\n\n❤️ 혈압 안정성\n차가운 플라스틱이나 스테인리스 스틸은 혈압 상승을 유발하는 반면, 목재 표면은 혈압 변화 없이 안정적인 생리 상태를 유지시키는 것으로 나타났습니다.\n\n📉 스트레스 호르몬 변화\n목재 가구가 배치된 사무실 환경에서 근무한 참가자들의 타액 내 코르티솜 농도가 대조군 대비 유의미하게 감소하여 전반적인 스트레스 수준 완화 효과가 입증되었습니다.'
      }
    ]
  },
  2: {
    title: '오피스 공간 리모델링',
    category: '업무공간',
    location: '서울시 서초구',
    area: '200㎡',
    period: '2023.06 - 2023.08',
    client: 'XYZ 컨설팅',
    overview: {
      concept: {
        title: "Smart Office",
        subtitle: "효율적이고 창의적인 업무 환경",
        description: "협업과 집중을 동시에 지원하는 스마트 오피스 공간",
        features: [
          "시스템 데스크와 인체공학 의자",
          "높이 조절 가능한 파티션",
          "흡음 패널 적용",
          "화상회의 시설 완비"
        ]
      },
      objective: {
        title: "Objectives", 
        subtitle: "업무 효율성과 창의성 향상",
        description: "직원들의 업무 효율성을 높이고 창의적 사고를 촉진",
        targets: [
          "업무 효율성 향상",
          "창의적 사고 촉진",
          "소통과 협업 증진",
          "개인 집중 공간 확보"
        ]
      },
      target: {
        title: "Target Users",
        subtitle: "IT 컨설팅 회사 직원",
        description: "30명 규모의 업무 공간",
        segments: [
          "프로젝트 매니저",
          "시니어 컨설턴트",
          "주니어 컨설턴트",
          "지원 업무 담당자"
        ]
      }
    },
    sections: [
      {
        title: '오픈 오피스 공간',
        images: ['/images/1.jpg', '/images/1.jpg', '/images/1.jpg'],
        description: '개방형 업무공간으로 소통과 협업을 촉진하는 레이아웃을 구성했습니다.',
        materials: ['시스템 데스크', '인체공학 의자', '흡음 패널'],
        details: '높이 조절이 가능한 데스크와 파티션을 활용하여 필요에 따라 공간을 유연하게 변경할 수 있도록 설계했습니다. 오피스 공간 디자인이 업무 효율성에 미치는 영향을 고려한 설계입니다.',
        citations: [1]
      },
      {
        title: '회의실 및 집중 공간',
        images: ['/images/1.jpg', '/images/1.jpg'],
        description: '다양한 규모의 회의가 가능한 공간과 개인 집중 업무를 위한 공간을 분리했습니다.',
        materials: ['방음 유리', '화이트보드', '프로젝터 시설'],
        details: '화상회의 시설을 완비하고 음향 시설을 최적화하여 효과적인 회의 진행이 가능하도록 했습니다.',
        citations: [1]
      }
    ],
    references: [
      {
        title: '오피스 공간 디자인이 업무 효율성에 미치는 영향',
        author: '정○○, 최○○',
        journal: '한국공간디자인학회논문집',
        year: '2023',
        volume: 'Vol.18, No.3',
        pages: 'pp.78-85'
      }
    ]
  }
};

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
  background: linear-gradient(135deg, ${COLORS.background} 0%, #F8F6F3 100%);
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 8rem auto 4rem auto;
  
  @media (max-width: 768px) {
    margin: 6rem auto 3rem auto;
  }
  
  @media (max-width: 480px) {
    margin: 5rem auto 2rem auto;
  }
`;

const GlassCard = styled.div`
  ${GLASSMORPHISM}
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 1.5rem;
  }
`;

const BackButton = styled.button`
  background: ${GRADIENTS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: ${TRANSITION};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 168, 159, 0.4);
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLORS.primary};
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${GRADIENTS.primary};
    border-radius: 2px;
  }
`;

const OverviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

const DownloadButton = styled.button`
  background: ${GRADIENTS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${TRANSITION};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 168, 159, 0.4);
  }
  
  &:before {
    content: '📄';
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
  }
`;

const ProjectTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
  color: ${COLORS.primary};
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.3);
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InfoItem = styled.div`
  h4 {
    color: ${COLORS.primary};
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    color: ${COLORS.primary};
    opacity: 0.8;
    font-weight: 500;
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const OverviewCard = styled.div`
  background: rgba(245, 168, 159, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  border-left: 4px solid ${COLORS.secondary};
  
  h3 {
    color: ${COLORS.primary};
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: ${COLORS.primary};
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 3rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(44, 62, 80, 0.2);
  border: 2px solid rgba(245, 168, 159, 0.4);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(245, 168, 159, 0.05));
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(245, 168, 159, 0.6), rgba(44, 62, 80, 0.3), rgba(245, 168, 159, 0.6));
    border-radius: 22px;
    z-index: -1;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const CarouselTrack = styled.div<{ translateX: number; isTransitioning: boolean }>`
  display: flex;
  height: 100%;
  transform: translateX(${props => props.translateX}px);
  transition: ${props => props.isTransitioning ? CAROUSEL_TRANSITION : 'transform 0.1s ease-out'};
  will-change: transform;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: ${TRANSITION};
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    pointer-events: auto;
    
    &:hover {
      transform: scale(1.02);
    }
  }
`;
  
const OverlayIcon = styled.div<{ show: boolean }>`
    position: absolute;
    background: rgba(44, 62, 80, 0.8);
  color: ${COLORS.white};
  width: 40px;
  height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  font-size: 1.2rem;
  opacity: ${props => props.show ? 1 : 0};
  transition: ${TRANSITION};
  pointer-events: none;
  backdrop-filter: blur(10px);
`;

const ZoomIcon = styled(OverlayIcon)`
  top: 15px;
  right: 15px;
  
  &:before {
    content: '🔍';
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: ${COLORS.white};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${props => props.active ? 'rgba(44, 62, 80, 0.8)' : 'rgba(245, 168, 159, 0.4)'};
  background: ${props => props.active ? GRADIENTS.primary : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: ${TRANSITION};
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.2);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: scale(1.3);
    background: ${props => props.active ? GRADIENTS.primary : 'rgba(245, 168, 159, 0.6)'};
    border-color: ${props => props.active ? 'rgba(44, 62, 80, 1)' : 'rgba(245, 168, 159, 0.8)'};
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
  }
`;

// 새로운 섹션 레이아웃 컴포넌트
const SectionLayout = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const DetailContent = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${COLORS.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${COLORS.primary};
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
`;

const MaterialsList = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: ${COLORS.primary};
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      background: rgba(245, 168, 159, 0.3);
      color: ${COLORS.primary};
      padding: 0.3rem 0.8rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-block;
      margin: 0.2rem 0.5rem 0.2rem 0;
    }
  }
`;

const DetailDescription = styled.div`
  background: rgba(245, 168, 159, 0.2);
  padding: 1rem;
  border-radius: 10px;
  border-left: 3px solid ${COLORS.secondary};
  white-space: pre-wrap;
  
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const CitationNumber = styled.sup`
  background: ${GRADIENTS.primary};
  color: ${COLORS.white};
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
  margin-left: 0.2rem;
  cursor: pointer;
  transition: ${TRANSITION};
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.4);
  }
`;

const ReferenceItem = styled.div<{ isOpen: boolean; isHighlighted: boolean }>`
  background: ${({ isHighlighted }) => 
    isHighlighted ? 'rgba(245, 168, 159, 0.4)' : 'rgba(245, 168, 159, 0.2)'};
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border-left: 2px solid ${COLORS.secondary};
  overflow: hidden;
  transition: ${TRANSITION};
  transform: ${({ isHighlighted }) => isHighlighted ? 'scale(1.01)' : 'scale(1)'};
  
  &:hover {
    background: rgba(245, 168, 159, 0.25);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.1);
  }
`;

const ReferenceHeader = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${TRANSITION};
  
  &:hover {
    background: rgba(245, 168, 159, 0.1);
  }
`;

const ReferenceTitle = styled.div`
  color: ${COLORS.primary};
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  
  .title {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
  
  .meta {
    font-size: 0.8rem;
    font-weight: 400;
    color: ${COLORS.primary};
    opacity: 0.7;
  }
`;

const ReferenceNumber = styled.div`
  background: ${GRADIENTS.primary};
  color: ${COLORS.white};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  color: ${COLORS.primary};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(245, 168, 159, 0.4);
  border-radius: 50%;
  background: ${({ isOpen }) => isOpen ? 'rgba(245, 168, 159, 0.2)' : 'transparent'};
  
  &:before {
    content: '${({ isOpen }) => isOpen ? '−' : '+'}';
  }
  
  &:hover {
    border-color: rgba(245, 168, 159, 0.8);
    background: rgba(245, 168, 159, 0.15);
    transform: scale(1.1);
  }
`;

const ReferenceContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => isOpen ? '1000px' : '0'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
  padding: ${({ isOpen }) => isOpen ? '0 1rem 0.75rem 1rem' : '0 1rem'};
  
  p {
    color: ${COLORS.primary};
    margin: 0.15rem 0;
    opacity: 0.8;
    font-size: 0.85rem;
    
    &.author { font-weight: 500; }
    &.journal { font-style: italic; }
    &.details { font-size: 0.8rem; opacity: 0.7; }
  }
`;

const Modal = styled.div<{ show: boolean }>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ModalImageContainer = styled.div<{ 
  isTransitioning: boolean; 
  direction: 'left' | 'right' | null;
}>`
  position: relative;
    max-width: 90%;
    max-height: 90%;
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.3s ease-out;
  
  transform: ${props => {
    if (!props.isTransitioning) return 'translateX(0) scale(1)';
    if (props.direction === 'right') return 'translateX(150px) scale(0.9)';
    if (props.direction === 'left') return 'translateX(-150px) scale(0.9)';
    return 'translateX(0) scale(1)';
  }};
  opacity: ${props => props.isTransitioning ? 0 : 1};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s ease;
  }
  
  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 95%;
    
    img {
      border-radius: 8px;
    }
  }
  
  @media (max-width: 480px) {
    max-width: 98%;
    max-height: 98%;
    
    img {
      border-radius: 6px;
    }
  }
`;

const ModalButton = styled.button`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: ${COLORS.white};
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${TRANSITION};
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.6rem;
  }
`;

const CloseButton = styled(ModalButton)`
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.3);
    box-shadow: 0 8px 25px rgba(255, 0, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 0, 0, 0.3);
  }
  
  &:before {
    content: '×';
    font-weight: bold;
    font-size: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
    
    &:before {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
    
    &:before {
      font-size: 1.2rem;
    }
  }
`;

const ModalNavButton = styled(ModalButton)<{ direction: 'left' | 'right' }>`
  top: 50%;
  ${props => props.direction}: 2rem;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
    background: rgba(255, 255, 255, 0.35);
  }
  
  &:before {
    content: '${props => props.direction === 'left' ? '‹' : '›'}';
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    ${props => props.direction}: 1.5rem;
  }
  
  @media (max-width: 480px) {
    ${props => props.direction}: 1rem;
  }
`;

const CarouselNavButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  z-index: 20;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-size: 1.8rem;
  line-height: 1;

  ${CarouselContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:before {
    content: '${({ direction }) => (direction === 'left' ? '‹' : '›')}';
    display: block;
    margin-top: -2px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
`;

// 커스텀 훅
const useCarousel = (project: ProjectData | undefined) => {
  const [carouselStates, setCarouselStates] = useState<Record<number, CarouselState>>({});
  const [hoveredCarousel, setHoveredCarousel] = useState<number | null>(null);

  useEffect(() => {
    if (project) {
      const initialStates: Record<number, CarouselState> = {};
      project.sections.forEach((_, index) => {
        initialStates[index] = {
          currentIndex: 0,
          translateX: 0,
          isTransitioning: false,
          isDragging: false,
          startX: 0,
          currentX: 0,
          slideWidth: 0
        };
      });
      setCarouselStates(initialStates);
    }
  }, [project]);

  const updateCarouselState = useCallback((sectionIndex: number, updates: Partial<CarouselState>) => {
    setCarouselStates(prev => ({
      ...prev,
      [sectionIndex]: { ...prev[sectionIndex], ...updates }
    }));
  }, []);

  const goToSlide = useCallback((sectionIndex: number, slideIndex: number) => {
    const state = carouselStates[sectionIndex];
    if (!state) return;
    
    const slideWidth = state.slideWidth || 400;
    const newTranslateX = -slideIndex * slideWidth;
    
    updateCarouselState(sectionIndex, {
      currentIndex: slideIndex,
      translateX: newTranslateX,
      isTransitioning: true
    });
  }, [carouselStates, updateCarouselState]);

  const handleMouseDown = useCallback((e: React.MouseEvent, sectionIndex: number) => {
    const state = carouselStates[sectionIndex];
    if (!state) return;
    
    updateCarouselState(sectionIndex, {
      isDragging: true,
      startX: e.clientX,
      currentX: e.clientX,
      isTransitioning: false
    });
  }, [carouselStates, updateCarouselState]);

  const handleMouseMove = useCallback((e: React.MouseEvent, sectionIndex: number, totalImages: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || !state.isDragging) return;
    
    const deltaX = e.clientX - state.startX;
    const slideWidth = state.slideWidth || 400;
    const currentBaseTranslateX = -state.currentIndex * slideWidth;
    
    // 드래그 저항 효과 추가 (경계에서 저항감)
    let resistanceMultiplier = 1;
    const maxDrag = slideWidth * 0.8;
    
    if (state.currentIndex === 0 && deltaX > 0) {
      resistanceMultiplier = Math.max(0.2, 1 - (deltaX / maxDrag));
    } else if (state.currentIndex === totalImages - 1 && deltaX < 0) {
      resistanceMultiplier = Math.max(0.2, 1 - (Math.abs(deltaX) / maxDrag));
    }
    
    const newTranslateX = currentBaseTranslateX + (deltaX * resistanceMultiplier);
    
    updateCarouselState(sectionIndex, {
      currentX: e.clientX,
      translateX: newTranslateX
    });
  }, [carouselStates, updateCarouselState]);

  const handleMouseUp = useCallback((sectionIndex: number, totalImages: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || !state.isDragging) return;
    
    const deltaX = state.currentX - state.startX;
    const slideWidth = state.slideWidth || 400;
    const threshold = slideWidth * 0.25; // 더 민감하게 조정
    const velocity = Math.abs(deltaX) / slideWidth;
    
    let newIndex = state.currentIndex;
    
    // 속도 기반 판정 추가
    if (velocity > 0.3) {
      if (deltaX > 50 && state.currentIndex > 0) {
        newIndex = state.currentIndex - 1;
      } else if (deltaX < -50 && state.currentIndex < totalImages - 1) {
        newIndex = state.currentIndex + 1;
      }
    } else {
      // 기존 threshold 기반 판정
      if (deltaX > threshold && state.currentIndex > 0) {
        newIndex = state.currentIndex - 1;
      } else if (deltaX < -threshold && state.currentIndex < totalImages - 1) {
        newIndex = state.currentIndex + 1;
      }
    }
    
    const newTranslateX = -newIndex * slideWidth;
    
    updateCarouselState(sectionIndex, {
      currentIndex: newIndex,
      translateX: newTranslateX,
      isDragging: false,
      isTransitioning: true
    });
  }, [carouselStates, updateCarouselState]);

  const handleTransitionEnd = useCallback((sectionIndex: number) => {
    updateCarouselState(sectionIndex, { isTransitioning: false });
  }, [updateCarouselState]);

  const setSlideWidth = useCallback((sectionIndex: number, width: number) => {
    updateCarouselState(sectionIndex, { slideWidth: width });
  }, [updateCarouselState]);

  // 터치 이벤트 핸들러 추가
  const handleTouchStart = useCallback((e: React.TouchEvent, sectionIndex: number) => {
    const state = carouselStates[sectionIndex];
    if (!state) return;
    
    updateCarouselState(sectionIndex, {
      isDragging: true,
      startX: e.touches[0].clientX,
      currentX: e.touches[0].clientX,
      isTransitioning: false
    });
  }, [carouselStates, updateCarouselState]);

  const handleTouchMove = useCallback((e: React.TouchEvent, sectionIndex: number, totalImages: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || !state.isDragging) return;
    
    e.preventDefault(); // 스크롤 방지
    
    const deltaX = e.touches[0].clientX - state.startX;
    const slideWidth = state.slideWidth || 400;
    const currentBaseTranslateX = -state.currentIndex * slideWidth;
    
    // 드래그 저항 효과 추가 (경계에서 저항감)
    let resistanceMultiplier = 1;
    const maxDrag = slideWidth * 0.8;
    
    if (state.currentIndex === 0 && deltaX > 0) {
      resistanceMultiplier = Math.max(0.2, 1 - (deltaX / maxDrag));
    } else if (state.currentIndex === totalImages - 1 && deltaX < 0) {
      resistanceMultiplier = Math.max(0.2, 1 - (Math.abs(deltaX) / maxDrag));
    }
    
    const newTranslateX = currentBaseTranslateX + (deltaX * resistanceMultiplier);
    
    updateCarouselState(sectionIndex, {
      currentX: e.touches[0].clientX,
      translateX: newTranslateX
    });
  }, [carouselStates, updateCarouselState]);

  const handleTouchEnd = useCallback((sectionIndex: number, totalImages: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || !state.isDragging) return;
    
    const deltaX = state.currentX - state.startX;
    const slideWidth = state.slideWidth || 400;
    const threshold = slideWidth * 0.25;
    const velocity = Math.abs(deltaX) / slideWidth;
    
    let newIndex = state.currentIndex;
    
    // 속도 기반 판정
    if (velocity > 0.3) {
      if (deltaX > 50 && state.currentIndex > 0) {
        newIndex = state.currentIndex - 1;
      } else if (deltaX < -50 && state.currentIndex < totalImages - 1) {
        newIndex = state.currentIndex + 1;
      }
    } else {
      // threshold 기반 판정
      if (deltaX > threshold && state.currentIndex > 0) {
        newIndex = state.currentIndex - 1;
      } else if (deltaX < -threshold && state.currentIndex < totalImages - 1) {
        newIndex = state.currentIndex + 1;
      }
    }
    
    const newTranslateX = -newIndex * slideWidth;
    
    updateCarouselState(sectionIndex, {
      currentIndex: newIndex,
      translateX: newTranslateX,
      isDragging: false,
      isTransitioning: true
    });
  }, [carouselStates, updateCarouselState]);

  const handleDotClick = useCallback((sectionIndex: number, dotIndex: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || state.isTransitioning) return;

    const slideWidth = state.slideWidth || 400;
    const newTranslateX = -dotIndex * slideWidth;

    updateCarouselState(sectionIndex, {
      currentIndex: dotIndex,
      translateX: newTranslateX,
      isTransitioning: true,
    });
  }, [carouselStates, updateCarouselState]);

  const handleArrowClick = useCallback((sectionIndex: number, direction: 'prev' | 'next') => {
    const state = carouselStates[sectionIndex];
    if (!state || !project || state.isTransitioning) return;

    const totalImages = project.sections[sectionIndex].images.length;
    let newIndex = state.currentIndex;

    if (direction === 'prev') {
      newIndex = state.currentIndex > 0 ? state.currentIndex - 1 : totalImages - 1;
    } else { // 'next'
      newIndex = state.currentIndex < totalImages - 1 ? state.currentIndex + 1 : 0;
    }

    const slideWidth = state.slideWidth || 400;
    const newTranslateX = -newIndex * slideWidth;

    updateCarouselState(sectionIndex, {
      currentIndex: newIndex,
      translateX: newTranslateX,
      isTransitioning: true,
    });
  }, [carouselStates, updateCarouselState, project]);

  return {
    carouselStates,
    hoveredCarousel,
    setHoveredCarousel,
    goToSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTransitionEnd,
    setSlideWidth,
    handleDotClick,
    handleArrowClick
  };
};

// 유틸리티 함수
const renderDots = (totalImages: number, currentIndex: number, onDotClick: (index: number) => void) => {
  return Array.from({ length: totalImages }, (_, index) => (
    <Dot
      key={index}
      active={currentIndex === index}
      onClick={() => onDotClick(index)}
    />
  ));
};

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const project = projectData[id as string];
  
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<ModalImageIndex | null>(null);
  const [openReferences, setOpenReferences] = useState<Record<number, boolean>>({});
  const [highlightedReference, setHighlightedReference] = useState<number | null>(null);
  const [isModalTransitioning, setIsModalTransitioning] = useState(false);
  const [modalTransitionDirection, setModalTransitionDirection] = useState<'left' | 'right' | null>(null);

  const referencesRef = useRef<HTMLDivElement>(null);
  const carousel = useCarousel(project);

  const openModal = useCallback((imageSrc: string, sectionIndex: number, imageIndex: number) => {
    setModalImage(imageSrc);
    setModalImageIndex({ sectionIndex, imageIndex });
  }, []);

  const closeModal = useCallback(() => {
    setModalImage(null);
    setModalImageIndex(null);
  }, []);

  const navigateModalImage = useCallback((direction: 'prev' | 'next') => {
    if (!modalImageIndex || !project || isModalTransitioning) return;
    
    const { sectionIndex, imageIndex } = modalImageIndex;
    const currentSection = project.sections[sectionIndex];
    const totalImages = currentSection.images.length;
    
    let newImageIndex = imageIndex;
    let newSectionIndex = sectionIndex;
    
    if (direction === 'next') {
      if (imageIndex < totalImages - 1) {
        newImageIndex = imageIndex + 1;
      } else if (sectionIndex < project.sections.length - 1) {
        newSectionIndex = sectionIndex + 1;
        newImageIndex = 0;
      } else {
        return; // 마지막 이미지에서 더 이상 진행할 수 없음
      }
    } else {
      if (imageIndex > 0) {
        newImageIndex = imageIndex - 1;
      } else if (sectionIndex > 0) {
        newSectionIndex = sectionIndex - 1;
        newImageIndex = project.sections[newSectionIndex].images.length - 1;
      } else {
        return; // 첫 번째 이미지에서 더 이상 뒤로 갈 수 없음
      }
    }
    
    // 트랜지션 시작
    setIsModalTransitioning(true);
    setModalTransitionDirection(direction === 'next' ? 'right' : 'left');
    
    // 짧은 지연 후 이미지 변경
    setTimeout(() => {
      const newImage = project.sections[newSectionIndex].images[newImageIndex];
      setModalImage(newImage);
      setModalImageIndex({ sectionIndex: newSectionIndex, imageIndex: newImageIndex });
      
      // 트랜지션 완료
      setTimeout(() => {
        setIsModalTransitioning(false);
        setModalTransitionDirection(null);
      }, 50);
    }, 400);
  }, [modalImageIndex, project, isModalTransitioning]);

  const toggleReference = useCallback((index: number) => {
    setOpenReferences(prev => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const scrollToReference = useCallback((refIndex: number) => {
    if (referencesRef.current) {
      referencesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpenReferences(prev => ({ ...prev, [refIndex]: true }));
      setHighlightedReference(refIndex);
      setTimeout(() => setHighlightedReference(null), 2000);
    }
  }, []);

  const renderTextWithCitations = useCallback((text: string, citations: number[] = []) => {
    if (!citations?.length) return text;

    return (
      <>
        {text}
        {citations.map((citationIndex, idx) => (
          <CitationNumber 
            key={idx}
            onClick={() => scrollToReference(citationIndex - 1)}
            title={`참조 논문 ${citationIndex}로 이동`}
          >
            {citationIndex}
          </CitationNumber>
        ))}
      </>
    );
  }, [scrollToReference]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateModalImage('prev');
          break;
        case 'ArrowRight':
          navigateModalImage('next');
          break;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!modalImage) return;
      
      e.preventDefault();
      navigateModalImage(e.deltaY > 0 ? 'next' : 'prev');
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [modalImage, navigateModalImage, closeModal]);

  const overviewCards = useMemo(() => [
    { title: '컨셉', data: project?.overview.concept },
    { title: '목표', data: project?.overview.objective },
    { title: '타겟', data: project?.overview.target }
  ], [project]);

  const projectInfoItems = useMemo(() => [
    { label: '카테고리', value: project?.category },
    { label: '위치', value: project?.location },
    { label: '층수', value: project?.floors },
    { label: '역할', value: project?.role },
    { label: '클라이언트', value: project?.client }
  ], [project]);

  const handleDownloadProposal = () => {
    const link = document.createElement('a');
    link.href = '/proposal/concept plan.pdf';
    link.setAttribute('download', 'The_Habi_Hotel_Proposal.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!project) {
    return (
      <>
        <Navbar />
        <Container>
          <Content>
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <h2 style={{ color: COLORS.primary }}>존재하지 않는 프로젝트입니다.</h2>
            </div>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Content className="fade-in">
          <BackButton onClick={() => router.back()}>
            이전으로 돌아가기
          </BackButton>
          
          <GlassCard>
            <OverviewHeader>
              <SectionTitle style={{ marginBottom: 0, textAlign: 'left' }}>프로젝트 개요</SectionTitle>
              <DownloadButton onClick={handleDownloadProposal}>
                컨셉 기획서 다운로드
              </DownloadButton>
            </OverviewHeader>
            <OverviewGrid>
              {overviewCards.map((card, index) => (
                <OverviewCard key={index}>
                  <h3>{card.title}</h3>
                  {card.data && (
                    <>
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#F5A89F', marginBottom: '0.5rem' }}>
                          {card.data.title}
                        </h4>
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '0.75rem', opacity: 0.8 }}>
                          "{card.data.subtitle}"
                        </p>
                        <p style={{ lineHeight: '1.5', marginBottom: '1rem' }}>
                          {card.data.description}
                        </p>
                      </div>
                      {(card.data.features || card.data.targets || card.data.segments) && (
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: 0, 
                          margin: '1.2rem 0 0 0',
                          display: 'grid',
                          gap: '0.5rem'
                        }}>
                          {(card.data.features || card.data.targets || card.data.segments)?.map((item, idx) => (
                            <li key={idx} style={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.8rem',
                              lineHeight: '1.4'
                            }}>
                              <span style={{ 
                                marginRight: '0.5rem', 
                                color: '#F5A89F',
                                fontSize: '0.7rem'
                              }}>
                                ●
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
              </OverviewCard>
              ))}
            </OverviewGrid>
          </GlassCard>

          <GlassCard>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectInfo>
              {projectInfoItems.map((item, index) => (
                <InfoItem key={index}>
                  <h4>{item.label}</h4>
                  <p>{item.value}</p>
              </InfoItem>
              ))}
            </ProjectInfo>
          </GlassCard>

          <section>
            {project.sections.map((section, sectionIndex) => {
              const state = carousel.carouselStates[sectionIndex] || {
                currentIndex: 0,
                translateX: 0,
                isTransitioning: false,
                isDragging: false,
                startX: 0,
                currentX: 0,
                slideWidth: 400
              };
              
              return (
                <GlassCard key={sectionIndex} className="slide-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                  <SectionLayout>
                    <ImageSection>
                      <CarouselContainer>
                        <CarouselWrapper
                          onMouseEnter={() => carousel.setHoveredCarousel(sectionIndex)}
                          onMouseLeave={() => {
                            carousel.setHoveredCarousel(null);
                            carousel.handleMouseUp(sectionIndex, section.images.length);
                          }}
                          onMouseDown={(e) => carousel.handleMouseDown(e, sectionIndex)}
                          onMouseMove={(e) => carousel.handleMouseMove(e, sectionIndex, section.images.length)}
                          onMouseUp={() => carousel.handleMouseUp(sectionIndex, section.images.length)}
                          onTouchStart={(e) => carousel.handleTouchStart(e, sectionIndex)}
                          onTouchMove={(e) => carousel.handleTouchMove(e, sectionIndex, section.images.length)}
                          onTouchEnd={() => carousel.handleTouchEnd(sectionIndex, section.images.length)}
                          ref={(ref) => {
                            if (ref && state.slideWidth === 0) {
                              carousel.setSlideWidth(sectionIndex, ref.offsetWidth);
                            }
                          }}
                        >
                          <CarouselTrack
                            translateX={state.translateX}
                            isTransitioning={state.isTransitioning}
                            onTransitionEnd={() => carousel.handleTransitionEnd(sectionIndex)}
                          >
                            {section.images.map((image, imageIndex) => (
                              <CarouselSlide key={imageIndex}>
                                <img 
                                  src={image} 
                                  alt={`${section.title} - ${imageIndex + 1}`}
                                  onClick={() => openModal(image, sectionIndex, imageIndex)}
                                  draggable={false}
                                />
                                <ZoomIcon show={carousel.hoveredCarousel === sectionIndex} />
                              </CarouselSlide>
                            ))}
                          </CarouselTrack>
                        </CarouselWrapper>
                        
                        {section.images.length > 1 && (
                          <>
                            <CarouselNavButton 
                              direction="left"
                              onClick={(e) => {
                                e.stopPropagation();
                                carousel.handleArrowClick(sectionIndex, 'prev');
                              }}
                              aria-label="이전 이미지"
                            />
                            <CarouselNavButton 
                              direction="right"
                              onClick={(e) => {
                                e.stopPropagation();
                                carousel.handleArrowClick(sectionIndex, 'next');
                              }}
                              aria-label="다음 이미지"
                            />
                            <ImageCounter>
                              {carousel.carouselStates[sectionIndex]?.currentIndex + 1 || 1} / {section.images.length}
                            </ImageCounter>
                            <DotsContainer>
                              {renderDots(
                                section.images.length,
                                carousel.carouselStates[sectionIndex]?.currentIndex || 0,
                                (dotIndex) => carousel.handleDotClick(sectionIndex, dotIndex)
                              )}
                            </DotsContainer>
                          </>
                        )}
                      </CarouselContainer>
                    </ImageSection>
                    
                    <ContentSection>
                <DetailContent>
                  <h3>{section.title}</h3>
                  <p>{renderTextWithCitations(section.description, section.citations)}</p>
                  <MaterialsList>
                    <h4>주요 재료</h4>
                    <ul>
                            {section.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </MaterialsList>
                  <DetailDescription>
                    <p>{renderTextWithCitations(section.details, section.citations)}</p>
                  </DetailDescription>
                </DetailContent>
                    </ContentSection>
                  </SectionLayout>
                </GlassCard>
              );
            })}
          </section>

          <GlassCard ref={referencesRef}>
            <SectionTitle>참조 논문</SectionTitle>
            {project.references.map((ref, index) => (
              <ReferenceItem 
                key={index} 
                isOpen={openReferences[index] || false}
                isHighlighted={highlightedReference === index}
              >
                <ReferenceHeader onClick={() => toggleReference(index)}>
                  <ReferenceNumber>{index + 1}</ReferenceNumber>
                  <ReferenceTitle>
                    <div className="title">{ref.title}</div>
                    <div className="meta">{ref.author} ({ref.year})</div>
                  </ReferenceTitle>
                  <ExpandIcon isOpen={openReferences[index] || false} />
                </ReferenceHeader>
                <ReferenceContent isOpen={openReferences[index] || false}>
                  {ref.journal && <p className="journal">{ref.journal}</p>}
                  {(ref.volume || ref.pages) && (
                    <p className="details">
                      {ref.volume && `${ref.volume}`}
                      {ref.pages && `, ${ref.pages}`}
                    </p>
                  )}
                  {ref.description && (
                    <div className="description" style={{ 
                      marginTop: '1rem', 
                      lineHeight: '1.6', 
                      color: '#4A5568',
                      fontSize: '0.95rem'
                    }}>
                      {ref.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line.includes('📊 핵심 연구 데이터') ? (
                            <div style={{ 
                              fontSize: '1.1rem', 
                              fontWeight: 'bold', 
                              color: '#2D3748',
                              margin: '1rem 0 0.5rem 0'
                            }}>
                              {line}
                            </div>
                          ) : (line.match(/^[✨🏢📈🏥🪟🧠🌿❤️📉]/) ? (
                            <div style={{ 
                              fontSize: '1rem', 
                              fontWeight: '600', 
                              color: '#2D3748',
                              margin: '0.8rem 0 0.3rem 0'
                            }}>
                              {line}
                            </div>
                          ) : (
                            <span>{line}</span>
                          ))}
                          {index < ref.description!.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </ReferenceContent>
              </ReferenceItem>
            ))}
          </GlassCard>
        </Content>
      </Container>

      <Modal show={!!modalImage} onClick={closeModal}>
        <CloseButton onClick={closeModal} />
        <ModalNavButton 
          direction="left" 
          onClick={(e) => {
            e.stopPropagation();
            navigateModalImage('prev');
          }}
        />
        <ModalNavButton 
          direction="right" 
          onClick={(e) => {
            e.stopPropagation();
            navigateModalImage('next');
          }}
        />
        {modalImage && (
          <ModalImageContainer 
            isTransitioning={isModalTransitioning}
            direction={modalTransitionDirection}
          >
            <img src={modalImage} alt="확대된 이미지" onClick={(e) => e.stopPropagation()} />
          </ModalImageContainer>
        )}
      </Modal>
    </>
  );
} 