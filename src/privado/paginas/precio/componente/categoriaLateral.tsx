import { useMemo, useState } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Texto from '../../../../componente-estilo/texto/texto';
import Arrow from '../../../../assets/arrow.svg?react';
import Copiar from '../../../../assets/copiar.svg?react';
import Check from '../../../../assets/check.svg?react';
import { CategoriaProp, PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import './categoriaLateral.css';

interface Prop {
  categoria: CategoriaProp;
  precios: PrecioProp[];
  copiada: boolean;
  onCopiar: () => void;
}

// Texto plano con el formato que ya usa el presupuesto: *negrita* estilo WhatsApp.
const textoCategoria = (categoria: CategoriaProp, precios: PrecioProp[]): string =>
  [
    `*${categoria.nombre}*`,
    ...precios.map(precio => `- ${precio.nombre}: $${Number(precio.importe)}`),
  ].join('\n');

const porNombre = (a: PrecioProp, b: PrecioProp): number => a.nombre.localeCompare(b.nombre);

const CategoriaLateral = ({ categoria, precios, copiada, onCopiar }: Prop) => {
  const [activo, setActivo] = useState<boolean>(false);

  // Los precios se filtran recien cuando la flecha se abre: el lateral muestra
  // solo los nombres de las categorias bloqueadas hasta ese momento.
  const preciosCategoria = useMemo(
    () =>
      activo
        ? precios.filter(precio => precio.categoria?.id === categoria.id).sort(porNombre)
        : [],
    [activo, precios, categoria.id]
  );

  // Copiar no necesita la flecha abierta: se resuelven los precios al hacer clic.
  const copiarCategoria = () => {
    const deCategoria = precios
      .filter(precio => precio.categoria?.id === categoria.id)
      .sort(porNombre);

    navigator.clipboard.writeText(textoCategoria(categoria, deCategoria));
    onCopiar();
  };

  return (
    <div className="categorias-lateral">
      <Texto texto={categoria.nombre} inline nuevoEstilo="categoria-texto" />
      <Boton
        icono={copiada ? <Check /> : <Copiar />}
        edit
        cerrar
        nuevoEstilo="btn-icono-chico btn-copiar-flotante"
        titulo={copiada ? 'Copiado' : `Copiar los precios de ${categoria.nombre}`}
        onClick={copiarCategoria}
      />
      <Boton
        cerrar
        edit
        nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
        titulo={activo ? `Ocultar ${categoria.nombre}` : `Mostrar ${categoria.nombre}`}
        onClick={() => setActivo(prev => !prev)}
        icono={<Arrow />}
      />
      {activo && (
        <div className="categoria-precio">
          {preciosCategoria.length === 0 ? (
            <Texto texto="Sin precios" chica />
          ) : (
            preciosCategoria.map(precio => (
              <div key={precio.id} className="categoria-precio-interno">
                <Texto texto={`${precio.nombre}: `} chica />
                <Texto texto={`$ ${precio.importe.toString()}`} chica derecha />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriaLateral;
