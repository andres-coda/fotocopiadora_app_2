import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesUsuarioAdmin, usuarioAdminAlta, usuarioAdminEditar, usuarioAdminFormEdit } from "../../../../modelo/usuario/esqUsuario.esquema";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import Desplegable from "../../../../componente/formulario/desplegable";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useUsuarioApi from "../../../../servicio/usuario/useUsuarioApi";
import { actualizarUsuarioRedux, agregarUsuarioInicioRedux } from "../../../../redux/state/usuarios.state";

// Solo admin | operador: la DB rechaza asignar super_admin desde este ABM.
const rolOpciones = [
  { value: 'admin', label: 'Admin' },
  { value: 'operador', label: 'Operador' },
];

const UsuarioCargar = () => {
  const usuarioSelect: usuarioProps | undefined = useSelector((store: appStore) => store.usuarios.datoSeleccionado);
  const { editarUsuario, crearUsuario, responseUsuario, errorFetchUsuario, loadingUsuario } = useUsuarioApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(usuarioSelect?.id);

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesUsuarioAdmin>({
    resolver: zodResolver(esEdicion ? usuarioAdminEditar : usuarioAdminAlta),
    defaultValues: usuarioAdminFormEdit(usuarioSelect)
  });

  const finalizar = () => {
    if (responseUsuario) {
      if (esEdicion) dispatch(actualizarUsuarioRedux(responseUsuario as usuarioProps));
      else dispatch(agregarUsuarioInicioRedux(responseUsuario as usuarioProps));
    }
    setModal(false);
  }

  const onSubmit = (data: formValuesUsuarioAdmin) => {
    if (esEdicion && usuarioSelect) {
      editarUsuario(data, usuarioSelect.id);
    } else {
      crearUsuario(data);
    }
  }

  if (responseUsuario) return (
    <CartelExito
      mensaje={`El usuario ---[ ${responseUsuario.nombre} ]--- fue ${esEdicion ? 'editado' : 'creado'} con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo={esEdicion ? 'Editar usuario' : 'Nuevo usuario'}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar usuario"
      etiquetaSecundaria="Atras"
      loading={loadingUsuario}
      errorFetch={errorFetchUsuario}
    >
      <Input<formValuesUsuarioAdmin> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={usuarioAdminAlta} />
      <Input<formValuesUsuarioAdmin> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={usuarioAdminAlta} />
      <Input<formValuesUsuarioAdmin> name='password' control={control} label={esEdicion ? 'Contraseña (opcional)' : 'Contraseña'} tipo='password' error={errors.password} esquema={usuarioAdminAlta} />
      <Desplegable<formValuesUsuarioAdmin> name='role' control={control} label='Rol' opciones={rolOpciones} error={errors.role} esquema={usuarioAdminAlta} />
    </Formulario>
  )
}

export default UsuarioCargar;
