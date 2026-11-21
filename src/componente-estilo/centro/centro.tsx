import { forwardRef } from 'react';
import { CentroProp } from './interface/centro.interface';
import { ContenedorCentro } from './centroExterior';
import useCentro from './hook/useCentro';
import './estilos/centro.css';

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
      error = undefined,
      loading = false,
      nuevoEstiloExterior,
      buscador,
    },
    ref
  ) => {
    const { claseCentro, claseExterior } = useCentro({
      desplegable,
      nuevoEstilo,
      scroll,
      nuevoEstiloExterior,
    });

    return (
      <ContenedorCentro
        texto={texto}
        centro={claseExterior}
        error={error}
        loading={loading}
        vacio={vacio}
        entidad={entidad}
        filtro={filtro}
        buscador={buscador}
        query={query}
      >
        <div className={claseCentro} ref={ref}>
          {children}
          {finListaRef && <div ref={finListaRef} className="centro-fin"></div>}
        </div>
      </ContenedorCentro>
    );
  }
);

export default Centro;
