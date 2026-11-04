import './card.css';
import { CardPropComp } from './modelo/card.interface';
import useCard from './hooks/useCard';
import CardContenedor from './cardContenedor';

export default function Card({
  estadoClass,
  children,
  gigante = false,
  limitado = false,
  ultActualizacion = undefined,
  listo = undefined,
  pendiente = undefined,
  retirado = undefined,
  cancelado = undefined,
  onClick = undefined,
  nuevoEstilo = undefined,
  ruta = undefined,
  tituloCard = undefined,
  notaMargenSup = undefined,
  loading,
  error
}: CardPropComp) {
  const { clase, claseInterno, handleClick } = useCard({
    estadoClass,
    listo,
    gigante,
    limitado,
    pendiente,
    retirado,
    cancelado,
    ruta,
    nuevoEstilo: nuevoEstilo ?? '',
    onClick,
  });

  return (
    <CardContenedor
      tituloCard={tituloCard}
      notaMargenSup={notaMargenSup}
      ultActualizacion={ultActualizacion}
      clase={clase}
      loading={loading}
      error={error}
      onClick={handleClick}
    >
      <div className={claseInterno}>
        {children}
      </div>
    </CardContenedor>   
  );
}
