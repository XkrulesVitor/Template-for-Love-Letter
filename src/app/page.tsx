"use client"; // Indica que este componente é renderizado no navegador

import React, { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react"; 
import { siteData } from "../config/data"; // Importa as configurações personalizáveis

// Interface para o efeito visual de cliques
interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export default function PassionatePage() {
  // --- ESTADOS DE CONTROLE ---
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false); 
  const [showExplosion, setShowExplosion] = useState<boolean>(false); 

  // --- ESTADOS PARA CAMADAS DE ANIMAÇÃO NO FUNDO ---
  const [showLayer2, setShowLayer2] = useState<boolean>(false);
  const [showLayer3, setShowLayer3] = useState<boolean>(false);

  // --- ESTADOS DE INTERAÇÃO E CARROSSEL ---
  const [clicks, setClicks] = useState<ClickEffect[]>([]); 
  const [currentImage, setCurrentImage] = useState<number>(0); 

  // --- ESTADOS PARA AS ANIMAÇÕES JSON ---
  const [clickAnimData, setClickAnimData] = useState<any>(null); 
  const [heartsAnimData, setHeartsAnimData] = useState<any>(null); 
  const [musicAnimData, setMusicAnimData] = useState<any>(null); 

  // --- REFERÊNCIAS ---
  const audioRef = useRef<HTMLAudioElement | null>(null); 
  const musicIconRef = useRef<LottieRefCurrentProps | null>(null); 

  // Puxa o array de imagens do arquivo de configuração
  const images = siteData.carouselImages;

  // EFEITO: Carrega os arquivos JSON de animação
  useEffect(() => {
    fetch("/animate-click.json").then((res) => res.json()).then((data) => setClickAnimData(data));
    fetch("/animate-hearth.json").then((res) => res.json()).then((data) => setHeartsAnimData(data));
    fetch("/animate-music.json").then((res) => res.json()).then((data) => setMusicAnimData(data));
  }, []);

  // EFEITO: Volume em 50%
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // EFEITO: Controle do Carrossel Automático
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isOpen, images.length]);

  // EFEITO: Controle das camadas de corações
  useEffect(() => {
    if (isOpen) {
      const timer2 = setTimeout(() => setShowLayer2(true), 2000);
      const timer3 = setTimeout(() => setShowLayer3(true), 4000);
      return () => { clearTimeout(timer2); clearTimeout(timer3); };
    } else {
      setShowLayer2(false);
      setShowLayer3(false);
    }
  }, [isOpen]);

  // FUNÇÃO: Cria estrelas ao clicar na tela
  const handleGlobalClick = (e: React.MouseEvent) => {
    const newClick: ClickEffect = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClicks((prev) => [...prev, newClick]);
    setTimeout(() => {
      setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
    }, 2000);
  };

  // FUNÇÃO: Abre a carta e inicia multimídia
  const handleOpenLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
    setShowExplosion(true);
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Erro ao tocar áudio", err));
    }
  };

  // FUNÇÃO: Toggle Play/Pause
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      audioRef.current?.pause();
      musicIconRef.current?.pause();
    } else {
      audioRef.current?.play();
      musicIconRef.current?.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // FUNÇÃO: Fecha a carta com delay suave
  const handleCloseLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      setIsOpen(false);
      setShowExplosion(false);
      if (audioRef.current) audioRef.current.pause();
      setIsMusicPlaying(false);
    }, 900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleGlobalClick}
      className={`flex-grow w-full flex justify-center overflow-x-hidden relative ${!isOpen ? "items-center" : "items-start py-10"}`}
    >
      {/* Efeito de Clique */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="opacity-25 pointer-events-none fixed z-[9999] w-32 h-32"
          style={{ left: click.x - 64, top: click.y - 64 }}
        >
          {clickAnimData && <Lottie animationData={clickAnimData} loop={false} />}
        </div>
      ))}

      {/* Áudio puxado do data.ts */}
      <audio ref={audioRef} loop src={siteData.musicPath} preload="auto" />

      {!isOpen ? (
        /* Envelope Fechado */
        <div
          onClick={handleOpenLetter}
          className="group cursor-pointer relative w-80 h-56 bg-[#e2babc] rounded-sm shadow-2xl flex items-center justify-center border-2 border-[#c48e93] transition-transform hover:scale-105 z-20"
        >
          <div
            className="absolute top-0 w-full h-1/2 bg-[#d4a3a6] origin-top transition-transform duration-700 group-hover:-rotate-x-180 z-20"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
          ></div>
          <h2 className="text-[#6e363e] font-serif font-bold tracking-widest border-y border-[#6e363e]/30 py-2 px-4 z-10 mt-20">
            ABRIR CARTA
          </h2>
        </div>
      ) : (
        <>
          {/* Explosão de Corações */}
          {showExplosion && heartsAnimData && (
            <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
              <Lottie
                animationData={heartsAnimData}
                loop={false}
                initialSegment={[0, 180]}
                onComplete={() => setShowExplosion(false)}
                className="w-full h-full scale-[2.0]"
              />
            </div>
          )}

          {/* Fundo Animado */}
          <div className="fixed inset-0 pointer-events-none z-0 flex justify-between opacity-30">
            <div className="w-1/3 h-full relative overflow-hidden">
              {heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
              {showLayer2 && heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
              {showLayer3 && heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
            </div>
            <div className="w-1/3 h-full relative overflow-hidden">
              {heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
              {showLayer2 && heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
              {showLayer3 && heartsAnimData && <Lottie animationData={heartsAnimData} loop initialSegment={[0, 180]} className="absolute inset-0 w-full h-full scale-150" />}
            </div>
          </div>

          {/* Botão de Música */}
          <button
            onClick={toggleMusic}
            className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md shadow-lg border border-[#e2babc]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 ${!isMusicPlaying ? "opacity-50 grayscale" : ""}`}
          >
            {musicAnimData && <Lottie lottieRef={musicIconRef} animationData={musicAnimData} loop={true} className="w-8 h-8" />}
            {!isMusicPlaying && <div className="absolute w-8 h-0.5 bg-red-600/80 rotate-45 rounded-full" />}
          </button>

          {/* Conteúdo da Carta Aberta */}
          <div className="carta-animada w-full max-w-5xl bg-[#fcf3f4] min-h-full shadow-2xl relative border-x-[12px] border-[#edd7da] pb-5 z-20">
            
            <header className="py-12 text-center border-b border-[#e2babc]/50 mx-10">
              <h1 className="text-[#7a3b46] text-[1.1em] uppercase tracking-[0.6em] font-serif">
                Ao meu grande amor
              </h1>
            </header>

            {/* Carrossel Dinâmico */}
            <section className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[4/3] mt-12 border-[15px] border-white shadow-xl overflow-hidden grayscale-[5%] bg-[#fffafa]">
              {images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Memória"
                  className={`absolute inset-0 w-full h-full object-contain p-2 transition-opacity duration-[1500ms] ${index === currentImage ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </section>

            <main className="px-8 md:px-24 py-20 text-center relative z-40">
              {/* Nome puxado do data.ts */}
              <h1 className="text-7xl md:text-9xl text-[#6e2c38] mb-12 custom-script">
                {siteData.userName}
              </h1>
              
              {/* Texto puxado do data.ts */}
              <div className="relative p-10 bg-[#fffafa] shadow-inner border-l-8 border-[#e2babc] text-left mb-12">
                <p className="text-2xl md:text-[1.5em] text-[#7a3b46] leading-relaxed italic font-serif relative z-10 whitespace-pre-wrap">
                  "{siteData.letterText}"
                </p>
              </div>

              {/* Polaroid Final */}
              <div className="flex justify-center w-full mb-12">
                <div className="flex flex-col items-center p-5 pb-8 bg-white shadow-2xl rotate-2 border border-gray-100 ">
                  <img
                    src={siteData.finalPhoto}
                    alt="Foto Final"
                    className="max-w-full h-auto max-h-[500px] object-contain rounded-sm"
                  />
                  {/* Legenda puxada do data.ts */}
                  <p className="mt-6 text-[#7a3b46] font-mono text-sm uppercase tracking-widest opacity-80 text-center">
                    {siteData.polaroidCaption}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-10">
                <button
                  onClick={handleCloseLetter}
                  className="px-10 py-3 border border-[#944c58] text-[#944c58] font-serif uppercase tracking-[0.3em] text-sm hover:bg-[#944c58] hover:text-[#fcf3f4] transition-colors duration-500 cursor-pointer"
                >
                  Guardar Carta
                </button>
              </div>
            </main>
          </div>
        </>
      )}

      {/* Estilos */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=EB+Garamond:ital,wght@0,400;1,400&display=swap");

        .carta-animada {
          animation: abrirSuave 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes abrirSuave {
          0% { opacity: 0; transform: scale(0.9) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        body { background-color: #2e151b; margin: 0; }
        .custom-script { font-family: "Great Vibes", cursive; }
        .origin-top { transform-origin: top; }
        .group:hover .group-hover\\:-rotate-x-180 { transform: rotateX(-180deg); }
      `}</style>
    </div>
  );
}