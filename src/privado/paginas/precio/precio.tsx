import { useDispatch, useSelector } from 'react-redux';
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface';
import { PrecioProp } from '../../../modelo/Entidades/precio/precio.interface';
import { appStore } from '../../../redux/store';
import Centro from '../../../componente-estilo/centro/centro';
import PrecioCard from './componente/precioCard';
import { useEffect, useState } from 'react';
import usePreciosApi from '../../../servicio/precio/usePreciosApi';
import useBusquedaPaginada from '../../../hooks/buscador/useBusquedaPaginada';
import {
  agregarPreciosBusquedaActual,
  crearBusquedaPrecio,
  resetBusquedaPrecio,
  resetSeleccionarPrecio,
} from '../../../redux/state/precio.state';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import Modal from '../../../componente/modal/modal';
import PrecioCargar from './cargar/precioCargar';
import { useModalContext } from '../../../contexto/contextoModal';
import EliminarPrecio from './componente/eliminarPrecio';
import FiltroPrecio from './componente/filtroPrecio';
import FiltrosActivosPrecio from './componente/filtrosActivosPrecio';
import { hayFiltrosPrecio, precioQueryParams } from '../../../filtro/precio.filtro';

const Precios = () => {
  const precioDatos: ReduxProp<PrecioProp> = useSelector((store: appStore) => store.precio);
  const filtros = useSelector((store: appStore) => store.precio.filtrosPrecio);
  const { obtenerPreciosBusqueda, responsePrecios, loadingPrecios, errorFetchPrecios } =
    usePreciosApi();
  const [valor, setValor] = useState<string>('');
  const { modal, setModal } = useModalContext();
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Igual que en pedidos: con filtros vigentes la clave cambia y la busqueda se
  // repite aunque el texto sea el mismo o este vacio.
  const claveBusqueda = hayFiltrosPrecio(filtros) ? precioQueryParams(filtros) : undefined;

  const { contenedorRef, nuevoElemento, finListaRef } = useBusquedaPaginada<PrecioProp>({
    valor,
    datosRedux: precioDatos,
    resetBusqueda: resetBusquedaPrecio,
    crearBusqueda: crearBusquedaPrecio,
    obtenerBusqueda: obtenerPreciosBusqueda,
    agregarBusqueda: agregarPreciosBusquedaActual,
    response: responsePrecios,
    loading: loadingPrecios,
    claveBusqueda,
  });

  useEffect(() => {
    if (!modal) {
      setEliminar(false);
      setFiltro(false);
      dispatch(resetSeleccionarPrecio());
    }
  }, [modal]);

  const handleFiltro = () => {
    setFiltro(true);
    setEliminar(false);
    setModal(true);
  };

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar precio"
        handleMas={() => nuevoElemento()}
        handleFiltro={handleFiltro}
        valor={valor}
        setValor={setValor}
        titulo="Lista de precios"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas="Nuevo precio"
      />
      <FiltrosActivosPrecio />
      <Centro
        ref={contenedorRef}
        entidad="precios"
        vacio={
          !precioDatos.busquedaActual.datosQuery ||
          precioDatos.busquedaActual.datosQuery.length === 0
        }
        query={valor}
        finListaRef={finListaRef}
        error={errorFetchPrecios}
        loading={loadingPrecios}
      >
        {precioDatos.busquedaActual.datosQuery.map(d => (
          <PrecioCard precio={d} key={d.id} setEliminar={setEliminar} />
        ))}
      </Centro>
      <Modal texto={filtro ? 'Filtros' : undefined}>
        {filtro ? <FiltroPrecio /> : eliminar ? <EliminarPrecio /> : <PrecioCargar />}
      </Modal>
    </>
  );
};

export default Precios;
