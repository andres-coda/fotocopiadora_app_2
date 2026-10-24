import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formValuesMensaje,
  mensaje,
  mensajeFormDefault,
  mensajeFormEdit,
} from '../../../../modelo/Entidades/mensaje/esqMensaje.esquema';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import { appStore } from '../../../../redux/store';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import TextArea from '../../../../componente/formulario/textArea';
import CartelExito from '../../../../componente/cartelExito/cartelExito';
import useMensajeApi from '../../../../servicio/mensaje/useMensajeApi';
import {
  actualizarMensajeRedux,
  agregarMensajeInicioRedux,
} from '../../../../redux/state/mensaje.state';
import { useModalContext } from '../../../../contexto/contextoModal';

const MensajeCargar = () => {
  const mensajeSelect: MensajeProp | undefined = useSelector(
    (store: appStore) => store.mensaje.datoSeleccionado
  );
  const { crearMensaje, editarMensaje, responseMensaje, errorFetchMensaje, loadingMensaje } =
    useMensajeApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(mensajeSelect?.id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValuesMensaje>({
    resolver: zodResolver(mensaje),
    defaultValues: mensajeSelect ? mensajeFormEdit(mensajeSelect) : mensajeFormDefault,
  });

  // Se impacta apenas el back confirma, no al cerrar el cartel: si cierran el
  // modal con la X, la lista igual queda actualizada.
  useEffect(() => {
    if (!responseMensaje) return;

    if (esEdicion) dispatch(actualizarMensajeRedux(responseMensaje as MensajeProp));
    else dispatch(agregarMensajeInicioRedux(responseMensaje as MensajeProp));
  }, [responseMensaje]);

  const onSubmit = (data: formValuesMensaje) => {
    // El switch de favorito no es campo del formulario: DtoMensajeCrear no lo
    // declara y el whitelist del back lo descarta. Se conserva el valor previo.
    if (esEdicion && mensajeSelect) editarMensaje(data, mensajeSelect.id);
    else crearMensaje(data);
  };

  if (responseMensaje)
    return (
      <CartelExito
        mensaje={`El mensaje ---[ ${responseMensaje.nombre} ]--- fue ${
          esEdicion ? 'actualizado' : 'creado'
        } con exito`}
        onCerrar={() => setModal(false)}
      />
    );

  return (
    <Formulario
      titulo={esEdicion ? 'Editar mensaje' : 'Nuevo mensaje'}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria={esEdicion ? 'Guardar cambios' : 'Guardar mensaje'}
      etiquetaSecundaria="Atras"
      loading={loadingMensaje}
      errorFetch={errorFetchMensaje}
    >
      <Input<formValuesMensaje>
        name="nombre"
        control={control}
        label="Nombre"
        tipo="text"
        error={errors.nombre}
        esquema={mensaje}
      />
      <TextArea<formValuesMensaje>
        name="mensaje"
        control={control}
        label="Mensaje"
        error={errors.mensaje}
        esquema={mensaje}
        filas={8}
      />
    </Formulario>
  );
};

export default MensajeCargar;
