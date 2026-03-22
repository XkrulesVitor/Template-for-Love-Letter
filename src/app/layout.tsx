// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Uma Carta para Você",
  description: "Um presente especial feito com muito carinho.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* O body agora é um Flexbox vertical que ocupa no mínimo a tela toda */}
      <body className="flex flex-col min-h-screen bg-[#2e151b] m-0">
        {/* A tag main vai "crescer" (flex-grow) e empurrar o Footer para baixo */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}