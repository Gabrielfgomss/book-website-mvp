# 📚 Book Website MVP

Um site moderno e responsivo para descobrir e explorar livros autorais, construído com React, Vite e integrado com a Open Library API.

## ✨ Features

- 🔍 **Busca de Livros**: Pesquise por título ou autor
- 📖 **Catálogo Completo**: Navegue por categorias
- 📄 **Leitor de PDF**: Visualize PDFs de livros disponíveis
- 🎨 **Dark Mode**: Alterne entre tema claro e escuro
- 📱 **Responsivo**: Design otimizado para mobile, tablet e desktop
- ⚡ **Performance**: Carregamento rápido com Vite
- 📊 **Paginação**: Escolha entre 10, 20, 50 ou 100 livros por página

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router v7** - Roteamento SPA
- **Tailwind CSS v4** - Estilização
- **Shadcn/ui** - Componentes UI
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **Open Library API** - Dados de livros

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Entre no diretório
cd book-website-mvp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🌐 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel:

1. Faça push do código para o GitHub
2. Importe o projeto na Vercel
3. A Vercel detectará automaticamente as configurações do Vite
4. Deploy automático a cada push na branch principal

## 📁 Estrutura do Projeto

```
book-website-mvp/
├── src/
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes UI (Shadcn)
│   │   ├── BookCard.tsx
│   │   ├── BooksGrid.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FilterBar.tsx
│   │   ├── PDFViewer.tsx
│   │   └── Pagination.tsx
│   ├── contexts/       # Context API
│   │   └── BooksContext.tsx
│   ├── pages/          # Páginas/Rotas
│   │   ├── Home.tsx
│   │   ├── BookDetails.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── services/       # Serviços API
│   │   └── booksService.ts
│   ├── types/          # Tipos TypeScript
│   │   └── book.ts
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Funções utilitárias
│   ├── data/           # Dados mockados
│   ├── App.tsx         # Componente raiz
│   ├── main.tsx        # Entry point
│   └── globals.css     # Estilos globais
├── public/             # Arquivos estáticos
├── index.html          # HTML base
├── vite.config.ts      # Configuração Vite
├── vercel.json         # Configuração Vercel
└── package.json        # Dependências
```

## 🔌 APIs Utilizadas

### Open Library API

- **Search API**: Busca e listagem de livros
- **Works API**: Detalhes de obras
- **Editions API**: Informações de edições
- **Read API**: Verificação de disponibilidade de PDFs
- **Authors API**: Informações de autores

Documentação: https://openlibrary.org/developers/api

## 🎨 Personalização

### Temas

O projeto suporta dark mode. O tema pode ser alternado usando o botão no header.

### Cores

As cores são definidas no arquivo `src/globals.css` usando CSS variables.

## 📝 Licença

MIT

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através da página de contato do site.
