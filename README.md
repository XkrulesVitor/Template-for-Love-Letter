# 💌 Interactive Love Letter Template

![Uma Carta para Você](https://github.com/user-attachments/assets/844140c6-9bb4-466d-b6e7-e66748555ae7)

Um presente digital delicado, interativo e totalmente personalizável feito com **Next.js**, **TailwindCSS** e **Lottie Animations**. Este projeto foi desenhado para ser um template de "Carta de Amor", onde qualquer pessoa pode criar uma experiência única editando apenas um arquivo de configuração.

## ✨ Funcionalidades
- **Envelope Interativo:** Animação de abertura com rotação 3D via CSS.
- **Explosão de Corações:** Efeito visual de impacto ao abrir a carta.
- **Carrossel de Memórias:** Galeria de fotos com transição suave (fade).
- **Trilha Sonora:** Player de música com controle de volume e ícone animado.
- **Efeito de Coração:** Cliques na tela geram partículas mágicas.
- **Configuração Centralizada:** Altere textos, fotos e músicas em um único lugar.

---

## 🚀 Como Personalizar (Passo a Passo)

### 1. Arquivos de Mídia
Coloque seus arquivos na pasta `public/`:
- **Música:** Adicione seu arquivo `.mp3` e nomeie como `music.mp3`.
- **Fotos do Carrossel:** Adicione as fotos que desejar (ex: `01.jpg`, `02.jpg`, etc.).
- **Foto Final:** Adicione a foto para a moldura Polaroid e nomeie como `end.jpg`.

### 2. Conteúdo e Textos

Não é necessário mexer no código principal. Abra o arquivo:  
`src/config/data.ts`  

Lá você encontrará o seguinte objeto para editar:

```typescript
export const siteData = {
  userName: "NOME DA PESSOA",      // O nome que aparece em destaque na carta
  letterText: "Seu texto aqui...", // A mensagem principal (aceita \n para quebras de linha)
  polaroidCaption: "Legenda...",   // Frase que aparece embaixo da foto final
  musicPath: "/music.mp3",         // Caminho do arquivo de áudio
  finalPhoto: "/end.jpg",          // Caminho da foto Polaroid
  carouselImages: [                // Lista com todas as fotos. A quantidade de imagens que adicionar aqui vai ser a do Carrossel
    "/01.jpg",
    "/02.jpg",
    "/03.jpg"
  ],
};
```
---

## 🛠️ Tecnologias Utilizadas
- Next.js 14 (App Router)
- Tailwind CSS (Estilização)
- Lottie React (Animações JSON)
- TypeScript (Segurança no código)

---

## 📦 Instalação
```
**1 - Clone o diretório:**
`git clone https://github.com/XkrulesVitor/Template-for-Love-Letter.git`

**2 - Instale as dependências:**
`npm install`

**3 - Inicie o servidor de desenvolvimento:**
`npm run dev`

**4 - Acesse no navegador para testes:**
`http://localhost:3000`

**5 - Depois de editado suba para seu host.**
```

---

## 📜 Licença
Este projeto é de uso livre para fins pessoais. Se for utilizar como base para algo público, sinta-se à vontade para dar os créditos!

Criado com ❤️ por XkrulesVitor.
