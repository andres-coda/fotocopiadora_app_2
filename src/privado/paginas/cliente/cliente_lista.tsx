import { useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { ClienteProp } from "../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../redux/store";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import useClientesApi from "../../../servicio/cliente/useClientesApi";
import { agregarClientesBusquedaActual, crearBusquedaCliente, resetBusquedaCliente } from "../../../redux/state/cliente.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import ClienteCard from "./componente/clienteCard";
import { useState } from "react";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";

const Cliente_lista = () => {
  const clienteDatos: ReduxProp<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const { obtenerClientesBusqueda, responseClientes, loadingClientes } = useClientesApi()
  const [valor, setValor] = useState<string>('');

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

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar libro'
        handleMas={()=>nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        titulo='Lista de clientes'
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas={'Nuevo cliente'}
      />
      <Centro>
        {
          !clienteDatos.busquedaActual || clienteDatos.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='clientes' />)
            : clienteDatos.busquedaActual.datosQuery.map(d => <ClienteCard cliente={d} key={d.id} />)
        }
        <div  ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
      </Centro>
    </>
  )
}

export default Cliente_lista