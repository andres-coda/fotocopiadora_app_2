import { CardContenedorProp } from './modelo/card.interface';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';

const CardContenedor = ({
  children,
  ultActualizacion = undefined,
  onClick = undefined,
  clase,
  tituloCard = undefined,
  notaMargenSup = undefined,
  loading = false,
  error = undefined,
}: CardContenedorProp) => {
  const ultAct: string | undefined = ultActualizacion
    ? `Últ. act.: ${ultActualizacion}`
    : undefined;

  if (loading)
    return (
      <div className={`${clase}`} onClick={onClick} title={tituloCard}>
        <Cargando />
      </div>
    );

  if(error)return (
    <div className={`${clase}`} onClick={onClick} title={tituloCard}>
      <Texto texto={error} chica error />
    </div>
  )

  return (
    <div className={`${clase}`} onClick={onClick} title={tituloCard}>
      {ultAct && !notaMargenSup && <Texto texto={ultAct} chica sombra derecha />}
      {notaMargenSup && <Texto texto={notaMargenSup} chica sombra />}
      {children}
    </div>
  );
};

export default CardContenedor;
