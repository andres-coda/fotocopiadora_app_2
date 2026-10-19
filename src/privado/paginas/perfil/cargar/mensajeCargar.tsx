import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesMensaje, mensaje, mensajeFormEdit } from "../../../../modelo/Entidades/mensaje/esqMensaje.esquema";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import Switch from "../../../../componente-estilo/switch/switch";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useMensajeApi from "../../../../servicio/mensaje/useMensajeApi";
import { actualizarMensajeRedux, agregarMensajeInicioRedux } from "../../../../redux/state/mensaje.state";

const MensajeCargar = () => {
  const mensajeSelect: MensajeProp | undefined = useSelector((store: appStore) => store.mensaje.datoSeleccionado);
  const { editarMensaje, crearMensaje, responseMensaje, errorFetchMensaje, loadingMensaje } = useMensajeApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(mensajeSelect?.id);

  // El switch no es campo de RHF: se maneja como estado local.
  const [favorito, setFavorito] = useState<boolean>(mensajeSelect?.favorito ?? false);

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesMensaje>({
    resolver: zodResolver(mensaje),
    defaultValues: mensajeFormEdit(mensajeSelect)
  });

  const finalizar = () => {
    if (responseMensaje) {
      if (esEdicion) dispatch(actualizarMensajeRedux(responseMensaje as MensajeProp));
      else dispatch(agregarMensajeInicioRedux(responseMensaje as MensajeProp));
    }
    setModal(false);
  }

  const onSubmit = (data: formValuesMensaje) => {
    // El switch viaja aparte porque no es campo del formulario.
    if (esEdicion && mensajeSelect) {
      editarMensaje({ ...data, favorito }, mensajeSelect.id);
    } else {
      crearMensaje({ ...data, favorito });
    }
  }

  if (responseMensaje) return (
    <CartelExito
      mensaje={`El mensaje ---[ ${responseMensaje.nombre} ]--- fue ${esEdicion ? 'editado' : 'creado'} con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo={esEdicion ? 'Editar mensaje' : 'Nuevo mensaje'}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar mensaje"
      etiquetaSecundaria="Atras"
      loading={loadingMensaje}
      errorFetch={errorFetchMensaje}
    >
      <Input<formValuesMensaje> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={mensaje} />
      <Input<formValuesMensaje> name='mensaje' control={control} label='Mensaje' tipo='text' error={errors.mensaje} esquema={mensaje} />
      <Switch activo={favorito} onActivar={setFavorito} texto='Favorito' />
    </Formulario>
  )
}

export default MensajeCargar;
