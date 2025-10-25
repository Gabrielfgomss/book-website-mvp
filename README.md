# Book Website MVP

Site responsivo para exibição de livros autorais com painel administrativo Strapi.

## 📁 Estrutura do Projeto (Monorepo)

```
book-website-mvp/
├── front/          # Frontend React + Vite + TypeScript
├── back/           # Backend Strapi CMS
├── DETRIZ.md       # Backlog e documentação do projeto
└── README.md       # Este arquivo
```

## 🚀 Quick Start

### Frontend

```bash
cd front
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Backend

```bash
cd back
npm install
npm run develop
```

Acesse: `http://localhost:1337/admin`

## 📚 Documentação

- [Frontend README](./front/README.md) - Instruções detalhadas do frontend
- [Backend README](./back/README.md) - Instruções detalhadas do backend
- [DETRIZ.md](./DETRIZ.md) - Backlog completo e documentação técnica

## 🛠️ Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router DOM
- React PDF

**Backend:**
- Strapi v5.28.0
- Node.js 20.x
- TypeScript
- PostgreSQL (dev) / PostgreSQL (prod)

## 📦 Deploy

- **Frontend:** Vercel
- **Backend:** Strapi Cloud
- **CDN:** Cloudflare

**Última atualização:** 25/10/2025
