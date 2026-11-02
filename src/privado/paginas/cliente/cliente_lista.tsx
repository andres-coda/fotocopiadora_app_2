import { useDispatch, useSelector } from 'react-redux';
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface';
import { ClienteProp } from '../../../modelo/Entidades/cliente/cliente.interface';
import { appStore } from '../../../redux/store';
import useBusquedaPaginada from '../../../hooks/buscador/useBusquedaPaginada';
import useClientesApi from '../../../servicio/cliente/useClientesApi';
import {
  agregarClientesBusquedaActual,
  crearBusquedaCliente,
  resetBusquedaCliente,
  resetSeleccionarCliente,
} from '../../../redux/state/cliente.state';
import Centro from '../../../componente-estilo/centro/centro';
import ClienteCard from './componente/clienteCard';
import { useEffect, useState } from 'react';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import Modal from '../../../componente/modal/modal';
import ClienteCargar from './cargar/clienteCargar';
import { useModalContext } from '../../../contexto/contextoModal';

const Cliente_lista = () => {
  const clienteDatos: ReduxProp<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const { obtenerClientesBusqueda, responseClientes, loadingClientes } = useClientesApi();
  const [valor, setValor] = useState<string>('');
  const { modal } = useModalContext();
  const dispatch = useDispatch();

  const { contenedorRef, finListaRef, nuevoElemento } = useBusquedaPaginada<ClienteProp>({
    valor,
    datosRedux: clienteDatos,
    resetBusqueda: resetBusquedaCliente,
    crearBusqueda: crearBusquedaCliente,
    obtenerBusqueda: obtenerClientesBusqueda,
    agregarBusqueda: agregarClientesBusquedaActual,
    response: responseClientes,
    loading: loadingClientes,
    limiteLetrasBusqueda: 4,
  });

  useEffect(() => {
    if (!modal) dispatch(resetSeleccionarCliente());
  }, [modal]);

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar cliente"
        handleMas={() => {
          dispatch(resetSeleccionarCliente());
          nuevoElemento();
        }}
        valor={valor}
        setValor={setValor}
        titulo="Lista de clientes"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas={'Nuevo cliente'}
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={!clienteDatos.busquedaActual || clienteDatos.busquedaActual.datosQuery.length === 0}
        entidad="clientes"
        query={valor}
      >
        {clienteDatos.busquedaActual.datosQuery.map(d => (
          <ClienteCard cliente={d} key={d.id} />
        ))}
      </Centro>
      <Modal>
        <ClienteCargar />
      </Modal>
    </>
  );
};

export default Cliente_lista;
