---
name: project-guardian
description: "Trigger: trabajo en foto-app, cambios en Pedidos 2.0, desarrollo en este proyecto. Enforce project-specific workflow rules: no installs without ask, no edits without plan, preserve structure, justify every step."
license: Apache-2.0
metadata:
  author: "andres"
  version: "1.0"
---

## Activation Contract

Load this skill automatically when:
- Working inside `foto-app` / `Pedidos 2.0` repository
- Any file read/write/edit/delete operation is requested
- Dependency installation or configuration change is proposed
- Architecture or structural decisions are discussed

## Hard Rules

1. **NO INSTALL WITHOUT ASK** — Never run `npm install`, `cargo add`, `pnpm add`, or any package manager command without explicit user confirmation. Present what, why, and impact first.

2. **NO EDIT WITHOUT PLAN** — Never modify source files without a written plan that includes: target files, exact changes, reasoning, and rollback path. Trivial one-line fixes in a single understood file may proceed with inline confirmation only.

3. **PRESERVE STRUCTURE** — Maintain the existing Clean Architecture layers:
   - `src/adaptadores/entrada/*` — input adapters (DTO → domain)
   - `src/adaptadores/salida/*` — output adapters (domain → DTO)
   - `src/modelo/Entidades/*` — domain entities, enums, schemas
   - `src/servicio/*` — API hooks (use*Api.ts)
   - `src/hooks/*` — reusable logic hooks
   - `src/componente/*` & `src/componente-estilo/*` — UI components
   - `src/privado/paginas/*` & `src/publico/paginas/*` — page components
   - `src/redux/*` — state management
   - `src/contexto/*` — React context providers
   - `src/guard/*` — route guards
   - `src/filtro/*` — filter types
   - `src/utils/*` — pure utilities
   - `src-tauri/*` — Tauri/Rust backend
   Do not create new top-level folders or flatten layers.

4. **JUSTIFY EVERY STEP** — Before any action, explain: what will be done, why this approach, what alternatives were considered, and what the risk/impact is. No silent executions.

## Decision Gates

| Action | Requires Plan | Requires Confirmation | Requires Justification | Delegation |
|--------|---------------|----------------------|------------------------|------------|
| Read 1–3 files (verify/decide) | No | No | Inline | Inline |
| Read 4+ files (explore/map) | Yes (scope) | No | Yes | Delegate explorer |
| Edit 1 mechanical file | No | Yes (inline) | Yes | Inline |
| Edit 2+ files or non-trivial | Yes (full) | Yes | Yes | Delegate writer |
| Install dependency | Yes (what/why/impact) | **Explicit** | Yes | Inline |
| Change config (tsconfig, vite, tauri) | Yes | Yes | Yes | Inline |
| Add/remove top-level folder | Yes (architecture impact) | **Explicit** | Yes | Inline |
| Refactor across layers | Yes (migration plan) | Yes | Yes | Delegate writer |
| Run tests/build | No | No (unless new script) | No | Inline |

## Execution Steps

1. **Detect intent** — Classify the requested action using the Decision Gates table.
2. **Check rules** — Apply Hard Rules 1–4. If any rule blocks, STOP and present the requirement to the user.
3. **Present plan** — For actions requiring a plan, write a concise plan covering:
   - Target files (exact paths)
   - Exact changes (what lines, what becomes what)
   - Reasoning (why this approach)
   - Alternatives considered
   - Risk/impact assessment
   - Rollback/verification steps
4. **Wait for confirmation** — Do not proceed until user explicitly confirms. "Dale", "sí", "continuá" = confirmed for that step only.
5. **Execute** — Perform the action. For delegated work, launch the appropriate sub-agent with the plan and required skills.
6. **Verify & report** — Show what changed, run quick verification (typecheck, lint, test if applicable), report outcome.
7. **Log decision** — Save significant decisions to memory (Engram) with `mem_save`.

## Output Contract

Before ANY file write/edit/install/structural change, the agent MUST output:

```
## Plan de Acción
**Acción**: [qué se va a hacer]
**Archivos**: [lista exacta de rutas]
**Cambios**: [descripción concreta de los cambios]
**Por qué**: [razón técnica]
**Alternativas**: [qué se consideró y por qué no]
**Riesgo**: [bajo/medio/alto + explicación]
**Verificación**: [cómo se valida]
**Rollback**: [cómo se revierte si falla]

¿Confirmás? (sí / no / ajustar)
```

Only proceed on explicit "sí" / "dale" / "confirmado". On "ajustar", iterate the plan. On "no", stop.

## References

- `references/project-structure.md` — Current project architecture map
- `assets/rules-checklist.md` — Quick validation checklist before acting