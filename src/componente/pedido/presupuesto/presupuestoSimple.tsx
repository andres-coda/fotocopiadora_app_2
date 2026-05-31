import { useEffect } from "react";
import { usePedidoContext } from "../../../contexto/contextoPedido";
import useEspecificacionesSelect from "../../../hooks/presupuesto/useEspecificacionesSelect";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";
import { sonEspecificacionesIguales } from "../../../utils/especificaciones";

const PresupuestoSimple = () => {
  const { datos, setDatos } = usePedidoContext()
  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(datos?.pedidoActual?.libro.especificacionesDefecto ?? [], datos?.pedidoActual?.libro.id);

  useEffect(() => {
    if (datos?.pedidoActual?.libro) {
      if (!datos?.pedidoActual?.especificaciones || !sonEspecificacionesIguales(datos?.pedidoActual?.especificaciones, especificaciones)) {
         setDatos(prev => {
          if (!prev?.pedidoActual?.libro) return prev;
          return {
            ...prev,
            pedidoActual: {
              ...prev.pedidoActual,
              especificaciones: especificaciones
            }
          }
        })
      }
    }
  }, [especificaciones]);

  if (!datos?.pedidoActual?.libro) return null;

  return (
    <EspecificacionesSelect especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
  )
}

export default PresupuestoSimple
