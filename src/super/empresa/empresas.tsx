import { useSelector } from 'react-redux';
import {
  agregarEmpresasBusquedaActual,
  crearBusquedaEmpresa,
  crearEmpresas,
  resetBusquedaEmpresa,
} from '../../redux/state/empresa.state';
import { appStore } from '../../redux/store';
import { useState } from 'react';
import useEmpresasApi from '../../servicio/empresa/useEmpresasApi';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';
import useBusquedaPaginada from '../../hooks/buscador/useBusquedaPaginada';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import BuscadorPaginadoCompleto from '../../componente/buscador/buscadorPaginadoCompleto';
import Centro from '../../componente-estilo/centro/centro';
import EmpresaCard from './componente/empresaCard';
import { RutasSupers } from '../ruta/rutaSupers';
import { ReduxProp } from '../../redux/modelo/reduxContext.interface';
import { rutaBase } from '../../privado/rutas/rutasPrivadas';

const Empresas = () => {
  const empresaRedux: ReduxProp<EmpresaProp> = useSelector((store: appStore) => store.empresa);

  const [valor, setValor] = useState<string>('');
  const { obtenerEmpresaBusqueda, responseEmpresa, errorFetchEmpresa, loadingEmpresa } =
    useEmpresasApi();
  const { eliminarEmpresa } = useEmpresaApi();

  const { contenedorRef, finListaRef, nuevoElemento } = useBusquedaPaginada<EmpresaProp>({
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

  const handleEliminar = (id: string) => {
    if (window.confirm('¿Eliminar esta empresa?')) {
      eliminarEmpresa(id);
    }
  };

  return (
    <Centro
      ref={contenedorRef}
      finListaRef={finListaRef}
      vacio={
        empresaRedux.cargaInicial &&
        (!empresaRedux.busquedaActual.datosQuery ||
          empresaRedux.busquedaActual.datosQuery.length === 0)
      }
      entidad="empresas"
      query={valor}
      error={errorFetchEmpresa ?? undefined}
      loading={loadingEmpresa}
      texto='Empresas'
      buscador={
        <BuscadorPaginadoCompleto
          ref={contenedorRef}
          texto="Buscar empresa"
          valor={valor}
          setValor={setValor}
          etiquetaArriba="Al comienzo de la lista"
          etiquetaMas="Nueva empresa"
          handleMas={() => nuevoElemento(`/${rutaBase.SUPER}/${RutasSupers.EMPRESA_CREAR}`)}
        />
      }
    >
      {empresaRedux.busquedaActual.datosQuery.map(empresa => (
        <EmpresaCard
          empresa={empresa}
          key={empresa.id}
          onEliminar={() => handleEliminar(empresa.id)}
        />
      ))}
    </Centro>
  );
};

export default Empresas;
