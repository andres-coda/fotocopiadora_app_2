# Estructura del Proyecto: foto-app (Pedidos 2.0)

## Visión General

Aplicación **React 18 + TypeScript + Tauri 2** (Rust backend) para gestión de pedidos de fotocopiadora. Arquitectura limpia por capas con Redux Toolkit para estado global.

---

## Capas de Arquitectura (Orden de Dependencia)

```
src/
├── modelo/                 # CAPA 1: Dominio puro (sin dependencias externas)
│   ├── Entidades/          # Entidades, enums, esquemas Zod, DTOs
│   │   ├── base/           # Interfaces base (HasId, etc.)
│   │   ├── cliente/
│   │   ├── libro/
│   │   ├── pedido/
│   │   ├── pedido_libro/
│   │   ├── precio/
│   │   ├── propuesta/
│   │   ├── sede/
│   │   ├── especificacion/
│   │   ├── materia/
│   │   ├── nivel/
│   │   ├── stock/
│   │   └── usuario/
│   ├── HTTP/               # Tipos HTTP genéricos
│   ├── orden/              # Esquemas de ordenamiento
│   ├── presupuesto/        # Interfaces de presupuesto
│   ├── socket/             # Tipos de WebSocket
│   ├── contexto/           # Interfaces de contexto React
│   └── general/            # Utilidades de tipos
│
├── adaptadores/            # CAPA 2: Conversión DTO ↔ Dominio
│   ├── entrada/            # 15 adaptadores: *adapter.ts (API → Dominio)
│   └── salida/             # 8 adaptadores: *Dto.adapter.ts (Dominio → API)
│
├── servicio/               # CAPA 3: Cliente API (hooks use*Api.ts)
│   ├── hooks/              # useApi.ts, useApiPaginado.ts (base)
│   ├── cliente/
│   ├── componente/
│   ├── especificacion/
│   ├── libro/
│   ├── materia/
│   ├── nivel/
│   ├── pedido/
│   ├── pedido_libro/
│   ├── precio/
│   ├── propuesta/
│   ├── sede/
│   └── usuario/
│
├── hooks/                  # CAPA 4: Lógica reutilizable
│   ├── autenticacion/
│   ├── buscador/           # 7 hooks de búsqueda/paginación
│   ├── desplegables/
│   ├── editar/
│   ├── formulario/
│   ├── presupuesto/
│   ├── sockets/
│   └── tiempo/
│
├── componente/             # CAPA 5: Componentes de dominio
│   ├── buscador/           # 6 componentes
│   ├── cargando/
│   ├── error/
│   ├── especificaciones/
│   ├── formulario/         # 8 componentes + modelo/
│   ├── heder/
│   ├── modal/
│   ├── pedido/             # 5 componentes + presupuesto/
│   ├── ruta_invalida/
│   └── Textos/
│
├── componente-estilo/      # CAPA 5b: Componentes UI genéricos (design system)
│   ├── boton/              # + hooks/ + modelo/
│   ├── botonera/
│   ├── card/               # + hooks/ + modelo/
│   ├── centro/
│   ├── conteiner/ / Contenedor/
│   ├── deslegable/         # (typo: deslegable → desplegable)
│   ├── etiqueta/
│   ├── filtros/
│   ├── predictivo/
│   └── texto/              # + hooks/ + modelo/ + titulo.tsx
│
├── contexto/               # CAPA 6: Providers React
│   ├── contextoModal.tsx
│   └── contextoPedido.tsx
│
├── redux/                  # CAPA 7: Estado global
│   ├── state/              # 11 slices: cliente, libro, pedido, etc.
│   ├── modelo/             # Interfaces de estado
│   ├── registro/           # Registro de reducers
│   ├── utils/              # 8 utilidades de arrays/objetos
│   ├── cargadatos/
│   └── store.tsx
│
├── guard/                  # Route guards
│   └── rutaPribadaGuard.tsx  # (typo: Pribada → Privada)
│
├── filtro/                 # Tipos de filtro por entidad (9 filtros + interface)
│
├── utils/                  # Utilidades puras (13 archivos)
│
├── privado/                # Rutas autenticadas
│   ├── paginas/            # 7 módulos: cliente, libro, pedido, precio, propuesta, sede
│   │   └── cada uno con: cargar/, componente/, [contexto/], [hook/], [util/]
│   ├── privadoRuta.tsx
│   └── rutas/rutasPrivadas.ts
│
├── publico/                # Rutas públicas
│   ├── paginas/login/, registro/
│   ├── publicoRuta.tsx
│   └── rutas/rutasPublicas.ts
│
├── ErrorBoundary.tsx
├── App.tsx, AppRouter.tsx, AppHookConteiner.tsx
├── main.tsx, index.css, App.css
└── vite-env.d.ts
```

---

## Backend (Tauri/Rust)

```
src-tauri/
├── Cargo.toml
├── tauri.conf.json
├── capabilities/default.json
└── gen/schemas/            # Schemas generados (ACL, capabilities, desktop, windows)
```

---

## Convenciones Detectadas

| Aspecto | Convención |
|---------|------------|
| **Naming** | PascalCase para componentes, camelCase para hooks/utils, kebab-case para CSS |
| **Adaptadores** | `*.adapter.ts` (entrada) / `*Dto.adapter.ts` (salida) |
| **Servicios** | `use*Api.ts` para hooks, `use*DeleteApi.ts`, `use*NombreApi.ts` variantes |
| **Entidades** | `*.interface.ts`, `*.enum.ts`, `esq*.esquema.ts` (Zod), `dto*.interface.ts` |
| **Redux** | `*.state.tsx` para slices, `store.tsx` para store, `registro.ts` para combineReducers |
| **Componentes** | `.tsx` + `.css` lado a lado, hooks en subcarpeta `hooks/`, tipos en `modelo/` |
| **Páginas** | Estructura: `cargar/`, `componente/`, `contexto/` (opcional), `hook/` (opcional), `util/` (opcional) |
| **Filtros** | `*.filtro.ts` + `filtro.interface.ts` base |
| **Rutas** | `rutasPrivadas.ts` / `rutasPublicas.ts` exportan arrays de rutas |

---

## Puntos de Atención (No Tocar Sin Plan)

1. **Redux store** (`src/redux/store.tsx`, `src/redux/registro.ts`) — Cambios afectan toda la app
2. **Adaptadores centrales** — 23 archivos, cambios propagan a servicios y componentes
3. **Entidades base** (`src/modelo/Entidades/base/`, `hasId.interface.ts`) — Fundamento de tipado
4. **Hooks base API** (`src/servicio/hooks/useApi.ts`, `useApiPaginado.ts`) — Todos los servicios dependen
5. **Rutas y guards** — Cambios rompen navegación/autenticación
6. **Tauri config** (`src-tauri/tauri.conf.json`, `Cargo.toml`) — Afecta build nativo
7. **Tipos socket** (`src/modelo/socket/`) — Contrato tiempo real con backend

---

## Scripts Principales (package.json)

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "tauri": "tauri",
  "tauri:dev": "tauri dev",
  "tauri:build": "tauri build"
}
```

---

## Dependencias Clave

- **React 18**, **React Router 6**, **Redux Toolkit**, **React Hook Form + Zod**
- **Tauri 2** (Rust), **Socket.io client**
- **Vite**, **TypeScript 5**, **ESLint**