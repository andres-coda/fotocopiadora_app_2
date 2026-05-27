import Input from '../../../../componente/formulario/input'
import { formValuesPedidoLibro, pedidoLibro, pedidoLibroFormEdit } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PedidoLibroProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import BuscadorLibro from '../../../../componente/buscador/buscadorLibro';
import Presupuesto from '../../../../componente/pedido/presupuesto/presupuesto';
import { useState } from 'react';
import { libroInicial, LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import './pedidoCargar.css';
import LibroCardPedido from '../../libro/componente/libroCardPedido';

interface Prop {
  pL: PedidoLibroProp
}

const PedidoLibroCargar = ({ pL }: Prop) => {
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesPedidoLibro>({
    resolver: zodResolver(pedidoLibro),
    defaultValues: pedidoLibroFormEdit({ pedidoLibro: pL || undefined, libro: pL?.libro })
  });
  const pedidoParcial = watch();
  const [libro, setLibro] = useState<LibroProp[]>([]);
  const [libroActual, setLibroActual] = useState<LibroProp | undefined>(undefined);
  return (
    <div className='pedidoLibroCargar'>
      <Input<formValuesPedidoLibro> name='cantidad' control={control} label='Cantidad de libros' tipo='number' error={errors.cantidad} esquema={pedidoLibro} />
      <BuscadorLibro setLibro={setLibroActual} />
      {libroActual && <LibroCardPedido libro={libroActual} cantidad={pedidoParcial.cantidad ?? 0} detalles={pedidoParcial.detalles ?? ''} />}
      <Presupuesto libro={libroActual ?? libroInicial} simple />
      <Input<formValuesPedidoLibro> name='detalles' control={control} label='Detalle del pedido' tipo='text' error={errors.detalles} esquema={pedidoLibro} />
    </div>
  )
}

export default PedidoLibroCargar
