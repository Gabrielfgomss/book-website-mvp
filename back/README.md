# Book Website - Backend (Strapi CMS)

## � Stack

- **CMS:** Strapi v5.28.0
- **Runtime:** Node.js 20.x
- **Language:** TypeScript
- **Database (Dev):** SQLite
- **Database (Prod):** MySQL ou PostgreSQL

## �🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### Setup Local

#### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 6.0.0

#### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais (os secrets já foram gerados automaticamente)

# Iniciar em modo de desenvolvimento
npm run develop
```

O admin estará disponível em: `http://localhost:1337/admin`

#### Primeiro acesso

1. Acesse `http://localhost:1337/admin`
2. Crie sua conta de administrador
3. Configure os Content Types (models)

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
```

## 🗄️ Models (Content Types)

### Book
- `title` (Text, required, unique)
- `author` (Relation: many-to-one → Author)
- `categories` (JSON/Array)
- `summary` (Rich Text)
- `pages_count` (Number)
- `publish_date` (Date)
- `cover_image` (Media: single)
- `pdf_file` (Media: single, max 64MB)
- `slug` (UID, auto-generated from title)

### Author
- `name` (Text, required)
- `bio` (Rich Text)
- `photo` (Media: single)
- `books` (Relation: one-to-many → Book)

### Page
- `key` (UID, required, unique) - ex: "home", "about", "contact"
- `title` (Text, required)
- `content` (Rich Text)

## 🔒 Segurança

### Variáveis de ambiente

**NUNCA commitar o arquivo `.env`!** Ele contém secrets críticos.

Para gerar novos secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Roles & Permissions

- **Public:** GET apenas (findMany, findOne)
- **Authenticated:** CRUD completo (admin)

Configurar em: Settings → Users & Permissions Plugin → Roles

### Upload de arquivos

- **Limite de tamanho:** 64MB (configurar em middleware)
- **Tipos permitidos:** .pdf, .jpg, .png, .webp
- **Validação:** Implementar plugin `strapi-plugin-upload-validator`

## ⚙️ Deployment

### Deploy em VPS

```bash
# No servidor VPS
cd /opt
git clone <repo-url> strapi
cd strapi

# Copiar .env de produção
cp .env.example .env
nano .env  # Editar com credenciais de produção

# Instalar dependências (apenas produção)
npm install --production

# Buildar
npm run build

# Iniciar com PM2
pm2 start npm --name strapi -- run start
pm2 save
pm2 startup
```

### Nginx Reverse Proxy

```nginx
server {
  listen 80;
  server_name api.seudominio.com;

  location / {
    proxy_pass http://localhost:1337;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  client_max_body_size 64M;
}
```

### SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d api.seudominio.com
```

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📊 Monitoramento

### Logs

```bash
# PM2 logs
pm2 logs strapi --lines 200

# Logs do Strapi
tail -f .strapi/logs/strapi.log
```

### Comandos úteis PM2

```bash
pm2 status           # Status dos processos
pm2 restart strapi   # Reiniciar
pm2 reload strapi    # Reload (zero-downtime)
pm2 monit           # Monitor em tempo real
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

## 📝 Tasks (ver DETRIZ.md raiz do projeto)

- [x] [BACK-001] Inicializar projeto Strapi
- [ ] [BACK-002] Criar Content Types (Book, Author, Page)
- [ ] [BACK-003] Configurar Roles & Permissions
- [ ] [BACK-004] Popular DB com dados de teste
- [ ] [SEC-001] Validação de uploads
- [ ] [SEC-002] Variáveis de ambiente

---

**Última atualização:** 20/10/2025

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
