import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formValuesUsuarioAlta,
  usuarioAdminAlta,
  usuarioAltaFormDefault,
} from '../../../../modelo/usuario/esqUsuario.esquema';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import Desplegable from '../../../../componente/formulario/desplegable';
import CartelExito from '../../../../componente/cartelExito/cartelExito';
import { useModalContext } from '../../../../contexto/contextoModal';
import useUsuarioApi from '../../../../servicio/usuario/useUsuarioApi';
import { Opcion } from '../../../../componente/formulario/modelo/input.interface';

// super_admin no se ofrece: pc_usuario_insert rechaza asignarlo desde un admin.
const opcionesRol: Opcion[] = [
  { value: 'operador', label: 'Operador' },
  { value: 'admin', label: 'Administrador' },
];

interface Props {
  /** Lo dispara el alta confirmada, para que el padre refresque el listado. */
  onCreado: () => void;
}

const UsuarioCrear = ({ onCreado }: Props) => {
  const { crearUsuario, responseUsuario, loadingUsuario, errorFetchUsuario } = useUsuarioApi();
  const { setModal } = useModalContext();
  const avisado = useRef<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValuesUsuarioAlta>({
    resolver: zodResolver(usuarioAdminAlta),
    defaultValues: usuarioAltaFormDefault,
  });

  // Se avisa una sola vez: el efecto se vuelve a disparar cuando el padre
  // re-renderiza con otra identidad de `onCreado`.
  useEffect(() => {
    if (!responseUsuario || avisado.current) return;
    avisado.current = true;
    onCreado();
  }, [responseUsuario, onCreado]);

  const onSubmit = (data: formValuesUsuarioAlta) => {
    crearUsuario(data);
  };

  if (responseUsuario)
    return (
      <CartelExito
        mensaje={`El usuario ---[ ${responseUsuario.nombre} ]--- fue creado con exito`}
        onCerrar={() => setModal(false)}
      />
    );

  return (
    <Formulario
      titulo="Nuevo usuario"
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Crear usuario"
      textBtnConfirmar="Crear"
      etiquetaSecundaria="Atras"
      textBtnSecundario="Atras"
      loading={loadingUsuario}
      errorFetch={errorFetchUsuario}
    >
      <Input<formValuesUsuarioAlta>
        name="nombre"
        control={control}
        label="Nombre de usuario"
        tipo="text"
        error={errors.nombre}
        esquema={usuarioAdminAlta}
      />
      <Input<formValuesUsuarioAlta>
        name="email"
        control={control}
        label="Email"
        tipo="email"
        error={errors.email}
        esquema={usuarioAdminAlta}
      />
      <Input<formValuesUsuarioAlta>
        name="password"
        control={control}
        label="Contrasena"
        tipo="password"
        error={errors.password}
        esquema={usuarioAdminAlta}
      />
      <Desplegable<formValuesUsuarioAlta>
        name="role"
        control={control}
        label="Rol"
        error={errors.role}
        esquema={usuarioAdminAlta}
        opciones={opcionesRol}
      />
    </Formulario>
  );
};

export default UsuarioCrear;
