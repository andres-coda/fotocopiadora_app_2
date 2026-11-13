import { useSelector } from 'react-redux';
import { precioAdapter } from '../../adaptadores/entrada/precio.adapter';
import { PrecioAdapterProp, PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { appStore } from '../../redux/store';
import { precioQueryParams } from '../../filtro/precio.filtro';
import { PRECIO } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';

/**
 * La carga inicial trae solo los precios de las categorias bloqueadas. El tope
 * es holgado a proposito: `datosIniciales` alimenta el lateral, el presupuesto
 * y los pedidos, y quedarse en la pagina 1 dejaria precios afuera.
 */
const limitePreciosIniciales = 100;

const usePreciosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    PrecioAdapterProp,
    PrecioProp
  >({ adapterGet: precioAdapter });

  const filtrosPrecio = useSelector((store: appStore) => store.precio.filtrosPrecio);

  const obtenerPreciosBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    const filtros = precioQueryParams(filtrosPrecio);

    fetchData({
      url: `${PRECIO}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}${filtros ? `&${filtros}` : ''}`,
      methodo: httpMethod.GET,
      adapter: precioAdapter,
    });
  };

  const obtenerPrecios = () =>
    fetchData({
      url: `${PRECIO}?bloqueado=true&limite=${limitePreciosIniciales}`,
      methodo: httpMethod.GET,
      adapter: precioAdapter,
    });

  return {
    obtenerPreciosBusqueda,
    obtenerPrecios,
    responsePrecios: response,
    loadingPrecios: loading,
    errorFetchPrecios: errorFetch,
  };
};

export default usePreciosApi;
