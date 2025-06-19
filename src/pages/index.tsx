import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '2rem' }}>
        <Hero />
        <Skills />
      </main>
    </>
  );
} 