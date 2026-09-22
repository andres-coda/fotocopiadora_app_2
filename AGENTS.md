# AGENTS.md — Project Agent Instructions

## Project: foto-app (Pedidos 2.0)

React 18 + TypeScript + Tauri 2 application for print shop order management.

---

## Active Skills

### project-guardian
**Path**: `skills/project-guardian/SKILL.md`
**Trigger**: Any work in this repository (foto-app / Pedidos 2.0)
**Scope**: Project-local (not global)

Enforces four hard rules:
1. **No install without ask** — Explicit confirmation for any package manager command
2. **No edit without plan** — Written plan required before source modifications
3. **Preserve structure** — Maintain Clean Architecture layers (modelo → adaptadores → servicio → hooks → componentes → páginas → redux → contexto → guard → filtro → utils)
4. **Justify every step** — Document what, why, alternatives, risk before acting

**References**:
- `skills/project-guardian/references/project-structure.md` — Current architecture map
- `skills/project-guardian/assets/rules-checklist.md` — Pre-action validation checklist

**Activation**: Automatic on any file operation, dependency change, or architectural discussion in this repo.

---

## Project Conventions

- **Language**: TypeScript strict, React 18, functional components + hooks
- **State**: Redux Toolkit (11 slices in `src/redux/state/`)
- **API**: Custom hooks `use*Api.ts` in `src/servicio/` over `useApi.ts` base
- **Forms**: React Hook Form + Zod schemas (`esq*.esquema.ts`)
- **Architecture**: Clean Architecture — domain (modelo) → adapters → services → hooks → UI
- **Styling**: CSS modules co-located (.tsx + .css)
- **Backend**: Tauri 2 (Rust) in `src-tauri/`

---

## Key Files for Context

| File | Purpose |
|------|---------|
| `src/redux/store.tsx` | Redux store configuration |
| `src/redux/registro.ts` | Reducer registration (single source of truth) |
| `src/servicio/hooks/useApi.ts` | Base API hook (all services extend) |
| `src/modelo/Entidades/base/base.interface.ts` | Base entity interface |
| `src-tauri/tauri.conf.json` | Tauri app configuration |
| `src-tauri/Cargo.toml` | Rust dependencies |

---

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # TypeScript + Vite build
npm run tauri:dev    # Tauri dev (frontend + backend)
npm run tauri:build  # Production Tauri bundle
```

---

## Skill Registry

Run `gentle-ai skill-registry refresh` after adding/removing skills to update `.atl/skill-registry.md`.