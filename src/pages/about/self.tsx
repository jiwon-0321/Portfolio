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
                작은 변화만으로도 거주자의 표정과 기분이 완전히 달라지는 모습을 보며 공간 심리학의 중요성을 깨달았습니다.
              </p>
              <p>
                이러한 경험을 바탕으로 심리학적 접근을 통한 실내건축 설계를 전문적으로 학습하고, 
                글로벌 관점에서 다양한 문화와 생활 양식을 이해하며 더 포괄적인 설계 철학을 구축하고자 
                해외 유학을 계획하고 있습니다.
              </p>
            </Section>

            <StaticDivider />

            <Section>
              <h2>전문 경험 및 역량</h2>
              
              <h3>현장 실무부터 이론까지의 체계적 학습 과정</h3>
              <p>
                현장 실무 경험에서 시작된 저의 전문성은 다음과 같은 과정을 거쳐 발전해왔습니다. 
                영등포 청년건축단에서 도배와 수리 기술을 익히며 공간 개선의 실질적 효과를 체험했고, 
                LH 도시재생 청년인턴으로 일하며 지역 공동체와 공간의 상관관계를 깊이 이해하게 되었습니다. 
                특히 독산동 우시장 일대 도시재생 프로젝트에서 주민들과 소통하며 
                공간이 사람들의 사회적 관계와 정서에 미치는 영향을 관찰할 수 있었습니다.
              </p>
              <p>
                한국토지주택공사에서의 보상 업무 경험은 제게 또 다른 관점을 제공했습니다. 
                거주지를 떠나야 하는 주민들의 심리적 애착과 상실감을 직접 마주하며, 
                공간과 인간의 정서적 유대가 얼마나 깊은지 깨달았습니다.
              </p>
              
              <h3>이론적 기반 구축 및 현대적 업무 역량 개발</h3>
              <p>
                실무 경험을 바탕으로 실내건축기사 자격을 취득하여 체계적인 이론 지식을 완성했습니다. 
                또한 효율적인 설계 프로세스를 위해 ChatGPT, Midjourney 등 최신 AI 도구들을 활용하는 방법을 익혀 
                창의적 아이디어 발굴과 업무 효율성을 높일 수 있는 역량을 갖추었습니다.
              </p>
            </Section>

            <Section>
              <h2>지속적 자기계발과 통찰력 확장</h2>
              
              <h3>독서를 통한 다학제적 사고력 개발</h3>
              <p>
                지난 3년간 연간 50권 이상의 도서를 탐독하며 심리학, 사회학, 경영학, 철학 등 
                다양한 분야의 지식을 축적했습니다. 특히 환경 심리학, 색채 심리학, 공간 인지학 관련 서적들을 통해 
                인간의 행동과 감정에 영향을 미치는 공간 요소들에 대한 이해를 심화시켰습니다. 
                이러한 다학제적 접근은 단순한 미적 감각을 넘어 거주자의 심리적 웰빙을 고려한 설계 철학의 토대가 되었습니다.
              </p>
              
              <h3>글로벌 역량 및 문화적 감수성 개발</h3>
              <p>
                기초 영어 회화 능력을 꾸준히 향상시키며 해외 설계 사례와 연구 자료에 직접 접근할 수 있는 기반을 마련했습니다. 
                다양한 문화권의 주거 양식과 공간 인식을 이해하고, 이를 설계에 반영할 수 있는 국제적 감각을 키워나가고 있습니다.
              </p>
            </Section>

            <StaticDivider />

            <Section>
              <h2>미래 비전 및 연구 관심사</h2>
              
              <h3>심리학 기반 공간 설계 전문가</h3>
              <p>
                저는 단순히 기능적이고 아름다운 공간을 만드는 것을 넘어, 거주자의 정신 건강과 삶의 질을 향상시키는 
                공간을 설계하는 전문가가 되고자 합니다. 특히 다음과 같은 분야에서 전문성을 발전시키고 싶습니다:
              </p>
              
              <p>
                국내에서 설계 실무 경험을 충분히 쌓은 후, 해외 유학을 통해 신경건축학을 본격적으로 학습하고자 합니다. 
                신경건축학은 뇌과학과 건축학이 융합된 분야로, 공간이 인간의 뇌에 미치는 영향을 과학적으로 분석하고 이를 설계에 적용하는 학문입니다.
              </p>
              
              <HighlightBox>
                <h4>전문 분야 발전 계획</h4>
                <ul>
                  <li><strong>신경건축학 심화 연구:</strong> 공간의 형태, 재료, 색채, 조명이 뇌의 신경활동에 미치는 영향을 fMRI, EEG 등의 뇌영상 기술을 통해 측정하고 분석하는 방법론을 학습하여, 과학적 근거에 기반한 설계 접근법을 개발하고 싶습니다.</li>
                  <li><strong>환경심리학과 인지심리학 연계:</strong> 공간 인지 과정에서 나타나는 스트레스 반응, 집중력 변화, 감정 상태 등을 심리학적 관점에서 이해하고, 이를 치유적 환경 설계에 적용하는 방법을 연구하고자 합니다.</li>
                  <li><strong>문화적 맥락을 고려한 신경건축학 적용:</strong> 서로 다른 문화권에서 자란 사람들이 공간을 인식하고 반응하는 방식의 차이를 신경과학적으로 분석하여, 보다 포용적이고 효과적인 설계 방법론을 구축하고 싶습니다.</li>
                </ul>
              </HighlightBox>
              
              <h3>글로벌 네트워크 구축 및 지식 교류</h3>
              <p>
                해외 유학을 통해 선진국의 신경건축학 연구 성과를 직접 학습하고, 
                다양한 국적의 연구자들과 협업하며 문화적 차이를 고려한 설계 방법론을 개발하고 싶습니다. 
                궁극적으로는 국내외를 오가며 활동하는 글로벌 설계 전문가로 성장하여, 
                공간이 우리의 무의식에 미치는 강력한 영향력을 긍정적인 방향으로 활용할 수 있는 설계 이론과 실무 방법론을 구축하는 것이 목표입니다.
              </p>
            </Section>

            <SimpleImpactBox>
              <h3>마무리</h3>
              <p>
                지금까지의 경험을 통해 공간이 단순한 물리적 환경이 아닌, 
                인간의 뇌와 감정, 행동, 나아가 삶의 질을 좌우하는 중요한 요소라는 확신을 갖게 되었습니다. 
                국내에서의 실무 경험과 해외에서의 신경건축학 학습을 통해 더 깊이 있는 전문성을 갖춘 설계자가 되어, 
                공간의 무의식적 영향력을 과학적으로 이해하고 이를 사람들의 웰빙 향상에 기여할 수 있는 공간 창조에 활용하는 것이 제 궁극적인 목표입니다.
              </p>
            </SimpleImpactBox>
          </ContentSection>
        </Content>
      </Container>
    </>
  );
} 