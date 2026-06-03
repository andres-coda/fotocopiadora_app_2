import { useForm } from "react-hook-form";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import Desplegable from "../../../../componente/formulario/desplegable";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { transformarEspeAEnum } from "../../../../utils/especificaciones";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import './pedidoCard.css'
import { estado, estadoFormEdit, formValuesEstado } from "../../../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { pasarEstadoDesplegable } from "../../../../utils/estado";
import { useEffect } from "react";
import usePedidoLibroApi from "../../../../servicio/pedido_libro/usePedidoLibroApi";

interface Prop {
  pL: PedidoLibroProp;
}

const PedidoLibroXPedidoCard = ({ pL }: Prop) => {
  const { cambiarEstadoPedidoLibro, responsePedidoLibro } = usePedidoLibroApi();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<formValuesEstado>({
    resolver: zodResolver(estado),
    defaultValues: estadoFormEdit({pedidoLibro:pL})
  });

  const estadoActual = watch().estado;

  useEffect(()=>{
    if(estadoActual != pL.estado){
      cambiarEstadoPedidoLibro(pL.id, estadoActual);
    }
  }, [estadoActual])

  useEffect(()=>{
    if(responsePedidoLibro){
      console.log('estado cambiado')
    }
  }, [responsePedidoLibro])

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(pL.estado)} pedido-cliente-card`}
      tituloCard={`${nombreLibroXstring(pL.libro)}`}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado />
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline />
        <div className="card-horizontal">
          {pL.detalles && <Texto texto={`Detalles: ${pL.detalles}`} inline chica />}
          <Texto texto={`Sede: ${pL.sede?.nombre ?? ''}`} chica ajustado />
        </div>
        <EspecificacionCard listaEspecificaciones={transformarEspeAEnum(pL.especificaciones)} horizontal />
        <div className="estado-contenedor">
        <Desplegable<formValuesEstado> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estado} alingDerecha opciones={pasarEstadoDesplegable()} nuevoEstilo="desplegable-estado"/>
        </div>
      </div>
    </Card>
  )
}

export default PedidoLibroXPedidoCard
