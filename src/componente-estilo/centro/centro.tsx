import { forwardRef, ReactNode, RefObject } from 'react';
import Titulo from '../texto/titulo';
import TextoVacio from '../../componente/Textos/textoVacio';
import './centro.css';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';

interface CentroDefectoProp {
  // Lo que sea que vaya en el children, estara en grid.
  children?: ReactNode;
  // El texto simboliza un titulo, va encima del centro, los estilos son del titulo base
  texto?: string;
}

interface CentroProp extends CentroDefectoProp {
  //El nuevo estilo aplica al centro interior, el que va con grid
  nuevoEstilo?: string;
  //Hace referencia al final de la lista.
  finListaRef?: RefObject<HTMLDivElement>;
  //Se utiliza para nombrar cuando no hay elementos en la lista
  entidad?: string;
  //Se utiliza para poner el texto de que no hay elementos en la lista, es condicion
  //de los datos que van en el children
  vacio?: boolean;
  //La query es para especificar que no hay coincidencias con la busqueda, simepre que no haya elementos
  query?: string;
  //Igual que query
  filtro?: boolean;
  //error al hacer peticion a la api
  error?: string;
  //Loading para saber si la petición fue enviada y esta cargando los datos
  loading?: boolean;
}

const ContenedorCentro = ({ children, texto }: CentroDefectoProp) => {
  return (
    <div className="centro-exterior">
      {texto && <Titulo titulo={texto} />}
      {children}
    </div>
  );
};

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
      error = undefined,
      loading = false,
    },
    ref
  ) => {
    if (error)
      return (
        <ContenedorCentro texto={texto}>
          <Texto texto={error} error chica />
        </ContenedorCentro>
      );

    if (loading)
      return (
        <ContenedorCentro texto={texto}>
          <Cargando />
        </ContenedorCentro>
      );

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
