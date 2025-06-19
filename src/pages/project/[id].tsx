import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Navbar from '../../components/Navbar';

// 상수 정의
const COLORS = {
  primary: '#4A148C',
  secondary: '#C4D79B',
  white: '#FFFFFF',
  black: '#000000',
} as const;

const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.primary} 100%)`,
} as const;

const GLASSMORPHISM = css`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(196, 215, 155, 0.3);
  box-shadow: 0 20px 60px rgba(74, 20, 140, 0.15);
`;

const TRANSITION = 'all 0.3s ease';
const CAROUSEL_TRANSITION = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

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

interface ProjectData {
  title: string;
  category: string;
  location: string;
  area: string;
  period: string;
  client: string;
  overview: {
    concept: string;
    objective: string;
    target: string;
  };
  sections: ProjectSection[];
  references: Array<{
    title: string;
    author: string;
    journal: string;
    year: string;
    volume: string;
    pages: string;
  }>;
}

// 프로젝트 데이터
const projectData: Record<string, ProjectData> = {
  1: {
    title: '모던 카페 인테리어',
    category: '상업공간',
    location: '서울시 강남구',
    area: '120㎡',
    period: '2023.03 - 2023.05',
    client: 'ABC 카페',
    overview: {
      concept: '자연 친화적이고 모던한 감성의 카페 공간으로, 도심 속에서 자연을 느낄 수 있는 휴식 공간을 제공합니다.',
      objective: '고객들이 편안하게 휴식을 취하고 소통할 수 있는 공간을 조성하여 브랜드 가치를 높이고자 했습니다.',
      target: '20-40대 직장인 및 학생들을 주요 타겟으로 하는 프리미엄 카페'
    },
    sections: [
      {
        title: '외관 및 입구 디자인',
        images: ['/images/1.jpg', '/images/1.jpg', '/images/1.jpg', '/images/1.jpg'],
        description: '자연스러운 목재와 유리를 활용하여 개방감을 조성했습니다. 특히 자연 요소의 도입은 고객의 심리적 안정감을 높이는 효과가 있습니다.',
        materials: ['천연 목재 (오크)', '강화유리', '자연석 타일'],
        details: '입구부터 자연 친화적인 분위기를 연출하여 고객들의 시선을 사로잡고, 내부 공간에 대한 기대감을 높였습니다. 색채 계획에서는 따뜻한 톤의 색상을 사용하여 고객 만족도 향상을 도모했습니다.',
        citations: [2, 1]
      },
      {
        title: '내부 공간 구성',
        images: ['/images/1.jpg', '/images/1.jpg', '/images/1.jpg'],
        description: '효율적인 동선과 다양한 좌석 배치로 고객 만족도를 극대화했습니다.',
        materials: ['원목 가구', '패브릭 소파', 'LED 조명'],
        details: '1인석부터 단체석까지 다양한 좌석을 배치하여 고객의 다양한 니즈를 충족시켰습니다. 특히 창가 좌석은 자연광을 최대한 활용할 수 있도록 설계했습니다. 카페 공간의 색채가 고객 만족도에 미치는 영향을 고려하여 설계했습니다.',
        citations: [1]
      },
      {
        title: '조명 및 색채 계획',
        images: ['/images/1.jpg', '/images/1.jpg'],
        description: '따뜻한 색온도의 조명과 자연스러운 색채 조합으로 편안한 분위기를 연출했습니다.',
        materials: ['LED 펜던트 조명', '간접조명', '자연 색상 페인트'],
        details: '시간대별 조명 조절이 가능하도록 설계하여 아침, 점심, 저녁 각각 다른 분위기를 연출할 수 있습니다. 상업공간에서의 자연 요소 도입 효과를 적극 활용했습니다.',
        citations: [2]
      }
    ],
    references: [
      {
        title: '카페 공간의 색채가 고객 만족도에 미치는 영향',
        author: '김○○, 이○○',
        journal: '한국실내디자인학회논문집',
        year: '2022',
        volume: 'Vol.31, No.2',
        pages: 'pp.45-52'
      },
      {
        title: '상업공간에서의 자연 요소 도입 효과 연구',
        author: '박○○',
        journal: '대한건축학회논문집',
        year: '2023',
        volume: 'Vol.39, No.1',
        pages: 'pp.123-130'
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
      concept: '효율적이고 창의적인 업무 환경을 위한 스마트 오피스 공간으로, 협업과 집중을 동시에 지원하는 공간을 구현했습니다.',
      objective: '직원들의 업무 효율성을 높이고 창의적 사고를 촉진할 수 있는 업무 환경을 조성하고자 했습니다.',
      target: 'IT 컨설팅 회사의 30명 규모 직원을 위한 업무공간'
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
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 8rem auto 4rem auto;
`;

const GlassCard = styled.div`
  ${GLASSMORPHISM}
  border-radius: 30px;
  padding: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
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
    box-shadow: 0 8px 25px rgba(196, 215, 155, 0.4);
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
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

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(74, 20, 140, 0.3);
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
  background: rgba(196, 215, 155, 0.2);
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
  margin-bottom: 2rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(74, 20, 140, 0.2);
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
  transition: ${props => props.isTransitioning ? CAROUSEL_TRANSITION : 'none'};
  will-change: transform;
`;

const CarouselSlide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: ${TRANSITION};
    
    &:hover {
      transform: scale(1.02);
    }
  }
`;

const OverlayIcon = styled.div<{ show: boolean }>`
  position: absolute;
  background: rgba(74, 20, 140, 0.8);
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
  margin-top: 1rem;
  padding: 0 1rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? GRADIENTS.primary : 'rgba(196, 215, 155, 0.3)'};
  cursor: pointer;
  transition: ${TRANSITION};
  
  &:hover {
    transform: scale(1.2);
    background: ${props => props.active ? GRADIENTS.primary : 'rgba(196, 215, 155, 0.5)'};
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
      background: rgba(196, 215, 155, 0.3);
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
  background: rgba(196, 215, 155, 0.2);
  padding: 1rem;
  border-radius: 10px;
  border-left: 3px solid ${COLORS.secondary};
  
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
    box-shadow: 0 2px 8px rgba(74, 20, 140, 0.4);
  }
`;

const ReferenceItem = styled.div<{ isOpen: boolean; isHighlighted: boolean }>`
  background: ${({ isHighlighted }) => 
    isHighlighted ? 'rgba(196, 215, 155, 0.4)' : 'rgba(196, 215, 155, 0.2)'};
  border-radius: 12px;
  margin-bottom: 0.8rem;
  border-left: 3px solid ${COLORS.secondary};
  overflow: hidden;
  transition: ${TRANSITION};
  transform: ${({ isHighlighted }) => isHighlighted ? 'scale(1.02)' : 'scale(1)'};
  
  &:hover {
    background: rgba(196, 215, 155, 0.25);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 20, 140, 0.1);
  }
`;

const ReferenceHeader = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${TRANSITION};
  
  &:hover {
    background: rgba(196, 215, 155, 0.1);
  }
`;

const ReferenceTitle = styled.h4`
  color: ${COLORS.primary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  line-height: 1.4;
`;

const ReferenceNumber = styled.div`
  background: ${GRADIENTS.primary};
  color: ${COLORS.white};
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  margin-right: 1rem;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandIcon = styled.div<{ isOpen: boolean }>`
  color: ${COLORS.primary};
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin-left: 1rem;
  
  &:before {
    content: '▼';
  }
`;

const ReferenceContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => isOpen ? '200px' : '0'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  overflow: hidden;
  transition: ${TRANSITION};
  padding: ${({ isOpen }) => isOpen ? '0 1.5rem 1rem 1.5rem' : '0 1.5rem'};
  
  p {
    color: ${COLORS.primary};
    margin: 0.2rem 0;
    opacity: 0.8;
    font-size: 0.9rem;
    
    &.author { font-weight: 500; }
    &.journal { font-style: italic; }
    &.details { font-size: 0.85rem; opacity: 0.7; }
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
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
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
`;

const CloseButton = styled(ModalButton)`
  top: 2rem;
  right: 2rem;
`;

const ModalNavButton = styled(ModalButton)<{ direction: 'left' | 'right' }>`
  top: 50%;
  ${props => props.direction}: 2rem;
  transform: translateY(-50%);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:before {
    content: '${props => props.direction === 'left' ? '‹' : '›'}';
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

  const handleMouseMove = useCallback((e: React.MouseEvent, sectionIndex: number) => {
    const state = carouselStates[sectionIndex];
    if (!state || !state.isDragging) return;
    
    const deltaX = e.clientX - state.startX;
    const newTranslateX = state.translateX + deltaX;
    
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
    const threshold = slideWidth * 0.3;
    
    let newIndex = state.currentIndex;
    
    if (deltaX > threshold && state.currentIndex > 0) {
      newIndex = state.currentIndex - 1;
    } else if (deltaX < -threshold && state.currentIndex < totalImages - 1) {
      newIndex = state.currentIndex + 1;
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

  return {
    carouselStates,
    hoveredCarousel,
    setHoveredCarousel,
    goToSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTransitionEnd,
    setSlideWidth
  };
};

// 유틸리티 함수
const renderDots = (totalImages: number, currentIndex: number, onDotClick: (index: number) => void) => {
  const maxDots = 3;
  
  if (totalImages <= maxDots) {
    return Array.from({ length: totalImages }, (_, index) => (
      <Dot
        key={index}
        active={currentIndex === index}
        onClick={() => onDotClick(index)}
      />
    ));
  }
  
  const dots = [];
  let startIndex = Math.max(0, currentIndex - 1);
  let endIndex = Math.min(totalImages - 1, startIndex + 2);
  
  if (endIndex === totalImages - 1) {
    startIndex = Math.max(0, endIndex - 2);
  }
  
  for (let i = startIndex; i <= endIndex; i++) {
    dots.push(
      <Dot
        key={i}
        active={currentIndex === i}
        onClick={() => onDotClick(i)}
      />
    );
  }
  
  return dots;
};

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const project = projectData[id as string];
  
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<ModalImageIndex | null>(null);
  const [openReferences, setOpenReferences] = useState<Record<number, boolean>>({});
  const [highlightedReference, setHighlightedReference] = useState<number | null>(null);
  
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
    if (!modalImageIndex || !project) return;
    
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
      }
    } else {
      if (imageIndex > 0) {
        newImageIndex = imageIndex - 1;
      } else if (sectionIndex > 0) {
        newSectionIndex = sectionIndex - 1;
        newImageIndex = project.sections[newSectionIndex].images.length - 1;
      }
    }
    
    const newImage = project.sections[newSectionIndex].images[newImageIndex];
    setModalImage(newImage);
    setModalImageIndex({ sectionIndex: newSectionIndex, imageIndex: newImageIndex });
  }, [modalImageIndex, project]);

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
    { title: '컨셉', content: project?.overview.concept },
    { title: '목표', content: project?.overview.objective },
    { title: '타겟', content: project?.overview.target }
  ], [project]);

  const projectInfoItems = useMemo(() => [
    { label: '카테고리', value: project?.category },
    { label: '위치', value: project?.location },
    { label: '면적', value: project?.area },
    { label: '기간', value: project?.period },
    { label: '클라이언트', value: project?.client }
  ], [project]);

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
            <SectionTitle>프로젝트 개요</SectionTitle>
            <OverviewGrid>
              {overviewCards.map((card, index) => (
                <OverviewCard key={index}>
                  <h3>{card.title}</h3>
                  <p>{card.content}</p>
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
                  <CarouselContainer>
                    <CarouselWrapper
                      onMouseEnter={() => carousel.setHoveredCarousel(sectionIndex)}
                      onMouseLeave={() => {
                        carousel.setHoveredCarousel(null);
                        carousel.handleMouseUp(sectionIndex, section.images.length);
                      }}
                      onMouseDown={(e) => carousel.handleMouseDown(e, sectionIndex)}
                      onMouseMove={(e) => carousel.handleMouseMove(e, sectionIndex)}
                      onMouseUp={() => carousel.handleMouseUp(sectionIndex, section.images.length)}
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
                      
                      <ImageCounter>
                        {state.currentIndex + 1} / {section.images.length}
                      </ImageCounter>
                    </CarouselWrapper>
                    
                    {section.images.length > 1 && (
                      <DotsContainer>
                        {renderDots(
                          section.images.length,
                          state.currentIndex,
                          (index) => carousel.goToSlide(sectionIndex, index)
                        )}
                      </DotsContainer>
                    )}
                  </CarouselContainer>
                  
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
                  <ReferenceTitle>{ref.title}</ReferenceTitle>
                  <ExpandIcon isOpen={openReferences[index] || false} />
                </ReferenceHeader>
                <ReferenceContent isOpen={openReferences[index] || false}>
                  <p className="author">저자: {ref.author}</p>
                  <p className="journal">{ref.journal}</p>
                  <p className="details">{ref.year}, {ref.volume}, {ref.pages}</p>
                </ReferenceContent>
              </ReferenceItem>
            ))}
          </GlassCard>
        </Content>
      </Container>

      <Modal show={!!modalImage} onClick={closeModal}>
        <CloseButton onClick={closeModal}>×</CloseButton>
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
        {modalImage && <img src={modalImage} alt="확대된 이미지" onClick={(e) => e.stopPropagation()} />}
      </Modal>
    </>
  );
} 