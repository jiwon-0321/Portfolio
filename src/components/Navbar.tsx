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
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(160, 174, 192, 0.3);
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  a {
    color: #2D3748;
    font-weight: 600;
    position: relative;
    
    &:not(:last-child):after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
      transition: width 0.3s ease;
    }
    
    &:not(:last-child):hover:after {
      width: 100%;
    }
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
`;

export default function Navbar() {
  return (
    <Nav className="slide-in-left">
      <Link href="/">
        <Logo className="bounce-in">Jiwon Portfolio</Logo>
      </Link>
      <NavLinks className="slide-in-right">
        <AboutDropdown />
        <Link href="/contact">Contact</Link>
        <Link href="/projects">
          <ContactButton className="pulse">포트폴리오</ContactButton>
        </Link>
      </NavLinks>
    </Nav>
  );
} 