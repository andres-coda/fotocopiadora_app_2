import { useSelector } from 'react-redux';
import usePrecioDeleteApi from '../../../../servicio/precio/usePrecioDeleteApi';
import { PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import { appStore } from '../../../../redux/store';
import { eliminarPrecioRedux } from '../../../../redux/state/precio.state';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const tituloEliminarPrecio = 'Eliminar precio';

const volantaEliminarPrecio = (precio: PrecioProp | undefined): string | undefined => {
  if (!precio) return undefined;
  return `¿Desea confirmar la eliminación del precio ---[ ${precio.nombre} - $${precio.importe} ]--- ?`;
};

const textoEliminarPrecio = (precio: PrecioProp | undefined): string | undefined => {
  if (!precio) return undefined;
  return `Al eliminar el precio ---[ ${precio.nombre} - $${precio.importe} ]--- también se borrara de la lista de favoritos de los trabajadores que así lo tengan.`;
};

const msjExitoEliminarPrecio = (precio: PrecioProp | undefined): string | undefined => {
  if (!precio) return undefined;
  return `El precio ---[ ${precio.nombre} - $${precio.importe} ]--- fue eliminado con exito`;
};

const EliminarPrecio = () => {
  const precio: PrecioProp | undefined = useSelector(
    (store: appStore) => store.precio.datoSeleccionado
  );
  const { eliminarPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } = usePrecioDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarPrecio}
      volanta={volantaEliminarPrecio(precio)}
      entidad="precio"
      texto={textoEliminarPrecio(precio)}
      msjExito={msjExitoEliminarPrecio(precio)}
      eliminarElemento={eliminarPrecio}
      loading={loadingPrecio}
      errorFetch={errorFetchPrecio}
      response={responsePrecio}
      elemento={precio}
      eliminarElementoRedux={eliminarPrecioRedux}
    />
  );
};

export default EliminarPrecio;
