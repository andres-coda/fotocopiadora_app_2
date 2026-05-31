import { useEffect } from "react";
import { usePedidoContext } from "../../../contexto/contextoPedido";
import useEspecificacionesSelect from "../../../hooks/presupuesto/useEspecificacionesSelect";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";

const PresupuestoSimple = () => {
  const {datos, setDatos} = usePedidoContext()
  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(datos?.pedidoActual?.libro.especificacionesDefecto ?? [], datos?.pedidoActual?.libro.id );

  useEffect(()=> {
    setDatos(prev=>{
      if(!prev?.pedidoActual?.libro) return prev;
      return {
        ...prev,
        pedidoActual: {
          ...prev.pedidoActual,
          esp:especificaciones
        }
      }
    })
  },[especificaciones]);

  return (
    <EspecificacionesSelect especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
  )
}

export default PresupuestoSimple
