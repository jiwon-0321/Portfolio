import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AboutDropdown from './AboutDropdown';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(250, 249, 246, 0.15);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(250, 249, 246, 0.3);
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  min-height: 70px;
  
  &:hover {
    background: rgba(250, 249, 246, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    min-height: 65px;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    min-height: 60px;
  }
  
  @media (max-width: 360px) {
    padding: 0.5rem 0.75rem;
    min-height: 55px;
  }
`;

const LogoText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const LogoTextShort = styled.span`
  display: none;
  @media (max-width: 480px) {
    display: inline;
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  a {
    color: #2C3E50;
    font-weight: 600;
    font-size: 1rem;
    position: relative;
    white-space: nowrap;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
    
    a {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    gap: 0.7rem;
    
    a {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 360px) {
    gap: 0.5rem;
    
    a {
      font-size: 0.8rem;
    }
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, #F5A89F 0%, #F2998E 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.65rem 1.3rem;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(245, 168, 159, 0.3);
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 168, 159, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.55rem 1.1rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.45rem 0.9rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
`;

export default function Navbar() {
  return (
    <Nav className="slide-in-left">
      <Link href="/">
        <Logo className="bounce-in">
          <LogoText>Jiwon Portfolio</LogoText>
          <LogoTextShort>🏠</LogoTextShort>
        </Logo>
      </Link>
      <NavLinks className="slide-in-right">
        <AboutDropdown />
        <Link href="/projects">📁 포트폴리오</Link>
        <Link href="/contact">🤝 Contact</Link>
      </NavLinks>
    </Nav>
  );
} 