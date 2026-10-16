import { useDispatch, useSelector } from "react-redux";
import Texto from "../../../../componente-estilo/texto/texto"
import { useModalContext } from "../../../../contexto/contextoModal";
import usePrecioDeleteApi from "../../../../servicio/precio/usePrecioDeleteApi";
import useRetardo from "../../../../hooks/tiempo/useRetardo";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../../redux/store";
import Cargando from "../../../../componente/cargando/cargando";
import { useEffect } from "react";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Boton from "../../../../componente-estilo/boton/boton";
import Eliminar from '../../../../assets/deleted.svg?react'
import Atras from '../../../../assets/arrow.svg?react'
import { eliminarPrecioRedux } from "../../../../redux/state/precio.state";

const EliminarPrecio = () => {
  const precio: PrecioProp | undefined = useSelector((store: appStore) => store.precio.datoSeleccionado);
  const { eliminarPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } = usePrecioDeleteApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  const eliminarPrecioDelRedux = () => {
    if(precio)
      dispatch(eliminarPrecioRedux(precio.id));
    setModal(false);
  }

  const retardoRecetRetardo = useRetardo(() =>eliminarPrecioDelRedux(), 3000)

  useEffect(() => {
    if (responsePrecio) {
      retardoRecetRetardo();
    }
  }, [responsePrecio])

  
  if (loadingPrecio || !precio) return <Cargando />
  if (errorFetchPrecio) return <Texto texto={errorFetchPrecio} error chica />
  if (responsePrecio) return <Texto texto={`El precio ---[ ${precio.nombre} - $ ${precio.importe} ]--- fue eliminado con exito`} centrado />

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el precio`} centrado mediana />
        <Texto texto={`---[ ${precio.nombre} - $ ${precio.importe} ]---`} chica centrado/>
        <Botonera>
          <Boton icono={<Atras />} secundario onClick={() => setModal(false)} nuevoEstilo='btn-icono-mediano' titulo="Atras" />
          <Boton icono={<Eliminar />} onClick={() => eliminarPrecio(precio.id)} nuevoEstilo='btn-icono-mediano' titulo="Eliminar precio" />
        </Botonera>
      </div>
    </div>
  )
}

export default EliminarPrecio
