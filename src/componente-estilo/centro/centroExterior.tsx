import Titulo from '../texto/titulo';
import { CentroDefectoProp } from './centro.interface';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';
import './centro.css';
import useCentro from './useCentro';
import TextoVacio from '../../componente/Textos/textoVacio';

export const ContenedorCentro = ({
  children,
  texto = undefined,
  error = undefined,
  loading = false,
  nuevoEstilo = '',
  desplegable = false,
  scroll = false,
  centro = undefined,
  vacio = false,
  entidad = undefined,
  query  = undefined,
  filtro = undefined
}: CentroDefectoProp) => {
  const { claseExterior } = useCentro({ desplegable, scroll, nuevoEstilo, centro });
  if (error)
    return (
      <div className={claseExterior}>
        {texto && <Titulo titulo={texto} />}
        <Texto texto={error} error />
      </div>
    );

  if (loading)
    return (
      <div className={claseExterior}>
        {texto && <Titulo titulo={texto} />}
        <Cargando />
      </div>
    );

  if (vacio)
    return (
      <div className={claseExterior}>
        {texto && <Titulo titulo={texto} />}
        <TextoVacio entidad={entidad} filtro={filtro} query={query} />
      </div>
    );
  return (
    <div className={claseExterior}>
      {texto && <Titulo titulo={texto} />}
      {children}
    </div>
  );
};
