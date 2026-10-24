import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import Titulo from '../../../../componente-estilo/texto/titulo';
import { EmpresaProp } from '../../../../modelo/Entidades/empresa/empresa.interface';
import { CampoConfig } from '../../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import { resetSesion } from '../../../../redux/state/sesion.state';
import { rutaPublica } from '../../../../publico/rutas/rutasPublicas';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import Editar from '../../../../assets/edit.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Arrow from '../../../../assets/arrow.svg?react';
import './perfilEmpresa.css';
import Configuracion from './configuracion';

interface Props {
  empresa: EmpresaProp;
  onEditar: () => void;
  onEditarConfiguracion: (campo: CampoConfig) => void;
  usuario: usuarioProps;
}

// formatoTelefonoMostrar exige al menos 10 digitos; si no aplica, se muestra crudo.
const telefonoMostrar = (telefono: string): string => {
  try {
    return formatoTelefonoMostrar(telefono);
  } catch {
    return telefono;
  }
};

const PerfilDatosEmpresa = ({ empresa, onEditar, onEditarConfiguracion, usuario }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activo, setActivo] = useState<boolean>(false);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    dispatch(resetSesion());
    // Al salir de /privado/* el guard se desmonta; al volver a entrar
    // se remonta y vuelve a leer el token (ya nulo) -> redirige al login.
    navigate(`/${rutaPublica.LOGIN}`);
  };

  return (
    <Card nuevoEstilo="empresa-dato">
      <Titulo titulo={empresa.nombre} />
      <div className="empresa-renglon">
        <Email />
        <Texto texto={empresa.email} />
      </div>
      <div className="empresa-renglon">
        <Telefono />
        <Texto texto={telefonoMostrar(empresa.telefono)} />
      </div>
      <Texto texto="Sesión actual" negrita />
      <div className="empresa-renglon">
        <Monigote />
        <Texto texto={usuario.nombre} />
      </div>
      <div className="empresa-renglon">
        <Email />
        <Texto texto={usuario.email} />
      </div>
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
      <Botonera nuevoEstilo="empresa-botonera">
        <Boton secundario onClick={cerrarSesion} texto="Cerrar sesión" />
        <Boton
          secundario
          nuevoEstilo="btn-icono-chico"
          onClick={onEditar}
          icono={<Editar />}
          titulo="Editar empresa"
        />
      </Botonera>
    </Card>
  );
};

export default PerfilDatosEmpresa;
