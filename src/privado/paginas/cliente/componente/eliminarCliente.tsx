import { useSelector } from 'react-redux';
import useClienteDeleteApi from '../../../../servicio/cliente/useClienteDeleteApi';
import { ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
import { appStore } from '../../../../redux/store';
import { eliminarClienteRedux } from '../../../../redux/state/cliente.state';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const EliminarCliente = () => {
  const cliente: ClienteProp | undefined = useSelector(
    (store: appStore) => store.cliente.datoSeleccionado
  );
  const { eliminarCliente:eliminar, responseCliente, errorFetchCliente, loadingCliente } =
    useClienteDeleteApi();

  const clienteMostrar = cliente?.telefono
    ? formatoTelefonoMostrar(cliente.telefono)
    : (cliente?.email ?? '');

  return (
    <EliminarElemento
      articulo="el"
      entidad="cliente"
      texto={`${clienteMostrar}`}
      eliminarElemento={eliminar}
      loading={loadingCliente}
      errorFetch={errorFetchCliente}
      response={responseCliente}
      elemento={cliente}
      eliminarElementoRedux={eliminarClienteRedux}
      ruta={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_LISTA}`}
    />
  );
}
export default EliminarCliente;
