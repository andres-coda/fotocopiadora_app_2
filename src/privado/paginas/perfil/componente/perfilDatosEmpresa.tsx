import { useState } from 'react';
import Boton from '../../../../componente-estilo/boton/boton';
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
import './perfilEmpresa.css';
import Configuracion from './configuracion';

interface Props {
  empresa: EmpresaProp;
  onEditarConfiguracion: (campo: CampoConfig) => void;
  usuario: usuarioProps;
}

const PerfilDatosEmpresa = ({ empresa, onEditarConfiguracion, usuario }: Props) => {
  const [activo, setActivo] = useState<boolean>(false);

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
    </>
  );
};

export default PerfilDatosEmpresa;
