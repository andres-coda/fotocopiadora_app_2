import { useSelector } from 'react-redux';
import usePrecioDeleteApi from '../../../../servicio/precio/usePrecioDeleteApi';
import { PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import { appStore } from '../../../../redux/store';
import { eliminarPrecioRedux } from '../../../../redux/state/precio.state';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const EliminarPrecio = () => {
  const precio: PrecioProp | undefined = useSelector(
    (store: appStore) => store.precio.datoSeleccionado
  );
  const { eliminarPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } = usePrecioDeleteApi();

  return (
    <EliminarElemento
      articulo="el"
      entidad="precio"
      texto={`${precio?.nombre} - $ ${precio?.importe}`}
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
