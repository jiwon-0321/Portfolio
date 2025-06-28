import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.65rem 1.3rem;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(245, 168, 159, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 168, 159, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.55rem 1.1rem;
    font-size: 0.85rem;
    gap: 0.4rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.45rem 0.9rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  }
`;

const ArrowIcon = styled.span<{ open: boolean }>`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ open }) => open ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)'};
  
  @media (max-width: 480px) {
    border-left-width: 3px;
    border-right-width: 3px;
    border-top-width: 4px;
  }
`;

const DropdownContent = styled.div<{ open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: rgba(250, 249, 246, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(245, 168, 159, 0.15);
  border: 1px solid rgba(250, 249, 246, 0.3);
  z-index: 1001;
  overflow: hidden;
  opacity: ${({ open }) => open ? '1' : '0'};
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  transform: ${({ open }) => open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top center;
  
  @media (max-width: 768px) {
    min-width: 180px;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    min-width: 160px;
    border-radius: 10px;
    right: 0;
    left: auto;
    transform: ${({ open }) => open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
    transform-origin: top right;
  }
  
  @media (max-width: 360px) {
    min-width: 140px;
    border-radius: 8px;
  }
`;

const DropdownItem = styled.div`
  color: #2C3E50;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-bottom: 1px solid rgba(250, 249, 246, 0.2);
  margin: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  /* Background gradient */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
  }
  
  &:hover {
    color: white;
    transform: translateX(8px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(245, 168, 159, 0.4),
      0 0 15px rgba(245, 168, 159, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
  
  &:hover:before {
    width: 100%;
    background: linear-gradient(
      135deg, 
      #F5A89F 0%, 
      #F2998E 50%, 
      #F5A89F 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    gap: 0.6rem;
    
    &:hover {
      transform: translateX(6px) scale(1.02);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    gap: 0.5rem;
    
    &:hover {
      transform: translateX(4px) scale(1.01);
    }
  }
  
  @media (max-width: 360px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    gap: 0.4rem;
    
    &:hover {
      transform: translateX(3px) scale(1.01);
    }
  }
`;

const MenuIcon = styled.span`
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-block;
  flex-shrink: 0;
  
  .dropdown-item:hover & {
    transform: scale(1.3) rotate(10deg);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    
    .dropdown-item:hover & {
      transform: scale(1.2) rotate(8deg);
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    
    .dropdown-item:hover & {
      transform: scale(1.15) rotate(6deg);
    }
  }
  
  @media (max-width: 360px) {
    font-size: 0.85rem;
    
    .dropdown-item:hover & {
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const MenuText = styled.span`
  flex: 1;
  
  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

export default function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const menuItems = [
    { text: '자기소개서', route: '/about/self', icon: '📝' },
    { text: '학력 및 경력', route: '/about/career', icon: '🎓' },
    { text: '자격증', route: '/about/certificate', icon: '🏆' },
    { text: '취미 및 관심분야', route: '/about/hobbies', icon: '🎨' }
  ];
  
  return (
    <Dropdown onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownButton>
        👤 소개합니다
        <ArrowIcon open={open} />
      </DropdownButton>
      <DropdownContent open={open}>
        {menuItems.map((item, index) => (
          <DropdownItem 
            key={item.route}
            className="dropdown-item"
            onClick={() => router.push(item.route)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuText>{item.text}</MenuText>
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
} 