import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 360px) {
    padding: 0 0.75rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 8rem auto 4rem auto;
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(245, 168, 159, 0.15);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(245, 168, 159, 0.1), transparent);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
  
  @media (max-width: 768px) {
    margin: 6rem auto 3rem auto;
    padding: 2.5rem;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    margin: 5rem auto 2rem auto;
    padding: 2rem;
    border-radius: 15px;
  }
  
  @media (max-width: 360px) {
    margin: 4rem auto 1.5rem auto;
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
      margin-bottom: 0.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
      margin-bottom: 0.7rem;
    }
    
    @media (max-width: 360px) {
      font-size: 1.8rem;
      margin-bottom: 0.6rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #2C3E50;
    opacity: 0.8;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
    
    @media (max-width: 360px) {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
  
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2C3E50;
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
      background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
      border-radius: 2px;
    }
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 1.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 360px) {
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 1.5rem;
  }
`;

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 360px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HobbyCard = styled.div`
  background: rgba(250, 249, 246, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(245, 168, 159, 0.4);
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(245, 168, 159, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(245, 168, 159, 0.2);
    border-color: rgba(245, 168, 159, 0.6);
  }
  
  &:hover:before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1.8rem;
    border-radius: 15px;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 1.2rem;
    border-radius: 10px;
  }
`;

const HobbyIcon = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(245, 168, 159, 0.3));
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 360px) {
    font-size: 2rem;
    margin-bottom: 0.6rem;
  }
`;

const HobbyTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2C3E50;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const HobbyDescription = styled.p`
  color: #2C3E50;
  line-height: 1.6;
  text-align: center;
  opacity: 0.9;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.85rem;
    line-height: 1.3;
    margin-bottom: 0.6rem;
  }
`;

const ExperienceBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(245, 168, 159, 0.3);
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 0.25rem 0.7rem;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.6rem;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.55rem;
    padding: 0.18rem 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.3rem;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 360px) {
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;

const WorkConnection = styled.div`
  background: rgba(245, 168, 159, 0.2);
  padding: 1rem;
  border-radius: 10px;
  border-left: 3px solid #F5A89F;
  
  h4 {
    color: #2C3E50;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
      margin-bottom: 0.35rem;
    }
    
    @media (max-width: 360px) {
      font-size: 0.75rem;
      margin-bottom: 0.3rem;
    }
  }
  
  p {
    color: #2C3E50;
    font-size: 0.8rem;
    line-height: 1.4;
    opacity: 0.9;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 0.75rem;
      line-height: 1.3;
    }
    
    @media (max-width: 480px) {
      font-size: 0.7rem;
      line-height: 1.25;
    }
    
    @media (max-width: 360px) {
      font-size: 0.65rem;
      line-height: 1.2;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem;
    border-radius: 6px;
  }
  
  @media (max-width: 360px) {
    padding: 0.6rem;
    border-radius: 5px;
  }
`;

const InterestsContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.8rem;
    border-radius: 15px;
    margin-top: 1.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 360px) {
    padding: 1.2rem;
    border-radius: 10px;
    margin-top: 1.2rem;
  }
`;

const InterestsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const InterestTag = styled.span`
  background: linear-gradient(135deg, #5B6D8B 0%, #3A4B6B 40%, #2C3E50 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(44, 62, 80, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #6A7F9A 0%, #4A5B7B 40%, #3A4B6B 100%);
    box-shadow: 0 6px 15px rgba(44, 62, 80, 0.4);
  }
`;

const InterestsDescription = styled.p`
  color: #4A148C;
  line-height: 1.6;
  text-align: center;
  opacity: 0.9;
  font-size: 1rem;
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

const PageCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.8s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const QuoteBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  border-left: 4px solid #ffd700;
  text-align: center;
  
  p {
    color: rgba(255, 255, 255, 0.95);
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }
  
  cite {
    color: #ffd700;
    font-size: 0.9rem;
    margin-top: 1rem;
    display: block;
  }
`;

const ConnectionText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default function Hobbies() {
  const hobbies = [
    {
      icon: '📚',
      title: '독서',
      description: '다양한 분야의 책을 읽으며 지식을 넓히고 새로운 관점을 얻는 것을 좋아합니다.',
      experience: null,
      workConnection: {
        title: '업무 연관성',
        description: '폭넓은 지식과 사고력을 바탕으로 창의적인 아이디어를 설계에 적용할 수 있습니다.'
      }
    },
    {
      icon: '⛳',
      title: '골프',
      description: '골프를 통해 집중력과 정신력을 기르고 있습니다.',
      experience: '4년차',
      workConnection: {
        title: '업무 연관성',
        description: '골프를 통해 자연스럽게 관계를 맺고, 비공식적인 자리에서도 신뢰를 기반으로 한 커뮤니케이션 능력을 키울 수 있습니다. 이는 고객 응대 및 프로젝트 협업에서도 긍정적인 시너지를 만들어냅니다.'
      }
    },
    {
      icon: '🗣️',
      title: '영어회화',
      description: '글로벌 소통 능력 향상을 위해 꾸준히 영어회화를 공부하고 있습니다.',
      experience: '2년차',
      workConnection: {
        title: '업무 연관성',
        description: '해외 클라이언트와의 소통 및 최신 해외 디자인 트렌드 습득에 도움이 됩니다.'
      }
    },
    {
      icon: '✈️',
      title: '혼자 해외 여행',
      description: '새로운 사람들과의 만남과 다양한 문화를 직접 체험하며, 작은 일상에서 벗어나 세상을 넓혀가고 있습니다. 모든 것을 스스로 계획하고 책임지며 여행하는 과정에서 독립성과 자신감을 기르고 있습니다.',
      experience: null,
      workConnection: {
        title: '업무 연관성',
        description: '다양한 국가의 사람들과 소통하며 문화적 감수성을 기르고, 글로벌 마인드셋을 갖출 수 있습니다. 또한 독립적으로 문제를 해결하고 적응하는 능력은 업무에서도 큰 자산이 됩니다.'
      }
    }
  ];

  const interests = [
    'AI', '신경건축학', '진화심리학', '공간심리학', 
    '인지심리학', '스마트홈', '사용자 중심 실내건축', '행동경제학', '글로벌 경제',
    '투자', '암호화폐', '국제사회'
  ];

  return (
    <>
      <Navbar />
      <Container>
        <BackButton href="/">홈으로 돌아가기</BackButton>
        <Content className="fade-in">
          <Header>
            <h1>취미 및 관심분야</h1>
            <p>개인적인 관심사와 전문성 향상을 위한 활동들을 소개합니다</p>
          </Header>
          
          <Section>
            <h2>취미 활동</h2>
            <HobbiesGrid>
              {hobbies.map((hobby, index) => (
                <HobbyCard 
                  key={hobby.title}
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <HobbyIcon>{hobby.icon}</HobbyIcon>
                  <HobbyTitle>{hobby.title}</HobbyTitle>
                  <HobbyDescription>{hobby.description}</HobbyDescription>
                  <BadgeContainer>
                    {hobby.experience && (
                      <ExperienceBadge>{hobby.experience}</ExperienceBadge>
                    )}
                    {hobby.title === '독서' && (
                      <ExperienceBadge>월평균 4권</ExperienceBadge>
                    )}
                    {hobby.title === '골프' && (
                      <ExperienceBadge>Life best: 85타</ExperienceBadge>
                    )}
                    {hobby.title === '영어회화' && (
                      <ExperienceBadge>외국인친구와 소통가능</ExperienceBadge>
                    )}
                    {hobby.title === '혼자 해외 여행' && (
                      <>
                        <ExperienceBadge>평균 1년에 2회</ExperienceBadge>
                        <ExperienceBadge>방문국가 10개국 이상</ExperienceBadge>
                      </>
                    )}
                  </BadgeContainer>
                  <WorkConnection>
                    <h4>{hobby.workConnection.title}</h4>
                    <p>{hobby.workConnection.description}</p>
                  </WorkConnection>
                </HobbyCard>
              ))}
            </HobbiesGrid>
          </Section>
          
          <Section>
            <h2>관심 분야</h2>
            <InterestsContainer>
              <InterestsTags>
                {interests.map((interest, index) => (
                  <InterestTag 
                    key={interest}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {interest}
                  </InterestTag>
                ))}
              </InterestsTags>

            </InterestsContainer>
          </Section>
        </Content>
      </Container>
    </>
  );
} 