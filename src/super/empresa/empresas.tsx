import { useSelector } from 'react-redux';
import {
  agregarEmpresasBusquedaActual,
  crearBusquedaEmpresa,
  crearEmpresas,
  EmpresaStateProp,
  resetBusquedaEmpresa,
} from '../../redux/state/empresa.state';
import { appStore } from '../../redux/store';
import { useState } from 'react';
import useEmpresasApi from '../../servicio/empresa/useEmpresasApi';
import useBusquedaPaginada from '../../hooks/buscador/useBusquedaPaginada';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import BuscadorPaginadoCompleto from '../../componente/buscador/buscadorPaginadoCompleto';
import Centro from '../../componente-estilo/centro/centro';
import EmpresaCard from './componente/empresaCard';

const Empresas = () => {
  const empresaRedux: EmpresaStateProp = useSelector((store: appStore) => store.empresa);

  const [valor, setValor] = useState<string>('');
  const { obtenerEmpresaBusqueda, responseEmpresa, errorFetchEmpresa, loadingEmpresa } =
    useEmpresasApi();

  const { contenedorRef, nuevoElemento, finListaRef } = useBusquedaPaginada<EmpresaProp>({
    valor,
    datosRedux: empresaRedux,
    crearBusquedaInicial: crearEmpresas,
    resetBusqueda: resetBusquedaEmpresa,
    crearBusqueda: crearBusquedaEmpresa,
    obtenerBusqueda: obtenerEmpresaBusqueda,
    agregarBusqueda: agregarEmpresasBusquedaActual,
    response: responseEmpresa,
    loading: loadingEmpresa,
  });

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar empresa"
        valor={valor}
        setValor={setValor}
        titulo="Empresas"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas="Nueva empresa"
        handleMas={() => nuevoElemento()}
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={
          (!empresaRedux.cargaInicial && !empresaRedux.busquedaActual.datosQuery) ||
          (!empresaRedux.cargaInicial && empresaRedux.busquedaActual.datosQuery.length === 0)
        }
        entidad="empresas"
        query={valor}
        error={errorFetchEmpresa ?? undefined}
        loading={loadingEmpresa}
      >
        {empresaRedux.busquedaActual.datosQuery.map(empresa => (
          <EmpresaCard empresa={empresa} key={empresa.id} />
        ))}
      </Centro>
    </>
  );
};

export default Empresas;
