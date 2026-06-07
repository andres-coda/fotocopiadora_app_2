import Card from "../../../../componente-estilo/card/card"
import useEditar from "../../../../hooks/editar/useEditar"
import './pedidoCard.css'
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import CardFechas from "../../../../componente/pedido/cardFechas"
import CardArchivos from "../../../../componente/pedido/cardArchivos"
import CardImporte from "../../../../componente/pedido/cardImporte"
import PedidoLibroXPedidoCard from "./pedidoLibroXPedidoCard"
import Botonera from "../../../../componente-estilo/botonera/botonera"
import Boton from "../../../../componente-estilo/boton/boton"
import Edit from '../../../../assets/edit.svg?react'
import { claseXestadoPedido } from "../../../../utils/formatoDatos"
import { estadosPedidoParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado"
import { useForm } from "react-hook-form"
import { estado, estadoFormEdit, estadoPedido, estadoPedidoFormEdit, formValuesEstado, formValuesEstadoPedido } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import Desplegable from "../../../../componente/formulario/desplegable"
import { useEffect } from "react"
import { EstadoPedido } from "../../../../modelo/Entidades/pedido/estadoPedido.enum"

interface Props {
  pedido: PedidoProp;
  onClick?: (pedido: PedidoProp) => void;
  activo?: boolean;
}

const PedidoCard = ({ pedido, onClick, activo }: Props) => {
   const { control, handleSubmit, formState: { errors }, watch } = useForm<formValuesEstadoPedido>({
      resolver: zodResolver(estadoPedido),
      defaultValues: estadoPedidoFormEdit(pedido )
    });
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido
  });

  const estadoActual:EstadoPedido = watch().estado;

  useEffect(()=>{
    if(estadoActual != pedido.estado){
      //cambiarEstadoPedido(pedido.id, estadoActual);
    }
  },[estadoActual])

  /* useEffect(()=>{
    if(responsePedido){
      dispatch(cambiarEstadoPedidoCliente(pedido))
    }
  },[responsePedido]) */

  return (
    <Card
      onClick={onClick ? () => onClick(pedido) : undefined}
      nuevoEstilo={`card-pedido ${activo && 'card-pedido-activo'}`}
    >
      <CardFechas pedido={pedido} />
      <CardArchivos pedido={pedido} />
      {
        activo &&
        <div className="pedidos-internos">
          {pedido?.libroPedidos.map(lp => <PedidoLibroXPedidoCard pL={lp} key={lp.id} />)}
        </div>
      }
      <CardImporte pedido={pedido} />
      {
        activo &&
        <Botonera nuevoEstilo={`pedido-card-botonera ${claseXestadoPedido(pedido.estado)}`}>
          <Boton icono={<Edit />} titulo="Editar pedido" secundario nuevoEstilo="btn-icono-mediano" onClick={() => handleSelect({ pedido, rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}` })} />
          <Desplegable<formValuesEstadoPedido> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estado} alingDerecha opciones={pasarEstadoDesplegable(estadosPedidoParaDesplegable)} nuevoEstilo="desplegable-estado desplegable-estado-pedido" />
        </Botonera>
      }
    </Card>
  )
}

export default PedidoCard

/*
<div className={`cliente-pedidos`} onClick={() => handlePedido(pedido)} title={nuevoPedido.estado.estado}>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoFecha pedido={pedido} />
        </div>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoArchivos pedido={pedido} />
        </div>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoPesos pedido={pedido} />
        </div>
      </div>

*/