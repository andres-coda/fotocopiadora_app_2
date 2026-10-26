import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import Texto from '../../componente-estilo/texto/texto';
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

const PreciosCategoria = () => {
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );

  const grupos = useMemo(() => agruparPorCategoria(precios ?? []), [precios]);

  if (grupos.length === 0) return null;

  return (
    <section className="precios-categoria">
      <Texto texto="Precios" mediana negrita />
      <div className="precios-categoria__lista">
        {grupos.map((grupo) => (
          <div key={grupo.nombre} className="precios-categoria__grupo">
            <Texto texto={grupo.nombre} chica negrita />
            {grupo.precios.map((precio) => (
              <div key={precio.id} className="precios-categoria__fila">
                <Texto texto={precio.nombre} chica />
                <Texto texto={`$ ${Number(precio.importe)}`} chica negrita />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreciosCategoria;
