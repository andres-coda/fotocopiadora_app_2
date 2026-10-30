import { useSelector } from 'react-redux';
import Centro from '../../../../componente-estilo/centro/centro';
import Formulario from '../../../../componente/formulario/formulario';
import { PedidoProp } from '../../../../modelo/Entidades/pedido/pedido.interface';
import { appStore } from '../../../../redux/store';
import usePedidoApi from '../../../../servicio/pedido/usePedidoApi';
import { useForm } from 'react-hook-form';
import {
  formValuesPedido,
  pedido,
  pedidoFormEdit,
} from '../../../../modelo/Entidades/pedido/esqPedido.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormulario from '../../../../hooks/formulario/useFormulario';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import Input from '../../../../componente/formulario/input';
import { formatTelefono, parseDecimal, parseTelefono } from '../../../../utils/formulario';
import PedidoLibroCargar from './pedidoLibroCargar';
import { usePedidoContext } from '../../../../contexto/contextoPedido';
import { useEffect, useState } from 'react';
import { normalizarPedidoLibro } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { calcularPrecio } from '../../../../utils/precio';
import { PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import { PedidoLibroConstruccionProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import Texto from '../../../../componente-estilo/texto/texto';
import { ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
import useClientesApi from '../../../../servicio/cliente/useClientesApi';
import useBusquedaSimple from '../../../../hooks/buscador/useBuscadorSimple';
import DesplegablePredictivo from '../../../../componente-estilo/predictivo/desplegablePredictivo';
import ClienteDatos from '../../cliente/componente/clienteDatos';
import { resetSeleccionarPedido, seleccionarPedido } from '../../../../redux/state/pedido.state';
import Switch from '../../../../componente-estilo/switch/switch';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import useWhatsapp from '../../../../hooks/whatsapp/useWhatsapp';
import { armarMensajeTomado } from '../../../../utils/whatsapp';

const calcularTotal = (precios: PrecioProp[], libros?: PedidoLibroConstruccionProp[]): number => {
  return (
    libros?.reduce(
      (acc, p) =>
        acc +
        calcularPrecio({
          libro: p.libro,
          precios,
          especificaciones: p.especificaciones,
          cantidad: p.cantidad,
        }),
      0
    ) ?? 0
  );
};
const limiteBusquedaCliente = 4;
const PedidoCargar = () => {
  const pedidoSelect: PedidoProp | undefined = useSelector(
    (store: appStore) => store.pedido.datoSeleccionado
  );
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );
  const configuracion = useSelector((store: appStore) => store.empresa.empresa?.configuracion);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<formValuesPedido>({
    resolver: zodResolver(pedido),
    defaultValues: pedidoFormEdit({
      pedido: pedidoSelect || undefined,
      cliente: pedidoSelect?.cliente,
      fechaEntregaDefecto: configuracion?.fechaEntrega,
    }),
  });

  useEffect(() => {
    if (pedidoSelect?.id || !configuracion?.fechaEntrega || watch('fechaEntrega')) return;
    setValue('fechaEntrega', configuracion.fechaEntrega);
  }, [configuracion?.fechaEntrega, pedidoSelect?.id, setValue, watch]);

  const { editarPedido, crearPedido, responsePedido, errorFetchPedido, loadingPedido } =
    usePedidoApi();
  const { datos, setDatos } = usePedidoContext();
  const [error, setError] = useState<string>('');

  // El switch arranca con lo configurado en la empresa y se puede pisar por pedido.
  const [enviarWappManual, setEnviarWappManual] = useState<boolean | undefined>(undefined);
  const enviarWapp = enviarWappManual ?? configuracion?.msjEnvio ?? false;

  const { abrirWhatsapp } = useWhatsapp();

  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteProp | undefined>(
    undefined
  );
  const { obtenerClientesBusqueda, responseClientes, loadingClientes, errorFetchClientes } =
    useClientesApi();

  const clienteBuscado = {
    nombre: watch().nombre ?? '',
    telefono: watch().telefono ?? '',
    email: watch().email ?? '',
  };

  const esElMismoCliente =
    clienteSeleccionado !== undefined &&
    formatTelefono(clienteBuscado.nombre) === formatTelefono(clienteSeleccionado.nombre) &&
    clienteBuscado.email === (clienteSeleccionado.email ?? '');

  const {
    finListaRef: finClientes,
    datos: clientes,
    setDatos: setClientes,
  } = useBusquedaSimple<ClienteProp>({
    valor: !esElMismoCliente
      ? (clienteBuscado.telefono ?? clienteBuscado.nombre ?? clienteBuscado.email ?? '')
      : '',
    response: responseClientes,
    loading: loadingClientes,
    limiteLetrasBusqueda: limiteBusquedaCliente,
    obtenerBusqueda: obtenerClientesBusqueda,
  });

  const handleSelectCliente = (l: ClienteProp) => {
    setClientes(undefined);
    reset({
      ...watch(),
      nombre: l.nombre,
      telefono: l.telefono,
      email: l.email,
    });
    setClienteSeleccionado(l);
  };

  useEffect(() => {
    if (pedidoSelect?.libroPedidos && pedidoSelect?.libroPedidos.length > 0) {
      setDatos({ pedidos: normalizarPedidoLibro(pedidoSelect.libroPedidos) });
    }
  }, []);

  const dataForm = watch();

  useEffect(() => {
    const total = calcularTotal(precios, datos?.pedidos);

    setValue('importeTotal', total.toString());
  }, [datos?.pedidos, precios, setValue]);

  // Solo en creacion: editar un pedido no manda el mensaje de pedido tomado.
  // Va antes de useFormulario para abrirse antes de que la navegacion desmonte.
  useEffect(() => {
    if (!responsePedido || pedidoSelect?.id || !enviarWapp) return;

    abrirWhatsapp({
      telefono:
        clienteSeleccionado?.telefono ?? responsePedido.cliente?.telefono ?? watch('telefono'),
      mensaje: armarMensajeTomado({
        pedido: responsePedido,
        encabezado: configuracion?.msjTomado?.mensaje,
        // La fecha de configuracion es la que se pide en el pie; la del pedido
        // queda de respaldo porque hoy el adapter la devuelve mal formateada.
        fechaEntrega: responsePedido.fechaEntrega,
        horaEntrega: configuracion?.horaEntrega,
      }),
    });
    // Se dispara una vez por alta confirmada por el back, no por cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    reset
  }, [responsePedido]);

  const { retroceder } = useFormulario<PedidoProp, formValuesPedido, PedidoProp>({
    response: responsePedido,
    resetSelect: resetSeleccionarPedido,
    agregarElemento: seleccionarPedido,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO}`,
  });

  const onSubmit = (data: formValuesPedido) => {
    console.log('pedidos: ', datos);
    if (!datos?.pedidos || datos.pedidos.length === 0) {
      setError('requiere agregar libros al pedido');
      return;
    }

    if (pedidoSelect?.id) {
      editarPedido(data, pedidoSelect.id, datos.pedidos);
    } else {
      crearPedido(data, datos.pedidos, clienteSeleccionado);
    }
  };

  useEffect(() => {
    if (errorFetchClientes) {
      setError(errorFetchClientes);
    }
  }, [errorFetchClientes]);

  return (
    <Centro nuevoEstilo="pedido-cargar">
      <Formulario
        titulo={`${pedidoSelect ? `Editar pedido` : 'Nuevo pedido'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar pedido"
        etiquetaSecundaria="Atras"
        loading={loadingPedido}
        errorFetch={errorFetchPedido}
      >
        <>
          <div className="form-horizontal pedido-cliente">
            <Input<formValuesPedido>
              name="nombre"
              control={control}
              label="Nombre"
              tipo="text"
              error={errors.nombre}
              esquema={pedido}
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
            />
            <Input<formValuesPedido>
              name="email"
              control={control}
              label="Email"
              tipo="text"
              error={errors.email}
              esquema={pedido}
            />
          </div>
          {clientes && clientes.datosQuery.length > 0 && (
            <DesplegablePredictivo
              children={clientes.datosQuery.map(c => (
                <ClienteDatos cliente={c} selectCliente={handleSelectCliente} key={c.id} />
              ))}
              finRegistros={finClientes}
            />
          )}
          <Botonera nuevoEstilo="switch-pedido-cargar" derecha>
            <Switch
              activo={enviarWapp}
              onActivar={setEnviarWappManual}
              titulo="Enviar mensaje de pedido tomado"
              texto="whatsapp: "
            />
          </Botonera>
          <div className="form-horizontal">
            <Input<formValuesPedido>
              name="archivos"
              control={control}
              label="Archivos"
              tipo="text"
              error={errors.archivos}
              esquema={pedido}
            />
            <Input<formValuesPedido>
              name="anillados"
              control={control}
              label="Anillados"
              tipo="text"
              error={errors.anillados}
              esquema={pedido}
            />
          </div>
          <PedidoLibroCargar />
          <Input<formValuesPedido>
            name="fechaEntrega"
            control={control}
            label="Fecha de entrega"
            tipo="date"
            error={errors.fechaEntrega}
            esquema={pedido}
          />
          <div className="form-horizontal pedido-total">
            <Input<formValuesPedido>
              name="importeTotal"
              control={control}
              label={`Total: $${calcularTotal(precios, datos?.pedidos)}`}
              tipo="text"
              error={errors.importeTotal}
              esquema={pedido}
              formatValue={v => parseDecimal(v, 12, 2)}
              parseValue={v => parseDecimal(v, 12, 2)}
            />
            <Input<formValuesPedido>
              name="sena"
              control={control}
              label="Seña"
              tipo="text"
              error={errors.sena}
              esquema={pedido}
              formatValue={v => parseDecimal(v, 12, 2)}
              parseValue={v => parseDecimal(v, 12, 2)}
            />
            <Texto
              texto={`Saldo: $${Number(dataForm.importeTotal) - Number(dataForm.sena)}`}
              mediana
              ajustado
              centrado
              nuevoEstilo="saldo"
            />
          </div>
        </>
      </Formulario>
      <Texto texto={error} error />
    </Centro>
  );
};

export default PedidoCargar;
