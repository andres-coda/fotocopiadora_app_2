import { useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { ClienteProp } from "../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../redux/store";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import useClientesApi from "../../../servicio/cliente/useClientesApi";
import { crearBusquedaCliente, resetBusquedaCliente } from "../../../redux/state/cliente.state";
import Centro from "../../../componente-estilo/centro/centro";
import InputBuscar from "../../../componente/formulario/inputBuscar";
import TextoVacio from "../../../componente/Textos/textoVacio";
import ClienteCard from "./componente/clienteCard";
import { useState } from "react";

const Cliente_lista = () => {
  const clienteDatos: ReduxProp<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const { obtenerClientesBusqueda, responseClientes } = useClientesApi()
  const [valor, setValor] = useState<string>('');

  const { } = useBusquedaPaginada<ClienteProp>({
    valor,
    datosRedux: clienteDatos,
    resetBusqueda: resetBusquedaCliente,
    crearBusqueda: crearBusquedaCliente,
    obtenerBusqueda: obtenerClientesBusqueda,
    response: responseClientes,
    limiteLetrasBusqueda: 4,
  });

  return (
    <Centro>
      <InputBuscar
        name='buscar'
        texto='Buscar cliente'
        valor={valor}
        setValor={setValor}
      />
      {
        !clienteDatos.busquedaActual || clienteDatos.busquedaActual.datosQuery.length === 0
          ? (<TextoVacio entidad='clientes' />)
          : clienteDatos.busquedaActual.datosQuery.map(d => <ClienteCard cliente={d} key={d.id} />)
      }
    </Centro>
  )
}

export default Cliente_lista