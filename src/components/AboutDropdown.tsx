import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  color: #2D3748;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  position: relative;
  margin: 0;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover:after {
    width: 80%;
  }
`;

const ArrowIcon = styled.span<{ open: boolean }>`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #2D3748;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ open }) => open ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)'};
`;

const DropdownContent = styled.div<{ open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(160, 174, 192, 0.3);
  z-index: 1001;
  overflow: hidden;
  opacity: ${({ open }) => open ? '1' : '0'};
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  transform: ${({ open }) => open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top center;
`;

const DropdownItem = styled.div`
  color: #2D3748;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(160, 174, 192, 0.2);
  margin: 0;
  position: relative;
  overflow: hidden;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  
  &:hover {
    color: white;
    transform: translateX(8px);
  }
  
  &:hover:before {
    width: 100%;
  }
`;

export default function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  return (
    <Dropdown onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <DropdownButton>
        소개합니다
        <ArrowIcon open={open} />
      </DropdownButton>
      <DropdownContent open={open}>
        <DropdownItem onClick={() => router.push('/about/self')}>자기소개서</DropdownItem>
        <DropdownItem onClick={() => router.push('/about/career')}>경력</DropdownItem>
        <DropdownItem onClick={() => router.push('/about/certificate')}>자격증</DropdownItem>
        <DropdownItem onClick={() => router.push('/about/hobbies')}>취미 및 관심분야</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
} 