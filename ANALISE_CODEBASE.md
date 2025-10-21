# 📚 Análise Completa do Codebase - Projeto Biblioteca Autoral

**Data:** 21/10/2025  
**Etapa:** Sprint 1 - BACK-003 (Configurar Roles & Permissions)

---

## 1. ESTRUTURA GERAL DO PROJETO

```
book-website-mvp/
├── front/                    # Frontend React+Vite+TypeScript (PORT 5173 dev)
│   ├── src/
│   │   ├── components/       # UI components (shadcn/ui + lucide-react)
│   │   ├── pages/            # Home, BookDetails, About, Contact
│   │   ├── contexts/         # BooksContext (estado global)
│   │   ├── services/         # booksService (chamadas API)
│   │   ├── hooks/            # useDebounce, useDarkMode, useToast
│   │   ├── types/            # Interfaces TypeScript
│   │   └── utils/            # Formatters e helpers
│   └── vite.config.ts        # Config Vite + TailwindCSS
│
├── back/                     # Backend Strapi CMS (PORT 1337)
│   ├── config/               # Configurações globais Strapi
│   │   ├── server.ts         # host, port, APP_KEYS
│   │   ├── database.ts       # PostgreSQL/SQLite config
│   │   ├── api.ts            # REST API limits
│   │   ├── middlewares.ts    # CORS, logger, security
│   │   ├── plugins.ts        # Plugins do Strapi
│   │   └── admin.ts          # Admin panel config
│   ├── src/api/              # Collections (Domainlogic)
│   │   ├── book/             # Content Type: Books
│   │   │   ├── content-types/book/schema.json
│   │   │   ├── controllers/book.ts
│   │   │   ├── routes/book.ts
│   │   │   └── services/book.ts
│   │   ├── author/           # Content Type: Authors
│   │   ├── page/             # Content Type: Pages (Home, About, Contact)
│   │   └── .gitkeep
│   ├── public/uploads/       # Arquivos de upload (PDFs, imagens)
│   ├── database/migrations/  # Migrations do banco
│   └── .env.example          # Variáveis de ambiente (template)
│
└── DETRIZ.md                 # Especificação completa do projeto
```

---

## 2. FRONTEND - STACK & ARQUITETURA

### 2.1 Stack
- **React 18.3.1** + **TypeScript 5**
- **Vite 6** (bundler, dev server rápido)
- **React Router v6** (navegação)
- **TailwindCSS 4.1.9** + **shadcn/ui** (UI components)
- **Lucide React** (ícones)
- **Framer Motion** (animações)
- **React Hook Form** + **Zod** (forms + validação)

### 2.2 Padrões & Arquitetura

#### Context API (Estado Global)
```
BooksContext
├── books: Book[]              # Livros carregados
├── filteredBooks: Book[]      # Livros após filtros
├── categories: string[]       # Categorias únicas
├── filters: { searchTerm, category }
├── isLoading: boolean
├── currentPage: number
└── itemsPerPage: 10|20|50|100
```

#### Fluxo de Dados
```
SearchBar (input) 
  → useDebounce (300ms) 
  → setFilters 
  → BooksContext 
  → booksService.searchBooks() 
  → filteredBooks 
  → BooksGrid (render)
```

#### Custom Hooks
- `useDebounce(value, delay)` - Debounce para search
- `useDarkMode()` - Dark/Light theme
- `useToast()` - Toasts & notifications
- `use-mobile.ts` - Detect mobile viewport

### 2.3 Componentes Principais

| Componente | Propósito | Status |
|-----------|-----------|--------|
| `Header` | Logo, nav, dark mode | ✅ Completo |
| `SearchBar` | Input com debounce | ✅ Completo (debounce já implementado!) |
| `CategoryFilter` | Filtro por categoria | ✅ Completo |
| `BooksGrid` | Grid de cards | ✅ Completo |
| `BookCard` | Card individual | ✅ Completo (com animação Framer) |
| `Pagination` | Navegação de páginas | ✅ Completo |
| `BookInfo` | Detalhes do livro | ✅ Completo |
| `PDFViewer` | Leitor PDF | ✅ Completo |
| `Footer` | Rodapé | ✅ Completo |

### 2.4 Serviço: booksService

**Atualmente:** Usa Open Library API + dados locais (books.json)

```typescript
interface booksService {
  getBooks(options: PaginationOptions)      // Lista paginada
  getBookById(id: string)                   // Detalhe de 1 livro
  searchBooks(q: string, category?: string) // Busca com filtros
  getCategories()                           // Lista categorias
}
```

**Próxima etapa (FRONT-002):** Integração com Strapi REST API
- Ajustar endpoints para `/api/books`, `/api/authors`
- Tratamento de paginação Strapi (`meta.pagination`)
- Tipos TypeScript para responses Strapi

---

## 3. BACKEND - STRAPI CMS

### 3.1 Stack
- **Strapi v5.28.0** (Headless CMS)
- **Node.js 18-22.x**
- **PostgreSQL** (recomendado) ou SQLite (dev)
- **TypeScript 5**
- **PM2** (process manager - produção)

### 3.2 Configuração Global

#### `config/server.ts`
```typescript
host: '0.0.0.0'
port: 1337
app: {
  keys: env.array('APP_KEYS')  // 4 keys para segurança
}
```

#### `config/database.ts`
- **Dev:** SQLite `.tmp/data.db`
- **Prod:** PostgreSQL com SSL
- Connection pool: min 2, max 10

#### `config/api.ts`
```typescript
rest: {
  defaultLimit: 25,
  maxLimit: 100,        // Máximo de items por página
  withCount: true       // Retorna total de items
}
```

#### `config/middlewares.ts`
```typescript
[
  'strapi::logger',      // Logs
  'strapi::errors',      // Error handling
  'strapi::security',    // Security headers
  'strapi::cors',        // CORS
  'strapi::poweredBy',   // X-Powered-By header
  'strapi::query',       // Query parsing
  'strapi::body',        // Body parsing
  'strapi::session',     // Sessions
  'strapi::favicon',
  'strapi::public'       // Static files
]
```

### 3.3 Content Types (Models)

#### **Book** (collectionType: `books`)
```json
{
  "title": "string (unique, required)",
  "author": "relation (many-to-one with Author)",
  "categories": "enum (ficcao, nao_ficcao)",
  "summary": "blocks (rich text)",
  "pages_count": "integer (required)",
  "publish_date": "date (required)",
  "display_date": "date (required)",
  "cover_image": "media (image single)",
  "pdf_file": "media (file single, required)",
  "slug": "uid from title (required, unique)"
}
```

#### **Author** (collectionType: `authors`)
```json
{
  "name": "string (unique, required)",
  "bio": "blocks (rich text)",
  "photo": "media (image single)",
  "book": "relation (many-to-one with Book)"
}
```

**⚠️ PROBLEMA IDENTIFICADO:** 
- Relação `book` em Author é many-to-one, mas schema Book tem `author` como one-to-many
- **Deveria ser:** Author 1---N Books (um autor tem muitos livros)

#### **Page** (collectionType: `pages`)
```json
{
  "key": "uid (required, unique) - ex: 'home', 'about', 'contact'",
  "title": "string (required)",
  "content": "blocks (rich text)"
}
```

### 3.4 Padrão de Código Strapi

**Controllers, Routes, Services** - Usa factory pattern:
```typescript
// controllers/book.ts
export default factories.createCoreController('api::book.book');

// routes/book.ts
export default factories.createCoreRouter('api::book.book');

// services/book.ts
export default factories.createCoreService('api::book.book');
```

**Benefício:** Herda CRUD automático do Strapi (GET, POST, PUT, DELETE)

---

## 4. SEGURANÇA & VARIÁVEIS DE AMBIENTE

### 4.1 `.env.example` Template

| Variável | Tipo | Exemplo |
|----------|------|---------|
| `HOST` | string | `0.0.0.0` |
| `PORT` | int | `1337` |
| `APP_KEYS` | array | `key1,key2,key3,key4` (gerar com crypto) |
| `API_TOKEN_SALT` | string | (aleatório) |
| `ADMIN_JWT_SECRET` | string | (aleatório) |
| `JWT_SECRET` | string | (aleatório) |
| `DATABASE_CLIENT` | enum | `postgres` \| `sqlite` \| `mysql` |
| `DATABASE_URL` | string | `postgresql://user:pass@host/db` |
| `DATABASE_SSL` | bool | `false` (dev), `true` (prod) |

### 4.2 Segredos (NUNCA COMMITAR!)

Gerar com:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 5. FLUXO REST API STRAPI

### 5.1 Endpoints Automáticos

| Endpoint | Método | Autenticação | Permissões |
|----------|--------|--------------|-----------|
| `/api/books` | GET | ❌ | Public: findMany |
| `/api/books/:id` | GET | ❌ | Public: findOne |
| `/api/books` | POST | ✅ JWT | Auth: create |
| `/api/books/:id` | PUT | ✅ JWT | Auth: update |
| `/api/books/:id` | DELETE | ✅ JWT | Auth: delete |
| `/api/authors` | GET | ❌ | Public: findMany |
| `/api/pages` | GET | ❌ | Public: findMany |

### 5.2 Response Format (Exemplo)

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123xyz",
      "title": "Clean Code",
      "slug": "clean-code",
      "author": {
        "id": 5,
        "documentId": "auth456",
        "name": "Robert C. Martin"
      },
      "createdAt": "2025-10-21T10:30:00Z",
      "updatedAt": "2025-10-21T10:30:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 4,
      "total": 100
    }
  }
}
```

---

## 6. PRÓXIMOS PASSOS (ROADMAP)

### Sprint 1 - Setup Backend (Dias 1-5)

- [x] **BACK-001** - Inicializar Strapi ✅
- [x] **BACK-002** - Content Types criados ✅
- [ ] **BACK-003** - **Configurar Roles & Permissions** ← PRÓXIMO
  - Public role: GET apenas (findMany, findOne)
  - Authenticated role: CRUD completo
  - CORS restricting
  
- [ ] **BACK-004** - Popular DB com dados de teste
- [ ] **FRONT-001** - Debounce SearchBar (já implementado!)
- [ ] **FRONT-002** - Integrar booksService com Strapi API

### Sprint 2 - Segurança & Performance (Dias 6-10)

- [ ] **SEC-001** - Validação de uploads
- [ ] **SEC-002** - Variáveis de ambiente
- [ ] **PERF-001** - React Query cache
- [ ] **INFRA-001** - Configurar VPS Hostinger
- [ ] **INFRA-002** - Deploy Strapi no VPS

### Sprint 3 - Deploy & Documentação (Dias 11-15)

- [ ] **SEC-003** - SSL Let's Encrypt
- [ ] **SEC-004** - Cloudflare setup
- [ ] **DOC-001** - Documentação técnica
- [ ] **DOC-002** - Guia para cliente
- [ ] **TRAIN-001** - Treinamento cliente

---

## 7. PADRÕES & BOAS PRÁTICAS

### Frontend
✅ **Components:** Nomeadas PascalCase, compostas
✅ **Hooks:** Custom hooks separados, reutilizáveis
✅ **Tipos:** TypeScript strict, interfaces bem definidas
✅ **Estado:** Context API centralizado
⚠️ **TODO:** React Query para cache de API

### Backend (Strapi)
✅ **Content Types:** Bem estruturados, relações corretas
✅ **Factory Pattern:** Controllers, routes, services padrão
✅ **Configuração:** Separada em arquivos específicos
🔴 **TODO:** Roles & Permissions configuradas (BACK-003)
🔴 **TODO:** Validações customizadas de uploads

---

## 8. CHECKLIST PRÉ-BACK-003

### Verificações
- ✅ Strapi v5.28.0 rodando em `localhost:1337`
- ✅ PostgreSQL/SQLite configurado em `config/database.ts`
- ✅ 3 Content Types criados: Book, Author, Page
- ✅ Relations: Book → Author (many-to-one)
- ✅ Frontend React rodando em `localhost:5173`
- ✅ booksService.ts pronto para integração

### Próxima Tarefa (BACK-003)
1. Acessar `http://localhost:1337/admin`
2. Ir em **Settings → Users & Permissions → Roles**
3. Configurar **Public role:**
   - Book: `find`, `findOne` (apenas leitura)
   - Author: `find`, `findOne`
   - Page: `find`, `findOne`
4. Configurar **Authenticated role:**
   - Book: `find`, `findOne`, `create`, `update`, `delete`
   - Author: `find`, `findOne`, `create`, `update`, `delete`
   - Page: `find`, `findOne`, `create`, `update`, `delete`
5. Configurar **CORS** em `config/middlewares.ts`
6. Testar endpoints com Postman/Curl

---

**Autor:** GitHub Copilot  
**Status:** Análise Concluída ✅  
**Próximo:** Implementar BACK-003
