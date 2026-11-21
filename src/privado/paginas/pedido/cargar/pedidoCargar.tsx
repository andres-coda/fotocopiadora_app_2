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
import Input from '../../../../componente/formulario/input';
import { parseDecimal } from '../../../../utils/formulario';
import PedidoLibroCargar from './pedidoLibroCargar';
import { usePedidoContext } from '../../../../contexto/contextoPedido';
import { useEffect, useState } from 'react';
import { normalizarPedidoLibro } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { PrecioProp } from '../../../../modelo/Entidades/precio/precio.interface';
import Texto from '../../../../componente-estilo/texto/texto';
import { resetSeleccionarPedido, seleccionarPedido } from '../../../../redux/state/pedido.state';
import useWhatsapp from '../../../../hooks/whatsapp/useWhatsapp';
import { armarMensajeTomado } from '../../../../utils/whatsapp';
import Modal from '../../../../componente/modal/modal';
import PedidoCard from '../componente/pedidoCard';
import usePedidoCargar from '../hook/usePedidoCargar';
import { calcularTotal } from '../../../../redux/utils/funcionesPedido';
import PedidoClienteCargar from './pedidoClienteCargar';
import { useModalContext } from '../../../../contexto/contextoModal';


const PedidoCargar = () => {
  const pedidoSelect: PedidoProp | undefined = useSelector(
    (store: appStore) => store.pedido.datoSeleccionado
  );
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );
  const configuracion = useSelector((store: appStore) => store.miEmpresa.dato?.configuracion);

  const {setModal} = useModalContext();
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

  const {
    valorBusquedaCliente,
    clienteParaPedido,
    setCampoCliente,
    setClienteSeleccionado,
    setEnviarWappManual,
    enviarWappManual,
  } = usePedidoCargar({
    enviarWatsapp: configuracion?.msjEnvio,
    watch,
    pedidoSelect,
  });

  useEffect(() => {
    if (pedidoSelect?.id || !configuracion?.fechaEntrega || watch('fechaEntrega')) return;
    setValue('fechaEntrega', configuracion.fechaEntrega);
  }, [configuracion?.fechaEntrega, pedidoSelect?.id, setValue, watch]);

  const { editarPedido, crearPedido, responsePedido, errorFetchPedido, loadingPedido } =
    usePedidoApi();
  const { datos, setDatos } = usePedidoContext();
  const [error, setError] = useState<string>('');

  const { abrirWhatsapp } = useWhatsapp();

  useEffect(() => {
    if (pedidoSelect?.libroPedidos && pedidoSelect?.libroPedidos.length > 0) {
      setDatos({ pedidos: normalizarPedidoLibro(pedidoSelect.libroPedidos) });
    }
    setModal(false); 
  }, []);

  const dataForm = watch();

  useEffect(() => {
    const total = calcularTotal(precios, datos?.pedidos);

    setValue('importeTotal', total.toString());
  }, [datos?.pedidos, precios, setValue]);

  // Solo en creacion: editar un pedido no manda el mensaje de pedido tomado.
  // Va antes de useFormulario para abrirse antes de que la navegacion desmonte.
  useEffect(() => {
    if (!responsePedido || pedidoSelect?.id || !enviarWappManual) return;

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

  // El contexto del pedido vive en ProveiderPedidoContext, que envuelve todas
  // las rutas privadas: sobrevive al alta. Si no se limpia, el proximo
  // "Nuevo pedido" arranca con los libros del anterior.
  useEffect(() => {
    if (!responsePedido || pedidoSelect?.id) return;
    setDatos(undefined);
    // Solo interesa la respuesta del back: pedidoSelect cambia despues de este
    // commit (useFormulario lo selecciona), no queremos reevaluar la condicion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsePedido]);

  const { retroceder } = useFormulario<PedidoProp, formValuesPedido, PedidoProp>({
    response: responsePedido,
    resetSelect: resetSeleccionarPedido,
    agregarElemento: seleccionarPedido,
    reset,
    setModal: true,
    //`/${rutaBase.PRIVADO}/${RutasPrivadas.PEDIDO}`,
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
    if (errorFetchPedido) {
      setError(errorFetchPedido);
    }
  }, [errorFetchPedido]);

  return (
    <Centro nuevoEstilo="pedido-cargar">
      <Formulario
        titulo={`${pedidoSelect ? `Editar pedido` : 'Nuevo pedido'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar pedido"
        etiquetaSecundaria="Atras"
        loading={loadingPedido}
        errorFetch={error}
      >
        <>
          <PedidoClienteCargar
            control={control}
            errors={errors}
            watch={watch}
            reset={reset}
            valorBusquedaCliente={valorBusquedaCliente}
            setClienteSeleccionado={setClienteSeleccionado}
            setCampoCliente={setCampoCliente}
            setEnviarWappManual={setEnviarWappManual}
            enviarWappManual={enviarWappManual}
            setError={setError}
          />
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
      <Modal>{pedidoSelect && <PedidoCard activo pedido={pedidoSelect} />}</Modal>
    </Centro>
  );
};

export default PedidoCargar;
