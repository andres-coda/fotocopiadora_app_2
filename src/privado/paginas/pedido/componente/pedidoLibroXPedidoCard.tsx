import { useForm } from "react-hook-form";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import Desplegable from "../../../../componente/formulario/desplegable";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { transformarEspeAEnum } from "../../../../utils/especificaciones";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import './pedidoCard.css'
import { estado, estadoFormEdit, formValuesEstado } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { estadosParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import useCambiarEstadoPedidoLibroApi from "../../../../servicio/pedido_libro/useCambiarEstadoPedidolibroApi";
import { actualizarStock } from "../../../../redux/state/libro.state";
import { actualizarResumenCliente } from "../../../../redux/state/cliente.state";
import { cambiarEstadoPedido } from "../../../../redux/state/pedido.state";
import { formValuesSede, sede, sedeFormEdit } from "../../../../modelo/Entidades/sede/esqSede.esquema";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { ReduxProp } from "../../../../redux/modelo/reduxContext.interface";
import { appStore } from "../../../../redux/store";
import { pasarDesplegable } from "../../../../utils/formulario";
import usePedidoLibroApi from "../../../../servicio/pedido_libro/usePedidoLibroApi";
import { cambiarSedePedidoLibroRedux } from "../../../../redux/state/pedido_libro.state";

interface Prop {
  pL: PedidoLibroProp;
  idPedido: string;
}

const PedidoLibroXPedidoCard = ({ pL, idPedido }: Prop) => {
  const sedes: ReduxProp<SedeProp> = useSelector((store: appStore) => store.sede);

  const { cambiarEstadoPedidoLibro, responsePedidoLibro, loadingPedidoLibro, errorFetchPedidoLibro } = useCambiarEstadoPedidoLibroApi();
  const { cambiarSedePedidoLibro, responsePedidoLibro: responseItem, loadingPedidoLibro: loadingItem, errorFetchPedidoLibro: errorItem } = usePedidoLibroApi();
 
  const { control, formState: { errors }, watch } = useForm<formValuesEstado>({
    resolver: zodResolver(estado),
    defaultValues: estadoFormEdit(pL)
  });
  const { control: controlSede, formState: { errors: erSede }, watch: watchSede } = useForm<formValuesSede>({
    resolver: zodResolver(sede),
    defaultValues: sedeFormEdit(pL.sede)
  });
  const dispatch = useDispatch();

  const [clasEstado, setClasEstado] = useState<Estado>(pL.estado);

  const estadoActual = watch().estado;

  const sedeActual = watchSede().nombre;

  useEffect(() => {
    if (estadoActual != clasEstado) {
      cambiarEstadoPedidoLibro({ idPedido, nroPedido: pL.id, estado: estadoActual });
    }
  }, [estadoActual]);

  useEffect(() => {
    const idSedeActual:SedeProp | undefined = sedes.datosIniciales?.datosQuery?.find(s => s.nombre === sedeActual || s.id === sedeActual);
    console.log('Sede actual en watch: ', sedeActual)
    console.log('Sede actual: ', idSedeActual)
    
    if (idSedeActual != undefined && idSedeActual?.id != pL.sede.id ) {
      cambiarSedePedidoLibro({ idPedido, nroPedido: pL.id, sede_id: sedeActual });
    }
  }, [sedeActual]);

  useEffect(() => {
    if (responsePedidoLibro) {
      dispatch(actualizarStock(responsePedidoLibro));
      dispatch(actualizarResumenCliente(responsePedidoLibro));
      dispatch(cambiarEstadoPedido(responsePedidoLibro));
      setClasEstado(responsePedidoLibro.estado);
    }
  }, [responsePedidoLibro]);

  useEffect(() => {
    if (responseItem) {
      dispatch(cambiarSedePedidoLibroRedux(responseItem));
    }
  }, [responseItem]);

  if (errorFetchPedidoLibro) return (
    <>
      <Texto texto={'Error al intentar cambiar el estado del libro'} error chica />
      <Texto texto={errorFetchPedidoLibro} error chica />
    </>
  )

  if (errorItem) return (
    <>
      <Texto texto={'Error al intentar cambiar la sede'} error chica />
      <Texto texto={errorItem} error chica />
    </>
  )

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(clasEstado)} pedido-cliente-card`}
      tituloCard={`${nombreLibroXstring(pL.libro)}`}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado />
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline />

        <EspecificacionCard listaEspecificaciones={pL.especificaciones} horizontal />
        <Texto texto={`Detalles: ${pL.detalles ?? ''}`} inline chica />
        <div className="estado-contenedor">
          {
            !loadingItem ?
              <Desplegable<formValuesSede> name="nombre" control={controlSede} label="Seleccione nueva sede" error={erSede.nombre} esquema={sede} alingDerecha opciones={pasarDesplegable<SedeProp>({ items: sedes.datosIniciales.datosQuery })} nuevoEstilo="desplegable-estado" texto="Sede: "/>
              : <Texto texto={'Cambiando...'} chica ajustado />
          }
          {
            !loadingPedidoLibro ?
              <Desplegable<formValuesEstado> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estado} alingDerecha opciones={pasarEstadoDesplegable(undefined, estadosParaDesplegable)} nuevoEstilo="desplegable-estado" />
              : <Texto texto={'Cambiando...'} chica ajustado />
          }
        </div>
      </div>
    </Card>
  )
}

export default PedidoLibroXPedidoCard
