import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError, useForm } from 'react-hook-form';
import Desplegable from '../../../../componente/formulario/desplegable';
import DesplegablePredictivo from '../../../../componente-estilo/predictivo/desplegablePredictivo';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import InputBuscador from '../../../../componente/formulario/inputBuscador';
import { Opcion } from '../../../../componente/formulario/modelo/input.interface';
import { ConfiguracionProp } from '../../../../modelo/Entidades/configuracion/configuracion.interface';
import { CampoConfig } from '../../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import {
  configuracion,
  formValuesConfiguracion,
} from '../../../../modelo/Entidades/configuracion/esqConfiguracion.esquema';
import { setConfiguracionEmpresa } from '../../../../redux/state/empresa.state';
import useBusquedaSimple from '../../../../hooks/buscador/useBuscadorSimple';
import useConfiguracionApi from '../../../../servicio/configuracion/useConfiguracionApi';
import useDatosCobroApi from '../../../../servicio/dato_cobro/useDatosCobroApi';
import useMensajesApi from '../../../../servicio/mensaje/useMensajesApi';
import useSedesApi from '../../../../servicio/sede/useSedesApi';
import MensajeNombreCard from '../../mensaje/componente/mensajeNombreCard';

interface Props {
  campo: CampoConfig;
  configuracion?: ConfiguracionProp;
  onCerrar: () => void;
}

const TITULO_CAMPO: Record<CampoConfig, string> = {
  horaEntrega: 'Editar hora de entrega',
  idSede: 'Editar sede por defecto',
  idMsjPedidoTomado: 'Editar mensaje de pedido tomado',
  idMsjPedidoRetirado: 'Editar mensaje de pedido retirado',
  idDatoCobro: 'Editar dato de cobro',
};

const ETIQUETA_CAMPO: Record<CampoConfig, string> = {
  horaEntrega: 'Hora de entrega',
  idSede: 'Sede por defecto',
  idMsjPedidoTomado: 'Mensaje de pedido tomado',
  idMsjPedidoRetirado: 'Mensaje de pedido retirado',
  idDatoCobro: 'Dato de cobro',
};

/**
 * Los listados pueden venir vacíos o paginados: se inyecta primero la entidad
 * ya configurada para no perder la selección actual.
 */
const opcionesConActual = (
  items: { id: string; nombre: string }[] | undefined,
  actual?: { id: string; nombre: string }
): Opcion[] => {
  const lista = items ?? [];
  const todas = actual && actual.id ? [actual, ...lista.filter(x => x.id !== actual.id)] : lista;

  return todas.map(x => ({ value: x.id, label: x.nombre }));
};

/**
 * Solo se envía el campo editado. El resto queda ausente para que el DTO lo
 * omita y el back no lo sobrescriba.
 */
const valoresIniciales = (
  campo: CampoConfig,
  actual?: ConfiguracionProp
): formValuesConfiguracion => {
  switch (campo) {
    case 'horaEntrega':
      return { horaEntrega: actual?.horaEntrega };
    case 'idSede':
      return { idSede: actual?.sede?.id ?? '' };
    case 'idMsjPedidoTomado':
      return { idMsjPedidoTomado: actual?.msjTomado?.id ?? '' };
    case 'idMsjPedidoRetirado':
      return { idMsjPedidoRetirado: actual?.msjRetirado?.id ?? '' };
    case 'idDatoCobro':
      return { idDatoCobro: actual?.datoCobrado?.id ?? '' };
  }
};

const ConfiguracionEditar = ({ campo, configuracion: actual, onCerrar }: Props) => {
  const dispatch = useDispatch();
  const {
    editarConfiguracion,
    responseConfiguracion,
    loadingConfiguracion,
    errorFetchConfiguracion,
  } = useConfiguracionApi();

  const { obtenerSedesBusqueda, responseSedes } = useSedesApi();
  const { obtenerMensajesBusqueda, responseMensajes, loadingMensajes } = useMensajesApi();
  const { obtenerDatosCobroBusqueda, responseDatosCobro } = useDatosCobroApi();

  // Los mensajes se eligen por nombre, pero lo que se persiste es el id: el
  // texto del buscador vive fuera del formulario.
  const campoMensaje =
    campo === 'idMsjPedidoTomado' || campo === 'idMsjPedidoRetirado' ? campo : undefined;
  const mensajeActual =
    campoMensaje === 'idMsjPedidoTomado' ? actual?.msjTomado : actual?.msjRetirado;

  const [busquedaMensaje, setBusquedaMensaje] = useState<string>(mensajeActual?.nombre ?? '');
  const [mensajeElegido, setMensajeElegido] = useState<string>(mensajeActual?.nombre ?? '');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<formValuesConfiguracion>({
    resolver: zodResolver(configuracion),
    defaultValues: valoresIniciales(campo, actual),
  });

  const {
    datos: mensajesBuscados,
    setDatos: setMensajesBuscados,
    finListaRef: finMensajes,
  } = useBusquedaSimple<MensajeProp>({
    // Si el texto coincide con el mensaje ya elegido no se busca: evita que el
    // desplegable se abra solo al abrir el modal.
    valor: campoMensaje && busquedaMensaje !== mensajeElegido ? busquedaMensaje : '',
    response: responseMensajes,
    loading: loadingMensajes,
    obtenerBusqueda: obtenerMensajesBusqueda,
  });

  useEffect(() => {
    if (campo === 'idSede') obtenerSedesBusqueda({ query: '', limite: 100, pagina: 1 });
    if (campo === 'idDatoCobro') {
      obtenerDatosCobroBusqueda({ query: '', limite: 100, pagina: 1 });
    }
    // Solo al montar o cambiar de campo: los listados no dependen del formulario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campo]);

  useEffect(() => {
    if (responseConfiguracion) {
      dispatch(setConfiguracionEmpresa(responseConfiguracion));
      onCerrar();
    }
    // onCerrar cierra el modal y desmonta este componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseConfiguracion]);

  const onSubmit = (data: formValuesConfiguracion) => {
    editarConfiguracion(data);
  };

  const handleElegirMensaje = (mensaje: MensajeProp) => {
    if (!campoMensaje) return;

    setValue(campoMensaje, mensaje.id);
    setMensajeElegido(mensaje.nombre);
    setBusquedaMensaje(mensaje.nombre);
    setMensajesBuscados(undefined);
  };

  const opciones: Opcion[] =
    campo === 'idSede'
      ? opcionesConActual(responseSedes?.datos, actual?.sede)
      : campo === 'idDatoCobro'
        ? opcionesConActual(responseDatosCobro?.datos, actual?.datoCobrado)
        : [];

  return (
    <Formulario
      titulo={TITULO_CAMPO[campo]}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={onCerrar}
      etiquetaPrimaria="Guardar"
      etiquetaSecundaria="Cancelar"
      textBtnConfirmar="Guardar"
      textBtnSecundario="Cancelar"
      loading={loadingConfiguracion}
      errorFetch={errorFetchConfiguracion}
    >
      {campo === 'horaEntrega' ? (
        <Input<formValuesConfiguracion>
          name="horaEntrega"
          control={control}
          label="Hora de entrega (0-23)"
          tipo="number"
          error={errors.horaEntrega}
          esquema={configuracion}
        />
      ) : campoMensaje ? (
        <>
          <InputBuscador
            id={campoMensaje}
            label={ETIQUETA_CAMPO[campo]}
            valor={busquedaMensaje}
            onCambiar={setBusquedaMensaje}
          />
          {mensajesBuscados && mensajesBuscados.datosQuery.length > 0 && (
            <DesplegablePredictivo
              finRegistros={finMensajes}
              children={mensajesBuscados.datosQuery.map(mensaje => (
                <MensajeNombreCard
                  mensaje={mensaje}
                  onSelect={handleElegirMensaje}
                  key={mensaje.id}
                />
              ))}
            />
          )}
        </>
      ) : (
        <Desplegable<formValuesConfiguracion>
          name={campo}
          control={control}
          label={ETIQUETA_CAMPO[campo]}
          opciones={opciones}
          error={errors[campo] as FieldError | undefined}
          esquema={configuracion}
        />
      )}
    </Formulario>
  );
};

export default ConfiguracionEditar;
