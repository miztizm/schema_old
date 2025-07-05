<template>
    <div class="cyber-hud">
      <div class="holographic-overlay"></div>
      <div class="hud-section">
        <div class="hud-item">
          <span class="label glitch-text" data-text="NETWORK INTEGRITY">NETWORK INTEGRITY</span>
          <div class="bar">
            <div class="fill" :style="{ width: '87%' }">
              <div class="pulse-effect"></div>
            </div>
            <span class="percentage">87%</span>
          </div>
        </div>
        
        <div class="hud-item">
          <span class="label glitch-text" data-text="NEURAL LOAD">NEURAL LOAD</span>
          <div class="neural-gauge">
       
            <div class="dna-strand">
              <div v-for="i in 12" :key="i" class="node"></div>
            </div>
            
          </div>
        </div>
        
        <div class="hud-item">
          <span class="label glitch-text" data-text="ENCRYPTION STATUS">ENCRYPTION STATUS</span>
          <div class="cipher-status">
            <span class="kanji">量子暗号</span>
            <div class="status-indicator">
              <div class="active-pulse"></div>
              <span class="status-text">0xFFFF 0x7A5F</span>
 
            </div>
          </div>
        </div>
      </div>
      
      <div class="scanline"></div>
      <div class="grid-overlay"></div>
    </div>
  </template>
  
  <style>
  .cyber-hud {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #0ff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    overflow: hidden;
    z-index: 1000;
  }
  
  .holographic-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 255, 255, 0.1) 0%,
      rgba(0, 255, 255, 0.05) 50%,
      rgba(0, 255, 255, 0.1) 100%
    );
    pointer-events: none;
  }
  
  .hud-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    position: relative;
  }
  
  .hud-item {
    position: relative;
    padding: 1rem;
    background: rgba(0, 20, 20, 0.3);
    border-radius: 4px;
  }
  
  .label {
    display: block;
    color: #0ff;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .bar {
    height: 17px;
    background: rgba(0, 30, 30, 0.8);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  
  .fill {
    height: 100%;
    background: linear-gradient(90deg, #0ff, #0f0);
    position: relative;
    transition: width 0.5s ease;
  }
  
  .pulse-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.3) 0%,
      transparent 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
    animation: pulse 2s infinite;
  }
  
  .neural-gauge {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .dna-strand {
    flex-grow: 1;
    display: flex;
    gap: 4px;
    height: 16px;
  }
  
  .node {
    width: 8px;
    background: #0ff;
    animation: node-pulse 8.2s infinite;
    animation-delay: calc(var(--i) * 0.1s);
  }
  
  @keyframes node-pulse {
    0%, 100% { transform: scaleY(1); opacity: 0.6; }
    50% { transform: scaleY(1.8); opacity: 1; }
  }
  
  .cipher-status {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .kanji {
    font-size: 1.3rem;
    color: #0f0;
    text-shadow: 0 0 10px #0f03;
  }
  
  .status-indicator {
    position: relative;
    padding: 0.3rem 0.8rem;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid #0f0;
  }
  
  .active-pulse {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 255, 0, 0.2);
    animation: pulse 1.5s infinite;
  }
  
  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(0, 255, 255, 0.6) 50%,
      transparent 100%
    );
    animation: scan 4s linear infinite;
  }
  
  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }
  
  @keyframes scan {
    0% { top: -100%; }
    100% { top: 100%; }
  }
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.2; }
    100% { opacity: 0.6; }
  }
  
  @media (max-width: 768px) {
    .hud-section {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .label {
      font-size: 0.8rem;
    }
    
    .kanji {
      font-size: 1.4rem;
    }
  }
  
  @media (max-width: 480px) {
    .cyber-hud {
      bottom: 10px;
      left: 10px;
      right: 10px;
      padding: 1rem;
    }
    
    .hud-item {
      padding: 0.8rem;
    }
  }
  </style>