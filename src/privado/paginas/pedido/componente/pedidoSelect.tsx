import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import Desplegable from "../../../../componente/formulario/desplegable";
import CardArchivos from "../../../../componente/pedido/cardArchivos";
import CardFechas from "../../../../componente/pedido/cardFechas";
import CardImporte from "../../../../componente/pedido/cardImporte";
import { claseXestadoPedido } from "../../../../utils/formatoDatos";
import PedidoLibroXPedidoCard from "./pedidoLibroXPedidoCard";
import { pedidoInicial, PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import Edit from '../../../../assets/edit.svg?react'
import { zodResolver } from "@hookform/resolvers/zod";
import { estadoPedido, estadoPedidoFormEdit, formValuesEstadoPedido } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { useForm } from "react-hook-form";
import useEditar from "../../../../hooks/editar/useEditar";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import { estadosPedidoParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado";
import Cargando from "../../../../componente/cargando/cargando";

interface Prop {
  pedidoPrev?: PedidoProp;
}

const PedidoSelect = ({ pedidoPrev }: Prop) => {
  
  const pedidoSelect: PedidoProp | null = pedidoPrev ?? useSelector((store: appStore) => store.pedido.selected);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<formValuesEstadoPedido>({
    resolver: zodResolver(estadoPedido),
    defaultValues: estadoPedidoFormEdit(pedidoSelect ?? pedidoPrev ?? pedidoInicial)
  });

  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido: pedidoSelect ?? undefined
  });

  if(!pedidoSelect) return <Card><Cargando /></Card>
  return (
    <Card
      nuevoEstilo={'card-pedido-activo'}
    >
      <CardFechas pedido={pedidoSelect} />
      <CardArchivos pedido={pedidoSelect} />
      <div className="pedidos-internos">
        {pedidoSelect?.libroPedidos.map(lp => <PedidoLibroXPedidoCard pL={lp} key={lp.id} />)}
      </div>
      <CardImporte pedido={pedidoSelect} />
      <Botonera nuevoEstilo={`pedido-card-botonera ${claseXestadoPedido(pedidoSelect.estado)}`}>
        <Boton icono={<Edit />} titulo="Editar pedido" secundario nuevoEstilo="btn-icono-mediano" onClick={() => handleSelect({ pedido: pedidoSelect, rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}` })} />
        <Desplegable<formValuesEstadoPedido> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estadoPedido} alingDerecha opciones={pasarEstadoDesplegable(estadosPedidoParaDesplegable)} nuevoEstilo="desplegable-estado desplegable-estado-pedido" />
      </Botonera>
    </Card>
  )
}

export default PedidoSelect;