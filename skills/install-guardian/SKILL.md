---
name: install-guardian
description: "Trigger: cualquier comando de instalacion, add o remove de dependencias, o intento de instalacion de herramientas/paquetes. Impone la politica de no-instalar-sin-pedido."
license: Apache-2.0
metadata:
  author: "andres"
  version: "1.0"
---

## Hard Rules

1. **NO INSTALL WITHOUT ASK** — Nunca ejecutar comandos de instalacion (`npm install`, `pnpm add`, `yarn add`, `cargo add`, `pip install`, `gem install`, `apt install`, etc.) sin confirmacion explicita del usuario.
2. **ASK BEFORE INSTALL** — Si una instalacion parece necesaria, presentar que se va a instalar, por que, y el impacto, y pedir permiso. Detenerse hasta que el usuario responda.
3. **NO SILENT INSTALLS** — Nunca instalar como parte de otra tarea. Las instalaciones son acciones independientes y aprobadas por el usuario.
4. **NO INSTALL FOR TOOLS** — No instalar CLIs, runtimes ni paquetes para avanzar. Reportar la limitacion en su lugar.

## Decision Gates

| Accion | Requiere Plan | Requiere Confirmacion | Delegacion |
|--------|---------------|----------------------|------------|
| Instalar dependencia / herramienta / paquete | Si (que/por que/impacto) | **Explicita** | Inline |

## Execution Steps

1. **Detectar** — Identificar cualquier intento de instalacion o comando de instalacion.
2. **Presentar** — Explicar que, por que, impacto, alternativas.
3. **Preguntar** — Pedir permiso al usuario. Detenerse hasta responder.
4. **Ejecutar** — Solo con aprobacion explicita, correr la instalacion. Si no, detenerse.

## Output Contract

Antes de cualquier instalacion, emitir:

```
## Plan de Accion
**Accion**: [que instalar]
**Razon**: [por que]
**Impacto**: [riesgo]
**Alternativas**: [opcion]
**Verificacion**: [como confirmar]
¿Confirmas? (si / no / ajustar)
```

Solo continuar con "sí" / "dale" / "confirmado" explicito. Si es "ajustar", iterar. Si es "no", detenerse.

## References

- Ninguna por ahora.
