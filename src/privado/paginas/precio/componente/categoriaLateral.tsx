import { useMemo, useState } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Texto from '../../../../componente-estilo/texto/texto';
import Arrow from '../../../../assets/arrow.svg?react';
import { CategoriaProp, PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import BtnCopiar from '../../../../componente-estilo/boton/btnCopiar';
import './categoriaLateral.css';
import DesplegableArrow from '../../../../componente-estilo/desplegable/desplegableArrow';

interface Prop {
  categoria: CategoriaProp;
  precios: PrecioProp[];
}

// Texto plano con el formato que ya usa el presupuesto: *negrita* estilo WhatsApp.
const textoCategoria = (categoria: CategoriaProp, precios: PrecioProp[]): string =>
  [
    `*${categoria.nombre}*`,
    ...precios.map(precio => `- ${precio.nombre}: $${Number(precio.importe)}`),
  ].join('\n');

const porNombre = (a: PrecioProp, b: PrecioProp): number => a.nombre.localeCompare(b.nombre);

const CategoriaLateral = ({ categoria, precios }: Prop) => {
  // Los precios se filtran recien cuando la flecha se abre: el lateral muestra
  // solo los nombres de las categorias bloqueadas hasta ese momento.
  const preciosCategoria = useMemo(
    () => precios.filter(precio => precio.categoria?.id === categoria.id).sort(porNombre),
    [precios, categoria.id]
  );

  // Copiar no necesita la flecha abierta: se resuelven los precios al hacer clic.
  const copiarCategoria = () => {
    const deCategoria = precios
      .filter(precio => precio.categoria?.id === categoria.id)
      .sort(porNombre);

    navigator.clipboard.writeText(textoCategoria(categoria, deCategoria));
  };

  return (
    <DesplegableArrow
      gris
      titulo={categoria.nombre}
      tituloChico
      btnSup={
        <BtnCopiar
          nuevoEstilo="btn-copiar-flotante"
          copiar={copiarCategoria}
          texto={`Copiar los precios de ${categoria.nombre}`}
        />
      }
    >
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
    </DesplegableArrow>
  );
};

export default CategoriaLateral;

/*

      <div className="categorias-lateral">
      {     <Boton
          cerrar
          edit
          nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
          titulo={activo ? `Ocultar ${categoria.nombre}` : `Mostrar ${categoria.nombre}`}
          onClick={() => setActivo(prev => !prev)}
          icono={<Arrow />}
        /> }
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
*/
