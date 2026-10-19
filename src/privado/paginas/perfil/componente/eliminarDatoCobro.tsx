import Texto from "../../../../componente-estilo/texto/texto"
import { useModalContext } from "../../../../contexto/contextoModal";
import { DatoCobroProp } from "../../../../modelo/Entidades/dato_cobro/datoCobro.interface";
import Cargando from "../../../../componente/cargando/cargando";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Boton from "../../../../componente-estilo/boton/boton";
import Eliminar from '../../../../assets/deleted.svg?react'
import Atras from '../../../../assets/arrow.svg?react'
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useDatoCobroApi from "../../../../servicio/dato_cobro/useDatoCobroApi";

interface Props {
  datoCobro: DatoCobroProp | undefined;
}

const EliminarDatoCobro = ({ datoCobro }: Props) => {
  const { eliminarDatoCobro, responseDatoCobro, errorFetchDatoCobro, loadingDatoCobro } = useDatoCobroApi();
  const { setModal } = useModalContext();

  if (loadingDatoCobro || !datoCobro) return <Cargando />
  if (errorFetchDatoCobro) return <Texto texto={errorFetchDatoCobro} error chica />
  if (responseDatoCobro) return <CartelExito mensaje={`El dato de cobro ---[ ${datoCobro.nombre} ]--- fue eliminado con exito`} onCerrar={() => setModal(false)} delay={3000} />

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el dato de cobro`} centrado mediana />
        <Texto texto={`---[ ${datoCobro.nombre} ]---`} chica centrado />
        <Botonera>
          <Boton icono={<Atras />} secundario onClick={() => setModal(false)} nuevoEstilo='btn-icono-mediano' titulo="Atras" />
          <Boton icono={<Eliminar />} onClick={() => eliminarDatoCobro(datoCobro.id)} nuevoEstilo='btn-icono-mediano' titulo="Eliminar dato de cobro" />
        </Botonera>
      </div>
    </div>
  )
}

export default EliminarDatoCobro
