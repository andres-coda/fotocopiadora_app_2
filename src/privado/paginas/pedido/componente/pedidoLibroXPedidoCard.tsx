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
import { estadosParaDesplegable, pasarEstadoDesplegable } from "../../../../utils/estado";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cambiarEstadoLibroPedidoCliente } from "../../../../redux/state/cliente.state";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import useCambiarEstadoPedidoLibroApi from "../../../../servicio/pedido_libro/useCambiarEstadoPedidolibroApi";
import { actualizarStock } from "../../../../redux/state/libro.state";

interface Prop {
  pL: PedidoLibroProp;
}

const PedidoLibroXPedidoCard = ({ pL}: Prop) => {
  const { cambiarEstadoPedidoLibro, responsePedidoLibro, loadingPedidoLibro, errorFetchPedidoLibro } = useCambiarEstadoPedidoLibroApi();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<formValuesEstado>({
    resolver: zodResolver(estado),
    defaultValues: estadoFormEdit(pL)
  });
  const dispatch = useDispatch();

  const [clasEstado, setClasEstado] = useState<Estado>(pL.estado);

  const estadoActual = watch().estado;

  useEffect(() => {
    if (estadoActual != clasEstado) {
      cambiarEstadoPedidoLibro(pL.id, estadoActual);
    }
  }, [estadoActual])

  useEffect(() => {
    if (responsePedidoLibro) {
      dispatch(cambiarEstadoLibroPedidoCliente(responsePedidoLibro));
      dispatch(actualizarStock(responsePedidoLibro));
      setClasEstado(estadoActual);
    }
  }, [responsePedidoLibro]);

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(clasEstado)} pedido-cliente-card`}
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
          {
            !loadingPedidoLibro ?
              <Desplegable<formValuesEstado> name="estado" control={control} label="Seleccione nuevo estado" error={errors.estado} esquema={estado} alingDerecha opciones={pasarEstadoDesplegable(undefined, estadosParaDesplegable)} nuevoEstilo="desplegable-estado" />
              : <Texto texto={'Cambiando...'} chica ajustado/>
          }
        </div>
      </div>
    </Card>
  )
}

export default PedidoLibroXPedidoCard
