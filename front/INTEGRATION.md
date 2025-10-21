# Frontend - Book Website MVP

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Router DOM
- React PDF

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure a URL da API do Strapi:
```env
VITE_API_URL=http://localhost:1337/api
```

## 🏃 Executar em Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
npm run build
```

## 📁 Estrutura de Pastas

```
src/
  ├── components/       # Componentes React reutilizáveis
  │   ├── ui/          # Componentes da biblioteca shadcn/ui
  │   ├── BookCard.tsx
  │   ├── SearchBar.tsx
  │   └── ...
  ├── pages/           # Páginas principais da aplicação
  │   ├── Home.tsx
  │   ├── BookDetails.tsx
  │   ├── About.tsx
  │   └── Contact.tsx
  ├── contexts/        # Contextos React (estado global)
  │   └── BooksContext.tsx
  ├── services/        # Serviços de API
  │   └── booksService.ts
  ├── hooks/           # Custom React Hooks
  │   ├── useDebounce.ts
  │   └── useDarkMode.ts
  ├── types/           # Definições TypeScript
  │   └── book.ts
  ├── utils/           # Funções utilitárias
  │   └── formatters.ts
  └── lib/            # Configurações de bibliotecas
      └── utils.ts
```

## 🔌 Integração com Strapi

### Configuração da API

O serviço `booksService.ts` está configurado para consumir a API REST do Strapi com as seguintes funcionalidades:

- **Paginação**: Suporte completo para paginação do Strapi
- **Populate**: Carrega relações (author, cover_image, pdf_file)
- **Filtros**: Busca por título, autor e categoria
- **Retry Logic**: 3 tentativas automáticas em caso de falha
- **Error Handling**: Tratamento de erros global com mensagens amigáveis

### Endpoints Utilizados

```typescript
// Listar livros com paginação
GET /api/books?pagination[page]=1&pagination[pageSize]=20&populate=author,cover_image,pdf_file

// Buscar livro por ID
GET /api/books/:id?populate=author,author.photo,cover_image,pdf_file

// Buscar livros (com filtros)
GET /api/books?filters[title][$containsi]=termo&populate=author,cover_image,pdf_file

// Listar categorias
GET /api/books?fields=categories&pagination[pageSize]=100

// Buscar páginas estáticas
GET /api/pages?filters[key][$eq]=about
```

### Formato de Resposta Strapi

```typescript
{
  "data": [...],  // Array de objetos ou objeto único
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "pageCount": 5,
      "total": 100
    }
  }
}
```

## ✨ Funcionalidades Implementadas

### FRONT-001: Debounce no SearchBar
- ✅ Implementado debounce de 500ms usando hook `useDebounce`
- ✅ Evita chamadas excessivas à API durante digitação
- ✅ Melhora performance e UX

### FRONT-002: Integração com Strapi API
- ✅ Refatoração completa do `booksService.ts`
- ✅ Suporte para formato de resposta do Strapi (data + meta)
- ✅ Paginação do Strapi implementada
- ✅ Populate de relações (author, cover_image, pdf_file)
- ✅ Tipos TypeScript completos para Strapi
- ✅ Retry logic (3 tentativas)
- ✅ Error handling global
- ✅ Variáveis de ambiente (.env)

## 🛠️ Desenvolvimento

### Convenções de Código

- **Componentes**: PascalCase (ex: `BookCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useDebounce.ts`)
- **Tipos**: PascalCase (ex: `Book`, `StrapiResponse`)
- **Serviços**: camelCase (ex: `booksService`)

### Commits

Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
refactor: refatora código
chore: tarefas de manutenção
```

## 🧪 Testes

### Manual

1. Certifique-se que o Strapi está rodando em `http://localhost:1337`
2. Execute o frontend com `npm run dev`
3. Acesse `http://localhost:5173`
4. Teste as funcionalidades:
   - Busca de livros
   - Filtro por categoria
   - Paginação
   - Detalhes do livro
   - Visualização de PDF

### Troubleshooting

**Erro 403 na API:**
- Verifique se as permissões estão configuradas no Strapi (Settings > Roles > Public)
- Permita acesso público aos endpoints: `find`, `findOne` para Books, Authors e Pages

**API não está respondendo:**
- Verifique se o Strapi está rodando: `http://localhost:1337`
- Verifique a variável `VITE_API_URL` no arquivo `.env`

**CORS Error:**
- Verifique a configuração de CORS no Strapi (`config/middlewares.ts`)
- Certifique-se que `http://localhost:5173` está permitido

## 📝 Próximos Passos

- [ ] Implementar cache com React Query (PERF-001)
- [ ] Otimizar BooksContext (PERF-002)
- [ ] Deploy no Vercel (INFRA-004)
- [ ] Configurar variável de ambiente de produção

## 📄 Licença

Este projeto está sob a licença MIT.
