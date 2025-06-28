import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 8rem auto 4rem auto;
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(245, 168, 159, 0.15);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(44, 62, 80, 0.1);
  
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.1);
  }
  
  .subtitle {
    font-size: 1.3rem;
    color: #2C3E50;
    font-weight: 600;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }
  
  .description {
    font-size: 1.1rem;
    color: #2C3E50;
    opacity: 0.7;
    line-height: 1.6;
    font-style: italic;
  }
`;

const ContentSection = styled.div`
  position: relative;
  z-index: 2;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(44, 62, 80, 0.08);
  
  &:last-child {
    border-bottom: none;
  }
  
  h2 {
    color: #2C3E50;
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: #F5A89F;
      border-radius: 50%;
      margin-right: 1rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 22px;
      width: 60px;
      height: 2px;
      background: #F5A89F;
      border-radius: 1px;
    }
  }
  
  h3 {
    color: #2C3E50;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    position: relative;
    padding-left: 1rem;
    
    &:before {
      content: '▶';
      position: absolute;
      left: 0;
      color: #F5A89F;
      font-size: 0.8rem;
    }
  }
  
  p {
    color: #2C3E50;
    line-height: 1.8;
    font-size: 1rem;
    margin-bottom: 1.2rem;
    text-align: justify;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 0;
    
    li {
      color: #2C3E50;
      line-height: 1.8;
      font-size: 1rem;
      margin-bottom: 0.8rem;
      list-style: none;
      position: relative;
      padding-left: 1.5rem;
      
      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: #F5A89F;
        font-weight: bold;
        top: 0;
      }
    }
  }
`;

const HighlightBox = styled.div`
  background: rgba(245, 168, 159, 0.08);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(245, 168, 159, 0.2);
  border-left: 4px solid #F5A89F;
  position: relative;
  
  h4 {
    color: #2C3E50;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    margin: 0.8rem 0;
    font-weight: 500;
    color: #2C3E50;
  }
`;

const QuoteBox = styled.div`
  background: #f8f9fa;
  border-left: 5px solid #F5A89F;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  border-radius: 0 10px 10px 0;
  font-style: italic;
  color: #2C3E50;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: #F5A89F;
    position: absolute;
    top: -10px;
    left: 15px;
    font-family: serif;
    opacity: 0.3;
  }
  
  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
    text-align: center;
    font-weight: 500;
  }
`;

const SimpleImpactBox = styled.div`
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 3rem 0;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(245, 168, 159, 0.2);
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    opacity: 0.95;
    margin: 0;
  }
`;

const StaticDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #F5A89F, transparent);
  margin: 3rem 0;
  opacity: 0.3;
`;

const ProfessionalNote = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 2rem 0;
  
  h4 {
    color: #2C3E50;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 0.5rem;
  }
  
  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
    color: #495057;
    line-height: 1.6;
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

export default function AboutSelf() {
  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>자기소개서</h1>
            <div className="subtitle">공간이 무의식 깊숙이 작용하여 사람의 일상과 삶 전반에 변화를 가져올 수 있기에,</div>
            <div className="description">이러한 힘을 통해 사람들의 삶을 긍정적으로 변화시키는 공간을 설계하는 것이 저의 목표입니다</div>
          </Header>
          
          <ContentSection>
            <Section>
              <h2>지원 동기 및 목표</h2>
              <p>
                공간이 사람의 마음에 미치는 영향을 직접 목격한 순간부터, 저는 단순한 '아름다운 공간'을 넘어 
                <strong>'치유하고 영감을 주는 공간'</strong>을 설계하고 싶다는 꿈을 품게 되었습니다. 
                영등포 청년건축단에서 열악한 환경에 거주하시던 어르신들의 집을 개선해드릴 때, 
                작은 변화만으로도 거주자의 표정과 기분이 완전히 달라지는 모습을 보며 공간의 힘을 깨달았습니다.
              </p>
              <p>
                이러한 경험을 통해 클라이언트의 라이프스타일과 심리적 니즈를 깊이 이해하고, 
                이를 실용적이면서도 감성적인 공간으로 구현하는 실무 설계자가 되고자 합니다.
              </p>
            </Section>

            <StaticDivider />

            <Section>
              <h2>전문 경험 및 역량</h2>
              
              <h3>현장 중심의 실무 경험</h3>
              <p>
                영등포 청년건축단에서 도배와 수리 기술을 익히며 공간 개선의 실질적 효과를 체험했고, 
                LH 도시재생 청년인턴으로 일하며 지역 공동체와 공간의 상관관계를 이해하게 되었습니다. 
                특히 독산동 우시장 일대 도시재생 프로젝트에서 주민들과 소통하며 
                다양한 세대와 배경을 가진 분들의 공간 니즈를 파악하는 경험을 쌓았습니다.
              </p>
              <p>
                한국토지주택공사에서의 보상 업무 경험은 거주자의 공간에 대한 애착과 상실감을 직접 마주하며, 
                공간이 단순한 물리적 환경이 아닌 삶의 터전이라는 점을 깊이 깨닫게 해주었습니다.
              </p>
              
              <h3>체계적인 이론 지식과 효율적인 업무 역량</h3>
              <p>
                실무 경험을 바탕으로 실내건축기사 자격을 취득하여 체계적인 설계 지식을 완성했습니다. 
                특히 ChatGPT, Midjourney, Claude 등 다양한 AI 도구들을 프로젝트 전 과정에 적극 활용하여 업무 효율성을 크게 향상시켰습니다. 
                초기 컨셉 발굴부터 공간 분석, 자료 조사, 시각화까지 AI 도구를 통해 빠르고 창의적인 아이디어 도출이 가능하며, 
                이는 클라이언트와의 소통과 프로젝트 진행 속도에 큰 도움이 됩니다.
              </p>
            </Section>

            <Section>
              <h2>지속적 자기계발과 실무 역량 강화</h2>
              
              <h3>다학제적 지식을 통한 설계 역량 확장</h3>
              <p>
                지난 3년간 연간 50권 이상의 도서를 읽으며 심리학, 사회학, 경영학 등 다양한 분야의 지식을 쌓았습니다. 
                특히 환경 심리학, 색채 심리학 관련 서적들을 통해 공간이 인간의 행동과 감정에 미치는 영향을 이해하게 되었고, 
                이는 클라이언트의 라이프스타일에 맞는 맞춤형 설계에 직접 활용하고 있습니다.
              </p>
              
              <h3>빠른 기술 습득력과 세심한 학습 자세</h3>
              <p>
                새로운 설계 도구나 기법을 접할 때마다 핵심 원리를 파악하여 단시간 내에 활용 가능한 수준까지 습득하는 능력을 보유하고 있습니다. 
                또한 일상 속 모든 순간에서 배움의 가치를 발견하는 자세를 통해, 동료와의 사소한 대화부터 고객의 작은 피드백, 심지어 실패 경험까지도 성장의 밑거름으로 삼아 지속적으로 업무 역량을 발전시키고 있습니다.
              </p>
              
              <h3>글로벌 트렌드 이해와 문화적 감수성</h3>
              <p>
                기초 영어 회화 능력을 바탕으로 해외 인테리어 트렌드와 사례를 지속적으로 모니터링하며, 
                다양한 문화적 배경을 가진 클라이언트들의 공간 선호도를 이해하는 데 활용하고 있습니다.
              </p>
            </Section>

            <StaticDivider />

            <Section>
              <h2>미래 비전 및 전문성 발전 계획</h2>
              
              <h3>사람 중심의 공간 설계 전문가</h3>
              <p>
                저는 단순히 트렌드를 따르는 것이 아닌, 거주자의 정신 건강과 삶의 질을 실질적으로 향상시키는 
                공간을 설계하는 전문가가 되고자 합니다. AI 기술을 적극 활용하면서도 인간적 감수성을 잃지 않는 차세대 설계자로 성장하고 싶습니다.
              </p>
              
              <HighlightBox>
                <h4>전문 분야 발전 계획</h4>
                <ul>
                  <li><strong>심리학 기반 설계:</strong> 클라이언트의 성향과 라이프스타일을 분석하여 스트레스는 줄이고 집중력과 안정감은 높이는 공간을 설계하고 싶습니다. AI 데이터 분석을 활용해 더욱 정확한 니즈 파악과 맞춤형 솔루션 제공이 가능합니다.</li>
                  <li><strong>효율적인 설계 프로세스 구축:</strong> 다양한 AI 도구를 활용해 초기 아이디어 발굴부터 최종 제안까지의 전 과정을 효율화하고, 클라이언트와의 소통을 더욱 원활하게 만들어 프로젝트 만족도를 높이고 싶습니다.</li>
                  <li><strong>다양한 공간 유형 전문성 확보:</strong> 주거 공간뿐만 아니라 상업 공간, 오피스, 카페 등 다양한 공간 유형에서 각각의 목적과 사용자 특성에 맞는 최적화된 설계 능력을 갖추고 싶습니다.</li>
                </ul>
              </HighlightBox>
              
              <h3>클라이언트 중심의 설계 철학</h3>
              <p>
                실무 경험을 지속적으로 쌓으며 클라이언트의 다양한 니즈를 깊이 이해하고, 예산과 일정 내에서 최고의 결과물을 만들어내는 실무 전문가로 성장하고 싶습니다. 
                언젠가는 국내외 다양한 프로젝트에 참여하여 더 넓은 경험을 쌓고, 이를 통해 더욱 완성도 높은 설계를 제공할 수 있는 설계자가 되는 것이 목표입니다.
              </p>
            </Section>

            <SimpleImpactBox>
              <h3>마무리</h3>
              <p>
                지금까지의 경험을 통해 공간이 사람의 삶에 미치는 강력한 영향력을 확신하게 되었습니다. 
                AI 기술이 빠르게 발전하는 시대에 이러한 도구들을 능숙하게 활용하면서도, 본질적으로는 사람을 위한 공간을 만든다는 철학을 잃지 않는 것이 중요하다고 생각합니다. 
                풍부한 현장 경험과 체계적인 이론 지식, 그리고 최신 기술 활용 능력을 바탕으로 클라이언트에게 실질적인 가치를 제공하는 설계자로 기여하고 싶습니다.
              </p>
            </SimpleImpactBox>
          </ContentSection>
        </Content>
      </Container>
    </>
  );
} 