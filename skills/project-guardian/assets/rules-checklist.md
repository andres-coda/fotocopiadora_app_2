# Checklist de Validación — project-guardian

**Usar ANTES de cada acción que modifique código, configuración o dependencias.**

---

## ✅ Antes de Leer Archivos

- [ ] ¿Cuántos archivos? (1–3 = inline, 4+ = delegar explorer)
- [ ] ¿Es para decidir/verificar o para explorar/mapear?
- [ ] ¿El alcance está claro o necesita acotarse?

---

## ✅ Antes de Editar Archivos

- [ ] **Regla 1**: ¿Es instalación de dependencia? → **Pedir confirmación explícita + plan**
- [ ] **Regla 2**: ¿Tengo plan escrito? (archivos, cambios exactos, por qué, alternativas, riesgo, rollback)
- [ ] **Regla 3**: ¿Respeta la estructura de capas? (ver `references/project-structure.md`)
  - [ ] No crea carpetas de nivel superior nuevas
  - [ ] No aplanar capas (modelo → adaptadores → servicio → hooks → componentes → páginas)
  - [ ] Adaptadores en `adaptadores/entrada|salida/`
  - [ ] Servicios en `servicio/` con hooks `use*Api.ts`
  - [ ] Componentes UI genéricos en `componente-estilo/`
  - [ ] Componentes de dominio en `componente/`
  - [ ] Páginas en `privado/paginas/` o `publico/paginas/`
- [ ] **Regla 4**: ¿Justificación documentada en el plan?
- [ ] **Regla 5 (Convención)**: ¿Nuevos métodos usan **interface única para parámetros**?
  - [ ] Si el método tiene **>1 parámetro**: definir `interface NombreMetodoParams { ... }` y tipar `params: NombreMetodoParams`
  - [ ] Si el método tiene **exactamente 1 parámetro**: permitido pasarlo directo (primitivo u objeto simple)
  - [ ] Aplica a: servicios, hooks, adaptadores, componentes, utils, helpers

---

## ✅ Por Tipo de Acción

### Instalar dependencia (`npm install`, `cargo add`, etc.)
- [ ] Qué paquete y versión
- [ ] Por qué es necesario (no "por si acaso")
- [ ] Impacto en bundle size / build time / seguridad
- [ ] Alternativas evaluadas (nativas, existentes, lighter)
- [ ] Confirmación explícita del usuario: "sí, instalá X"

### Editar 1 archivo mecánico (fix typo, ajustar estilo, cambiar constante conocida)
- [ ] Confirmación inline: "Cambio X en archivo Y, ¿dale?"
- [ ] Verificación: `npm run lint` / `tsc --noEmit` rápido

### Editar 2+ archivos O cambio no trivial
- [ ] Plan completo escrito (ver Output Contract en SKILL.md)
- [ ] Confirmación explícita del usuario
- [ ] Delegar a writer si >3 archivos o cruza capas
- [ ] Verificación: typecheck + lint + tests afectados

### Cambiar configuración (tsconfig, vite.config, tauri.conf, Cargo.toml)
- [ ] Plan con impacto: qué rompe, qué mejora, cómo testear
- [ ] Confirmación explícita
- [ ] Build de prueba tras el cambio

### Refactor entre capas
- [ ] Plan de migración paso a paso
- [ ] Tests de regresión identificados
- [ ] Rollback documentado
- [ ] Delegar a writer

### Crear/eliminar carpeta de nivel superior
- [ ] Justificación arquitectural (no "para ordenar")
- [ ] Impacto en imports, build, team
- [ ] Confirmación explícita
- [ ] Actualizar `references/project-structure.md` tras cambio

---

## ✅ Antes de Delegar a Sub-agent

- [ ] ¿Qué skill(s) necesita el sub-agent? (cargar con `skill` tool)
- [ ] ¿El prompt incluye el plan completo y archivos objetivo?
- [ ] ¿Se pasó `references/project-structure.md` como contexto?
- [ ] ¿Se definió verificación de salida esperada?

---

## ✅ Tras Ejecutar

- [ ] ¿TypeScript compila? (`tsc --noEmit`)
- [ ] ¿Lint pasa? (`npm run lint` si existe)
- [ ] ¿Tests relevantes pasan? (`npm test` o vitest/jest)
- [ ] ¿Build Tauri OK? (`cargo check` en src-tauri / `npm run tauri:build` si crítico)
- [ ] ¿Documenté la decisión en memoria? (`mem_save` si fue decisión arquitectural)

---

## 🚫 Señales de Alto (STOP Inmediato)

- "Voy a instalar X rapidito" → **NO**. Plan + confirmación.
- "Arreglo esto y ya" sin mostrar qué cambia → **NO**. Plan escrito.
- "Muevo esto para acá" sin verificar imports → **NO**. Análisis de impacto.
- "Creo una carpeta nueva para..." → **NO**. Justificación arquitectural + confirmación.
- Sub-agent lanza sin skills cargadas → **NO**. Cargar skills primero.
- Editar `store.tsx` o `registro.ts` sin plan de migración de estado → **NO**.

---

## 📝 Plantilla de Plan Mínimo (Copiar/Pegar)

```
## Plan de Acción
**Acción**: [qué se va a hacer]
**Archivos**: [rutas exactas, una por línea]
**Cambios**: [descripción concreta línea por línea si es chico, o por archivo si grande]
**Por qué**: [razón técnica raíz]
**Alternativas**: [qué se consideró y por qué no]
**Riesgo**: [bajo/medio/alto + una frase]
**Verificación**: [comando(s) exacto(s) a correr]
**Rollback**: [git checkout -- <archivos> O comando inverso]

¿Confirmás? (sí / no / ajustar)
```