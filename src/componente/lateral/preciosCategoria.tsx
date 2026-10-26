import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import Texto from '../../componente-estilo/texto/texto';
import Boton from '../../componente-estilo/boton/boton';
import Copiar from '../../assets/copiar.svg?react';
import Check from '../../assets/check.svg?react';
import Flecha from '../../assets/arrow-small.svg?react';
import './preciosCategoria.css';

const SIN_CATEGORIA = 'Sin categoría';

interface PrecioGrupoProp {
  nombre: string;
  precios: PrecioProp[];
}

const agruparPorCategoria = (precios: PrecioProp[]): PrecioGrupoProp[] => {
  const grupos = new Map<string, PrecioProp[]>();

  precios.forEach((precio) => {
    const clave = precio.categoria?.nombre?.trim() || SIN_CATEGORIA;
    const grupo = grupos.get(clave) ?? [];
    grupo.push(precio);
    grupos.set(clave, grupo);
  });

  return [...grupos.entries()]
    .map(([nombre, items]) => ({
      nombre,
      precios: [...items].sort((a, b) => a.nombre.localeCompare(b.nombre)),
    }))
    .sort((a, b) => {
      if (a.nombre === SIN_CATEGORIA) return 1;
      if (b.nombre === SIN_CATEGORIA) return -1;
      return a.nombre.localeCompare(b.nombre);
    });
};

// Texto plano con el formato que ya usa el presupuesto: *negrita* estilo WhatsApp.
const textoDeGrupo = (grupo: PrecioGrupoProp): string =>
  [
    `*${grupo.nombre}*`,
    ...grupo.precios.map((precio) => `- ${precio.nombre}: $${Number(precio.importe)}`),
  ].join('\n');

const PreciosCategoria = () => {
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );

  const [abiertas, setAbiertas] = useState<string[]>([]);
  const [copiada, setCopiada] = useState<string | null>(null);

  const grupos = useMemo(() => agruparPorCategoria(precios ?? []), [precios]);

  // El tilde de "copiado" vuelve al icono de copiar despues de un momento.
  useEffect(() => {
    if (!copiada) return;

    const timer = setTimeout(() => setCopiada(null), 1500);
    return () => clearTimeout(timer);
  }, [copiada]);

  const alternar = (nombre: string) =>
    setAbiertas((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );

  const copiarGrupo = (grupo: PrecioGrupoProp) => {
    navigator.clipboard.writeText(textoDeGrupo(grupo));
    setCopiada(grupo.nombre);
  };

  if (grupos.length === 0) return null;

  return (
    <section className="precios-categoria">
      <Texto texto="Precios" mediana negrita />
      <div className="precios-categoria__lista">
        {grupos.map((grupo) => {
          const abierta = abiertas.includes(grupo.nombre);

          return (
            <div key={grupo.nombre} className="precios-categoria__grupo">
              <div className="precios-categoria__cabecera">
                <button
                  type="button"
                  className="precios-categoria__toggle"
                  onClick={() => alternar(grupo.nombre)}
                  aria-expanded={abierta}
                  title={abierta ? `Ocultar ${grupo.nombre}` : `Mostrar ${grupo.nombre}`}
                >
                  <span
                    className={`precios-categoria__flecha ${
                      abierta ? 'precios-categoria__flecha--abierta' : ''
                    }`}
                  >
                    <Flecha />
                  </span>
                  <span className="precios-categoria__nombre">{grupo.nombre}</span>
                </button>
                <Boton
                  icono={copiada === grupo.nombre ? <Check /> : <Copiar />}
                  edit
                  nuevoEstilo="btn-icono-chico"
                  titulo={
                    copiada === grupo.nombre
                      ? 'Copiado'
                      : `Copiar los precios de ${grupo.nombre}`
                  }
                  onClick={() => copiarGrupo(grupo)}
                />
              </div>
              {abierta && (
                <div className="precios-categoria__filas">
                  {grupo.precios.map((precio) => (
                    <div key={precio.id} className="precios-categoria__fila">
                      <Texto texto={precio.nombre} chica />
                      <Texto texto={`$ ${Number(precio.importe)}`} chica negrita />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreciosCategoria;
