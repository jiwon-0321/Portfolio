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
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(160, 174, 192, 0.3);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1A202C;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(26, 32, 44, 0.2);
  }
  
  p {
    font-size: 1.1rem;
    color: #4A5568;
    opacity: 0.9;
  }
`;

const ContentSection = styled.div`
  position: relative;
  z-index: 2;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  
  h2 {
    color: #2D3748;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
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
  
  p {
    color: #4A5568;
    line-height: 1.8;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const HighlightBox = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #667EEA;
  
  p {
    margin: 0;
    font-style: italic;
    color: #2D3748;
    font-weight: 500;
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
    color: #667EEA;
  }
  
  &:before {
    content: '← ';
    margin-right: 0.5rem;
  }
`;

export default function AboutSelf() {
  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>자기소개서</h1>
            <p>창의적이고 실용적인 공간 설계를 추구하는 실내건축 디자이너입니다</p>
          </Header>
          
          <ContentSection>
            <Section>
              <h2>안녕하세요</h2>
              <p>
                저는 창의적이고 실용적인 공간 설계를 통해 사람들의 삶을 더욱 풍요롭게 만들고자 하는 
                실내건축 디자이너 홍길동입니다.
              </p>
              <p>
                공간이 단순히 물리적인 환경을 넘어서 사람들의 감정과 행동에 미치는 영향을 깊이 이해하고, 
                이를 바탕으로 기능성과 미적 가치를 모두 만족시키는 디자인을 추구합니다.
              </p>
            </Section>

            <Section>
              <h2>디자인 철학</h2>
              <p>
                "공간은 사람을 위해 존재한다"는 신념 하에, 사용자의 라이프스타일과 니즈를 깊이 분석하여 
                맞춤형 공간을 제안합니다. 지속가능한 디자인과 친환경 소재 사용을 통해 
                환경을 생각하는 책임감 있는 디자이너가 되고자 합니다.
              </p>
              
              <HighlightBox>
                <p>
                  "좋은 디자인은 보이지 않는다. 사용자가 자연스럽게 느끼고 경험할 때 비로소 완성된다."
                </p>
              </HighlightBox>
            </Section>

            <Section>
              <h2>전문 분야</h2>
              <p>
                주거 공간, 상업 공간, 오피스 공간 설계에 특화되어 있으며, 
                특히 작은 공간을 효율적으로 활용하는 솔루션 제안에 강점을 가지고 있습니다.
              </p>
              <p>
                최신 BIM 기술과 3D 시각화 도구를 활용하여 클라이언트가 완성된 공간을 
                미리 체험할 수 있도록 하는 것을 중요하게 생각합니다.
              </p>
            </Section>

            <Section>
              <h2>목표</h2>
              <p>
                앞으로도 지속적인 학습과 경험을 통해 더 나은 디자이너로 성장하며, 
                사람들의 일상에 긍정적인 변화를 가져다주는 공간을 만들어가고 싶습니다.
              </p>
            </Section>
          </ContentSection>
        </Content>
      </Container>
    </>
  );
} 