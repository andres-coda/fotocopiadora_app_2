import { useEffect, useState } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import Copiar from '../../../../assets/copiar.svg?react';
import Check from '../../../../assets/check.svg?react';
import Editar from '../../../../assets/edit.svg?react';
import useEditar from '../../../../hooks/editar/useEditar';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import './mensajeCard.css';

interface Prop {
  mensaje: MensajeProp;
  puedeEditar?: boolean;
}

const MensajeCard = ({ mensaje, puedeEditar = false }: Prop) => {
  const [copiado, setCopiado] = useState<boolean>(false);
  const { handleEdit } = useEditar({ setModalLocal: true });

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
    <Card nuevoEstilo="card-mensaje" tituloCard={mensaje.nombre}>
      <div className="card-mensaje__cabecera">
        <Texto texto={mensaje.nombre} negrita />
        <div className="card-mensaje__acciones">
          {puedeEditar && (
            <Boton
              icono={<Editar />}
              edit
              nuevoEstilo="btn-icono-chico"
              titulo="Editar mensaje"
              onClick={() => handleEdit({ mensaje })}
            />
          )}
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
        <Texto texto={mensaje.mensaje} chica nuevoEstilo="card-mensaje__texto" />
      )}
    </Card>
  );
};

export default MensajeCard;
