import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePedidoLibroDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarPedidoLibro = (id: string) =>
    fetchData({ url: `${PEDIDO_LIBRO}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarPedidoLibro, responsePedidoLibro: response, loadingPedidoLibro: loading, errorFetchPedidoLibro: errorFetch };

}

export default usePedidoLibroDeleteApi
