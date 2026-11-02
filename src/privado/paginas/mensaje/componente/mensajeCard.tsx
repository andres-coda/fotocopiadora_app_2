import { Dispatch, SetStateAction } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import Copiar from '../../../../assets/copiar.svg?react';
import Check from '../../../../assets/check.svg?react';
import Editar from '../../../../assets/edit.svg?react';
import Estrella from '../../../../assets/star.svg?react';
import Eliminar from '../../../../assets/deleted.svg?react';
import useEditar from '../../../../hooks/editar/useEditar';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import './mensajeCard.css';
import useCopiar from '../../../../hooks/copiar/useCopiar';

interface Prop {
  mensaje: MensajeProp;
  puedeEditar?: boolean;
  onToggleFavorito?: (mensaje: MensajeProp) => void;
  eliminarMensaje?: Dispatch<SetStateAction<boolean>>;
}

const MensajeCard = ({ mensaje, puedeEditar = false, onToggleFavorito, eliminarMensaje = undefined }: Prop) => {
  const {copiado, handleCopiar } = useCopiar()

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
              {eliminarMensaje && <Boton
                icono={<Eliminar />}
                edit
                nuevoEstilo="btn-icono-chico"
                titulo="Editar mensaje"
                onClick={() => {eliminarMensaje( true ), handleEdit({ mensaje })}}
              />}
              <Boton
                icono={<Editar />}
                edit
                nuevoEstilo="btn-icono-chico"
                titulo="Editar mensaje"
                onClick={() => handleEdit({ mensaje })}
              />
            </>
          )}
          <Boton
            icono={copiado ? <Check /> : <Copiar />}
            edit
            nuevoEstilo="btn-icono-chico"
            titulo={copiado ? 'Copiado' : 'Copiar mensaje'}
            onClick={()=>handleCopiar({mensaje: mensaje.mensaje ?? mensaje.nombre})}
          />
        </Botonera>
      </div>
      {mensaje.mensaje && <Texto texto={mensaje.mensaje} chica inline />}
    </Card>
  );
};

export default MensajeCard;
