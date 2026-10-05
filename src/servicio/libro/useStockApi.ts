import { stockIndividualAdapter } from "../../adaptadores/entrada/stock.adapter";
import { formValuesLibroStock } from "../../modelo/Entidades/libro/esqStock.esquema";
import { stockIndividualProp } from "../../modelo/Entidades/libro/stock.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO_STOCK } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

export interface EditarStockProp {
  data: formValuesLibroStock;
  id: string;
}

const useStockApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<stockIndividualProp | undefined>({});

  const editarStockLibro = ({ data, id }: EditarStockProp) =>
    fetchData({ url: `${LIBRO_STOCK}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify({ stock: Number(data.stock ?? 0) ?? 0 }), adapter: stockIndividualAdapter});

  return { editarStockLibro, responseStock: response, loadingStock: loading, errorFetchStock: errorFetch };

}

export default useStockApi