import { Dispatch, SetStateAction } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import Editar from '../../../../assets/edit.svg?react';
import Estrella from '../../../../assets/star.svg?react';
import Eliminar from '../../../../assets/deleted.svg?react';
import useEditar from '../../../../hooks/editar/useEditar';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import './mensajeCard.css';
import BtnCopiar from '../../../../componente-estilo/boton/btnCopiar';

interface Prop {
  mensaje: MensajeProp;
  puedeEditar?: boolean;
  onToggleFavorito?: (mensaje: MensajeProp) => void;
  eliminarMensaje?: Dispatch<SetStateAction<boolean>>;
}

const MensajeCard = ({
  mensaje,
  puedeEditar = false,
  onToggleFavorito,
  eliminarMensaje = undefined,
}: Prop) => {
  
  const handleCopiar = () => {
    if(!mensaje.mensaje) {
      navigator.clipboard.writeText('El mensaje esta vacio');
    } else {
      navigator.clipboard.writeText(mensaje.mensaje);
    }
  };

  const { handleEdit } = useEditar({ setModalLocal: true });

  return (
    <Card nuevoEstilo="card-mensaje" tituloCard={mensaje.nombre}>
      <div className="card-mensaje__cabecera">
        <Texto texto={mensaje.nombre} negrita />
        <Botonera ajustada>
          {onToggleFavorito && (
            <Boton
              icono={<Estrella />}
              edit
              nuevoEstilo={`btn-icono-chico btn-icono-favorito ${
                mensaje.favorito ? 'btn-icono-favorito-activo' : ''
              }`}
              titulo={mensaje.favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              onClick={() => onToggleFavorito(mensaje)}
            />
          )}
          {puedeEditar && (
            <>
              {eliminarMensaje && (
                <Boton
                  icono={<Eliminar />}
                  edit
                  nuevoEstilo="btn-icono-chico"
                  titulo="Editar mensaje"
                  onClick={() => {
                    (eliminarMensaje(true), handleEdit({ mensaje }));
                  }}
                />
              )}
              <Boton
                icono={<Editar />}
                edit
                nuevoEstilo="btn-icono-chico"
                titulo="Editar mensaje"
                onClick={() => handleEdit({ mensaje })}
              />
            </>
          )}
          <BtnCopiar
            copiar={() => handleCopiar()}
            texto={`Copiar mensaje ${mensaje.nombre}`}
          />
        </Botonera>
      </div>
      {mensaje.mensaje && <Texto texto={mensaje.mensaje} chica inline />}
    </Card>
  );
};

export default MensajeCard;
