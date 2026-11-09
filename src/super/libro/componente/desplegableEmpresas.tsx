import { useSelector } from 'react-redux';
import DesplegableArrow from '../../../componente-estilo/desplegable/desplegableArrow';
import { EmpresaProp } from '../../../modelo/Entidades/empresa/empresa.interface';
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface';
import EmpresaCard from '../../empresa/componente/empresaCard';
import { appStore } from '../../../redux/store';
import useEmpresasApi from '../../../servicio/empresa/useEmpresasApi';
import useGestionPeticion from '../../../hooks/respuesta/useGestionPeticion';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';
import {
  agregarEmpresasBusquedaActual,
  crearBusquedaEmpresa,
  crearEmpresas,
  resetBusquedaEmpresa,
} from '../../../redux/state/empresa.state';
import useGestionResponse from '../../../hooks/respuesta/useGestionRespuesta';
import useFinPagina from '../../../hooks/finPagina/useFinPagina';

const DesplegableEmpresas = () => {
  const empresaRedux: ReduxProp<EmpresaProp> = useSelector((store: appStore) => store.empresa);
  const libroSelect: LibroProp | undefined = useSelector(
    (store: appStore) => store.libro.datoSeleccionado
  );

  const {
    obtenerEmpresasByLibro,
    responseEmpresa,
    errorFetchEmpresa,
    loadingEmpresa,
  } = useEmpresasApi();

  const { queryRef } = useGestionPeticion({
    query: libroSelect?.id ?? '',
    datos: empresaRedux,
    obtenerBusqueda: obtenerEmpresasByLibro,
    resetearBusqueda: resetBusquedaEmpresa,
    crearBusqueda: crearBusquedaEmpresa,
    condicion: loadingEmpresa,
  });

  useGestionResponse<EmpresaProp>({
    datos: empresaRedux,
    response: responseEmpresa,
    query: queryRef.current,
    crearDatos: crearEmpresas,
    crearBusqueda: crearBusquedaEmpresa,
    agregarBusqueda: agregarEmpresasBusquedaActual,
  });

  const { finListaRef, contenedorRef } = useFinPagina<EmpresaProp>({
    datos: empresaRedux.busquedaActual,
    loading: loadingEmpresa,
    obtenerBusqueda: obtenerEmpresasByLibro,
  });

  return (
    <DesplegableArrow
      verde
      entidad="empresas"
      loading={loadingEmpresa}
      error={errorFetchEmpresa}
      contenedorRef={contenedorRef}
      finListaRef={finListaRef}
      vacio={empresaRedux.busquedaActual.datosQuery.length === 0}
      titulo="Empresas que usan el libro"
    >
      {empresaRedux.busquedaActual.datosQuery.map(e => (
        <EmpresaCard empresa={e} key={e.id} />
      ))}
    </DesplegableArrow>
  );
};

export default DesplegableEmpresas;
