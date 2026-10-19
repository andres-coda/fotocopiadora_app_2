import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import Editar from '../../../../assets/edit.svg?react'
import Eliminar from '../../../../assets/deleted.svg?react'
import './datoCobroCard.css'
import { useModalContext } from "../../../../contexto/contextoModal";
import { DatoCobroProp } from "../../../../modelo/Entidades/dato_cobro/datoCobro.interface";

interface Props {
  datoCobro: DatoCobroProp;
  esAdmin: boolean;
  onEditar: (datoCobro: DatoCobroProp) => void;
  onEliminar: (datoCobro: DatoCobroProp) => void;
}

const DatoCobroCard = ({ datoCobro, esAdmin, onEditar, onEliminar }: Props) => {

  const { setModal } = useModalContext();

  return (
    <Card
      nuevoEstilo="perfil-dato-cobro-card"
    >
      <div className="perfil-dato-cobro-card__datos">
        <Texto texto={datoCobro.nombre} chica />
        {datoCobro.mensaje && <Texto texto={datoCobro.mensaje} chica />}
      </div>
      {esAdmin && (
        <Botonera nuevoEstilo="perfil-dato-cobro-card__botonera">
          <Boton icono={<Eliminar />} edit nuevoEstilo="btn-icono-chico" titulo="Eliminar dato de cobro" onClick={() => { onEliminar(datoCobro); setModal(true); }} />
          <Boton icono={<Editar />} secundario nuevoEstilo="btn-icono-chico" titulo="Editar dato de cobro" onClick={() => { onEditar(datoCobro); setModal(true); }} />
        </Botonera>
      )}
    </Card>
  )
}

export default DatoCobroCard
