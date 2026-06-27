# DATA MT — Landing Page

Landing page oficial da **DATA MT**, comunidade técnica de dados de Mato Grosso.

## Stack

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev) | UI |
| [Vite 8](https://vitejs.dev) | Build & dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Estilização |
| [Framer Motion 12](https://www.framer.com/motion/) | Animações e scroll |
| [Lucide React](https://lucide.dev) | Ícones |
| TypeScript | Configuração (vite/tailwind) |

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

```bash
npm run build    # gera dist/
npm run preview  # serve o build localmente
```

## Estrutura

```
datamt_lp/
├── public/
│   └── assets/              # imagens, logos e SVGs estáticos
│       ├── datamt-simbolo.svg
│       ├── datamt-simbolo-linhas.svg
│       ├── datamt-simbolo-explicado.svg
│       ├── datamt-logo-completa.svg
│       ├── logo_completa_com_fundo.svg
│       ├── datamt-cerebro.svg
│       ├── datamt-cerebro-animacao.svg
│       ├── img1.jpg / img2.jpg / img3.webp   # fotos de eventos passados
│       ├── Astronomer-Logo.png
│       ├── Databricks-Logo.png
│       └── Microsoft-Logo.png
├── src/
│   ├── App.jsx              # raiz: intro + layout principal
│   ├── data.json            # fonte única de conteúdo (ver abaixo)
│   ├── main.jsx             # entry point React
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── LogoIntro.jsx            # animação de entrada com a logo
│       ├── Pilares.jsx / PilarCard.jsx
│       ├── Eventos.jsx / EventoCard.jsx
│       ├── Organizadores.jsx / OrganizerCard.jsx
│       ├── Parceiros.jsx
│       ├── Footer.jsx
│       ├── BodyBrainLinesBackground.jsx   # fundo animado com linhas neurais
│       ├── ScrollBrainBackground.jsx
│       ├── BrainSvgProgress.jsx
│       └── DatamtSymbolRingProgress.jsx
├── tailwind.config.js
├── vite.config.js / vite.config.ts
└── package.json
```

## Conteúdo — data.json

Todo o conteúdo da página vive em `src/data.json`. Para editar textos, eventos, organizadores ou parceiros, basta editar este arquivo — sem mexer em código.

### `site`

Metadados globais do site.

```json
"site": {
  "nome": "DATA MT",
  "subtitulo": "Comunidade Técnica de Dados",
  "tagline": "...",
  "taglineFooter": "...",
  "descricao": "...",
  "logo": "/assets/logo.svg"
}
```

### `nav`

Links da barra de navegação. `href` deve apontar para um `id` de seção (`#sobre`, `#eventos`, etc.).

```json
"nav": [
  { "label": "Eventos", "href": "#eventos" }
]
```

### `hero`

Conteúdo da seção principal (topo da página).

```json
"hero": {
  "titulo": "...",        // suporta \n para quebra de linha
  "subtitulo": "...",
  "manifesto": "...",
  "ctas": [
    { "label": "Ver Eventos", "href": "#eventos", "variante": "primario" },
    { "label": "...",         "href": "...",       "variante": "outline"  }
  ]
}
```

### `pilares`

Os 7 pilares técnicos da comunidade. Cada pilar corresponde a um segmento do anel no símbolo.

```json
"pilares": [
  {
    "id": 1,
    "titulo": "Data Engineering",
    "descricao": "...",
    "icone": "database"    // nome de ícone do Lucide React
  }
]
```

Ícones disponíveis: qualquer nome válido do [Lucide React](https://lucide.dev/icons/) em camelCase ou kebab-case (`chart-bar`, `brain`, `cloud`, `shield`, `users`, etc.).

### `eventos`

Eventos futuros/agendados. Aparecem na seção de eventos como cards com botão de inscrição.

```json
"eventos": [
  {
    "id": 1,
    "titulo": "Meetup DATA MT #1",
    "data": "2026-08-15",           // formato ISO — usado para ordenação
    "dataFormatada": "15 Ago 2026", // texto exibido na interface
    "descricao": "...",
    "local": "Cuiabá, MT",
    "tags": ["Presencial", "Gratuito"],
    "linkInscricao": "#",           // URL do formulário de inscrição
    "imagens": []                   // array de caminhos de imagem (opcional)
  }
]
```

### `eventosPassados`

Eventos já realizados. Aparecem em uma seção de histórico com galeria de fotos.

```json
"eventosPassados": [
  {
    "id": 1,
    "titulo": "SQL MT Meetup #1 — O início",
    "data": "2023-11-10",
    "dataFormatada": "10 Nov 2023",
    "descricao": "...",
    "local": "Cuiabá, MT",
    "tags": ["Presencial", "Gratuito"],
    "fotos": [
      "/assets/img1.jpg",
      "/assets/img2.jpg",
      "/assets/img3.webp"
    ]
  }
]
```

As imagens referenciadas em `fotos` devem estar em `public/assets/`. O campo aceita 1, 2 ou 3 fotos.

### `organizadores`

Membros do time organizador. Aparecem na seção de organizadores com foto, cargo e links.

```json
"organizadores": [
  {
    "id": 1,
    "nome": "Nome",
    "cargo": "Fundador & Data Engineer",
    "foto": "/assets/foto.jpg",   // deixe "" para exibir avatar padrão
    "linkedin": "https://linkedin.com/in/...",
    "github": "https://github.com/..."
  }
]
```

### `parceiros`

Empresas e instituições apoiadoras. Aparecem como cards com logo na seção de parceiros.

```json
"parceiros": [
  {
    "id": 1,
    "nome": "Astronomer",
    "logo": "/assets/Astronomer-Logo.png",  // imagem em public/assets/
    "url": "https://astronomer.io"           // link ao clicar no card
  }
]
```

Logos devem ter fundo transparente (PNG) para ficarem bem no tema escuro.

### `social`

Links de redes sociais exibidos no footer.

```json
"social": [
  { "rede": "linkedin",  "url": "https://...", "icone": "linkedin"  },
  { "rede": "github",    "url": "https://...", "icone": "github"    },
  { "rede": "youtube",   "url": "https://...", "icone": "youtube"   },
  { "rede": "instagram", "url": "https://...", "icone": "instagram" }
]
```

## Assets — SVGs do Símbolo

| Arquivo | Descrição |
|---|---|
| `datamt-simbolo.svg` | Símbolo principal — círculo preenchido com gradiente e máscara neural |
| `datamt-simbolo-linhas.svg` | Alternativa desenhada — traços coloridos sem preenchimento |
| `datamt-simbolo-explicado.svg` | Versão anotada com callouts explicando cada elemento |
| `datamt-logo-completa.svg` | Logo completa (símbolo + tipografia), fundo transparente |
| `logo_completa_com_fundo.svg` | Logo completa com fundo escuro `#070B14` |
| `datamt-cerebro.svg` | Somente o cérebro neural, estilo linhas com gradiente |
| `datamt-cerebro-animacao.svg` | Cérebro com estilo alternativo para uso em animações |

## Contribuindo

1. Fork o repositório
2. Crie sua branch: `git checkout -b feat/minha-contribuicao`
3. Edite `src/data.json` para conteúdo ou os componentes em `src/components/`
4. Abra um Pull Request descrevendo a mudança

Para adicionar eventos, organizadores ou parceiros, edite apenas o `data.json` — não é necessário mexer em código.

---

**DATA MT** — Comunidade Técnica de Dados de Mato Grosso
