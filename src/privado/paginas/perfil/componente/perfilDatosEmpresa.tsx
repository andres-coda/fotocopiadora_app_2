import { useState } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Texto from '../../../../componente-estilo/texto/texto';
import Titulo from '../../../../componente-estilo/texto/titulo';
import { EmpresaProp } from '../../../../modelo/Entidades/empresa/empresa.interface';
import { CampoConfig } from '../../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Arrow from '../../../../assets/arrow.svg?react';
import Editar from '../../../../assets/edit.svg?react';
import Mas from '../../../../assets/mas.svg?react';
import './perfilEmpresa.css';
import Configuracion from './configuracion';
import UsuariosEmpresa from './usuariosEmpresa';

interface Props {
  empresa: EmpresaProp;
  onEditarConfiguracion: (campo: CampoConfig) => void;
  /** Abre el modal de "Mis datos". */
  onEditarPerfil: () => void;
  /** Abre el modal de alta de usuario. Solo lo pasa un admin. */
  onAgregarUsuario?: () => void;
  /** Sube cuando se crea un usuario: refresca el listado. */
  usuariosVersion?: number;
  usuario: usuarioProps;
}

const PerfilDatosEmpresa = ({
  empresa,
  onEditarConfiguracion,
  onEditarPerfil,
  onAgregarUsuario,
  usuariosVersion = 0,
  usuario,
}: Props) => {
  const [activo, setActivo] = useState<boolean>(false);
  const [activoUsuarios, setActivoUsuarios] = useState<boolean>(false);

  // El ABM de usuarios es solo para admin: el back lo exige con AdminGuard y el
  // RLS rechaza cualquier alta fuera de la propia empresa.
  const esAdmin = usuario.role === 'admin' || usuario.role === 'super_admin';

  return (
    <>
      <Titulo titulo={empresa.nombre} />
      <div className="empresa-renglon">
        <Email />
        <Texto texto={empresa.email} />
      </div>
      <div className="empresa-renglon">
        <Telefono />
        <Texto texto={formatoTelefonoMostrar(empresa.telefono)} />
      </div>

      <div className="configuracion-campo">
        <Texto texto="Sesión actual" mediana negrita />
        <Boton
          icono={<Editar />}
          terciario
          nuevoEstilo="btn-icono-chico"
          titulo="Editar mis datos"
          onClick={onEditarPerfil}
        />
      </div>
      <div className="empresa-renglon">
        <Monigote />
        <Texto texto={usuario.nombre} />
      </div>
      {/* /auth/profile devuelve el payload del JWT, que no incluye el email: se
          muestra solo cuando esta disponible y el formulario lo trae de
          GET /user/:id. */}
      {usuario.email && (
        <div className="empresa-renglon">
          <Email />
          <Texto texto={usuario.email} />
        </div>
      )}

      <div className={`renglon-desplegable ${activo ? 'renglon-desplegable-activo' : ''}`}>
        <Texto texto="Configuraciones" mediana negrita />
        <Boton
          cerrar
          nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
          onClick={() => setActivo(prev => !prev)}
          icono={<Arrow />}
        />
        {activo && (
          <Configuracion
            configuracion={empresa.configuracion}
            onEditarCampo={onEditarConfiguracion}
          />
        )}
      </div>

      {esAdmin && (
        <div
          className={`renglon-desplegable ${activoUsuarios ? 'renglon-desplegable-activo' : ''}`}
        >
          <div className="configuracion-campo">
            <Texto texto="Usuarios de la empresa" mediana negrita />
            <Botonera nuevoEstilo="empresa-configuracion__acciones">
              {onAgregarUsuario && (
                <Boton
                  icono={<Mas />}
                  terciario
                  nuevoEstilo="btn-icono-chico"
                  titulo="Agregar usuario"
                  onClick={onAgregarUsuario}
                />
              )}
              <Boton
                cerrar
                nuevoEstilo={`btn-icono-chico ${activoUsuarios ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
                onClick={() => setActivoUsuarios(prev => !prev)}
                icono={<Arrow />}
              />
            </Botonera>
          </div>
          {activoUsuarios && <UsuariosEmpresa version={usuariosVersion} />}
        </div>
      )}
    </>
  );
};

export default PerfilDatosEmpresa;
