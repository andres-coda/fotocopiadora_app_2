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
import { normalizarTelefono } from '../../../../utils/telefono';
import PedidoLibroCargar from './pedidoLibroCargar';
import { usePedidoContext } from '../../../../contexto/contextoPedido';
import { useEffect, useState } from 'react';
import { normalizarPedidoLibro } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { calcularPrecio } from '../../../../utils/precio';
import { PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import { PedidoLibroConstruccionProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import Texto from '../../../../componente-estilo/texto/texto';
import { clienteInicial, ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
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

// `normalizarTelefono` devuelve undefined cuando el numero no cierra; en ese
// caso se compara el texto crudo para no dar por iguales dos numeros distintos.
const telefonoComparable = (telefono?: string): string =>
  normalizarTelefono(telefono) ?? telefono?.trim() ?? '';

const limiteBusquedaCliente = 4;

type CampoCliente = 'nombre' | 'telefono' | 'email';

const PedidoCargar = () => {
  const pedidoSelect: PedidoProp | undefined = useSelector(
    (store: appStore) => store.pedido.datoSeleccionado
  );
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );
  const configuracion = useSelector(
    (store: appStore) => store.miEmpresa.dato?.configuracion
  );

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

  // Al editar, el pedido ya trae su cliente: se siembra como seleccionado para
  // que el buscador no dispare solo al entrar al formulario. Sin esto el
  // telefono precargado caia en `valor` y el desplegable se abria encima del
  // formulario. `pedidoSelect.cliente` es el shape del adapter, asi que le
  // faltan `ultAct`, `resumen` y `pedidos`; se completan desde `clienteInicial`
  // en vez de castear.
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteProp | undefined>(() =>
    pedidoSelect?.cliente
      ? {
          ...clienteInicial,
          id: pedidoSelect.cliente.id,
          nombre: pedidoSelect.cliente.nombre,
          telefono: pedidoSelect.cliente.telefono,
          email: pedidoSelect.cliente.email,
        }
      : undefined
  );

  // Campo del formulario que el usuario esta editando.
  const [campoCliente, setCampoCliente] = useState<CampoCliente>();
  const { obtenerClientesBusqueda, responseClientes, loadingClientes, errorFetchClientes } =
    useClientesApi();

  const clienteBuscado = {
    nombre: watch().nombre ?? '',
    telefono: watch().telefono ?? '',
    email: watch().email ?? '',
  };

  // `formatTelefono` descarta todo lo no numerico, asi que comparaba '' contra
  // '': con cualquier nombre alfabetico daba igual y el cliente seleccionado
  // quedaba "vivo" aunque editaras el nombre. Se compara el nombre directo.
  // El telefono se compara normalizado: el form puede guardarlo local y el
  // cliente venir en internacional, y sin esto corregir solo el telefono
  // dejaba el cliente viejo y el numero nuevo no llegaba al back.
  const esElMismoCliente =
    clienteSeleccionado !== undefined &&
    clienteBuscado.nombre === (clienteSeleccionado.nombre ?? '') &&
    clienteBuscado.email === (clienteSeleccionado.email ?? '') &&
    telefonoComparable(clienteBuscado.telefono) ===
      telefonoComparable(clienteSeleccionado.telefono);

  // Si el usuario edito nombre o email, lo que hay en el formulario ya no es el
  // cliente que habia seleccionado: no se manda uno viejo al back.
  const clienteParaPedido = esElMismoCliente ? clienteSeleccionado : undefined;

  // Se busca solo por el campo que tiene el foco y solo si su valor se aparto
  // del cliente ya elegido. Sin foco no se busca nada, asi entrar o salir de un
  // campo no dispara peticiones; y con el cliente intacto tampoco, para que el
  // desplegable no se reabra sobre una edicion en curso.
  const valorCampoConFoco = campoCliente ? clienteBuscado[campoCliente] : '';
  const referenciaConFoco =
    clienteSeleccionado !== undefined && campoCliente !== undefined
      ? clienteSeleccionado[campoCliente] ?? ''
      : undefined;

  // El telefono se compara normalizado: el formulario y el adapter pueden
  // guardarlo en formatos distintos, y sin esto alcanza con que el form
  // reescriba el numero en otro formato para que el guard se caiga y el
  // desplegable se reabra con un cliente que no cambio.
  const elCampoNoCambio =
    referenciaConFoco !== undefined &&
    (campoCliente === 'telefono'
      ? telefonoComparable(valorCampoConFoco) === telefonoComparable(referenciaConFoco)
      : valorCampoConFoco === referenciaConFoco);

  const valorBusquedaCliente = campoCliente && !elCampoNoCambio ? valorCampoConFoco : '';

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
        clienteParaPedido?.telefono || responsePedido.cliente?.telefono || watch('telefono'),
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
    reset;
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
      crearPedido(data, datos.pedidos, clienteParaPedido);
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
