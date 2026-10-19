import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import Editar from '../../../../assets/edit.svg?react'
import Eliminar from '../../../../assets/deleted.svg?react'
import './mensajeCard.css'
import { Dispatch, SetStateAction } from "react";
import { useModalContext } from "../../../../contexto/contextoModal";
import { useDispatch } from "react-redux";
import { seleccionarMensaje } from "../../../../redux/state/mensaje.state";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";

interface Props {
  mensaje: MensajeProp;
  esAdmin: boolean;
  onEditar: () => void;
  setEliminar: Dispatch<SetStateAction<boolean>>;
}

const MensajeCard = ({ mensaje, esAdmin, onEditar, setEliminar }: Props) => {

  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  return (
    <Card
      nuevoEstilo="perfil-mensaje-card"
    >
      <div className="perfil-mensaje-card__datos">
        <Texto texto={mensaje.nombre} chica />
        {mensaje.mensaje && <Texto texto={mensaje.mensaje} chica />}
        <Texto texto={`Favorito: ${mensaje.favorito ? 'Si' : 'No'}`} chica />
      </div>
      {esAdmin && (
        <Botonera nuevoEstilo="perfil-mensaje-card__botonera">
          <Boton icono={<Eliminar />} edit nuevoEstilo="btn-icono-chico" titulo="Eliminar mensaje" onClick={() => { setEliminar(true); setModal(true); dispatch(seleccionarMensaje(mensaje)); }} />
          <Boton icono={<Editar />} secundario nuevoEstilo="btn-icono-chico" titulo="Editar mensaje" onClick={() => { onEditar(); setModal(true); dispatch(seleccionarMensaje(mensaje)); }} />
        </Botonera>
      )}
    </Card>
  )
}

export default MensajeCard
