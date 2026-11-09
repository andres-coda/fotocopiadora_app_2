import Eliminar from '../../assets/deleted.svg?react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { RolUsuario, usuarioProps } from '../../modelo/usuario/Usuario.interface';
import Card from '../../componente-estilo/card/card';
import Texto from '../../componente-estilo/texto/texto';
import Boton from '../../componente-estilo/boton/boton';
import { actualizarUsuarioRedux, seleccionarUsuario } from '../../redux/state/usuarios.state';
import Desplegable from '../formulario/desplegable';
import { useForm } from 'react-hook-form';
import {
  formValuesRole,
  roleEditarFormEdit,
  roleEsquema,
} from '../../modelo/usuario/esqUsuario.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Opcion } from '../formulario/modelo/input.interface';
import useUsuarioApi from '../../servicio/usuario/useUsuarioApi';
import './estilos/cardUsuario.css';
import Formulario from '../formulario/formulario';
import Botonera from '../../componente-estilo/botonera/botonera';

const etiquetaRol = (rol: RolUsuario): string => {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'super_admin') return 'Administrador general';
  return 'Operador';
};

const rolesDesplegables: Opcion[] = [
  { value: 'admin', label: etiquetaRol('admin') },
  { value: 'operador', label: etiquetaRol('operador') },
];

interface Prop {
  usuario: usuarioProps;
  onEliminarUsuario?: Dispatch<SetStateAction<boolean>>;
  onCambiarRol?: boolean;
}

const CardUsuario = ({ usuario, onEliminarUsuario, onCambiarRol = false }: Prop) => {
  const dispatch = useDispatch();

  const { cambiarRol, responseUsuario, errorFetchUsuario, loadingUsuario } = useUsuarioApi();
  const rolAnterior = useRef(usuario.role);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm<formValuesRole>({
    resolver: zodResolver(roleEsquema),
    defaultValues: roleEditarFormEdit(usuario),
  });

  useEffect(() => {
    if (rolAnterior.current != usuario.role) {
      rolAnterior.current = usuario.role;
      return;
    }
    if (rolAnterior.current === watch().role) return;
    cambiarRol(usuario.id, watch().role);
  }, [watch().role, usuario.role]);

  useEffect(() => {
    if (responseUsuario) dispatch(actualizarUsuarioRedux(responseUsuario));
  }, [responseUsuario]);

  return (
    <Card nuevoEstilo="card-usuario" retirado notaMargenSup={etiquetaRol(usuario.role)}>
      <div className="card-vertical">
        <Texto texto={usuario.nombre} negrita inline />
        <Texto texto={usuario.email || 'Sin email'} chica />
      </div>
        {(onCambiarRol || onEliminarUsuario) && (
          <Botonera flotante abajo ajustada nuevoEstilo='botonera-card-usuario'>
            {onCambiarRol && <Formulario simple>
              <Desplegable<formValuesRole>
                name="role"
                control={control}
                label="Seleccione rol"
                error={errors.role}
                esquema={roleEsquema}
                alingDerecha
                opciones={rolesDesplegables}
                loading={loadingUsuario}
                chico
              />
              {errorFetchUsuario && <Texto texto={errorFetchUsuario} error />}
            </Formulario>}
            {onEliminarUsuario && (
              <Boton
                edit
                iconoChico
                onClick={() => {
                  (onEliminarUsuario(true), dispatch(seleccionarUsuario(usuario)));
                }}
                icono={<Eliminar />}
              />
            )}
          </Botonera>
        )}
    </Card>
  );
};

export default CardUsuario;
