import { Children, forwardRef } from 'react';
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
      error = undefined,
      loading = false,
      nuevoEstiloExterior
    },
    ref
  ) => {

    const {claseCentro, claseExterior} = useCentro({desplegable, nuevoEstilo, scroll, nuevoEstiloExterior})

    // `error` y `loading` reemplazan al contenido en `ContenedorCentro`, asi
    // que solo tienen sentido cuando no hay nada que mostrar. En los listados
    // paginados el loading se prende en cada pagina y un error de la pagina N
    // no debe borrar las cards ya acumuladas: desmontarlas reinicia el scroll y
    // deja al observer de fin de pagina apuntando a un nodo que ya no existe.
    // Con el contenedor vacio, en cambio, el spinner y el error son justo lo
    // que corresponde mostrar.
    const sinContenido = vacio || Children.count(children) === 0;
    const errorVisible = sinContenido ? error : undefined;
    const cargandoVisible = loading && sinContenido;

    if (vacio)
      return (
        <ContenedorCentro texto={texto} centro={claseExterior} error={errorVisible} loading={cargandoVisible}>
          <TextoVacio entidad={entidad} filtro={filtro} query={query} />
        </ContenedorCentro>
      );

    return (
      <ContenedorCentro texto={texto} centro={claseExterior} error={errorVisible} loading={cargandoVisible}>
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
