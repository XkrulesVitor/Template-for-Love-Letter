// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-black/20 backdrop-blur-sm border-t border-white/10 flex items-center justify-center z-50">
      <div className="flex gap-6 text-sm font-serif tracking-widest text-white/70">
        <span>©2026 Criado Por Vitor "XKrules" Noronha</span>
        
        <span className="opacity-50">|</span>
        
        <a 
          href="https://github.com/XkrulesVitor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          GITHUB
        </a>
      </div>
    </footer>
  );
}