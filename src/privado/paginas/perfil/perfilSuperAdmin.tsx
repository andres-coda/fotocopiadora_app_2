import Texto from '../../../componente-estilo/texto/texto';
import CardPerfil from './componente/cardPerfil';
import DesplegableArrow from '../../../componente-estilo/desplegable/desplegableArrow';
import { usuarioProps } from '../../../modelo/usuario/Usuario.interface';
import { useSelector } from 'react-redux';
import { EmpresaStateProp } from '../../../redux/state/empresa.state';
import { appStore } from '../../../redux/store';
import useEmpresasApi from '../../../servicio/empresa/useEmpresasApi';

interface Prop {
  usuario: usuarioProps;
}

const perfilSuperAdmin = ({ usuario }: Prop) => {
  const empresaRedux:EmpresaStateProp = useSelector(
    (store: appStore) => store.empresa
  );

  const { obtenerEmpresaBusqueda, responseEmpresa, errorFetchEmpresa, loadingEmpresa } =
    useEmpresasApi();


  return (
    <>
      <Texto texto="Sesión actual" mediana negrita />
      <CardPerfil usuario={usuario} onEditarPerfil={abrirPerfil} />
      <DesplegableArrow titulo="Listas de trabajadores" verde>
        <UsuariosEmpresa onAgregarUsuario={abrirUsuario} onEliminarUsuario={setEliminarUsuario} />
      </DesplegableArrow>
    </>
  );
};

export default perfilSuperAdmin;
