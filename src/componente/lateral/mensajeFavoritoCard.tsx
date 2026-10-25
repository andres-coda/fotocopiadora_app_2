import { useEffect, useState } from 'react';
import Boton from '../../componente-estilo/boton/boton';
import Texto from '../../componente-estilo/texto/texto';
import Copiar from '../../assets/copiar.svg?react';
import Check from '../../assets/check.svg?react';
import Estrella from '../../assets/star.svg?react';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';

interface Prop {
  mensaje: MensajeProp;
  onToggleFavorito: (mensaje: MensajeProp) => void;
}

const MensajeFavoritoCard = ({ mensaje, onToggleFavorito }: Prop) => {
  const [copiado, setCopiado] = useState<boolean>(false);

  // El tilde de "copiado" vuelve al icono de copiar despues de un momento.
  useEffect(() => {
    if (!copiado) return;

    const timer = setTimeout(() => setCopiado(false), 1500);
    return () => clearTimeout(timer);
  }, [copiado]);

  const handleCopiar = () => {
    navigator.clipboard.writeText(mensaje.mensaje ?? mensaje.nombre);
    setCopiado(true);
  };

  return (
    <div className="mensaje-favorito" title={mensaje.nombre}>
      <div className="mensaje-favorito__cabecera">
        <Texto texto={mensaje.nombre} chica negrita />
        <div className="mensaje-favorito__acciones">
          <Boton
            icono={<Estrella />}
            edit
            nuevoEstilo="btn-icono-chico btn-icono-favorito btn-icono-favorito-activo"
            titulo="Quitar de favoritos"
            onClick={() => onToggleFavorito(mensaje)}
          />
          <Boton
            icono={copiado ? <Check /> : <Copiar />}
            edit
            nuevoEstilo="btn-icono-chico"
            titulo={copiado ? 'Copiado' : 'Copiar mensaje'}
            onClick={handleCopiar}
          />
        </div>
      </div>
      {mensaje.mensaje && (
        <Texto texto={mensaje.mensaje} chica nuevoEstilo="mensaje-favorito__texto" />
      )}
    </div>
  );
};

export default MensajeFavoritoCard;
