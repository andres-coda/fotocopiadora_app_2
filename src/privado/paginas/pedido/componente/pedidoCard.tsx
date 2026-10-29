import Card from '../../../../componente-estilo/card/card';
import useEditar from '../../../../hooks/editar/useEditar';
import './pedidoCard.css';
import { PedidoProp } from '../../../../modelo/Entidades/pedido/pedido.interface';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import CardFechas from '../../../../componente/pedido/cardFechas';
import CardArchivos from '../../../../componente/pedido/cardArchivos';
import CardImporte from '../../../../componente/pedido/cardImporte';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Boton from '../../../../componente-estilo/boton/boton';
import Switch from '../../../../componente-estilo/switch/switch';
import Edit from '../../../../assets/edit.svg?react';
import { claseXestadoPedido } from '../../../../utils/formatoDatos';
import { estadosPedidoParaDesplegable, pasarEstadoDesplegable } from '../../../../utils/estado';
import { useForm } from 'react-hook-form';
import {
  estado,
  estadoPedido,
  estadoPedidoFormEdit,
  formValuesEstadoPedido,
} from '../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import Desplegable from '../../../../componente/formulario/desplegable';
import CardDatosCliente from '../../../../componente/pedido/cardDatosCliente';
import Cargando from '../../../../componente/cargando/cargando';
import useCambiarEstadoPedidoApi from '../../../../servicio/pedido/useCambiarEstadoPedidoApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarMuchosStockRedux } from '../../../../redux/state/libro.state';
import { StockProp } from '../../../../modelo/Entidades/libro/stock.interface';
import { actualizarResumenClienteRedux } from '../../../../redux/state/cliente.state';
import { cambiarEstadoPedidoRedux } from '../../../../redux/state/pedido.state';
import Texto from '../../../../componente-estilo/texto/texto';
import ItemCard from '../../item/componente/itemCard';
import { cambiarEstadoPedidoLibroRedux } from '../../../../redux/state/pedido_libro.state';
import { appStore } from '../../../../redux/store';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import useWhatsapp from '../../../../hooks/whatsapp/useWhatsapp';
import { armarMensaje } from '../../../../utils/whatsapp';

interface Props {
  pedido: PedidoProp;
  onClick?: (pedido: PedidoProp) => void;
  activo?: boolean;
  cliente?: boolean;
  nuevoEstilo?: string;
}

const PedidoCard = ({ pedido, onClick, activo, nuevoEstilo, cliente }: Props) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<formValuesEstadoPedido>({
    resolver: zodResolver(estadoPedido),
    defaultValues: estadoPedidoFormEdit(pedido),
  });
  const {
    cambiarEstadoPedido,
    responseCambioEstadoPedido,
    loadingCambioEstadoPedido,
    errorFetchCambioEstadoPedido,
  } = useCambiarEstadoPedidoApi();
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido,
  });

  const configuracion = useSelector((store: appStore) => store.empresa.empresa?.configuracion);

  // Arranca con lo configurado por la empresa y se puede pisar por pedido.
  const [enviarWappManual, setEnviarWappManual] = useState<boolean | undefined>(undefined);
  const enviarWapp = enviarWappManual ?? configuracion?.msjRetiro ?? false;

  const { abrirWhatsapp } = useWhatsapp();

  const dispatch = useDispatch();

  const estadoActual = watch('estado');

  useEffect(() => {
    if (estadoActual !== undefined && estadoActual !== pedido.estado) {
      cambiarEstadoPedido({ idPedido: pedido.id, estado: estadoActual });
    }
  }, [estadoActual]);

  useEffect(() => {
    if (responseCambioEstadoPedido) {
      const stocks: StockProp[] = responseCambioEstadoPedido.items.map(i => i.stock);
      dispatch(actualizarMuchosStockRedux(stocks));
      dispatch(actualizarResumenClienteRedux(responseCambioEstadoPedido.resumenCliente));
      dispatch(cambiarEstadoPedidoRedux(responseCambioEstadoPedido));
      dispatch(cambiarEstadoPedidoLibroRedux(responseCambioEstadoPedido));
    }
  }, [responseCambioEstadoPedido]);

  // El mensaje de retiro sale cuando el pedido completo pasa a RETIRADO.
  useEffect(() => {
    if (!responseCambioEstadoPedido) return;
    if (responseCambioEstadoPedido.pedido.estado !== Estado.RETIRADO) return;
    if (!enviarWapp) return;

    abrirWhatsapp({
      telefono: pedido.cliente?.telefono,
      mensaje: armarMensaje(configuracion?.msjRetirado?.mensaje, pedido),
    });
    // Se dispara una vez por respuesta del back, no por cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCambioEstadoPedido]);

  return (
    <Card
      onClick={onClick ? () => onClick(pedido) : undefined}
      nuevoEstilo={`card-pedido ${nuevoEstilo ? nuevoEstilo : ''} ${activo ? 'card-pedido-activo' : ''}`}
    >
      <CardFechas pedido={pedido} />
      <CardArchivos pedido={pedido} />
      {activo && (
        <div className="pedidos-internos">
          {pedido.libroPedidos.length === 0 && <Cargando />}
          {pedido?.libroPedidos.map(lp => (
            <ItemCard item={lp} key={lp.id} idPedido={pedido.id} />
          ))}
        </div>
      )}
      {!cliente && <CardDatosCliente pedido={pedido} />}
      <CardImporte pedido={pedido} />
      {activo && (
        <Botonera nuevoEstilo={`pedido-card-botonera ${claseXestadoPedido(pedido.estado)}`}>
          <Switch
            activo={enviarWapp}
            onActivar={setEnviarWappManual}
            titulo="Enviar mensaje al retirar"
            texto="whatsapp: "
          />
          {errorFetchCambioEstadoPedido ? (
            <Texto texto={errorFetchCambioEstadoPedido} chica ajustado />
          ) : !loadingCambioEstadoPedido ? (
            <Desplegable<formValuesEstadoPedido>
              name="estado"
              control={control}
              label="Seleccione nuevo estado"
              error={errors.estado}
              esquema={estado}
              alingDerecha
              opciones={pasarEstadoDesplegable(estadosPedidoParaDesplegable)}
              nuevoEstilo="desplegable-estado desplegable-estado-pedido"
            />
          ) : (
            <Texto texto={'Cambiando...'} chica ajustado />
          )}
          <Boton
            icono={<Edit />}
            titulo="Editar pedido"
            secundario
            nuevoEstilo="btn-icono-mediano"
            onClick={() =>
              handleSelect({
                pedido,
                rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`,
              })
            }
          />
        </Botonera>
      )}
    </Card>
  );
};

export default PedidoCard;
