import { forwardRef } from 'react';
import TextoVacio from '../../componente/Textos/textoVacio';
import { CentroProp } from './centro.interface';
import { ContenedorCentro } from './centroExterior';
import './centro.css';

const Centro = forwardRef<HTMLDivElement, CentroProp>(
  (
    {
      children,
      texto,
      nuevoEstilo = '',
      finListaRef = undefined,
      entidad = undefined,
      vacio = false,
      query = '',
      filtro = false,
    },
    ref
  ) => {

    if (vacio)
      return (
        <ContenedorCentro texto={texto}>
          <TextoVacio entidad={entidad} filtro={filtro} query={query} />
        </ContenedorCentro>
      );

    return (
      <ContenedorCentro texto={texto}>
        <div className={`centro ${nuevoEstilo}`} ref={ref}>
          {children}
          {finListaRef && (
            <div ref={finListaRef}>
              <p>Fin lista</p>
            </div>
          )}
        </div>
      </ContenedorCentro>
    );
  }
);

export default Centro;
