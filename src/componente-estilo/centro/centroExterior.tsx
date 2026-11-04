import Titulo from '../texto/titulo';
import { CentroDefectoProp } from './centro.interface';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';
import './centro.css';
import useCentro from './useCentro';

export const ContenedorCentro = ({ children, texto = undefined, error = undefined, loading = false, nuevoEstilo = '', desplegable = false, scroll = false, centro = undefined }: CentroDefectoProp) => {
  const {claseExterior} = useCentro({desplegable, scroll, nuevoEstilo, centro})
  if (error)
    return (
      <div className={claseExterior}>
        {texto && <Titulo titulo={texto} />}
        <Texto texto={error} error chica />
      </div>
    );

  if (loading)
    return (
      <div className={claseExterior}>
        {texto && <Titulo titulo={texto} />}
        <Cargando />
      </div>
    );

  return (
    <div className={claseExterior}>
      {texto && <Titulo titulo={texto} />}
      {children}
    </div>
  );
};
