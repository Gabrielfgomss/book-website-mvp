# RESUMO / BACKLOG - PROJETO: SITE DE LIVROS AUTORAIS

**Status do projeto:** 🟡 Em desenvolvimento  
**Sprint atual:** Sprint 1 - Backend Setup  
**Data de início:** 20/10/2025  
**Data de entrega:** 08/11/2025 (15 dias úteis)  
**Última atualização:** 20/10/2025

## 1) OBJETIVO
Entregar um site responsivo em React + TypeScript com painel Strapi. Deploy em Hostinger VPS e configuracao SSL/Cloudflare. Entrega pronta, segura e documentada.

**Definition of Done (DoD):**
- [ ] Código em produção e funcionando
- [ ] Testes de segurança aprovados (SSL, headers, OWASP básico)
- [ ] Performance >85 no Lighthouse
- [ ] Documentação completa (README + guia do cliente)
- [ ] Treinamento do cliente concluído (1h)
- [ ] Backups automáticos configurados

## 2) ANÁLISE DE STACK (20/10/2025)

### Stack escolhida
- **Frontend:** React + TypeScript + Vite ✅ (CONCLUÍDO)
- **UI:** TailwindCSS + shadcn/ui + lucide-react ✅
- **Estado:** React Context ✅
- **Router:** react-router-dom ✅
- **PDF viewer:** react-pdf ✅
- **CMS:** Strapi v4.x (Node.js) 🔄 (EM DESENVOLVIMENTO)
- **Hospedagem backend:** Hostinger Cloud VPS
- **Hospedagem frontend:** Vercel
- **Processo:** PM2 para manter Strapi
- **Database:** PostgreSQL
- **CDN/Proxy:** Cloudflare (free tier)

### Avaliação da Stack

| Critério | Avaliação | Nota | Observações |
|----------|-----------|------|-------------|
| **Eficiência** | ✅ Adequada | 8/10 | OK para <1000 livros, tráfego moderado |
| **Segurança** | ⚠️ Requer config | 7/10 | Segura SE configurada corretamente |
| **Durabilidade** | ✅ Estável | 8/10 | Com manutenção mensal |
| **UX Cliente** | ✅ Intuitiva | 9/10 | Painel admin visual do Strapi |
| **Viabilidade 15 dias** | ✅ Possível | 7/10 | Prazo apertado mas factível |

### Pontos de atenção identificados
1. **PDFs grandes:** Configurar limite de upload e considerar S3/Cloudflare R2
2. **Performance:** Cache de API necessário (React Query ou Redis)
3. **Segurança uploads:** Validar MIME type, bloquear executáveis
4. **Rate limiting:** Proteger admin e API contra spam/DDoS
5. **Monitoramento:** PM2 + logs + uptime monitor obrigatório

## 3) ESCOPO PRINCIPAL (V0)
- Frontend: React + TypeScript + Vite
- UI: TailwindCSS + shadcn/ui + lucide-react
- Estado: React Context
- Router: react-router-dom
- PDF viewer: react-pdf
- CMS: Strapi (Node.js)
- Hospedagem backend: Hostinger Cloud VPS (ou HostGator VPS)
- Hospedagem frontend: Vercel (recomendada) ou Hostinger static
- Processo: PM2 para manter Strapi

## 3) ESCOPO PRINCIPAL (V0)
- Frontend: React + TypeScript + Vite
- UI: TailwindCSS + shadcn/ui + lucide-react
- Estado: React Context
- Router: react-router-dom
- PDF viewer: react-pdf
- CMS: Strapi (Node.js)
- Hospedagem backend: Hostinger Cloud VPS (ou HostGator VPS)
- Hospedagem frontend: Vercel (recomendada) ou Hostinger static
- Processo: PM2 para manter Strapi

## 4) BACKLOG PRIORIZADO (Product Backlog)

### 🔴 CRÍTICO - Sprint 1 (Dias 1-5)
**Epic:** Setup Backend + Integrações Básicas

- [ ] **[BACK-001]** Inicializar projeto Strapi v4.x
  - Estimativa: 2h
  - Dependências: Nenhuma
  - DoD: Strapi rodando localmente na porta 1337

- [ ] **[BACK-002]** Criar Content Types (Models)
  - Book: title, author (relation), categories (array), summary, pages_count, publish_date, cover_image, pdf_file, slug
  - Author: name, bio, photo
  - Page: key, title, content (richtext)
  - Estimativa: 3h
  - DoD: Models criados e testados no admin

- [ ] **[BACK-003]** Configurar Roles & Permissions
  - Public: GET apenas (findMany, findOne)
  - Authenticated: CRUD completo (admin)
  - Estimativa: 1h
  - DoD: API pública acessível sem token

- [ ] **[BACK-004]** Popular DB com dados de teste
  - Importar books.json existente
  - Criar 3 autores de exemplo
  - Criar páginas Home, Sobre, Contato
  - Estimativa: 2h
  - DoD: 10+ livros visíveis na API

- [ ] **[FRONT-001]** Implementar debounce no SearchBar
  - Usar hook useDebounce existente
  - Evitar chamadas excessivas à API
  - Estimativa: 1h
  - DoD: Busca só dispara após 500ms de inatividade

- [ ] **[FRONT-002]** Atualizar booksService.ts para Strapi API
  - Ajustar endpoints para formato Strapi REST
  - Tratar paginação do Strapi (meta.pagination)
  - Estimativa: 2h
  - DoD: Frontend integrado com backend local

### 🟡 IMPORTANTE - Sprint 2 (Dias 6-10)
**Epic:** Segurança + Performance + Deploy Backend

- [ ] **[SEC-001]** Implementar validação de uploads
  - Plugin: strapi-plugin-upload-validator
  - Aceitar apenas .pdf, .jpg, .png, .webp
  - Limitar 64MB por arquivo
  - Estimativa: 2h
  - DoD: Upload de .exe bloqueado

- [ ] **[SEC-002]** Configurar variáveis de ambiente
  - JWT_SECRET, DATABASE_URL, API_TOKEN_SALT
  - Criar .env.example
  - Estimativa: 1h
  - DoD: Secrets não commitados no git

- [ ] **[PERF-001]** Implementar cache no frontend
  - Opção 1: React Query
  - Opção 2: SWR
  - Cache de 5min para categorias, 2min para livros
  - Estimativa: 3h
  - DoD: Requisições duplicadas eliminadas

- [ ] **[PERF-002]** Otimizar BooksContext
  - Separar lógica de filtro em hook customizado
  - Memoizar funções pesadas
  - Estimativa: 2h
  - DoD: Re-renders reduzidos (React DevTools)

- [ ] **[INFRA-001]** Configurar VPS (Hostinger)
  - Ubuntu LTS, Node 20, PostgreSQL, PM2, Nginx
  - Criar usuário deployuser
  - Configurar UFW firewall
  - Estimativa: 4h
  - DoD: SSH acessível, portas 80/443 abertas

- [ ] **[INFRA-002]** Deploy Strapi no VPS
  - Git clone, npm install, build
  - PM2 start + save + startup
  - Nginx reverse proxy
  - Estimativa: 3h
  - DoD: API acessível via http://IP:1337

### 🟢 DESEJÁVEL - Sprint 3 (Dias 11-15)
**Epic:** SSL + Testes + Documentação + Entrega

- [ ] **[SEC-003]** Configurar SSL (Let's Encrypt)
  - Certbot + Nginx
  - Auto-renovação
  - Estimativa: 1h
  - DoD: SSL Labs A+ rating

- [ ] **[SEC-004]** Configurar Cloudflare
  - Adicionar domínio, ajustar nameservers
  - SSL Full (strict)
  - WAF básico + rate limiting (5 req/s)
  - Estimativa: 2h
  - DoD: Site acessível via HTTPS, WAF ativo

- [ ] **[INFRA-003]** Configurar backups automáticos
  - Cron job para mysqldump diário
  - Backup de uploads para S3/FTP
  - Script em /home/deployuser/backup.sh
  - Estimativa: 2h
  - DoD: Backup rodando e testado

- [ ] **[INFRA-004]** Deploy frontend (Vercel)
  - Conectar repo GitHub
  - Configurar variáveis de ambiente (VITE_API_URL)
  - Estimativa: 1h
  - DoD: Site acessível em produção

- [ ] **[QA-001]** Testes de segurança
  - SSL Labs, Security Headers
  - Testar upload de arquivos maliciosos
  - Verificar CORS e rate limiting
  - Estimativa: 2h
  - DoD: Checklist de segurança 100% aprovado

- [ ] **[QA-002]** Testes de performance
  - Lighthouse (>85 score)
  - Teste de carga (k6.io, 100 usuários simultâneos)
  - Estimativa: 2h
  - DoD: Performance aceitável sob carga

- [ ] **[DOC-001]** Criar documentação técnica
  - README com instruções de deploy
  - Guia de manutenção (PM2, backups, updates)
  - Estimativa: 3h
  - DoD: Outro dev consegue fazer deploy seguindo o README

- [ ] **[DOC-002]** Criar guia para o cliente
  - Como adicionar livros
  - Como fazer upload de PDFs
  - Como editar páginas (Sobre, Contato)
  - Screenshots ou vídeo 10-15min
  - Estimativa: 3h
  - DoD: Cliente consegue usar sem ajuda

- [ ] **[TRAIN-001]** Treinamento do cliente
  - Sessão de 1h via videochamada
  - Walkthrough do painel admin
  - Q&A
  - Estimativa: 1h
  - DoD: Cliente confortável com o sistema

### 🔵 MELHORIAS FUTURAS (Backlog V1)
- [ ] **[FEAT-001]** Migrar storage para Cloudflare R2 ou S3
- [ ] **[FEAT-002]** Implementar cache Redis no backend
- [ ] **[FEAT-003]** Adicionar busca full-text (Algolia ou MeiliSearch)
- [ ] **[FEAT-004]** Sistema de comentários/avaliações
- [ ] **[FEAT-005]** Analytics de downloads (Google Analytics)
- [ ] **[FEAT-006]** Newsletter signup (Mailchimp/SendGrid)
- [ ] **[SEC-005]** Implementar 2FA no admin Strapi
- [ ] **[SEC-006]** Fail2ban para proteger SSH

## 5) ENTREGAVEIS
- Frontend com Home, BookDetails, Sobre, Contato
- Filtros por titulo, autor, categoria
- Skeleton loaders
- Leitor de PDF integrado
- Strapi com colecoes: Book, Author, Page
- Deploy ativo, dominio e SSL
- Documentacao e suporte inicial (6 meses)

## 5) ENTREGAVEIS
- Frontend com Home, BookDetails, Sobre, Contato ✅
- Filtros por titulo, autor, categoria ✅
- Skeleton loaders ✅
- Leitor de PDF integrado ✅
- Strapi com colecoes: Book, Author, Page 🔄
- Deploy ativo, dominio e SSL 🔄
- Documentacao e suporte inicial (6 meses) 🔄

## 6) MODELO DE DADOS (Strapi)
**Book**: title, author, categories, summary, pages_count, publish_date, cover_image, pdf_file, slug
**Author**: name, bio, photo
**Page**: key, title, content

## 6) MODELO DE DADOS (Strapi)

### Collection Types

**Book (books)**
- title (Text, required, unique)
- author (Relation: many-to-one with Author)
- categories (JSON/Enumeration: Fiction, Non-Fiction, Technical, etc.)
- summary (Rich Text)
- pages_count (Number)
- publish_date (Date)
- display_date (Date)
- cover_image (Media: single image)
- pdf_file (Media: single file, max 64MB)
- slug (UID from title, required, unique)
- createdAt, updatedAt (auto)

**Author (authors)**
- name (Text, required)
- bio (Rich Text)
- photo (Media: single image)
- books (Relation: one-to-many with Book)
- createdAt, updatedAt (auto)

**Page (pages)**
- key (UID, required, unique) - ex: "home", "about", "contact"
- title (Text, required)
- content (Rich Text or Dynamic Zone)
- createdAt, updatedAt (auto)

### Relações
```
Author 1---N Book
Page independente (Single Type opcional para Home config)
```

## 7) ARQUITETURA E PASTAS
```
src/
  components/
  pages/
  contexts/
  services/
  hooks/
  utils/
  assets/
  styles/
```
## 7) ARQUITETURA E PASTAS

**Frontend (React + Vite) - ✅ CONCLUÍDO**
```
src/
  components/       # UI components
  pages/            # Páginas principais
  contexts/         # BooksContext (estado global)
  services/         # booksService (API calls)
  hooks/            # Custom hooks (useDebounce, useDarkMode)
  utils/            # Formatters e helpers
  types/            # TypeScript types
  assets/           # Imagens estáticas
  styles/           # CSS global
```

**Backend (Strapi) - 🔄 EM DESENVOLVIMENTO**
```
back/
  config/           # database.js, server.js, plugins.js
  src/
    api/            # Collections (book, author, page)
      book/
        controllers/
        routes/
        services/
    extensions/     # Customizações do Strapi
    middlewares/    # Rate limiting, validações
  public/
    uploads/        # PDFs e imagens (mover para S3 futuramente)
  .env              # Secrets (não commitar!)
  package.json
```

Seguir padrao de camadas (dominio, aplicacao, infra, ui). Seguir SOLID e DRY.

## 8) SERVICES (front)
Arquivo: src/services/booksService.ts
- getBooks(params)
- getBookById(id)
- searchBooks(q)
## 8) SERVICES (front)

Arquivo: `src/services/booksService.ts`

**Funções obrigatórias:**
- `getBooks(params)` - Lista paginada de livros
- `getBookById(id)` - Detalhes de um livro
- `searchBooks(q, category)` - Busca com filtros
- `getCategories()` - Lista de categorias únicas
- `getPages()` - Páginas estáticas (Sobre, Contato)

**Implementação:**
- Usar axios com instância `baseURL` (process.env.VITE_API_URL)
- Interceptors para tratamento de erros global
- Tipos TypeScript para responses do Strapi
- Retry lógica (3 tentativas) para falhas temporárias

**Formato de resposta Strapi:**
```json
{
  "data": [...],
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

## 9) COMPONENTES PRINCIPAIS
- CardBook
- FilterBar
- SkeletonCard
- BookDetail
- Header
- Footer
- Modal/Toast

## 9) COMPONENTES PRINCIPAIS
- CardBook ✅
- FilterBar ✅
- SkeletonCard ✅
- BookDetail ✅
- Header ✅
- Footer ✅
- SearchBar ✅ (precisa debounce - FRONT-001)
- Pagination ✅
- PDFViewer ✅
- Modal/Toast ✅

## 10) MELHORIAS IDENTIFICADAS (20/10/2025)

### A) Frontend - Performance e UX
1. **Debounce no SearchBar** [FRONT-001]
   - **Problema:** A cada tecla digitada, uma requisição é feita à API
   - **Solução:** Implementar debounce de 500ms usando hook existente
   - **Impacto:** Reduz chamadas API em 80-90%
   - **Prioridade:** 🔴 CRÍTICA
   
2. **Cache de API com React Query** [PERF-001]
   - **Problema:** Dados são re-fetchados desnecessariamente
   - **Solução:** Implementar React Query com stale time de 5min
   - **Impacto:** Melhora UX e reduz load no servidor
   - **Prioridade:** 🟡 IMPORTANTE

3. **Otimizar BooksContext** [PERF-002]
   - **Problema:** Re-renders desnecessários, lógica complexa em um arquivo
   - **Solução:** Separar em hooks menores (useBooks, useFilters, usePagination)
   - **Impacto:** Código mais testável e performático
   - **Prioridade:** 🟡 IMPORTANTE

### B) Backend - Segurança e Infraestrutura
4. **Validação de MIME type em uploads** [SEC-001]
   - **Problema:** Cliente pode fazer upload de arquivos maliciosos
   - **Solução:** Plugin strapi-plugin-upload-validator + whitelist (.pdf, .jpg, .png)
   - **Impacto:** Evita uploads de .exe, .sh, scripts
   - **Prioridade:** 🔴 CRÍTICA

5. **Rate limiting** [SEC-004]
   - **Problema:** API vulnerável a spam e DDoS
   - **Solução:** Nginx limit_req + Cloudflare rate rules (5 req/s por IP)
   - **Impacto:** Protege servidor de abuso
   - **Prioridade:** 🔴 CRÍTICA

6. **Storage externo para PDFs** [FEAT-001]
   - **Problema:** PDFs no VPS podem encher disco e deixar site lento
   - **Solução:** Plugin @strapi/provider-upload-cloudflare-r2 ou AWS S3
   - **Impacto:** Escalabilidade e performance
   - **Prioridade:** 🟢 DESEJÁVEL (V1)

### C) DevOps - Deploy e Monitoramento
7. **Backups automáticos** [INFRA-003]
   - **Problema:** Sem backups = risco de perda de dados
   - **Solução:** Cron job diário (mysqldump + rsync para storage externo)
   - **Impacto:** Disaster recovery
   - **Prioridade:** 🔴 CRÍTICA

8. **Monitoramento de uptime** [QA-002]
   - **Problema:** Não saberemos se o site cair
   - **Solução:** UptimeRobot (free) com alertas por email/SMS
   - **Impacto:** SLA e confiabilidade
   - **Prioridade:** 🟡 IMPORTANTE

9. **CI/CD para backend** [INFRA-002]
   - **Problema:** Deploy manual é propenso a erros
   - **Solução:** GitHub Actions + SSH deploy automático
   - **Impacto:** Deploy seguro e rastreável
   - **Prioridade:** 🟢 DESEJÁVEL

### D) Documentação e Manutenção
10. **Guia de manutenção mensal** [DOC-001]
    - **Checklist:** Atualizar Strapi, verificar logs, testar backups, renovar SSL
    - **Formato:** Markdown + screenshots
    - **Prioridade:** 🟡 IMPORTANTE

## 11) SEGURANCA (minimo necessario)
**Backend (Strapi):**
- HTTPS (Let's Encrypt ou Cloudflare)
- Roles e permissions (API publica: GET apenas)
- Admin com senha forte e 2FA opcional
- Variaveis de ambiente para secrets (JWT, DB)
- Limitar upload size (ex: 64MB)
- Atualizacoes do Strapi

**Servidor (VPS):**
- Firewall UFW: permitir 22 (SSH), 80 e 443
- Criar usuario nao-root para deploy
- Configurar fail2ban (opcional)
- Rodar Strapi via PM2

**Cloud / CDN:**
- Cloudflare: SSL Full (strict), WAF basico, Rate Limiting (opcional)

**Aplicacao:**
- CORS restrito ao dominio do front
- Sanitizacao/validacao de input no backend e frontend

## 11) SEGURANCA (minimo necessario)

**Backend (Strapi):**
- ✅ HTTPS (Let's Encrypt ou Cloudflare) [SEC-003]
- ✅ Roles e permissions (API publica: GET apenas) [BACK-003]
- ✅ Admin com senha forte e 2FA opcional [SEC-005 - V1]
- ✅ Variaveis de ambiente para secrets (JWT, DB) [SEC-002]
- ✅ Limitar upload size (ex: 64MB) + validar MIME [SEC-001]
- ✅ Atualizacoes do Strapi (checklist mensal) [DOC-001]

**Servidor (VPS):**
- ✅ Firewall UFW: permitir 22 (SSH), 80 e 443 [INFRA-001]
- ✅ Criar usuario nao-root para deploy [INFRA-001]
- 🔵 Configurar fail2ban (opcional) [SEC-006 - V1]
- ✅ Rodar Strapi via PM2 [INFRA-002]

**Cloud / CDN:**
- ✅ Cloudflare: SSL Full (strict), WAF basico, Rate Limiting [SEC-004]

**Aplicacao:**
- ✅ CORS restrito ao dominio do front [BACK-003]
- ✅ Sanitizacao/validacao de input no backend e frontend [SEC-001]

**Checklist de segurança (antes do deploy):**
- [ ] Senha forte no admin Strapi (16+ chars, símbolos)
- [ ] .env não commitado no git (.gitignore)
- [ ] Teste de upload de arquivo malicioso (.exe bloqueado)
- [ ] SSL Labs A+ rating
- [ ] Security Headers score >B (securityheaders.com)
- [ ] CORS testado (só permite domínio do frontend)
- [ ] Rate limiting ativo (testar com Apache Bench)
- [ ] Backup testado (restaurar em ambiente de teste)

## 12) BACKUPS E MONITORAMENTO
- Backup do banco via cron (dump) diario/semana
- Backup de uploads para storage externo (S3 ou FTP)
- PM2 logs e rotacionamento
- Uptime monitor (UptimeRobot ou Better Uptime)

## 12) BACKUPS E MONITORAMENTO

**Estratégia de Backup:**
- ✅ Backup do banco via cron (dump) diario/semana [INFRA-003]
- ✅ Backup de uploads para storage externo (S3 ou FTP) [INFRA-003]
- ✅ Retenção: 7 dias (diário), 4 semanas (semanal), 3 meses (mensal)
- ✅ Script: `/home/deployuser/backup.sh` (executado às 3h AM)
- ✅ Teste de restore mensal (simular disaster recovery)

**Script de backup (exemplo):**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="strapi_db"
DB_USER="strapi_user"

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /opt/strapi/public/uploads

# Upload para S3 (opcional)
# aws s3 cp $BACKUP_DIR/ s3://my-bucket/backups/ --recursive

# Limpar backups antigos (manter últimos 7 dias)
find $BACKUP_DIR -type f -mtime +7 -delete
```

**Monitoramento:**
- ✅ PM2 logs e rotacionamento [INFRA-002]
- ✅ Uptime monitor (UptimeRobot ou Better Uptime) [QA-002]
- ✅ Alertas por email/SMS se site cair >5min
- 🔵 Grafana + Prometheus (opcional, V1)
- ✅ Cloudflare Analytics (tráfego, ataques bloqueados)

**Logs importantes:**
- PM2: `pm2 logs strapi --lines 200`
- Nginx access: `/var/log/nginx/access.log`
- Nginx error: `/var/log/nginx/error.log`
- Strapi: `/opt/strapi/logs/` (configurar no config/logger.js)

## 13) DEPLOY PASSO-A-PASSO (Hostinger VPS + Cloudflare)
**A) Preparar VPS (Ubuntu LTS)**
- ssh root@IP
- apt update && apt upgrade -y
- adduser deployuser && usermod -aG sudo deployuser
- ufw allow OpenSSH; ufw allow 'Nginx Full'; ufw enable

**B) Instalar Node.js e PM2**
- curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
- sudo apt install -y nodejs build-essential
- sudo npm install -g pm2

**C) Instalar DB (MySQL ou PostgreSQL)**
- sudo apt install -y mysql-server
- mysql_secure_installation
- criar DB e usuario para Strapi

**D) Clonar e configurar Strapi**
- git clone <repo-strapi>
- cd strapi
- cp .env.example .env (preencher variaveis)
- npm install
- npm run build
- pm2 start npm --name strapi -- run start
- pm2 save; pm2 startup

**E) Nginx como reverse proxy**
- sudo apt install nginx
- criar /etc/nginx/sites-available/strapi com proxy_pass para http://localhost:1337
- ln -s ... sites-enabled; nginx -t; systemctl restart nginx

**F) Certbot (SSL)**
- sudo apt install certbot python3-certbot-nginx
- sudo certbot --nginx -d api.seudominio.com

**G) Deploy frontend**
- Opcao 1: Vercel -> conectar repo e deploy automatico
- Opcao 2: build -> copy /var/www/your-site; configurar nginx para servir estatico

**H) Cloudflare (opcional)**
- Adicionar dominio ao Cloudflare, ajustar nameservers
- SSL: Full(strict), Page Rules, WAF basico

## 14) CI/CD e Fluxo de Trabalho

**Git Workflow (GitFlow simplificado):**
```
main (produção)
└── develop (desenvolvimento)
    ├── feature/back-001-strapi-setup
    ├── feature/front-001-debounce
    └── hotfix/security-patch
```

**Branch naming:**
- `feature/[TASK-ID]-[description]` - ex: `feature/back-001-strapi-setup`
- `bugfix/[description]` - ex: `bugfix/pagination-error`
- `hotfix/[description]` - ex: `hotfix/security-patch`

**Commit messages (Conventional Commits):**
- `feat: adiciona validação de MIME type [SEC-001]`
- `fix: corrige paginação no BooksContext [FRONT-002]`
- `docs: atualiza README com instruções de deploy`
- `refactor: separa lógica de filtros em hook customizado`
- `chore: atualiza dependências do Strapi`

**CI/CD:**
- Frontend: Vercel via GitHub (deploy automático em push para main)
- Backend: GitHub Actions + SSH deploy (ou manual via git pull + pm2 restart)

**Deploy workflow backend:**
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend
on:
  push:
    branches: [main]
    paths:
      - 'back/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: SSH Deploy
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deployuser
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/strapi
            git pull origin main
            npm install --production
            npm run build
            pm2 restart strapi
```

## 15) TESTES E QA
- Testar CRUD completo, uploads e leitura de PDF
- Performance: Lighthouse
- SSL: SSL Labs
- Testes basicos de seguranca (OWASP top 10 awareness)

## 15) TESTES E QA

**Checklist de QA (antes do deploy final):**

**Funcionalidade:**
- [ ] Testar CRUD completo no admin Strapi (criar, editar, deletar livro)
- [ ] Upload de PDF e imagem funciona
- [ ] PDF abre no viewer do frontend
- [ ] Busca retorna resultados corretos
- [ ] Filtros por categoria funcionam
- [ ] Paginação exibe números corretos
- [ ] Páginas estáticas (Sobre, Contato) carregam do Strapi

**Performance:**
- [ ] Lighthouse score >85 (mobile e desktop)
- [ ] Time to First Byte (TTFB) <500ms
- [ ] First Contentful Paint (FCP) <1.5s
- [ ] Largest Contentful Paint (LCP) <2.5s
- [ ] Cumulative Layout Shift (CLS) <0.1
- [ ] Teste de carga: 100 usuários simultâneos (k6.io)

**Segurança:**
- [ ] SSL Labs: A+ rating (https://www.ssllabs.com/ssltest/)
- [ ] Security Headers: >B score (https://securityheaders.com/)
- [ ] Upload de .exe bloqueado
- [ ] Upload de arquivo >64MB bloqueado
- [ ] CORS: apenas domínio do frontend permitido
- [ ] Admin acessível apenas via HTTPS
- [ ] Rate limiting: >10 req/s retorna 429 (Too Many Requests)
- [ ] SQL injection: testar inputs com `'; DROP TABLE books; --`
- [ ] XSS: testar inputs com `<script>alert('XSS')</script>`

**Compatibilidade:**
- [ ] Chrome (desktop e mobile)
- [ ] Firefox (desktop e mobile)
- [ ] Safari (desktop e mobile)
- [ ] Edge (desktop)

**Ferramentas de teste:**
- Performance: Lighthouse (Chrome DevTools), WebPageTest
- Segurança: SSL Labs, Security Headers, OWASP ZAP
- Carga: Apache Bench (`ab -n 1000 -c 100 https://api.seudominio.com/api/books`), k6.io
- E2E: Playwright ou Cypress (opcional)

## 16) DOCUMENTACAO E TREINAMENTO
- README com passos de deploy local/producao
- Guia rapido para uso do Strapi (screenshots ou video 10-15min)
- Checklist de manutencao (atualizar, backups, pm2 commands)

## 16) DOCUMENTACAO E TREINAMENTO

**Documentação técnica (para devs):**
- [ ] README.md principal (overview do projeto)
- [ ] README.md frontend (instruções de dev local)
- [ ] README.md backend (instruções de setup Strapi)
- [ ] DEPLOY.md (passo-a-passo de deploy em VPS)
- [ ] MAINTENANCE.md (checklist mensal, comandos PM2, backups)
- [ ] API.md (endpoints, parâmetros, exemplos de response)
- [ ] ARCHITECTURE.md (diagrama de componentes, fluxo de dados)

**Documentação para o cliente:**
- [ ] Guia rápido de uso do Strapi (PDF com screenshots)
  - Login no admin
  - Adicionar novo livro (título, autor, PDF, capa)
  - Editar página "Sobre"
  - Gerenciar categorias
  - Fazer backup manual
- [ ] Vídeo tutorial (10-15min, Loom ou YouTube privado)
- [ ] FAQ (perguntas comuns)
- [ ] Contatos de suporte (email, telefone, horário)

**Treinamento (1h via videochamada):**
1. Walkthrough do site (frontend)
2. Login no painel admin do Strapi
3. Adicionar um livro de exemplo (passo-a-passo)
4. Editar conteúdo da página "Sobre"
5. Ver relatórios de acessos (Cloudflare Analytics)
6. Q&A (dúvidas do cliente)
7. Próximos passos e suporte pós-entrega

**Checklist de entrega:**
- [ ] Repositórios GitHub compartilhados com cliente (read-only)
- [ ] Credenciais de acesso documentadas (Strapi admin, VPS SSH, Cloudflare)
- [ ] Documentação em Google Drive ou Notion
- [ ] Vídeo de treinamento enviado
- [ ] Planilha de contatos e SLA do suporte

## 17) TIMELINE REVISADA (15 dias úteis)

### Sprint 1 (Dias 1-5): Backend Setup + Integrações Básicas
**Objetivo:** Strapi rodando localmente, integrado com frontend

| Dia | Tarefas | Responsável | Status |
|-----|---------|-------------|--------|
| 1 | [BACK-001] Inicializar Strapi | Dev | 🔄 |
| 1-2 | [BACK-002] Criar models (Book, Author, Page) | Dev | 🔄 |
| 2 | [BACK-003] Configurar permissions | Dev | 🔄 |
| 2 | [BACK-004] Popular DB com dados de teste | Dev | 🔄 |
| 3 | [FRONT-001] Implementar debounce | Dev | 🔄 |
| 3-4 | [FRONT-002] Atualizar booksService.ts | Dev | 🔄 |
| 4-5 | Testes de integração local | Dev | 🔄 |

**Entregável Sprint 1:** Frontend e backend rodando localmente, dados mock substituídos por Strapi API

### Sprint 2 (Dias 6-10): Segurança + Performance + Deploy Backend
**Objetivo:** Backend em produção com SSL e segurança configurada

| Dia | Tarefas | Responsável | Status |
|-----|---------|-------------|--------|
| 6 | [SEC-001] Validação de uploads | Dev | 🔄 |
| 6 | [SEC-002] Variáveis de ambiente | Dev | 🔄 |
| 7 | [PERF-001] Implementar cache (React Query) | Dev | 🔄 |
| 7 | [PERF-002] Otimizar BooksContext | Dev | 🔄 |
| 8-9 | [INFRA-001] Configurar VPS | DevOps | 🔄 |
| 9-10 | [INFRA-002] Deploy Strapi + Nginx | DevOps | 🔄 |

**Entregável Sprint 2:** API Strapi acessível via HTTP no VPS

### Sprint 3 (Dias 11-15): SSL + Testes + Documentação + Entrega
**Objetivo:** Site 100% funcional em produção, documentado e treinado

| Dia | Tarefas | Responsável | Status |
|-----|---------|-------------|--------|
| 11 | [SEC-003] SSL (Certbot) | DevOps | 🔄 |
| 11 | [SEC-004] Cloudflare + WAF | DevOps | 🔄 |
| 11 | [INFRA-003] Backups automáticos | DevOps | 🔄 |
| 12 | [INFRA-004] Deploy frontend (Vercel) | Dev | 🔄 |
| 12-13 | [QA-001] Testes de segurança | QA | 🔄 |
| 13 | [QA-002] Testes de performance | QA | 🔄 |
| 13-14 | [DOC-001] Documentação técnica | Dev | 🔄 |
| 14 | [DOC-002] Guia do cliente + vídeo | Dev | 🔄 |
| 15 | [TRAIN-001] Treinamento (1h) | Dev + Cliente | 🔄 |
| 15 | Entrega final e handoff | Todos | 🔄 |

**Entregável Sprint 3:** Projeto completo em produção, aprovado pelo cliente

**Retrospectiva (pós-entrega):**
- O que funcionou bem?
- O que pode melhorar?
- Lições aprendidas
- Backlog V1 (melhorias futuras)

## 18) CUSTOS ESTIMADOS
- Dominio: R$60/ano
- Hostinger VPS: ~R$28/mensal (promocional)
- Cloudflare: free plan available
- Backup automatico: opcional R$20-50/mensal
- Suporte pos-entrega: opcional R$100-200/mensal

## 18) CUSTOS ESTIMADOS

**Infraestrutura (custos mensais/anuais):**
| Item | Custo | Frequência | Observações |
|------|-------|------------|-------------|
| Domínio (.com.br) | R$ 60 | Anual | Registro.br |
| Hostinger VPS | R$ 28 | Mensal | Plano promocional (2GB RAM) |
| Cloudflare | R$ 0 | Grátis | Free tier (suficiente) |
| Backup externo (S3) | R$ 20-50 | Mensal | Opcional (pode usar FTP) |
| UptimeRobot | R$ 0 | Grátis | Monitoramento básico |
| **TOTAL (mínimo)** | **R$ 336/ano + R$ 60** | - | ~R$ 400/ano |

**Desenvolvimento e suporte:**
| Item | Custo | Frequência | Observações |
|------|-------|------------|-------------|
| Desenvolvimento (15 dias) | Definir com cliente | Único | MVP completo |
| Suporte pós-entrega | R$ 100-200 | Mensal | 6 meses inclusos no projeto |
| Manutenção (opcional) | R$ 150-300 | Mensal | Updates, novos recursos |

**Custo total primeiro ano:** ~R$ 400 (infra) + desenvolvimento + R$ 600-1200 (suporte 6 meses)

## 19) CHECKLIST FINAL (Definition of Done)
- [ ] Criar repositorios (frontend e backend)
- [ ] Implementar modelos Strapi (Book, Author, Page)
- [ ] Desenvolver UI e components reutilizaveis
- [ ] Implementar services e hooks para API
- [ ] Configurar VPS (Node, DB, PM2, Nginx)
- [ ] Deploy Strapi e validar painel/admin
- [ ] Deploy frontend e validar integracao
- [ ] Configurar SSL (Certbot) e Cloudflare
- [ ] Criar backups e rotinas de manutencao
- [ ] Documentar e treinar cliente

## 19) CHECKLIST FINAL (Definition of Done)

**Backend:**
- [ ] Criar repositorios (frontend e backend) [✅ Frontend done]
- [ ] Implementar modelos Strapi (Book, Author, Page) [BACK-002]
- [ ] Configurar roles e permissions [BACK-003]
- [ ] Popular DB com dados de teste [BACK-004]
- [ ] Validação de uploads implementada [SEC-001]
- [ ] Variáveis de ambiente configuradas [SEC-002]
- [ ] Configurar VPS (Node, DB, PM2, Nginx) [INFRA-001]
- [ ] Deploy Strapi e validar painel/admin [INFRA-002]
- [ ] Configurar SSL (Certbot) [SEC-003]
- [ ] Configurar Cloudflare (WAF, rate limiting) [SEC-004]
- [ ] Criar backups e rotinas de manutencao [INFRA-003]

**Frontend:**
- [ ] Implementar debounce no SearchBar [FRONT-001]
- [ ] Atualizar booksService.ts para Strapi [FRONT-002]
- [ ] Implementar cache (React Query) [PERF-001]
- [ ] Otimizar BooksContext [PERF-002]
- [ ] Deploy frontend (Vercel) [INFRA-004]
- [ ] Validar integracao com backend [QA-001]

**Qualidade:**
- [ ] Testes de segurança (SSL Labs A+) [QA-001]
- [ ] Testes de performance (Lighthouse >85) [QA-002]
- [ ] Testes de carga (100 usuários) [QA-002]
- [ ] Teste de uploads maliciosos [SEC-001]
- [ ] Teste de backup e restore [INFRA-003]

**Documentação:**
- [ ] README técnico (deploy, arquitetura) [DOC-001]
- [ ] Guia do cliente (screenshots) [DOC-002]
- [ ] Vídeo tutorial (10-15min) [DOC-002]
- [ ] API documentation [DOC-001]
- [ ] Maintenance checklist [DOC-001]

**Entrega:**
- [ ] Treinamento do cliente (1h) [TRAIN-001]
- [ ] Credenciais documentadas e entregues
- [ ] Site em produção e acessível
- [ ] Monitoramento (UptimeRobot) ativo
- [ ] Suporte inicial (6 meses) iniciado

## 20) RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| VPS ficar sem disco (PDFs grandes) | Média | Alto | Implementar storage externo (S3) [FEAT-001] |
| Strapi crash por falta de memória | Média | Alto | PM2 com restart automático + monitoramento |
| Cliente fazer upload de malware | Baixa | Crítico | Validação MIME type + antivírus (ClamAV opcional) |
| DDoS ou spam na API | Média | Alto | Rate limiting (Nginx + Cloudflare) [SEC-004] |
| Perda de dados (sem backup) | Baixa | Crítico | Backups diários automáticos [INFRA-003] |
| Breaking change em update do Strapi | Média | Médio | Testar updates em staging antes de produção |
| SSL expirar (Certbot falhar) | Baixa | Alto | Monitorar validade, alertas 30 dias antes |
| Prazo de 15 dias não cumprido | Média | Alto | Priorizar MVP, mover features para V1 |

**Plano de contingência:**
- Ambiente de staging para testar mudanças
- Rollback rápido via PM2 (`pm2 reload strapi@previous`)
- Backup manual antes de updates críticos
- Canal de comunicação 24/7 para emergências (WhatsApp/Telegram)

## 21) MÉTRICAS DE SUCESSO (KPIs)

**Técnicas:**
- Uptime: >99.5% (permitir <3.6h downtime/mês)
- Performance: Lighthouse score >85 (mobile e desktop)
- Segurança: SSL Labs A+, Security Headers >B
- TTFB (Time to First Byte): <500ms
- Tempo de build (CI/CD): <5min

**Negócio (para o cliente):**
- Tempo de adição de novo livro: <5min (objetivo: interface intuitiva)
- Taxa de erro em uploads: <1%
- Satisfação do cliente: >8/10 (pesquisa pós-treinamento)
- Número de acessos: trackear via Cloudflare Analytics
- Downloads de PDFs: trackear via Google Analytics (opcional)

**Pós-entrega (6 meses):**
- Tickets de suporte: <5/mês (indica sistema estável)
- Atualizações de segurança: 100% aplicadas
- Backups testados: 1x/mês
- Satisfação contínua do cliente: >8/10

## 22) SNIPPETS IMPORTANTES
## 22) SNIPPETS IMPORTANTES

**Nginx proxy (resumo):**
```nginx
server {
  listen 80;
  server_name api.seudominio.com;
  
  # Rate limiting
  limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
  limit_req zone=api_limit burst=20 nodelay;
  
  location / {
    proxy_pass http://localhost:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
  }
  
  # Limit upload size
  client_max_body_size 64M;
}
```

**PM2 commands:**
```bash
# Start
pm2 start npm --name strapi -- run start

# Logs
pm2 logs strapi --lines 200
pm2 logs strapi --err  # Apenas erros

# Restart
pm2 restart strapi
pm2 reload strapi  # Zero-downtime restart

# Monitor
pm2 monit

# Save e startup
pm2 save
pm2 startup  # Configurar autostart no boot

# Stop/Delete
pm2 stop strapi
pm2 delete strapi
```

**Certbot (SSL):**
```bash
# Instalar
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d api.seudominio.com

# Renovar (testa sem aplicar)
sudo certbot renew --dry-run

# Renovação automática (já configurado pelo certbot)
# Cron job: /etc/cron.d/certbot
```

**Backup script (`/home/deployuser/backup.sh`):**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="strapi_db"
DB_USER="strapi_user"
DB_PASS="your_password"  # Ou usar .my.cnf

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /opt/strapi/public/uploads

# Upload para S3 (opcional)
# aws s3 cp $BACKUP_DIR/ s3://my-bucket/backups/ --recursive

# Limpar backups antigos (manter últimos 7 dias)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Cron job (executar diariamente às 3h):**
```bash
# Editar crontab
crontab -e

# Adicionar linha
0 3 * * * /home/deployuser/backup.sh >> /var/log/backup.log 2>&1
```

**Git deploy script (`/home/deployuser/deploy.sh`):**
```bash
#!/bin/bash
cd /opt/strapi

echo "Pulling latest changes..."
git pull origin main

echo "Installing dependencies..."
npm install --production

echo "Building..."
npm run build

echo "Restarting PM2..."
pm2 restart strapi

echo "Deploy completed!"
pm2 logs strapi --lines 50
```

**Strapi .env (exemplo):**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate_random_key_here
API_TOKEN_SALT=generate_random_salt_here
ADMIN_JWT_SECRET=generate_random_secret_here
JWT_SECRET=generate_random_secret_here

DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=strong_password_here
DATABASE_SSL=false

# Cloudflare R2 (opcional)
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
# AWS_REGION=auto
# AWS_BUCKET=your-bucket
```

**Gerar secrets (Node.js):**
```javascript
// Rodar no terminal: node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
// Ou use: https://generate-secret.vercel.app/32
```

---

## 23) PRÓXIMOS PASSOS (ACTION ITEMS)

### Imediato (hoje):
1. ✅ Atualizar DETRIZ.md com análise e backlog
2. 🔄 Criar branch `feature/back-001-strapi-setup`
3. 🔄 Inicializar projeto Strapi na pasta `back/`
4. 🔄 Configurar .gitignore (não commitar .env, node_modules, uploads)

### Esta semana (Sprint 1):
- [ ] Completar todos os tasks [BACK-001] a [BACK-004]
- [ ] Completar todos os tasks [FRONT-001] e [FRONT-002]
- [ ] Daily standup: revisar progresso, identificar bloqueios
- [ ] Code review: validar implementações antes de merge

### Próxima semana (Sprint 2):
- [ ] Segurança e performance
- [ ] Setup do VPS
- [ ] Deploy backend

### Semana final (Sprint 3):
- [ ] SSL e Cloudflare
- [ ] Testes completos
- [ ] Documentação e treinamento

---

**FIM DO BACKLOG - Última atualização: 20/10/2025**

**Responsáveis:**
- Dev/DevOps: [Seu nome]
- Cliente: [Nome do cliente]
- QA: [Nome ou "Dev"]

**Canais de comunicação:**
- Daily standups: 10h via Google Meet
- Slack/Discord: canal #book-website
- Emergências: WhatsApp/Telegram

**Repositórios:**
- Frontend: https://github.com/Gabrielfgomss/book-website-mvp
- Backend: [Criar em: https://github.com/Gabrielfgomss/book-website-backend]

**Ambientes:**
- Local: http://localhost:5173 (front) + http://localhost:1337 (back)
- Staging: [Configurar subdomínio]
- Produção: https://seudominio.com + https://api.seudominio.com

---


