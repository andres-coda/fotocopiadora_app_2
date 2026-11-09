
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import PerfilEmpresa from '../../privado/paginas/perfil/componente/perfilEmpresa';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import UsuariosEmpresa from '../../componente/usuario/usuariosEmpresa';
import SedesPerfil from '../../privado/paginas/perfil/componente/sedesPerfil';

const EmpresaDetalle = () => {
  const empresaRedux = useSelector((store: appStore) => store.empresa);
  const empresaSeleccionada: EmpresaProp | undefined = empresaRedux.datoSeleccionado;


  if (!empresaSeleccionada) {
    return (
      <ContenedorCentro>
        <Texto texto="No hay empresa seleccionada" />
      </ContenedorCentro>
    );
  }

  return (
    <ContenedorCentro scroll>
      <>
        <PerfilEmpresa empresa={empresaSeleccionada} />
        <UsuariosEmpresa onAgregarUsuario={()=>{}} />

        <SedesPerfil
        />
      </>
    </ContenedorCentro>
  );
};

export default EmpresaDetalle;
