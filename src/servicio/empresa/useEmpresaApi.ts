import { empresaAdapter } from '../../adaptadores/entrada/empresa.adapter';
import { empresaDtoAdapter } from '../../adaptadores/salida/empresaDto.adapter';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import { formValuesEmpresa } from '../../modelo/Entidades/empresa/esqEmpresa.esquema';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { EMPRESA, EMPRESA_MIA } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useEmpresaApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<EmpresaProp | undefined>({});

  const obtenerEmpresaById = (id: string) =>
    fetchData({ url: `${EMPRESA}/${id}`, methodo: httpMethod.GET, adapter: empresaAdapter });

  const editarEmpresa = (data: formValuesEmpresa, id: string) =>
    fetchData({
      url: `${EMPRESA}/${id}`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(empresaDtoAdapter(data)),
      adapter: empresaAdapter,
    });

  const obtenerEmpresaMia = () =>
    fetchData({ url: EMPRESA_MIA, methodo: httpMethod.GET, adapter: empresaAdapter });

  return {
    obtenerEmpresaById,
    obtenerEmpresaMia,
    editarEmpresa,
    responseEmpresa: response,
    loadingEmpresa: loading,
    errorFetchEmpresa: errorFetch,
  };
};

export default useEmpresaApi;
