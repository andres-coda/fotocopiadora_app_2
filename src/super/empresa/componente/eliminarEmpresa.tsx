import { useSelector } from 'react-redux';
import { EmpresaProp } from '../../../modelo/Entidades/empresa/empresa.interface';
import { appStore } from '../../../redux/store';
import { eliminarEmpresaRedux } from '../../../redux/state/empresa.state';
import EliminarElemento from '../../../componente-estilo/eliminar/eliminarElemento';
import useEmpresaDeleteApi from '../../../servicio/empresa/useEmpresaDeleteApi';

const tituloEliminarEmpresa = 'Eliminar empres';

const volantaEliminarEmpresa = (empresa: string | undefined): string | undefined => {
  if (!empresa || empresa === '') return undefined;
  return `¿Desea confirmar la eliminación de la empresa ---[ ${empresa} ]--- ?`;
};

const textoEliminarEmpresa = (empresa: string | undefined): string | undefined => {
  if (!empresa || empresa === '') return undefined;
  return `Al eliminar la empresa ---[ ${empresa} ]--- también se borraran sus usuarios, sus pedidos, sus clientes, sus precios, y sus datos referidos`;
};

const msjExitoEliminarEmpresa = (empresa: string | undefined): string | undefined => {
  if (!empresa || empresa === '') return undefined;
  return `La empresa ---[ ${empresa} ]--- fue eliminada con exito`;
};

const EliminarEmpresa = () => {
  const empresa: EmpresaProp | undefined = useSelector(
    (store: appStore) => store.empresa.datoSeleccionado
  );

  const { eliminarEmpresa, responseEmpresa, errorFetchEmpresa, loadingEmpresa } =
    useEmpresaDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarEmpresa}
      volanta={volantaEliminarEmpresa(empresa?.nombre)}
      entidad="empresa"
      texto={textoEliminarEmpresa(empresa?.nombre)}
      msjExito={msjExitoEliminarEmpresa(empresa?.nombre)}
      eliminarElemento={eliminarEmpresa}
      loading={loadingEmpresa}
      errorFetch={errorFetchEmpresa}
      response={responseEmpresa}
      elemento={empresa}
      eliminarElementoRedux={eliminarEmpresaRedux}
    />
  );
};

export default EliminarEmpresa;
