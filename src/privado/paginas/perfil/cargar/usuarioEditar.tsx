import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesUsuarioEditar, usuarioEditar, usuarioEditarFormEdit } from "../../../../modelo/usuario/esqUsuario.esquema";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useUsuarioApi from "../../../../servicio/usuario/useUsuarioApi";
import { setUsuario } from "../../../../redux/state/sesion.state";

const UsuarioEditar = () => {
  const usuarioActual: usuarioProps | null = useSelector((store: appStore) => store.sesion.usuario);
  const { editarUsuario, responseUsuario, errorFetchUsuario, loadingUsuario } = useUsuarioApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesUsuarioEditar>({
    resolver: zodResolver(usuarioEditar),
    defaultValues: usuarioEditarFormEdit(usuarioActual)
  });

  const finalizar = () => {
    if (responseUsuario) dispatch(setUsuario(responseUsuario));
    setModal(false);
  }

  const onSubmit = (data: formValuesUsuarioEditar) => {
    if (!usuarioActual?.id) return;
    editarUsuario(data, usuarioActual.id);
  }

  if (responseUsuario) return (
    <CartelExito
      mensaje={`Tus datos fueron actualizados con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo='Editar mis datos'
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar datos"
      etiquetaSecundaria="Atras"
      loading={loadingUsuario}
      errorFetch={errorFetchUsuario}
    >
      <Input<formValuesUsuarioEditar> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={usuarioEditar} />
      <Input<formValuesUsuarioEditar> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={usuarioEditar} />
      <Input<formValuesUsuarioEditar> name='password' control={control} label='Contraseña (opcional)' tipo='password' error={errors.password} esquema={usuarioEditar} />
    </Formulario>
  )
}

export default UsuarioEditar;
