import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import Texto from '../../componente-estilo/texto/texto';
import CardPerfil from '../../privado/paginas/perfil/componente/cardPerfil';
import { useModalContext } from '../../contexto/contextoModal';
import Modal from '../../componente/modal/modal';
import PerfilEditar from '../../privado/paginas/perfil/cargar/perfilEditar';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';

const PerfilSuper = () => {
  const usuarioSesion = useSelector((store: appStore) => store.sesion);
  const { setModal } = useModalContext();

  return (
    <ContenedorCentro loading={usuarioSesion.loading} error={usuarioSesion.error}>
      {usuarioSesion.dato && (
        <>
          <Texto texto="Sesión actual" mediana negrita />
          <CardPerfil
            usuario={usuarioSesion.dato}
            onEditarPerfil={() => setModal(prev => prev)}
          />
        </>
      )}
      <Modal>
        <PerfilEditar />
      </Modal>
    </ContenedorCentro>
  );
};

export default PerfilSuper;
