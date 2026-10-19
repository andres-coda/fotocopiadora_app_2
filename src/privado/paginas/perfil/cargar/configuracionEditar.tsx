import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { configuracion, configuracionFormEdit, formValuesConfiguracion } from "../../../../modelo/Entidades/configuracion/esqConfiguracion.esquema";
import { ConfiguracionProp } from "../../../../modelo/Entidades/configuracion/configuracion.interface";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import Desplegable from "../../../../componente/formulario/desplegable";
import Switch from "../../../../componente-estilo/switch/switch";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import { Opcion } from "../../../../componente/formulario/modelo/input.interface";
import { useModalContext } from "../../../../contexto/contextoModal";
import useConfiguracionApi from "../../../../servicio/configuracion/useConfiguracionApi";
import useSedesApi from "../../../../servicio/sede/useSedesApi";
import useMensajesApi from "../../../../servicio/mensaje/useMensajesApi";
import useDatosCobroApi from "../../../../servicio/dato_cobro/useDatosCobroApi";

interface Props {
  configuracion: ConfiguracionProp | undefined;
  onActualizar: (configuracion: ConfiguracionProp) => void;
}

/**
 * Los desplegables se llenan con listados que pueden venir vacios: un operador
 * sin permisos recibe error al listar, y aun con permisos el listado viene
 * paginado. Para no perder la seleccion actual ni dejar el campo vacio,
 * inyectamos siempre como primera opcion la entidad ya configurada.
 */
const opcionesConActual = (
  items: { id: string; nombre: string }[] | undefined,
  actual?: { id: string; nombre: string }
): Opcion[] => {
  const lista = items ?? [];
  const todas = actual && actual.id
    ? [actual, ...lista.filter(x => x.id !== actual.id)]
    : lista;

  return todas.map(x => ({ value: x.id, label: x.nombre }));
}

const ConfiguracionEditar = ({ configuracion: configuracionActual, onActualizar }: Props) => {
  const { editarConfiguracion, responseConfiguracion, errorFetchConfiguracion, loadingConfiguracion } = useConfiguracionApi();
  const { setModal } = useModalContext();

  const { obtenerSedesBusqueda, responseSedes } = useSedesApi();
  const { obtenerMensajesBusqueda, responseMensajes } = useMensajesApi();
  const { obtenerDatosCobroBusqueda, responseDatosCobro } = useDatosCobroApi();

  // Los switch no son campos de RHF: se manejan como estado local.
  const [msjRetiro, setMsjRetiro] = useState<boolean>(configuracionActual?.msjRetiro ?? false);
  const [msjEnvio, setMsjEnvio] = useState<boolean>(configuracionActual?.msjEnvio ?? false);

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesConfiguracion>({
    resolver: zodResolver(configuracion),
    defaultValues: configuracionFormEdit(configuracionActual)
  });

  useEffect(() => {
    // Se usa GET /sede (no /sede/todas, que esta detras de AdminGuard): cualquier
    // usuario autenticado puede listar. Mensajes y datos de cobro, igual.
    obtenerSedesBusqueda({ query: '', limite: 100, pagina: 1 });
    obtenerMensajesBusqueda({ query: '', limite: 100, pagina: 1 });
    obtenerDatosCobroBusqueda({ query: '', limite: 100, pagina: 1 });
  }, []);

  const opcionesSede = opcionesConActual(responseSedes?.datos, configuracionActual?.sede);
  const opcionesMsjTomado = opcionesConActual(responseMensajes?.datos, configuracionActual?.msjTomado);
  const opcionesMsjRetirado = opcionesConActual(responseMensajes?.datos, configuracionActual?.msjRetirado);
  const opcionesDatoCobro = opcionesConActual(responseDatosCobro?.datos, configuracionActual?.datoCobrado);

  const finalizar = () => {
    if (responseConfiguracion) onActualizar(responseConfiguracion);
    setModal(false);
  }

  const onSubmit = (data: formValuesConfiguracion) => {
    // Los switch viajan aparte porque no son campos del formulario.
    editarConfiguracion({ ...data, msjRetiro, msjEnvio });
  }

  if (responseConfiguracion) return (
    <CartelExito
      mensaje="La configuracion fue editada con exito"
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo='Editar configuracion'
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar configuracion"
      etiquetaSecundaria="Atras"
      loading={loadingConfiguracion}
      errorFetch={errorFetchConfiguracion}
    >
      <Input<formValuesConfiguracion> name='fechaEntrega' control={control} label='Fecha de entrega' tipo='date' error={errors.fechaEntrega} esquema={configuracion} />
      <Input<formValuesConfiguracion> name='horaEntrega' control={control} label='Hora de entrega (0-23)' tipo='number' error={errors.horaEntrega} esquema={configuracion} />
      <Desplegable<formValuesConfiguracion> name='idSede' control={control} label='Sede' error={errors.idSede} esquema={configuracion} opciones={opcionesSede} />
      <Desplegable<formValuesConfiguracion> name='idMsjPedidoTomado' control={control} label='Mensaje de pedido tomado' error={errors.idMsjPedidoTomado} esquema={configuracion} opciones={opcionesMsjTomado} />
      <Desplegable<formValuesConfiguracion> name='idMsjPedidoRetirado' control={control} label='Mensaje de pedido retirado' error={errors.idMsjPedidoRetirado} esquema={configuracion} opciones={opcionesMsjRetirado} />
      <Desplegable<formValuesConfiguracion> name='idDatoCobro' control={control} label='Dato de cobro' error={errors.idDatoCobro} esquema={configuracion} opciones={opcionesDatoCobro} />
      <Switch activo={msjRetiro} onActivar={setMsjRetiro} texto='Mensaje de retiro' />
      <Switch activo={msjEnvio} onActivar={setMsjEnvio} texto='Mensaje de envio' />
    </Formulario>
  )
}

export default ConfiguracionEditar;
