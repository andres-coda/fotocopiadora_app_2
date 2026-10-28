import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formValuesPerfilEditar,
  perfilEditar,
  perfilEditarEsquema,
  perfilEditarFormDefault,
  perfilEditarFormEdit,
} from '../../../../modelo/usuario/esqUsuario.esquema';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import Texto from '../../../../componente-estilo/texto/texto';
import CartelExito from '../../../../componente/cartelExito/cartelExito';
import { useModalContext } from '../../../../contexto/contextoModal';
import { appStore } from '../../../../redux/store';
import { setUsuario } from '../../../../redux/state/sesion.state';
import useUsuarioApi from '../../../../servicio/usuario/useUsuarioApi';

/**
 * Edicion de los datos propios. El email no viene en /auth/profile (devuelve
 * solo el payload del JWT), asi que el formulario se precarga con
 * GET /user/:id.
 *
 * Se usan dos instancias del hook porque `useApi` expone un unico `response`:
 * compartirlo haria que la respuesta del GET se confunda con la del PUT.
 */
const PerfilEditar = () => {
  const usuarioSesion = useSelector((store: appStore) => store.sesion.usuario);
  const dispatch = useDispatch();
  const { setModal } = useModalContext();

  const {
    obtenerUsuario,
    responseUsuario: usuarioCargado,
    errorFetchUsuario: errorCarga,
  } = useUsuarioApi();

  const {
    editarUsuario,
    responseUsuario: usuarioGuardado,
    loadingUsuario,
    errorFetchUsuario: errorGuardado,
  } = useUsuarioApi();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValuesPerfilEditar>({
    resolver: zodResolver(perfilEditar),
    defaultValues: perfilEditarFormDefault,
  });

  useEffect(() => {
    if (usuarioSesion) obtenerUsuario(usuarioSesion.id);
    // Solo al montar: el id del usuario logueado no cambia con el modal abierto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usuarioCargado) reset(perfilEditarFormEdit(usuarioCargado));
  }, [usuarioCargado, reset]);

  // La sesion de Redux se actualiza con lo que devolvio el back: el resto de la
  // app muestra el nombre nuevo sin volver a iniciar sesion.
  useEffect(() => {
    if (usuarioGuardado) dispatch(setUsuario(usuarioGuardado));
  }, [usuarioGuardado, dispatch]);

  const onSubmit = (data: formValuesPerfilEditar) => {
    if (!usuarioSesion) return;
    editarUsuario(data, usuarioSesion.id);
  };

  if (usuarioGuardado)
    return (
      <CartelExito
        mensaje="Tus datos fueron actualizados con exito"
        onCerrar={() => setModal(false)}
      />
    );

  return (
    <Formulario
      titulo="Mis datos"
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar cambios"
      textBtnConfirmar="Guardar"
      etiquetaSecundaria="Atras"
      textBtnSecundario="Atras"
      loading={loadingUsuario}
      errorFetch={errorGuardado ?? errorCarga}
    >
      <Input<formValuesPerfilEditar>
        name="nombre"
        control={control}
        label="Nombre de usuario"
        tipo="text"
        error={errors.nombre}
        esquema={perfilEditarEsquema}
      />
      <Input<formValuesPerfilEditar>
        name="email"
        control={control}
        label="Email"
        tipo="email"
        error={errors.email}
        esquema={perfilEditarEsquema}
      />

      <Texto texto="Cambiar contrasena" mediana negrita />
      <Texto texto="Dejalo vacio si no queres cambiarla." chica />
      <Input<formValuesPerfilEditar>
        name="passwordActual"
        control={control}
        label="Contrasena actual"
        tipo="password"
        error={errors.passwordActual}
        esquema={perfilEditarEsquema}
      />
      <Input<formValuesPerfilEditar>
        name="passwordNueva"
        control={control}
        label="Contrasena nueva"
        tipo="password"
        error={errors.passwordNueva}
        esquema={perfilEditarEsquema}
      />
      <Input<formValuesPerfilEditar>
        name="repetirPassword"
        control={control}
        label="Repetir contrasena nueva"
        tipo="password"
        error={errors.repetirPassword}
        esquema={perfilEditarEsquema}
      />
    </Formulario>
  );
};

export default PerfilEditar;
