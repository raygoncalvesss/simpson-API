# 🍩 Simpsons API Project

Projeto desenvolvido em **Next.js 15** com **App Router** para consumir a API dos Simpsons, criado como atividade acadêmica.

## 📋 Informações do Projeto

- **Escola:** ETEC Professor Camargo Aranha
- **Turma:** 3º Desenvolvimento de Sistemas  
- **Aluno:** João Silva Santos
- **API Utilizada:** [Sample APIs - Simpsons Characters](https://api.sampleapis.com/simpsons/characters)

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (requisições HTTP)
- **React Toastify** (notificações)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Home page (obrigatório uso do Tailwind)
│   ├── layout.tsx               # Layout principal
│   ├── not-found.tsx            # Página 404
│   ├── apiinfo/
│   │   └── page.tsx             # Documentação da API
│   └── characters/
│       ├── page.tsx             # Listagem de personagens
│       ├── create/
│       │   └── page.tsx         # Criar personagem
│       └── [id]/
│           └── page.tsx         # Detalhes do personagem
├── components/
│   ├── Header.tsx               # Componente de navegação
│   ├── CharacterCard.tsx        # Card do personagem
│   └── LoadingSpinner.tsx       # Componente de carregamento
└── lib/
    └── api.ts                   # Configuração do Axios e tipos
```

## 🎯 Funcionalidades Implementadas

### ✅ Páginas Obrigatórias

1. **Home (`/`)** - Informações pessoais e acadêmicas
   - Nome da turma, escola e aluno
   - Avatar/foto do aluno
   - Frase inspiradora
   - **Uso obrigatório do Tailwind CSS**

2. **API Info (`/apiinfo`)** - Documentação completa
   - Nome e descrição da API
   - URL base e endpoints
   - Atributos da resposta
   - Exemplo de uso

3. **Listagem (`/characters`)** - READ (todos)
   - Buscar todos os personagens
   - Filtros por nome e status
   - Cards responsivos com informações básicas
   - Botão "Ver Detalhes"

4. **Detalhes (`/characters/[id]`)** - READ (único)
   - Informações completas do personagem
   - Layout detalhado e responsivo
   - Navegação de volta

5. **Criação (`/characters/create`)** - CREATE
   - Formulário validado
   - Notificações com Toastify
   - Simulação de POST (localStorage)

6. **Not Found (`/not-found`)** - Página 404
   - Design amigável temático
   - Navegação de volta

### 🔧 Recursos Técnicos

- **Responsividade:** 320px - 1440px
- **Otimização:** localStorage para cache
- **UX/UI:** Animações e feedback visual
- **Acessibilidade:** Focus states e ARIA labels
- **Performance:** next/image e lazy loading
- **Validação:** Formulários com validação client-side

## 🌐 API dos Simpsons

- **Base URL:** `https://api.sampleapis.com/simpsons`
- **Endpoint:** `/characters`
- **Método:** GET (POST simulado)
- **Documentação:** [Sample APIs](https://sampleapis.com/)

### Atributos Disponíveis:
- `id`, `name`, `image`, `gender`, `status`
- `occupation`, `species`, `type`
- `location`, `origin`, `episode`, `created`

## 🛠️ Como Executar

1. **Clone/baixe o projeto**
```bash
cd ativ-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📱 Páginas e Navegação

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Página inicial com informações pessoais |
| API Info | `/apiinfo` | Documentação da API |
| Personagens | `/characters` | Lista todos os personagens |
| Detalhes | `/characters/[id]` | Mostra personagem específico |
| Criar | `/characters/create` | Formulário de criação |
| 404 | `/not-found` | Página de erro personalizada |

## 🎨 Design e UX

- **Tema:** Cores inspiradas nos Simpsons (amarelo, azul)
- **Tipografia:** Responsiva e legível
- **Componentes:** Reutilizáveis e modulares
- **Feedback:** Toasts para sucesso/erro
- **Loading:** Estados de carregamento
- **Mobile-first:** Design responsivo

## 📦 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificar código
```
