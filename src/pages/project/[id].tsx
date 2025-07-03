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

// 상수 추가
const MODAL_CONFIG = {
  width: 320,
  height: 300,
  navbarHeight: 80,
  dragThreshold: 0.25,
  velocityThreshold: 0.3,
  slideThreshold: 50,
} as const;

const DRAG_CONFIG = {
  maxDragResistance: 0.8,
  minResistance: 0.2,
} as const;

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

interface MaterialModalState {
  show: boolean;
  material: string;
  data?: any;
  position?: { top: number; left: number };
  isDragging?: boolean;
  dragStart?: { x: number; y: number };
  dragOffset?: { x: number; y: number };
  animationKey?: number;
}

interface MapModalState {
  show: boolean;
  location: string;
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

// 유틸리티 함수들
const calculateModalPosition = (buttonRect: DOMRect, scrollY: number): { top: number; left: number } => {
  const { width: modalWidth, navbarHeight } = MODAL_CONFIG;
  return {
    top: Math.max(navbarHeight, buttonRect.bottom + 10 + scrollY),
    left: Math.max(10, Math.min(window.innerWidth - modalWidth - 10, buttonRect.left + (buttonRect.width / 2) - (modalWidth / 2)))
  };
};

const calculateDragResistance = (currentIndex: number, totalImages: number, deltaX: number, slideWidth: number): number => {
  const { maxDragResistance, minResistance } = DRAG_CONFIG;
  const maxDrag = slideWidth * maxDragResistance;
  
  if (currentIndex === 0 && deltaX > 0) {
    return Math.max(minResistance, 1 - (deltaX / maxDrag));
  } else if (currentIndex === totalImages - 1 && deltaX < 0) {
    return Math.max(minResistance, 1 - (Math.abs(deltaX) / maxDrag));
  }
  return 1;
};

const shouldSlideChange = (deltaX: number, slideWidth: number): boolean => {
  const { dragThreshold, velocityThreshold, slideThreshold } = MODAL_CONFIG;
  const threshold = slideWidth * dragThreshold;
  const velocity = Math.abs(deltaX) / slideWidth;
  
  return velocity > velocityThreshold ? Math.abs(deltaX) > slideThreshold : Math.abs(deltaX) > threshold;
};

// 프로젝트 데이터
const projectData: Record<string, ProjectData> = {
  1: {
    title: 'The Habi',
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
          "자연 조망 확보 - 외부 정원과의 시각적 연결",
          "천연 소재 활용 - 목재와 자연 텍스타일",
          "큰 창을 통한 자연 채광 - 서카디안 리듬 조절",
          "병에 담긴 소량의 식물 - 관리가 쉬운 자연 요소"
        ]
      },
      objective: {
        title: "Project Goals",
        subtitle: "단순하면서도 강력한 치유 공간 창조",
        description: "신경건축학적 효과를 통한 투숙객의 심리적 웰빙과 만족도 향상",
        targets: [
          "지속가능 호텔 인증 획득 및 브랜드 가치 상승",
          "스트레스 감소 및 수면의 질 향상 효과",
          "객실 프리미엄 가격 15-20% 상향 책정 가능",
          "투숙객 만족도 30% 향상 및 재방문률 25% 증가"
        ]
      },
      target: {
        title: "Target Audience",
        subtitle: "자연과의 연결을 통해 진정한 휴식을 추구하는 여행객",
        description: "웰빙과 자연 친화적 경험을 중시하는 다양한 연령층의 고객",
        segments: [
          "30-60대 웰빙 추구층",
          "스트레스 해소 필요 직장인",
          "혁신적 경험 추구 MZ세대",
          "자연 친화적 레저 여행객"
        ]
      }
    },
    sections: [
      {
        title: '공간 계획 및 구성',
        images: ['/main images/평면도 layout.PNG', '/main images/iso.jpg', '/main images/스케치.jpg'],
        description: '개인화된 휴식 경험을 제공하기 위해 공간의 흐름과 사용자 동선을 중심으로 설계하였고, 채광과 시선 분산 효과를 고려해 구조를 구성했습니다. 이 바이오필릭 호텔 객실은 자연과의 연결을 통해 투숙객에게 깊은 휴식을 제공하는 치유 공간으로 설계되었습니다.\n\n평면도에서 확인되는 공간 구성을 살펴보면, 메인 침실 공간과 외부 정원이 서로 다른 방향을 향하도록 배치되어 있으며, 중앙의 연결 공간을 통해 각 영역들이 자연스럽게 이어집니다. 이러한 배치는 인간이 본능적으로 시야가 확보되면서도 보호받는 공간을 선호한다는 특성을 반영하여, 각 공간에서 다른 영역을 조망할 수 있으면서도 개별적인 프라이버시를 확보할 수 있도록 구성되어 심리적 안정감을 제공합니다(1).\n\n아이소메트릭 도면에서 드러나는 대형 천창과 측면 개구부들은 객실 내부로 자연광을 풍부하게 유입시키며, 특히 외부 정원 공간 상부의 대형 천창은 녹음과 빛이 만나는 자연스러운 조합을 연출하여 투숙객의 인지기능 향상과 스트레스 반응 감소에 긍정적 영향을 미칩니다(2).\n\n스케치에서 확인할 수 있는 실내 공간의 유기적 형태와 자연스러운 마감재 사용은 바이오필릭 디자인의 핵심을 보여줍니다. 직선적이지 않은 가구의 부드러운 형태와 천연 소재를 활용한 마감은 자연 환경에서 느낄 수 있는 편안함을 실내로 가져오며, 목재와 석재 등 자연 소재의 적극적 활용은 코르티솔 수치를 감소시켜 도시 생활로 지친 투숙객들에게 실질적인 치유 효과를 제공합니다(3).\n\n이러한 통합적 접근을 통해 자연의 치유력을 체험할 수 있는 바이오필릭 호텔 객실을 완성하고 있습니다.',
        materials: ['친환경 마감재', '스마트 조명 시스템', '빌트인 가구'],
        details: '평면도는 공간의 흐름과 기능성을 보여주며, 아이소메트릭 뷰는 전체적인 공간 구조를 입체적으로 이해하는 데 도움을 줍니다.',
        citations: [1, 2, 3]
      },
      {
        title: '전체 공간 구성',
        images: ['/main images/main.png.png', '/main images/1-1.jpg', '/main images/1-2.png', '/main images/7-1.jpg', '/main images/7-2.png'],
        description: '자연 소재를 적극적으로 활용하고, 창밖의 풍경을 내부로 끌어들여 투숙객에게 깊은 휴식과 영감을 주는 공간을 디자인했습니다.\n\n개인화된 휴식 경험을 제공하기 위해 공간의 흐름과 사용자 동선을 중심으로 설계하였고, 자연광 유입과 시선 분산 효과를 고려한 구조로 구성했습니다.\n\n또한 실내와 외부 공간의 시각적 연계를 통해 개방성과 안정감을 동시에 제공하며, 목재와 자연 패브릭의 사용은 뇌의 편도체 반응을 진정시키고 스트레스를 감소시키는 효과를 유도합니다.\n\n객실 내부는 가구와 벽체에 동일한 우드 톤을 적용하여 감각적 과잉을 줄이고, 벽면은 빛의 방향에 따라 달라지는 그림자 대비로 공간의 깊이를 더합니다.\n\n외부 정원과의 연결창은 자연 요소의 지속적 노출 효과를 통해 뇌의 전전두엽 활동을 증가시켜 명상 상태와 유사한 반응을 유도하며(4), 객실 내부에는 식물, 도자기, 곡선 가구 등 바이오필릭 요소를 점진적으로 배치하여 심리적 안정과 몰입감을 높였습니다(5).',
        materials: ['원목 마루', '테라조 타일', '맞춤 제작 가구'],
        details: '객실은 휴식의 본질에 집중할 수 있도록 미니멀하게 구성되었으며, 곳곳에 배치된 예술 작품과 디자인 조명이 공간에 깊이를 더합니다.',
        citations: [4, 5]
      },
      {
        title: '디테일',
        images: ['/main images/4-1.jpg', '/main images/4-2.png', '/main images/2.jpg', '/main images/2-1.png'],
        description: '하루의 피로를 풀 수 있는 편안하고 고급스러운 욕실 공간입니다. 자연 채광과 간결한 디자인이 조화를 이룹니다.',
        materials: ['이탈리아산 타일', '매립형 수전', '간접 조명', '스마트 미러'],
        details: '자연 채광이 들어오는 넓은 창과 독립형 욕조를 배치하여, 마치 개인 스파에 온 듯한 기분을 느낄 수 있도록 디자인했습니다.',
        citations: [2]
      },
      {
        title: '화장실 디자인',
        images: ['/main images/3-1.jpg', '/main images/3-2.png', '/main images/3-3.jpg', '/main images/3-4.png'],
        description: '고급스러운 레스토랑과 바로, 투숙객에게 특별한 다이닝 경험을 제공합니다. 자연의 모티프를 현대적으로 재해석한 디자인이 특징입니다.',
        materials: ['황동 마감재', '벨벳 가구', '대형 거울', '천연석 바닥'],
        details: '레스토랑은 개방형 주방으로 요리 과정을 직접 볼 수 있어 신뢰감을 주며, 바는 도시의 야경을 감상할 수 있는 파노라마 뷰를 자랑합니다.',
        citations: [1]
      },
      {
        title: '외부 정원/테라스',
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
        description: '제이 애플턴(Jay Appleton)의 저서 "The Experience of Landscape"(1975)는 조망-피난처 이론(Prospect-Refuge Theory)을 처음으로 제시한 기념비적인 연구입니다. 이 이론은 인간이 생존 본능에 따라 시야가 확보되면서도(조망) 보호받는(피난처) 공간을 동시에 선호한다는 점을 핵심으로 합니다.\n\n📊 이론의 핵심 원리\n\n✨ 조망-피난처의 심리적 효과\n애플턴은 인간이 진화 과정에서 생존을 위해 발달시킨 본능적 선호가 현대 공간 경험에도 동일하게 적용된다고 주장했습니다. 주변 환경을 관찰할 수 있으면서도 위험으로부터 숨을 수 있는 공간 구성은 심리적 안정감과 만족감을 제공합니다.\n\n🏢 공간 구성 적용\n이론에 따르면, 효과적인 공간 설계는 다음과 같은 특성을 가져야 합니다\n\n 1️⃣ 조망 확보: 다른 영역을 조망할 수 있는 시야 제공\n 2️⃣ 피난처 제공: 개별적인 프라이버시와 보호감 확보\n 3️⃣ 균형적 배치: 노출과 은폐의 적절한 조화\n\n🔍 현대적 검증\n최근 연구들은 애플턴의 이론이 실제 공간 경험에 미치는 긍정적 효과를 실증적으로 뒷받침하고 있으며, 특히 자연 요소가 결합된 환경에서 웰빙과 생산성 향상 효과가 보고되고 있습니다.'
      },
      {
        title: 'Design, productivity and well-being: What are the links?',
        author: 'Heerwagen, J.H.',
        year: '1998',
        description: '주디스 히어바겐(Judith H. Heerwagen)의 연구는 건축 환경이 인간의 생산성과 웰빙에 미치는 영향을 탐구한 중요한 연구입니다. 특히 그녀의 1998년 AIA 컨퍼런스 발표 "Design, Productivity and Well Being: What are the links?"는 자연광과 자연 요소가 인지기능과 스트레스 반응에 미치는 영향에 대한 실증적 연구를 제시했습니다.\n\n📊 핵심 연구 결과\n\n📈 Miller SQA 건물 연구 (1995-1996)\n히어바겐의 대표적 연구는 Herman Miller 계열사인 Miller SQA의 기존 건물과 새로운 친환경 건물을 비교 분석한 "전후 비교 연구"입니다. 이 연구에서 확인된 주요 결과는\n\n1️⃣생산성 향상: 개인 환경 제어 시스템을 통해 2.8%의 생산성 향상 달성\n2️⃣전체 생산성: 새 건물 이전 후 총 16%의 생산성 증가 관찰 (자연광, 조망, 공간 개선 등 복합 요인)\n3️⃣건강 개선: 사무직 근로자의 두통 발생률이 16%에서 7%로 감소\n\n🪟 자연광과 자연 조망의 효과\n연구에서 확인된 자연 접촉의 긍정적 영향\n\n1️⃣인지기능 향상: 자연 조망이 있는 근로자들이 주의집중력과 기억력 테스트에서 더 높은 점수 획득\n2️⃣스트레스 감소: 자연광과 녹색 식물 접촉을 통한 혈압 감소 및 스트레스 호르몬 완화\n3️⃣정서적 안정: 자연 요소 접촉이 긍정적 기분 상태 유지에 기여하여 업무 동기와 조직 몰입도 향상\n\n🌿 생체친화적 디자인의 중요성\n히어바겐은 인간의 진화적 특성에 기반한 "생체친화적 디자인(Biophilic Design)" 개념을 강조\n\n1️⃣진화적 선호: 인간은 사바나 환경과 유사한 특성(자연광, 조망, 식물 등)을 본능적으로 선호\n2️⃣감각적 다양성: 자연환경의 변화하는 빛, 소리, 질감 등이 인간의 각성 수준을 적절히 유지\n3️⃣개인적 통제: 자연환경처럼 개인이 환경을 조절할 수 있는 능력이 웰빙과 성과에 중요\n\n🔍 연구의 현대적 의의\n히어바겐의 연구는 단순히 "문제 요소 제거"를 넘어서 적극적인 웰빙 증진 환경 조성의 중요성을 제시했습니다. 이는 현대 건축 설계에서 자연광과 자연 요소의 통합이 단순한 미적 고려사항이 아닌, 인간의 인지적 성능과 심리적 건강을 위한 필수 요소임을 과학적으로 입증한 것입니다.'
      },
      {
        title: 'Wood and Human Stress in the Built Indoor Environment',
        author: 'Burnard, M. D., & Kutnar, A.',
        year: '2015',
        description: '마이클 버나드(Michael D. Burnard)와 안드레이 쿠트나르(Andreja Kutnar)의 연구는 실내 환경에서 목재 사용이 인간의 스트레스 반응에 미치는 영향을 과학적으로 검증한 중요한 연구입니다. 이들의 연구는 목재가 실내 환경에서 스트레스 완화에 미치는 효과를 실증적으로 입증했습니다.\n\n📊 핵심 연구 결과\n\n🏢 오피스 환경 실험 (2020년 연구)\n실험 설계: 참가자들을 서로 다른 가구 배치의 오피스 환경에 노출시켜 스트레스 반응을 비교 측정\n\n주요 결과\n\n1️⃣참나무 가구 오피스: 흰색 가구 대조군 대비 타액 내 코르티솔 농도 유의미하게 감소\n2️⃣호두나무 가구 오피스: 대조군과 유의미한 차이 없음\n3️⃣시각적 요소의 중요성: 밝은 색상의 참나무가 더 밝은 환경을 조성하여 스트레스 감소 효과 증대\n\n🌿 목재의 자연성 인식 (2017년 연구)\n3개국 조사: 핀란드, 노르웨이, 슬로베니아에서 22가지 건축 재료의 자연성 인식 조사\n\n핵심 발견\n\n1️⃣원목: 가장 자연스러운 재료로 인식\n2️⃣가공도와 자연성: 가공 정도가 낮을수록 더 자연스럽게 인식\n3️⃣지역 간 일관성: 문화적 차이에도 불구하고 목재의 자연성 인식에 대한 일치된 견해\n\n📈 문헌 고찰 연구 (2015년)\n종합 분석: 목재와 인간 스트레스 관련 기존 연구들의 체계적 검토\n\n주요 결론\n\n1️⃣자율신경계 반응: 목재가 있는 실내 환경에서 스트레스 관련 자율신경계 반응 감소\n2️⃣회복환경 디자인: 목재 사용이 자연과의 연결감을 높여 스트레스 회복 환경 조성에 효과적\n3️⃣지속가능한 개입: 목재 사용이 비용 효과적이고 지속가능한 스트레스 완화 방법\n\n🔬 연구 방법론\n\n생리학적 측정\n\n1️⃣타액 코르티솔: 스트레스 호르몬 수치 측정을 통한 객관적 스트레스 평가\n2️⃣실험 대조 설계: 동일한 참가자가 서로 다른 환경에 노출되는 within-subjects 실험\n\n환경 요소 고려\n\n1️⃣조명 조건: 동일한 조명 수준에서 목재 색상이 환경 밝기에 미치는 영향 분석\n2️⃣시각적 특성: 목재의 색상, 질감 등 시각적 요소가 스트레스 반응에 미치는 영향\n\n🏗️ 건축 설계 적용점\n\n수동적 환경 개입\n\n목재 가구나 마감재 사용을 통한 수동적 환경 개입으로 오피스 근로자의 스트레스 대처 능력 향상\n\n재료 선택 지침\n\n1️⃣밝은 색상 목재: 더 밝은 환경 조성을 통한 스트레스 감소 효과\n2️⃣적절한 목재 비율: 과도한 목재 사용보다는 적절한 비율의 목재 사용 권장\n3️⃣다른 환경 요소와의 조화: 조명, 색상 등 다른 실내 환경 요소와의 상호작용 고려'
      },
      {
        title: 'The Prefrontal Cortex Activity and Psychological Effects of Viewing Forest Landscapes in Autumn Season',
        author: 'Joung, D.; Kim, G.; Choi, Y.; Lim, H.; Park, S.; Woo, J.-M.; Park, B.-J.',
        journal: 'International Journal of Environmental Research and Public Health',
        year: '2015',
        volume: '12(7)',
        pages: '7235-7243',
        description: '이 연구는 가을철 산림 경관을 조망하는 것이 전전두엽 활동과 심리적 효과에 미치는 영향을 과학적으로 입증한 중요한 연구입니다. 근적외선 분광법(NIRS)을 활용하여 산림 환경이 도시 환경 대비 생리적, 심리적 이완 효과를 가져온다는 것을 객관적으로 측정했습니다. 연구진은 도시 건물 옥상에서 산림 지역과 도시 지역을 각각 15분간 조망하도록 하여 타인의 시선에 의한 스트레스 요인을 배제한 상태에서 실험을 진행했습니다.\n\n📊 핵심 연구 데이터\n\n🧠 전전두엽 활동 감소\n산림 경관을 조망할 때 전전두엽의 총 헤모글로빈 농도와 산소헤모글로빈 농도가 도시 환경 대비 유의하게 감소했습니다. 이는 뇌 활동의 진정 효과를 나타내며, 효과적인 이완 상태를 의미합니다.\n\n🧘‍♀️ 심리적 안정감 증대\n의미분별척도(Semantic Differential) 평가에서 산림 조망 시 "편안함", "자연스러움", "진정됨"의 감정이 도시 환경 대비 유의하게 높게 나타났습니다. 기분상태척도(Profile of Mood States) 측정에서는 부정적 감정이 산림 환경에서 유의하게 낮게 나타났습니다.\n\n🌿 자연 요소의 시각적 효과\n가을철 산림 경관의 시각적 자극만으로도 전전두엽 피질에서 측정 가능한 생리적 변화가 나타나며, 이는 자연 요소의 지속적 노출이 명상과 유사한 뇌 활동 패턴을 유도함을 시사합니다.\n\n🔬 과학적 측정 방법\n근적외선 분광법(NIRS)을 통해 전전두엽 활동을 실시간으로 측정하여 산림 치료 효과를 객관적으로 입증했습니다. 이는 스트레스 상태와 이완 효과의 객관적 평가에 NIRS가 유효함을 보여줍니다.\n\n🏗️ 건축 설계 적용\n외부 정원과의 연결창을 통한 자연 요소의 지속적 노출은 뇌의 전전두엽 활동을 감소시켜 명상 상태와 유사한 반응을 유도하며, 이는 바이오필릭 디자인의 과학적 근거로 활용됩니다.'
      },
      {
        title: 'Building for life: Designing and understanding the human-nature connection',
        author: 'Kellert, S. R.',
        year: '2005',
        journal: 'Island Press',
        description: '스티븐 켈러트(Stephen R. Kellert)의 이 저서는 바이오필릭 디자인의 이론적 토대를 제공하는 중요한 문헌입니다. 자연 요소의 지속적 노출이 전전두엽 활동을 증가시켜 명상과 유사한 반응을 유도하며, 바이오필릭 요소들이 심리적 안정과 몰입감을 높이는 메커니즘을 상세히 설명합니다.\n\n📊 핵심 연구 데이터\n\n🧠 전전두엽 활성화\n자연 조망과 자연 요소에 지속적으로 노출될 때 전전두엽 피질의 활동이 증가하며, 이는 집중력과 인지적 명료함을 향상시킵니다.\n\n🧘‍♀️ 명상 상태 유도\n외부 정원과의 연결창을 통한 자연 요소의 지속적 노출은 뇌파 패턴을 명상 상태와 유사하게 변화시켜 깊은 이완을 가져옵니다.\n\n🌱 바이오필릭 요소의 심리적 효과\n식물, 도자기, 곡선 가구 등의 자연적 요소들이 점진적으로 배치될 때 스트레스 감소와 심리적 안정감이 극대화됩니다.\n\n🔗 요소간 상승효과\n다양한 바이오필릭 요소들의 통합적 배치는 개별 요소의 효과를 상승적으로 증대시켜 전체적인 웰빙과 몰입감을 높입니다.'
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
  padding: 2.5rem;
  margin-bottom: 3rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
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
  margin-top: 3rem;
`;

const InfoItem = styled.div`
  h4 {
    color: ${COLORS.primary};
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    color: ${COLORS.primary};
    font-size: 0.85rem;
    opacity: 0.8;
    font-weight: 500;
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: stretch;
`;

const OverviewCard = styled.div`
  background: rgba(245, 168, 159, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  border-left: 4px solid ${COLORS.secondary};
  
  h3 {
    color: ${COLORS.primary};
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
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

const MaterialButton = styled.button`
  padding: 0.5rem 0.8rem;
  background-color: rgba(245, 168, 159, 0.2);
  border: 1px solid rgba(245, 168, 159, 0.4);
  border-radius: 20px;
  color: #2C3E50;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(245, 168, 159, 0.3);
    transform: translateY(-1px);
  }
`;

const MaterialModal = styled.div<{ show: boolean; position?: { top: number; left: number }; isDragging?: boolean }>`
  position: absolute;
  top: ${props => props.position ? `${props.position.top}px` : '50%'};
  left: ${props => props.position ? `${props.position.left}px` : '50%'};
  transform: ${props => props.position ? 'none' : 'translate(-50%, -50%)'};
  width: 320px;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 999;
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  user-select: none;
  transition: ${props => props.isDragging ? 'none' : 'all 0.2s ease'};
  opacity: ${props => props.isDragging ? 0.9 : 1};
  
  /* 말풍선 화살표 */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const MaterialModalContent = styled.div<{ isDragging?: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 0;
  box-shadow: ${props => props.isDragging ? '0 16px 48px rgba(0, 0, 0, 0.25)' : '0 8px 24px rgba(0, 0, 0, 0.15)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  animation: modalSlideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  transform-origin: top center;

  @keyframes modalSlideDown {
    0% {
      opacity: 0;
      transform: scaleY(0.3) translateY(-8px);
    }
    60% {
      opacity: 0.8;
      transform: scaleY(0.9) translateY(-2px);
    }
    100% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }

  .drag-header {
    background: rgba(245, 168, 159, 0.2);
    padding: 0.75rem 1.5rem;
    cursor: grab;
    border-bottom: 1px solid rgba(245, 168, 159, 0.1);
    position: relative;
    
    &:active {
      cursor: grabbing;
    }
    
    .drag-handle {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
      
      &::before {
        content: '';
        width: 40px;
        height: 4px;
        background: rgba(44, 62, 80, 0.3);
        border-radius: 2px;
      }
    }
  }

  .modal-body {
    padding: 1.5rem;
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #2C3E50;
    font-size: 1.1rem;
  }

  .material-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #f0f0f0;
  }

  .description {
    line-height: 1.5;
    color: #4A5568;
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .feature-tag {
    padding: 0.2rem 0.4rem;
    background: rgba(245, 168, 159, 0.2);
    border-radius: 10px;
    font-size: 0.7rem;
    color: #2C3E50;
  }

  .close-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &:hover {
      color: #333;
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
    isHighlighted ? 'rgba(245, 168, 159, 0.15)' : 'rgba(245, 168, 159, 0.08)'};
  border-radius: 12px;
  margin-bottom: 0.8rem;
  border-left: 3px solid rgba(245, 168, 159, 0.6);
  overflow: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: ${TRANSITION};
  transform: ${({ isHighlighted }) => isHighlighted ? 'scale(1.01)' : 'scale(1)'};
  box-shadow: 0 2px 12px rgba(245, 168, 159, 0.08);
  width: 100%;
  box-sizing: border-box;
  word-break: break-word;
  word-wrap: break-word;
  
  &:hover {
    background: rgba(245, 168, 159, 0.12);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(245, 168, 159, 0.15);
    border-left-color: rgba(245, 168, 159, 0.8);
  }
`;

const ReferenceHeader = styled.div`
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${TRANSITION};
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px 10px 0 0;
  
  @media (max-width: 768px) {
    padding: 0.9rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 0.75rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ReferenceTitle = styled.div`
  color: ${COLORS.primary};
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
  line-height: 1.5;
  opacity: 0.9;
  word-break: break-word;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.3;
  }
  
  .title {
    font-weight: 700;
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
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(245, 168, 159, 0.3);
  border-radius: 50%;
  background: ${({ isOpen }) => isOpen ? 'rgba(245, 168, 159, 0.12)' : 'rgba(255, 255, 255, 0.8)'};
  opacity: 0.8;
  
  &:before {
    content: '${({ isOpen }) => isOpen ? '−' : '+'}';
  }
  
  &:hover {
    border-color: rgba(245, 168, 159, 0.6);
    background: rgba(245, 168, 159, 0.18);
    transform: scale(1.1);
    opacity: 1;
  }
`;

const ReferenceContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => isOpen ? 'none' : '0'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  overflow: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: ${({ isOpen }) => isOpen ? 'opacity 0.4s ease, padding 0.3s ease, background 0.3s ease' : 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease, background 0.3s ease'};
  padding: ${({ isOpen }) => isOpen ? '1.25rem 1.25rem 1.25rem 1.25rem' : '0 1.25rem'};
  background: ${({ isOpen }) => isOpen ? 'rgba(250, 249, 246, 0.6)' : 'transparent'};
  border-radius: ${({ isOpen }) => isOpen ? '0 0 10px 10px' : '0'};
  border-top: ${({ isOpen }) => isOpen ? '1px solid rgba(245, 168, 159, 0.2)' : 'none'};
  word-break: break-word;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: ${({ isOpen }) => isOpen ? '1rem 1rem 1rem 1rem' : '0 1rem'};
  }
  
  @media (max-width: 480px) {
    padding: ${({ isOpen }) => isOpen ? '0.75rem 0.75rem 0.75rem 0.75rem' : '0 0.75rem'};
  }
  
  p {
    color: ${COLORS.primary};
    margin: 0.2rem 0;
    opacity: 0.85;
    font-size: 0.9rem;
    line-height: 1.6;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
      line-height: 1.5;
    }
    
    &.author { font-weight: 500; opacity: 0.9; }
    &.journal { font-style: italic; opacity: 0.8; }
    &.details { font-size: 0.85rem; opacity: 0.75; }
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
    const [materialModal, setMaterialModal] = useState<MaterialModalState>({ show: false, material: '' });
  const [mapModal, setMapModal] = useState<MapModalState>({ show: false, location: '' });

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

  const openMapModal = useCallback((location: string) => {
    setMapModal({ show: true, location });
  }, []);

  const closeMapModal = useCallback(() => {
    setMapModal({ show: false, location: '' });
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
    const element = document.getElementById(`reference-${refIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setOpenReferences(prev => ({ ...prev, [refIndex - 1]: true }));
      setHighlightedReference(refIndex - 1);
      setTimeout(() => setHighlightedReference(null), 2000);
    }
  }, []);

  const renderTextWithCitations = useCallback((text: string, citations: number[] = []) => {
    // 먼저 문단 나누기 (\n\n을 기준으로)
    const paragraphs = text.split('\n\n');
    
    return (
      <>
        {paragraphs.map((paragraph, paragraphIndex) => {
          // 각 문단에서 (숫자) 패턴을 찾아서 클릭 가능한 링크로 변환
          const citationPattern = /\((\d+)\)/g;
          const parts = [];
          let lastIndex = 0;
          let match;

          while ((match = citationPattern.exec(paragraph)) !== null) {
            const citationNumber = parseInt(match[1]);
            
            // 매치 이전 텍스트 추가
            if (match.index > lastIndex) {
              parts.push(paragraph.slice(lastIndex, match.index));
            }
            
            // 인용 번호를 클릭 가능한 링크로 변환
            parts.push(
              <CitationNumber
                key={`citation-${paragraphIndex}-${match.index}-${citationNumber}`}
                onClick={() => scrollToReference(citationNumber)}
                title={`참조문헌 ${citationNumber}번으로 이동`}
              >
                {citationNumber}
              </CitationNumber>
            );
            
            lastIndex = match.index + match[0].length;
          }
          
          // 남은 텍스트 추가
          if (lastIndex < paragraph.length) {
            parts.push(paragraph.slice(lastIndex));
          }
          
          // 각 문단을 p 태그로 감싸기
          return (
            <p key={paragraphIndex} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              {parts.length > 1 ? <>{parts}</> : paragraph}
            </p>
          );
        })}
      </>
    );
  }, [scrollToReference]);

  // 재료별 상세 정보 데이터
  const materialData = useMemo(() => ({
    "친환경 마감재": {
      image: "/images/eco-friendly-materials.jpg",
      description: "VOC 저방출 천연 소재로 제작된 마감재입니다. 인체에 무해하며 자연과 조화를 이루는 친환경적인 선택입니다.",
      features: ["VOC 저방출", "천연 소재", "재활용 가능"]
    },
    "스마트 조명 시스템": {
      image: "/images/smart-lighting.jpg", 
      description: "서카디안 리듬에 맞춰 자동으로 조절되는 조명 시스템으로 숙면과 건강한 생활 패턴을 도와줍니다.",
      features: ["자동 조절", "생체 리듬 고려", "에너지 효율"]
    },
    "빌트인 가구": {
      image: "/images/built-in-furniture.jpg",
      description: "공간 효율성을 극대화하고 미니멀한 디자인을 구현하는 맞춤형 빌트인 가구입니다.",
      features: ["공간 효율", "맞춤 제작", "미니멀 디자인"]
    },
    // 객실 재료들
    "원목 마루": {
      image: "/images/wood-flooring.jpg",
      description: "천연 원목으로 제작된 마루로 따뜻한 느낌과 자연의 질감을 제공합니다.",
      features: ["천연 소재", "온도 조절", "내구성"]
    },
    "테라조 타일": {
      image: "/images/terrazzo-tile.jpg",
      description: "재활용 대리석 조각을 활용한 테라조 타일로 지속가능하면서도 세련된 마감재입니다.",
      features: ["재활용 소재", "고급 마감", "내구성"]
    },
    "맞춤 제작 가구": {
      image: "/images/custom-furniture.jpg",
      description: "공간에 완벽하게 맞춰 제작된 가구로 효율성과 미적 완성도를 동시에 추구합니다.",
      features: ["맞춤 제작", "공간 효율", "디자인 일체감"]
    },
    // 욕실 재료들
    "이탈리아산 타일": {
      image: "/images/italian-tile.jpg",
      description: "이탈리아에서 수입한 프리미엄 타일로 우아함과 품질을 보장합니다.",
      features: ["수입 소재", "프리미엄 품질", "방수 기능"]
    },
    "매립형 수전": {
      image: "/images/built-in-faucet.jpg",
      description: "벽면에 매립되어 깔끔한 라인을 연출하는 고급 수전 시스템입니다.",
      features: ["미니멀 디자인", "절수 기능", "내구성"]
    },
    "간접 조명": {
      image: "/images/indirect-lighting.jpg",
      description: "부드럽고 은은한 빛으로 편안한 분위기를 연출하는 간접 조명 시스템입니다.",
      features: ["부드러운 조명", "분위기 연출", "에너지 효율"]
    },
    "스마트 미러": {
      image: "/images/smart-mirror.jpg",
      description: "LED 조명과 김서림 방지 기능이 내장된 지능형 거울입니다.",
      features: ["LED 조명", "김서림 방지", "스마트 기능"]
    },
    // 레스토랑 재료들
    "황동 마감재": {
      image: "/images/brass-finish.jpg",
      description: "따뜻한 황동 마감으로 고급스럽고 클래식한 분위기를 연출합니다.",
      features: ["고급 마감", "내식성", "클래식 디자인"]
    },
    "벨벳 가구": {
      image: "/images/velvet-furniture.jpg",
      description: "부드러운 촉감과 고급스러운 광택의 벨벳 소재 가구입니다.",
      features: ["럭셔리 소재", "부드러운 촉감", "고급스러운 외관"]
    },
    "대형 거울": {
      image: "/images/large-mirror.jpg",
      description: "공간을 넓어 보이게 하고 빛을 반사하여 밝은 분위기를 만드는 대형 거울입니다.",
      features: ["공간 확장", "빛 반사", "시각적 효과"]
    },
    "천연석 바닥": {
      image: "/images/natural-stone.jpg",
      description: "자연에서 채취한 천연석으로 제작된 바닥재로 고급스러움과 내구성을 제공합니다.",
      features: ["천연 소재", "고급스러움", "뛰어난 내구성"]
    },
    // 외부 공간 재료들
    "데크 목재": {
      image: "/images/deck-wood.jpg",
      description: "방부 처리된 고급 데크 목재로 야외 환경에 최적화된 소재입니다.",
      features: ["방부 처리", "야외 최적화", "자연 친화"]
    },
    "자연석": {
      image: "/images/natural-rock.jpg",
      description: "자연의 형태를 그대로 살린 조경용 자연석으로 정원의 자연스러움을 강조합니다.",
      features: ["자연 형태", "조경 최적화", "환경 친화"]
    },
    "계절별 식물": {
      image: "/images/seasonal-plants.jpg",
      description: "계절마다 다른 모습으로 변화하는 식물들로 사계절 내내 아름다운 경관을 제공합니다.",
      features: ["계절 변화", "자연 경관", "생태 친화"]
    },
    "수경시설": {
      image: "/images/water-feature.jpg",
      description: "물의 흐름과 소리로 평온함과 시원함을 제공하는 수경 조경 시설입니다.",
      features: ["자연 소리", "시원한 효과", "명상적 분위기"]
    },
    // 업무 공간 재료들
    "시스템 데스크": {
      image: "/images/system-desk.jpg",
      description: "모듈형 시스템으로 다양한 업무 환경에 맞춰 조합 가능한 데스크입니다.",
      features: ["모듈형 구조", "유연한 조합", "업무 효율"]
    },
    "인체공학 의자": {
      image: "/images/ergonomic-chair.jpg",
      description: "장시간 업무에도 편안함을 제공하는 인체공학적 설계의 의자입니다.",
      features: ["인체공학", "장시간 편안", "건강 고려"]
    },
    "흡음 패널": {
      image: "/images/acoustic-panel.jpg",
      description: "소음을 효과적으로 차단하고 흡수하여 조용한 업무 환경을 조성합니다.",
      features: ["소음 차단", "음향 최적화", "집중력 향상"]
    },
    // 회의실 재료들
    "방음 유리": {
      image: "/images/soundproof-glass.jpg",
      description: "뛰어난 방음 효과를 제공하면서도 투명성을 유지하는 고성능 유리입니다.",
      features: ["방음 효과", "투명성", "프라이버시"]
    },
    "화이트보드": {
      image: "/images/whiteboard.jpg",
      description: "회의와 브레인스토밍을 위한 고품질 화이트보드로 아이디어 공유를 돕습니다.",
      features: ["아이디어 공유", "쉬운 지우기", "내구성"]
    },
    "프로젝터 시설": {
      image: "/images/projector.jpg",
      description: "고해상도 프레젠테이션을 위한 최신 프로젝터 및 스크린 시설입니다.",
      features: ["고해상도", "프레젠테이션", "최신 기술"]
    }
  }), []);

  const openMaterialModal = useCallback((material: string, sectionIndex: number, event: React.MouseEvent) => {
    const data = materialData[material];
    
    const defaultData = {
      image: "/images/default-material.jpg",
      description: `${material}에 대한 상세 정보입니다.`,
      features: ["고품질", "내구성", "친환경"]
    };
    
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const position = calculateModalPosition(rect, window.scrollY);
    
    setMaterialModal({ 
      show: true, 
      material, 
      data: data || defaultData, 
      position, 
      animationKey: Date.now() 
    });
  }, [materialData]);

  const closeMaterialModal = useCallback(() => {
    setMaterialModal({ show: false, material: '' });
  }, []);

  // 통합된 드래그 핸들러
  const startDrag = useCallback((x: number, y: number) => {
    if (!materialModal.position) return;
    
    setMaterialModal(prev => ({
      ...prev,
      isDragging: true,
      dragStart: { x, y },
      dragOffset: { x: 0, y: 0 }
    }));
  }, [materialModal.position]);

  const updateDragPosition = useCallback((x: number, y: number) => {
    if (!materialModal.isDragging || !materialModal.dragStart || !materialModal.position) return;
    
    const deltaX = x - materialModal.dragStart.x;
    const deltaY = y - materialModal.dragStart.y;
    
    const { width: modalWidth, height: modalHeight } = MODAL_CONFIG;
    const newX = Math.max(0, Math.min(window.innerWidth - modalWidth, materialModal.position.left + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - modalHeight, materialModal.position.top + deltaY));
    
    setMaterialModal(prev => ({
      ...prev,
      position: { top: newY, left: newX },
      dragOffset: { x: deltaX, y: deltaY }
    }));
  }, [materialModal.isDragging, materialModal.dragStart, materialModal.position]);

  const endDrag = useCallback(() => {
    setMaterialModal(prev => ({
      ...prev,
      isDragging: false,
      dragStart: undefined,
      dragOffset: undefined
    }));
  }, []);

  // 마우스 이벤트 핸들러
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  }, [startDrag]);

  const handleDragMove = useCallback((e: MouseEvent) => {
    updateDragPosition(e.clientX, e.clientY);
  }, [updateDragPosition]);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    e.preventDefault();
  }, [startDrag]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    updateDragPosition(touch.clientX, touch.clientY);
    e.preventDefault();
  }, [updateDragPosition]);



  // 마우스 및 터치 이벤트 리스너
  useEffect(() => {
    if (materialModal.isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', endDrag);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', endDrag);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [materialModal.isDragging, handleDragMove, endDrag, handleTouchMove]);

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (materialModal.show && !(e.target as Element).closest('.material-modal-content') && !(e.target as Element).closest('[data-material-button]')) {
        closeMaterialModal();
      }
    };

    if (materialModal.show) {
      // 외부 클릭 이벤트를 약간 지연시켜 버튼 클릭과 충돌 방지
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [materialModal.show, closeMaterialModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mapModal.show && e.key === 'Escape') {
        closeMapModal();
        return;
      }
      
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

    if (modalImage || mapModal.show) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [modalImage, mapModal.show, navigateModalImage, closeModal, closeMapModal]);

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
                <OverviewCard key={index} style={{
                  ...(index === 1 || index === 2) && { // 목표 카드 (index 1)와 타겟 카드 (index 2)에 적용
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }
                }}>
                  <h3>{card.title}</h3>
                  {card.data && (
                    <>
                      <div style={{ marginBottom: '1rem', ...((index === 1 || index === 2) && { flex: '1' }) }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#F5A89F', marginBottom: '0.4rem' }}>
                          {card.data.title}
                        </h4>
                        <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '0.6rem', opacity: 0.8 }}>
                          "{card.data.subtitle}"
                        </p>
                        <p style={{ fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                          {card.data.description}
                        </p>
                      </div>
                      {(card.data.features || card.data.targets || card.data.segments) && (
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: 0, 
                          margin: (index === 1 || index === 2) ? 'auto 0 0 0' : '1rem 0 0 0', // 목표 카드와 타겟 카드는 자동으로 아래 정렬
                          display: 'grid',
                          gap: '0.4rem',
                          alignContent: 'end'
                        }}>
                          {(card.data.features || card.data.targets || card.data.segments)?.map((item, idx) => (
                            <li key={idx} style={{ 
                              display: 'flex', 
                              alignItems: 'flex-start',
                              fontSize: '0.7rem',
                              lineHeight: '1.3',
                              marginBottom: '0.2rem'
                            }}>
                              <span style={{ 
                                marginRight: '0.4rem', 
                                color: '#F5A89F',
                                fontSize: '0.6rem',
                                marginTop: '0.15rem'
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
            <ProjectTitle>
              {project.title}
            </ProjectTitle>
            <ProjectInfo>
              {projectInfoItems.map((item, index) => (
                <InfoItem key={index}>
                  <h4>{item.label}</h4>
                  {item.label === '위치' ? (
                    <p 
                      style={{ 
                        cursor: 'pointer', 
                        color: '#F5A89F', 
                        textDecoration: 'underline',
                        transition: 'color 0.2s ease'
                      }}
                      onClick={() => openMapModal(item.value || '')}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#F2998E'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#F5A89F'}
                    >
                      {item.value} 📍
                    </p>
                  ) : (
                    <p>{item.value}</p>
                  )}
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
                  {renderTextWithCitations(section.description, section.citations)}
                  {sectionIndex !== 0 && (
                    <div>
                      <h4 style={{ marginBottom: '1rem', color: '#2C3E50' }}>주요 재료</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {section.materials.map((material, idx) => (
                          <MaterialButton
                            key={idx}
                            data-material-button="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              openMaterialModal(material, sectionIndex, e);
                            }}
                          >
                            {material}
                          </MaterialButton>
                        ))}
                      </div>
                    </div>
                  )}
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
                id={`reference-${index + 1}`}
                isOpen={openReferences[index] || false}
                isHighlighted={highlightedReference === index}
              >
                <ReferenceHeader onClick={() => toggleReference(index)}>
                  <ReferenceNumber>{index + 1}</ReferenceNumber>
                  <ReferenceTitle>
                    <div className="title">{ref.title} - {ref.author} ({ref.year})</div>
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
                      fontSize: '0.95rem',
                      wordBreak: 'break-word',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      width: '100%',
                      boxSizing: 'border-box',
                      maxWidth: '100%'
                    }}>
                      {ref.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line.includes('📊 핵심 연구 데이터') || line.includes('📊 핵심 연구 결과') ? (
                            <div style={{ 
                              fontSize: '1.1rem',
                              fontWeight: 'bold', 
                              color: '#2D3748',
                              margin: '1rem 0 0.5rem 0',
                              wordBreak: 'break-word',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              width: '100%',
                              boxSizing: 'border-box'
                            }}>
                              {line}
                            </div>
                          ) : (line.match(/^[✨🏢📈🏥🪟🧠🌿❤️📉🔍]/) ? (
                            <div style={{ 
                              fontSize: '1rem',
                              fontWeight: '600', 
                              color: '#2D3748',
                              margin: '0.8rem 0 0.3rem 0',
                              wordBreak: 'break-word',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              width: '100%',
                              boxSizing: 'border-box'
                            }}>
                              {line}
                            </div>
                          ) : (
                            <span style={{ 
                              wordBreak: 'break-word', 
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              maxWidth: '100%',
                              display: 'inline-block',
                              boxSizing: 'border-box'
                            }}>{line}</span>
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

      <MaterialModal 
        show={materialModal.show} 
        position={materialModal.position}
        isDragging={materialModal.isDragging}
      >
        <MaterialModalContent 
          key={materialModal.animationKey}
          className="material-modal-content" 
          onClick={(e) => e.stopPropagation()}
          isDragging={materialModal.isDragging}
        >
          <div 
            className="drag-header" 
            onMouseDown={handleDragStart}
            onTouchStart={handleTouchStart}
          >
            <div className="drag-handle"></div>
            <h3>{materialModal.material}</h3>
          </div>
          <button className="close-button" onClick={closeMaterialModal}>
            ×
          </button>
          <div className="modal-body">
            {materialModal.data && (
              <>
                <img 
                  src={materialModal.data.image} 
                  alt={materialModal.material}
                  className="material-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <p className="description">{materialModal.data.description}</p>
                <div className="features">
                  {materialModal.data.features?.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </MaterialModalContent>
      </MaterialModal>

      <Modal show={mapModal.show} onClick={closeMapModal}>
        <CloseButton onClick={closeMapModal} />
        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '1rem',
            maxWidth: '90vw',
            width: '600px',
            height: '450px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingBottom: '1rem',
            borderBottom: '1px solid #eee'
          }}>
            <h3 style={{ margin: 0, color: '#2C3E50' }}>📍 {mapModal.location}</h3>
            <button 
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
              onClick={closeMapModal}
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1 }}>
            {mapModal.location === '경기도 가평' && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101534.32623928457!2d127.31163825!3d37.830815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ce1f3a5a8d4b3%3A0x2ae7b4c5b953a0!2z6rK96riw64-E6rCA7J2J6rWw!5e0!3m2!1sko!2skr!4v1647503456789!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
} 