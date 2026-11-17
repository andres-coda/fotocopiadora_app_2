import { Control, FieldErrors, UseFormReset, UseFormWatch } from 'react-hook-form';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import DesplegablePredictivo from '../../../../componente-estilo/predictivo/desplegablePredictivo';
import Switch from '../../../../componente-estilo/switch/switch';
import Input from '../../../../componente/formulario/input';
import { formValuesPedido, pedido } from '../../../../modelo/Entidades/pedido/esqPedido.esquema';
import ClienteDatos from '../../cliente/componente/clienteDatos';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { formatTelefono, parseTelefono } from '../../../../utils/formulario';
import {
  ClienteProp,
} from '../../../../modelo/Entidades/cliente/cliente.interface';
import useClientesApi from '../../../../servicio/cliente/useClientesApi';
import useBusquedaSimple from '../../../../hooks/buscador/useBuscadorSimple';

const limiteBusquedaCliente = 4;

type CampoCliente = 'nombre' | 'telefono' | 'email';

interface Prop {
  control: Control<formValuesPedido>;
  errors: FieldErrors<formValuesPedido>;
  watch: UseFormWatch<formValuesPedido>;
  reset: UseFormReset<formValuesPedido>;
  enviarWatsapp?: boolean;
  valorBusquedaCliente:string;
  setClienteSeleccionado: Dispatch<SetStateAction<ClienteProp | undefined>>;
  setCampoCliente: Dispatch<SetStateAction<CampoCliente | undefined>>;
  setEnviarWappManual: Dispatch<SetStateAction<boolean>>;
  enviarWappManual:boolean;
  setError: Dispatch<SetStateAction<string>>
}

const PedidoClienteCargar = ({
  control,
  errors,
  watch,
  reset,
  valorBusquedaCliente,
  setClienteSeleccionado,
  setCampoCliente,
  setEnviarWappManual,
  enviarWappManual,
  setError
}: Prop) => {
  const { obtenerClientesBusqueda, responseClientes, loadingClientes, errorFetchClientes } =
    useClientesApi();

  const {
    finListaRef: finClientes,
    datos: clientes,
    setDatos: setClientes,
  } = useBusquedaSimple<ClienteProp>({
    // Antes se priorizaba el telefono, que nunca esta vacio: corregir el nombre
    // de un cliente ya elegido disparaba una busqueda por el telefono viejo y
    // el desplegable se abria con resultados ajenos a lo que se estaba
    // tipeando. Un click ahi revertia la edicion.
    valor: valorBusquedaCliente,
    response: responseClientes,
    loading: loadingClientes,
    limiteLetrasBusqueda: limiteBusquedaCliente,
    obtenerBusqueda: obtenerClientesBusqueda,
  });

  const handleSelectCliente = (cl: ClienteProp) => {
    setClientes(undefined);
    reset({
      ...watch(),
      nombre: cl.nombre,
      telefono: cl.telefono,
      email: cl.email,
    });
    setClienteSeleccionado(cl);
  };

  useEffect(()=>{
    if(errorFetchClientes){
      setError(errorFetchClientes)
    }
  },[errorFetchClientes]);
  
  return (
    <>
      <div className="form-horizontal pedido-cliente">
        <Input<formValuesPedido>
          name="nombre"
          control={control}
          label="Nombre"
          tipo="text"
          error={errors.nombre}
          esquema={pedido}
          onFocus={() => setCampoCliente('nombre')}
          onBlur={() => setCampoCliente(undefined)}
        />
        <Input<formValuesPedido>
          name="telefono"
          control={control}
          label="Telefono"
          tipo="text"
          error={errors.telefono}
          esquema={pedido}
          formatValue={v => formatTelefono(v)}
          parseValue={v => parseTelefono(v)}
          onFocus={() => setCampoCliente('telefono')}
          onBlur={() => setCampoCliente(undefined)}
        />
        <Input<formValuesPedido>
          name="email"
          control={control}
          label="Email"
          tipo="text"
          error={errors.email}
          esquema={pedido}
          onFocus={() => setCampoCliente('email')}
          onBlur={() => setCampoCliente(undefined)}
        />
      </div>
      {clientes && clientes.datosQuery.length > 0 && (
        <DesplegablePredictivo
          finListaRef={finClientes}
          error={errorFetchClientes}
          loading={loadingClientes}
        >
          {clientes.datosQuery.map(c => (
            <ClienteDatos cliente={c} selectCliente={handleSelectCliente} key={c.id} />
          ))}
        </DesplegablePredictivo>
      )}
      <Botonera nuevoEstilo="switch-pedido-cargar" derecha>
        <Switch
          activo={enviarWappManual}
          onActivar={setEnviarWappManual}
          titulo="Enviar mensaje de pedido tomado"
          texto="whatsapp: "
        />
      </Botonera>
    </>
  );
};

export default PedidoClienteCargar;
