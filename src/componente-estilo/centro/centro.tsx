import { forwardRef } from 'react';
import TextoVacio from '../../componente/Textos/textoVacio';
import { CentroProp } from './centro.interface';
import { ContenedorCentro } from './centroExterior';
import './centro.css';
import useCentro from './useCentro';

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
      desplegable = false,
      scroll = false,      
    },
    ref
  ) => {

    const {claseCentro, claseExterior} = useCentro({desplegable, nuevoEstilo, scroll})

    if (vacio)
      return (
        <ContenedorCentro texto={texto} centro={claseExterior}>
          <TextoVacio entidad={entidad} filtro={filtro} query={query} />
        </ContenedorCentro>
      );

    return (
      <ContenedorCentro texto={texto} centro={claseExterior}>
        <div className={claseCentro} ref={ref}>
          {children}
          {finListaRef && (
            <div ref={finListaRef} className='centro-fin'></div>
          )}
        </div>
      </ContenedorCentro>
    );
  }
);

export default Centro;
