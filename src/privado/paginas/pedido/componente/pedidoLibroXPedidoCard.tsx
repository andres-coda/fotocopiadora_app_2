import { useForm } from "react-hook-form";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import Desplegable from "../../../../componente/formulario/desplegable";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";

import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import './pedidoCard.css'
import { estado, estadoFormEdit, formValuesEstado } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { estadosParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarStockRedux } from "../../../../redux/state/libro.state";
import { actualizarResumenClienteRedux } from "../../../../redux/state/cliente.state";
import { cambiarEstadoPedidoRedux } from "../../../../redux/state/pedido.state";
import { formValuesSede, sede, sedeFormEdit } from "../../../../modelo/Entidades/sede/esqSede.esquema";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { ReduxProp } from "../../../../redux/modelo/reduxContext.interface";
import { appStore } from "../../../../redux/store";
import { pasarDesplegable } from "../../../../utils/formulario";
import usePedidoLibroApi from "../../../../servicio/pedido_libro/usePedidoLibroApi";
import { cambiarSedePedidoLibroRedux } from "../../../../redux/state/pedido_libro.state";
import { cambiarEstadoPedidoLibroRedux } from "../../../../redux/state/pedido_libro.state";
import useCambiarEstadoPedidoApi from "../../../../servicio/pedido/useCambiarEstadoPedidoApi";

interface Prop {
  pL: PedidoLibroProp;
  idPedido: string;
  onClick?: (pL: PedidoLibroProp) => void;
}

const PedidoLibroXPedidoCard = ({ pL, idPedido, onClick }: Prop) => {
  const sedes: ReduxProp<SedeProp> = useSelector((store: appStore) => store.sede);

  const { cambiarEstadoPedidoLibro, responseCambioEstadoPedido, loadingCambioEstadoPedido, errorFetchCambioEstadoPedido } = useCambiarEstadoPedidoApi();
  const { cambiarSedePedidoLibro, responsePedidoLibro: responseItem, loadingPedidoLibro: loadingItem, errorFetchPedidoLibro: errorItem } = usePedidoLibroApi();

  const estadoAnteriorRef = useRef(pL.estado);
  const sedeAnteriorRef = useRef(pL.sede.id);


  const { control, formState: { errors }, watch, reset } = useForm<formValuesEstado>({
    resolver: zodResolver(estado),
    defaultValues: estadoFormEdit(pL)
  });

  const { control: controlSede, formState: { errors: erSede }, watch: watchSede, reset: resetSede } = useForm<formValuesSede>({
    resolver: zodResolver(sede),
    defaultValues: sedeFormEdit(pL.sede)
  });
  const dispatch = useDispatch();

  const estadoActual = watch().estado;

  const sedeActual = watchSede().nombre;

  useEffect(() => {
    if (estadoAnteriorRef.current !== pL.estado) {
      estadoAnteriorRef.current = pL.estado;
      return;
    }
    if (estadoActual !== pL.estado) {
      cambiarEstadoPedidoLibro({ idPedido, nroPedido: pL.id, estado: estadoActual });
    }
  }, [estadoActual, pL.estado]);

  useEffect(() => {
    const idSedeActual: SedeProp | undefined = sedes.datosIniciales?.datosQuery?.find(s => s.nombre === sedeActual || s.id === sedeActual);

    if (sedeAnteriorRef.current !== pL.sede.id) {
      sedeAnteriorRef.current = pL.sede.id;
      return;
    }
    if (idSedeActual != undefined && idSedeActual?.id != pL.sede.id) {
      cambiarSedePedidoLibro({ idPedido, nroPedido: pL.id, sede_id: sedeActual });
    }
  }, [sedeActual]);

  useEffect(() => {
    reset(estadoFormEdit(pL));
  }, [pL.estado, reset])


  useEffect(() => {
    resetSede(sedeFormEdit(pL.sede));
  }, [pL.estado, resetSede])

  useEffect(() => {
    if (responseCambioEstadoPedido) {
      dispatch(actualizarStockRedux(responseCambioEstadoPedido.items[0].stock));
      dispatch(actualizarResumenClienteRedux(responseCambioEstadoPedido.resumenCliente));
      dispatch(cambiarEstadoPedidoRedux(responseCambioEstadoPedido));
      dispatch(cambiarEstadoPedidoLibroRedux(responseCambioEstadoPedido.items));
    }
  }, [responseCambioEstadoPedido]);

  useEffect(() => {
    if (responseItem) {
      dispatch(cambiarSedePedidoLibroRedux(responseItem));
    }
  }, [responseItem]);

  if (errorFetchCambioEstadoPedido) return (
    <>
      <Texto texto={'Error al intentar cambiar el estado del libro'} error chica />
      <Texto texto={errorFetchCambioEstadoPedido} error chica />
    </>
  )

  if (errorItem) return (
    <>
      <Texto texto={'Error al intentar cambiar la sede'} error chica />
      <Texto texto={errorItem} error chica />
    </>
  )

  const handleItem = () => {
    if (onClick)
      onClick(pL);
  }

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(pL.estado)} pedido-cliente-card`}
      tituloCard={`${nombreLibroXstring(pL.libro)}`}
      onClick={onClick ? handleItem : undefined}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado />
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline />

        <EspecificacionCard listaEspecificaciones={pL.especificaciones} horizontal />
        <Texto texto={`Detalles: ${pL.detalles ?? ''}`} inline chica />
        <div className="estado-contenedor">
          {
            !loadingItem ?
              (() => {
                const todasLasSedes = sedes.datosIniciales?.datosQuery ?? []
                const sedeActual = pL.sede
                const sedesOrdenadas = sedeActual
                  ? [sedeActual, ...todasLasSedes.filter(s => s.id !== sedeActual.id)]
                  : todasLasSedes
                return (
                  <Desplegable<formValuesSede>
                    name="nombre"
                    control={controlSede}
                    label="Seleccione nueva sede"
                    error={erSede.nombre}
                    esquema={sede}
                    alingDerecha
                    opciones={pasarDesplegable<SedeProp>({ items: sedesOrdenadas })}
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
    </Card>
  )
}

export default PedidoLibroXPedidoCard