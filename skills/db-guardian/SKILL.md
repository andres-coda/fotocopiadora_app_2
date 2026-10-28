---
name: db-guardian
description: 'Trigger: cualquier trabajo sobre la base de datos (esquema, policies, RLS, funciones, datos, migraciones), cualquier archivo dentro de DB/, o cualquier pedido que implique cambiarla. Prohibe ejecutar cambios: solo se entregan sugerencias en un archivo nuevo de DB/ escritas en PL/pgSQL.'
license: Apache-2.0
metadata:
  author: 'andres'
  version: '1.0'
---

## Hard Rules

1. **NUNCA EJECUTAR** — No se corre nada que escriba en la base. Prohibido `psql -f`,
   `psql -c` con DDL/DML, `\i`, bloques anonimos, migraciones del back, seeds, y
   cualquier `create`, `alter`, `drop`, `insert`, `update`, `delete`, `truncate`,
   `grant`, `revoke` o `create extension`. Tampoco "probar" dentro de una
   transaccion con `rollback`: ejecutar no es el trabajo.

2. **LEER SI ESTA PERMITIDO** — Diagnosticar es leer: `select` sobre catalogo
   (`pg_proc`, `pg_policy`, `pg_class`, `pg_attribute`), `\d`, `\df`, `\dp`,
   `explain` sin `analyze`. Si para responder hace falta ver datos, se pide o se
   propone la consulta; no se corre nada que modifique estado.

3. **SOLO SUGERENCIAS EN ARCHIVO NUEVO** — Toda modificacion se entrega como un
   archivo **nuevo** dentro de `DB/`, con el siguiente numero libre
   (`NN_descripcion.sql`). Nunca se edita un script existente ni se sobreescribe
   uno ya ejecutado.

   Unica excepcion: un archivo de sugerencia **propio**, todavia **sin ejecutar** y
   **sin commitear**, se corrige en el lugar. Dejar dos versiones rivales de la
   misma migracion es peor que corregir el borrador.

4. **PLPGSQL OBLIGATORIO** — El codigo de la sugerencia va en PL/pgSQL: un unico
   bloque `do $nombre$ ... $nombre$;` para los cambios, y `language plpgsql` en las
   funciones que cree. No se entregan DDL sueltas ni una lista de sentencias para
   copiar y pegar.

   Por que: un `do` es **una sola sentencia**, o sea **una sola transaccion**. La
   atomicidad la garantiza el motor, no un `begin`/`commit` que alguien puede
   cortar al copiar.

5. **AUTOVERIFICABLE** — El bloque no termina sin comprobar su propio resultado:
   `raise notice` para el progreso y `raise exception` cuando algo no quedo como
   se esperaba. Un `raise exception` deshace todo el bloque, asi que la
   verificacion es tambien el rollback automatico.

6. **IDEMPOTENTE** — Se puede correr dos veces sin romper nada:
   `if not exists`, `create or replace`, `drop policy if exists` antes de crear.

7. **DOCUMENTAR EL POR QUE** — Encabezado con registro de cambios: objeto tocado,
   defecto concreto y **como se midio**, correccion, y efecto sobre los datos
   existentes. Sin eso, el que lo corre no puede decidir si lo corre.

8. **ROLLBACK HONESTO** — Se documenta que revierte de verdad y que no. Si el
   cambio toca datos, se dice explicitamente que el unico rollback real es
   restaurar el dump previo; no se inventa un script que "deshace" un rehash.

9. **ENTREGAR Y PARAR** — Se escribe el archivo, se entrega el comando exacto con
   el rol dueno, se avisa que **no fue ejecutado** y se listan las comprobaciones
   manuales. Despues se para: no se insiste, no se ofrece correrlo.

## Decision Gates

| Accion                                              | Requiere Plan | Requiere Confirmacion | Se ejecuta |
| --------------------------------------------------- | ------------- | --------------------- | ---------- |
| Leer esquema / catalogo / datos                     | No            | No                    | Si (solo lectura) |
| Proponer cambio de esquema, policies, funciones     | Si            | No                    | **No**     |
| Proponer cambio de datos (rehash, backfill, fix)    | Si            | No                    | **No**     |
| Ejecutar cualquier cosa que escriba                 | —             | —                     | **Nunca**  |

## Execution Steps

1. **Diagnosticar** — Leer el esquema real (catalogo, definiciones, policies) y
   medir el defecto con evidencia. No alcanza con "parece que falla".
2. **Nombrar el archivo** — `DB/NN_descripcion.sql`, siguiente numero libre.
3. **Escribir el PL/pgSQL** — Precondiciones, cambios, verificacion.
4. **Verificar estaticamente** — Dollar-quoting balanceado, `raise` con la cantidad
   correcta de placeholders, orden de dependencias (una policy no puede usar una
   funcion que todavia no existe).
5. **Entregar** — Plan, comando, que no se ejecuto, que hay que comprobar a mano.

## Output Contract

Antes de escribir el archivo, emitir:

```
## Plan de Accion
**Objeto**: [tabla / funcion / policy / columna]
**Defecto**: [que esta mal y como se midio]
**Correccion**: [que hace la sugerencia]
**Efecto sobre datos**: [que filas toca, o "ninguna"]
**Reversible**: [si / no, y como]
**Archivo**: DB/NN_nombre.sql
**Rol para correrlo**: [dueno o superusuario, y por que]
```

Al entregar:

```
**Escrito**: DB/NN_nombre.sql
**Ejecutado por mi**: no
**Para correrlo**: psql -U <rol> -d <base> -v ON_ERROR_STOP=1 -f NN_nombre.sql
**A comprobar despues**: [lista]
```

## Estructura del archivo sugerido

```sql
-- NN_descripcion.sql
-- Que cambia y por que. Archivo nuevo: no modifica los anteriores.
--
-- COMO SE EJECUTA
--   [rol necesario y por que] + comando psql
--
-- REGISTRO DE CAMBIOS
--   # 1 Objeto / Defecto medido / Correccion / Efecto sobre datos existentes

do $migracion$
declare
    -- contadores y banderas para la verificacion
begin
    -- PASO 0: precondiciones (tabla existe, rol existe, version)
    -- PASO N: el cambio
    -- PASO FINAL: verificacion -> raise exception si no dio lo esperado
end;
$migracion$;

-- VERIFICACION MANUAL (lo que el bloque no puede saber)
-- ROLLBACK (que revierte de verdad y que no)
```

## References

- `C:\Users\ANDRES\Desktop\Programacion\Fotocopiadora\Pedidos 2.0\DB\27_usuarios_password.sql`
  — ejemplo de referencia de la forma esperada: un `do` con precondiciones,
  pasos numerados, verificacion que aborta y rollback documentado.
- Related: `project-guardian` (plan antes de tocar, no instalar sin permiso),
  `update-permission` (no actualizar sin permiso).
