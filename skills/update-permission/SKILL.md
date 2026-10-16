---
name: update-permission
description: "Trigger: cualquier actualizacion de codigo, dependencias, configuracion, herramientas, entorno o skills. Impone pedir permiso antes de actualizar, con las razones por las que debe actualizarse."
license: Apache-2.0
metadata:
  author: "andres"
  version: "1.0"
---

## Hard Rules

1. **ASK BEFORE UPDATE** — Antes de cualquier actualizacion (bump de dependencia, cambio de config, cambio de codigo, version de herramienta, update de skill, cambio de entorno), pedir permiso al usuario primero. Nunca aplicar actualizaciones en silencio.
2. **DOCUMENT REASONS** — Al proponer o aplicar una actualizacion, documentar las razones por las que debe actualizarse (fix de bug, seguridad, feature, refactor, performance) y el riesgo/impacto.
3. **NO SILENT UPDATES** — Nunca aplicar actualizaciones sin aprobacion explicita. Las actualizaciones son acciones independientes y con permiso.
4. **ONE DECISION AT A TIME** — Al preguntar, presentar una decision a la vez y detenerse hasta que el usuario responda.

## Decision Gates

| Accion | Requiere Plan | Requiere Confirmacion | Delegacion |
|--------|---------------|----------------------|------------|
| Actualizar codigo / dependencias / config / herramienta / skill / entorno | Si (estado actual, objetivo, por que, impacto, rollback) | **Explicita** | Depende del alcance |

## Execution Steps

1. **Detectar** — Identificar la necesidad de actualizacion.
2. **Presentar** — Que cambia, por que, impacto, rollback.
3. **Preguntar** — Pedir permiso al usuario.
4. **Ejecutar** — Solo con aprobacion explicita, aplicar la actualizacion. Si no, detenerse.

## Output Contract

Antes de cualquier actualizacion, emitir:

```
## Plan de Accion
**Accion**: [que actualizar]
**Razon**: [por que debe actualizarse]
**Impacto**: [riesgo]
**Rollback**: [como revertir]
¿Confirmas? (si / no / ajustar)
```

Solo continuar con "sí" / "dale" / "confirmado" explicito. Si es "ajustar", iterar. Si es "no", detenerse.

## References

- Related: `install-guardian` (no instalar sin pedir permiso).
