import Titulo from '../texto/titulo';
import { CentroDefectoProp } from './centro.interface';
import './centro.css';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';

export const ContenedorCentro = ({ children, texto, error, loading }: CentroDefectoProp) => {
  if (error)
    return (
      <div className="centro-exterior">
        {texto && <Titulo titulo={texto} />}
        <Texto texto={error} error chica />
      </div>
    );

  if (loading)
    return (
      <div className="centro-exterior">
        {texto && <Titulo titulo={texto} />}
        <Cargando />
      </div>
    );

  return (
    <div className="centro-exterior">
      {texto && <Titulo titulo={texto} />}
      {children}
    </div>
  );
};
