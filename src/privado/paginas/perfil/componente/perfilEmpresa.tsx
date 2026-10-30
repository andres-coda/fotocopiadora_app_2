import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import Titulo from '../../../../componente-estilo/texto/titulo';
import { EmpresaProp } from '../../../../modelo/Entidades/empresa/empresa.interface';
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import Editar from '../../../../assets/edit.svg?react';
import Boton from '../../../../componente-estilo/boton/boton';

import './perfilEmpresa.css';

interface Prop {
  empresa?: EmpresaProp;
  onEditarEmpresa?: () => void;
}
const PerfilEmpresa = ({ empresa, onEditarEmpresa }: Prop) => {
  if (!empresa || !onEditarEmpresa)
    return (
      <Card>
        <Texto texto="No existe empresa" />
      </Card>
    );

  return (
    <Card nuevoEstilo="perfil-empresa">
      <Titulo titulo={empresa.nombre} />
      <div className="empresa-renglon">
        <Email />
        <Texto texto={empresa.email} />
      </div>
      <div className="empresa-renglon">
        <Telefono />
        <Texto texto={formatoTelefonoMostrar(empresa.telefono)} />
      </div>
      <Boton
        icono={<Editar />}
        secundario
        nuevoEstilo="btn-icono-chico btn-edit-flotante"
        titulo="Editar mis datos"
        onClick={onEditarEmpresa}
      />
    </Card>
  );
};

export default PerfilEmpresa;
