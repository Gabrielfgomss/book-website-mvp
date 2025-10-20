# 🚀 Guia de Deploy na Vercel

## Pré-requisitos

- ✅ Repositório no GitHub criado
- ✅ Projeto commitado e pushed para o GitHub
- ✅ Conta na Vercel (criar em: https://vercel.com)

---

## 📋 Passo a Passo

### 1️⃣ Preparar o Projeto (Local)

#### a) Verificar se está tudo commitado

```bash
git status
```

#### b) Se houver mudanças não commitadas, adicionar e commitar:

```bash
git add .
git commit -m "feat: preparar projeto para deploy na Vercel"
```

#### c) Fazer push para o GitHub:

```bash
git push origin main
# ou
git push origin master
```

---

### 2️⃣ Criar Build Local (Teste)

Antes de fazer deploy, teste se o build funciona:

```bash
npm run build
```

Se der erro, corrija antes de continuar. Se funcionar, teste o preview:

```bash
npm run preview
```

---

### 3️⃣ Deploy na Vercel (Opção 1 - Interface Web)

#### a) Acessar a Vercel

1. Acesse: https://vercel.com
2. Faça login (ou crie conta com GitHub)
3. Clique em **"Add New Project"**

#### b) Importar o Repositório

1. Clique em **"Import Git Repository"**
2. Conecte sua conta do GitHub (se ainda não conectou)
3. Procure e selecione o repositório `book-website-mvp`
4. Clique em **"Import"**

#### c) Configurar o Deploy

A Vercel deve detectar automaticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Se não detectar, configure manualmente:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
Node Version: 18.x (ou 20.x)
```

#### d) Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (1-3 minutos)
3. ✅ Seu site estará no ar!

A URL será algo como: `https://book-website-mvp.vercel.app`

---

### 4️⃣ Deploy na Vercel (Opção 2 - CLI)

Se preferir usar a linha de comando:

#### a) Instalar Vercel CLI

```bash
npm install -g vercel
```

#### b) Fazer Login

```bash
vercel login
```

#### c) Deploy

```bash
cd c:\Users\syst02\Downloads\book-website-mvp
vercel
```

Siga as instruções:
1. Setup and deploy? **Yes**
2. Which scope? Selecione sua conta
3. Link to existing project? **No**
4. Project name? **book-website-mvp** (ou outro nome)
5. In which directory? **./** (pressione Enter)
6. Override settings? **No**

#### d) Deploy para Produção

```bash
vercel --prod
```

---

### 5️⃣ Configurar Domínio Customizado (Opcional)

#### Na Dashboard da Vercel:

1. Acesse seu projeto
2. Vá em **"Settings"** → **"Domains"**
3. Adicione seu domínio customizado
4. Siga as instruções para configurar DNS

---

### 6️⃣ Configurar Variáveis de Ambiente (Se Necessário)

Se você adicionar APIs que precisam de chaves:

1. Na dashboard do projeto na Vercel
2. Vá em **"Settings"** → **"Environment Variables"**
3. Adicione as variáveis (ex: `VITE_API_KEY`)
4. Faça redeploy

**Importante**: Variáveis no Vite precisam do prefixo `VITE_`

---

## 🔄 Deploy Automático

A partir de agora:

- ✅ Cada `git push` na branch `main` → Deploy automático
- ✅ Pull requests → Preview deploy automático
- ✅ Rollback fácil pela dashboard da Vercel

---

## 🐛 Troubleshooting

### Erro: "Build failed"

**Solução**: Teste o build localmente:
```bash
npm run build
```

Se funcionar local mas falhar na Vercel, verifique:
- Node version (configure 18.x ou 20.x)
- Dependências do `package.json`

---

### Erro: "404 ao navegar entre páginas"

**Solução**: Já está resolvido pelo `vercel.json` com rewrites para SPA routing.

---

### Erro: "Cannot find module '@/...'"

**Solução**: Verifique se o `vite.config.ts` tem o alias correto:
```typescript
alias: {
  '@': path.resolve(__dirname, './src'),
}
```

---

### Build demora muito

**Solução**: Normal para primeiro deploy. Próximos serão mais rápidos devido ao cache.

---

## 📊 Monitoramento

Após o deploy, você pode:

- Ver analytics na dashboard da Vercel
- Ver logs em tempo real
- Ver métricas de performance (Web Vitals)
- Configurar alertas

---

## 🎉 Pronto!

Seu projeto está no ar! 🚀

Compartilhe a URL: `https://seu-projeto.vercel.app`

---

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Vite + Vercel](https://vercel.com/docs/frameworks/vite)
- [Troubleshooting](https://vercel.com/support)
