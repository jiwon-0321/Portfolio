import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const projects = [
  {
    id: 1,
    title: 'The Habi',
    category: '숙박공간',
    image: '/main images/main.png.png',
    description: '자연과 호흡하는 바이오필릭 디자인 호텔'
  },
  {
    id: 2,
    title: '오피스 공간 리모델링',
    category: '업무공간',
    image: '/images/office.jpg',
    description: '효율적이고 창의적인 업무 환경을 위한 스마트 오피스'
  }
];

const Container = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin: 8rem 0 4rem 0;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(44, 62, 80, 0.3);
  }
  
  p {
    font-size: 1.2rem;
    color: #2C3E50;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    margin: 6rem 0 3rem 0;
    
    h1 {
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    margin: 5rem 0 2.5rem 0;
    
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    padding-bottom: 2rem;
  }
`;

const ProjectCard = styled.div`
  background: rgba(250, 249, 246, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(245, 168, 159, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(245, 168, 159, 0.2);
    border-color: rgba(245, 168, 159, 0.5);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(245, 168, 159, 0.1), transparent);
    transition: left 0.5s;
    z-index: 1;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ProjectCategory = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 0.5rem;
`;

const ProjectTitleSmall = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  color: #2C3E50;
  opacity: 0.6;
`;

const ProjectDescription = styled.p`
  color: #2C3E50;
  opacity: 0.8;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export default function Projects() {
  const router = useRouter();
  
  return (
    <>
      <Navbar />
      <Container>
        <Header className="fade-in">
          <h1>포트폴리오</h1>
          <p>다양한 공간에서의 실내건축 프로젝트를 소개합니다</p>
        </Header>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              className="slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => router.push(`/project/${project.id}`)}
            >
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectContent>
                <ProjectCategory>{project.category}</ProjectCategory>
                <ProjectTitle>
                  {project.title}
                </ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </>
  );
} 