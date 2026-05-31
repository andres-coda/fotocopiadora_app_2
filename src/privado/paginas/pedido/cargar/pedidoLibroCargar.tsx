import Input from '../../../../componente/formulario/input'
import { formValuesPedidoLibro, pedidoLibro, pedidoLibroFormEdit } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PedidoLibroConstruccionProp, PedidoLibroProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import BuscadorLibro from '../../../../componente/buscador/buscadorLibro';
import Presupuesto from '../../../../componente/pedido/presupuesto/presupuesto';
import { useEffect, useState } from 'react';
import { libroInicial, LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import './pedidoCargar.css';
import PedidoLibroCard from '../componente/pedidoLibroCard';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface';
import { usePedidoContext } from '../../../../contexto/contextoPedido';

interface Prop {
  pL: PedidoLibroProp
}

const PedidoLibroCargar = ({ pL }: Prop) => {
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesPedidoLibro>({
    resolver: zodResolver(pedidoLibro),
    defaultValues: pedidoLibroFormEdit({ pedidoLibro: pL || undefined, libro: pL?.libro })
  });
  const { datos, setDatos } = usePedidoContext();
  const pedidoParcial = watch();

  const handleLibro = (libro: LibroProp) => {
    setDatos(prev => {
      const newDatos = {
        ...prev,
        pedidoActual: {
          libro: libro,
          cantidad: Number(pedidoParcial.cantidad) === 0 ? 1 : Number(pedidoParcial.cantidad),
          detalles: pedidoParcial.detalles ?? '',
        }
      }
      return newDatos;
    });
  }


  const handlePropuesta = (propuesta: PropuestaProp) => {
    const pedidosAux: PedidoLibroConstruccionProp[] = [];
    if (!propuesta.libro || propuesta.libro.length === 0) return;
    for (const l of propuesta.libro) {
      const pedido: PedidoLibroConstruccionProp = {
        libro: l,
        cantidad: Number(pedidoParcial.cantidad) === 0 ? 1 : Number(pedidoParcial.cantidad),
        detalles: pedidoParcial.detalles ?? '',
      }
      pedidosAux.push(pedido);
    }
    setDatos(prev => {
      const newDatos = {
        ...prev,
        pedidos: [...prev?.pedidos ?? [], ...pedidosAux]
      }
      return newDatos;
    });

  }

  useEffect(() => {
    if (datos?.pedidoActual?.libro) {
      console.log('Entre al useeffect: ', datos)
      setDatos(prev => {
        if (!prev?.pedidoActual?.libro) return prev
        const newDatos = {
          ...prev,
          pedidoActual: {
            libro: prev.pedidoActual.libro,
            cantidad: Number(pedidoParcial.cantidad) === 0 ? 1 : Number(pedidoParcial.cantidad),
            detalles: pedidoParcial.detalles ?? '',
          }
        }
        return newDatos;
      });
    }
  }, [pedidoParcial])

  return (
    <div className='pedidoLibroCargar'>
      <BuscadorLibro selectLibro={handleLibro} selectPropuesta={handlePropuesta} />
      <Presupuesto libro={datos?.pedidoActual?.libro ?? libroInicial} simple />
      <div className='form-horizontal'>
        <Input<formValuesPedidoLibro> name='cantidad' control={control} label='Cantidad de libros' tipo='number' error={errors.cantidad} esquema={pedidoLibro} />
        <Input<formValuesPedidoLibro> name='detalles' control={control} label='Detalle del pedido' tipo='text' error={errors.detalles} esquema={pedidoLibro} />
      </div>
      {datos?.pedidoActual && <PedidoLibroCard pL={datos.pedidoActual} estadoClas={Estado.CONSTRUCCION} />}
      {datos?.pedidos?.map(p => <PedidoLibroCard pL={p} estadoClas={Estado.POR_CONFIRMAR} />)}
    </div>
  )
}

export default PedidoLibroCargar
