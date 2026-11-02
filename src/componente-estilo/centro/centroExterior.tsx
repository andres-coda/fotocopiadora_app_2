import Titulo from '../texto/titulo';
import { CentroDefectoProp } from './centro.interface';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';
import './centro.css';

export const ContenedorCentro = ({ children, texto = undefined, error = undefined, loading = false, nuevoEstilo = '' }: CentroDefectoProp) => {
  if (error)
    return (
      <div className={`centro-exterior ${nuevoEstilo}`}>
        {texto && <Titulo titulo={texto} />}
        <Texto texto={error} error chica />
      </div>
    );

  if (loading)
    return (
      <div className={`centro-exterior ${nuevoEstilo}`}>
        {texto && <Titulo titulo={texto} />}
        <Cargando />
      </div>
    );

  return (
    <div className={`centro-exterior ${nuevoEstilo}`}>
      {texto && <Titulo titulo={texto} />}
      {children}
    </div>
  );
};
