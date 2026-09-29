import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { useForm } from "react-hook-form";
import { estado, estadoFormEdit, formValuesEstado } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesSede, sede, sedeFormEdit } from "../../../../modelo/Entidades/sede/esqSede.esquema";
import useItemCard from "../../../../hooks/itemsCard/useItemCard";
import Texto from "../../../../componente-estilo/texto/texto";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import Desplegable from "../../../../componente/formulario/desplegable";
import { pasarDesplegableOrdenado } from "../../../../utils/formulario";
import { estadosParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado";
import './itemCard.css';
import { MouseEvent } from "react";

interface Prop {
  item: PedidoLibroProp;
  idPedido?: string;
}

const ItemInternoCard = ({ item, idPedido }: Prop) => {
  const { control, formState: { errors }, watch, reset } = useForm<formValuesEstado>({
    resolver: zodResolver(estado),
    defaultValues: estadoFormEdit(item)
  });

  const { control: controlSede, formState: { errors: erSede }, watch: watchSede, reset: resetSede } = useForm<formValuesSede>({
    resolver: zodResolver(sede),
    defaultValues: sedeFormEdit(item.sede)
  });

  const {
    sedes,
    loadingCambioEstadoPedido, errorFetchCambioEstadoPedido,
    loadingItem, errorItem
  } = useItemCard({
    item,
    idPedido,
    estadoActual: watch().estado,
    sedeActual: watchSede().nombre,
    resetEstado: reset,
    resetSede
  });

   const handleClickDentroSelect = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
    }

  if (errorFetchCambioEstadoPedido) {
    return (
      <>
        <Texto texto={'Error al intentar cambiar el estado del pedido'} />
        <Texto texto={errorFetchCambioEstadoPedido} error chica />
      </>
    )
  }

  if (errorItem) {
    return (
      <>
        <Texto texto={'Error al intentar cambiar la sede del pedido'} />
        <Texto texto={errorItem} error chica />
      </>
    )
  }

  return (
    <div className={`item-card ${claseXestado(item.estado)} item-card-interno`}>
      <Texto texto={`${item.cantidad}`} mediana ajustado nuevoEstilo="item-cantidad"/>
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(item.libro)}`} centrado inline />

        <EspecificacionCard listaEspecificaciones={item.especificaciones} horizontal />
        <Texto texto={`Detalles: ${item.detalles ?? ''}`} inline chica />
        <div className="estado-contenedor" onClick={handleClickDentroSelect}>
          {
            !loadingItem ?
              (() => {
                return (
                  <Desplegable<formValuesSede>
                    name="nombre"
                    control={controlSede}
                    label="Seleccione nueva sede"
                    error={erSede.nombre}
                    esquema={sede}
                    alingDerecha
                    opciones={pasarDesplegableOrdenado<SedeProp>({ items: sedes, selec: item.sede, comparacion: 'id' })}
                    nuevoEstilo="desplegable-estado"
                    texto="Sede: "
                  />
                )
              })()
              : <Texto texto={'Cambiando...'} chica ajustado />
          }
          {
            !loadingCambioEstadoPedido ?
              <Desplegable<formValuesEstado> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estado} alingDerecha opciones={pasarEstadoDesplegable(undefined, estadosParaDesplegable)} nuevoEstilo="desplegable-estado" />
              : <Texto texto={'Cambiando...'} chica ajustado />
          }
        </div>
      </div>
    </div>
  )
}

export default ItemInternoCard
