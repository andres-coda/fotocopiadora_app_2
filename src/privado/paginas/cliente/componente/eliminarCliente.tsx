import useClienteDeleteApi from '../../../../servicio/cliente/useClienteDeleteApi';
import { ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
import { eliminarClienteRedux } from '../../../../redux/state/cliente.state';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const tituloEliminarCliente = 'Eliminar cliente';

const volantaEliminarCliente = (cliente:string | undefined):string| undefined => {
  if(!cliente || cliente === '') return undefined;
  return `¿Desea confirmar la eliminación del cliente ---[ ${cliente} ]--- ?`
}

const textoEliminarCliente = (cliente:string | undefined):string| undefined => {
  if(!cliente || cliente === '') return undefined;
  return `Al eliminar el cliente ---[ ${cliente} ]--- también se eliminaran todos sus pedidos.`
}

const msjExitoEliminarCliente = (cliente:string | undefined):string| undefined => {
  if(!cliente || cliente === '') return undefined;
  return `El cliente ---[ ${cliente} ]--- fue eliminado con exito.`
}

interface Prop{
  cliente?:ClienteProp;
}

const EliminarCliente = ({cliente}:Prop) => {
  const { eliminarCliente:eliminar, responseCliente, errorFetchCliente, loadingCliente } =
    useClienteDeleteApi();

  const clienteMostrar = cliente?.telefono
    ? formatoTelefonoMostrar(cliente.telefono)
    : (cliente?.email ?? '');

  return (
    <EliminarElemento
      titulo={tituloEliminarCliente}
      volanta={volantaEliminarCliente(clienteMostrar)}
      entidad="cliente"
      texto={textoEliminarCliente(clienteMostrar)}
      msjExito={msjExitoEliminarCliente(clienteMostrar)}
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
