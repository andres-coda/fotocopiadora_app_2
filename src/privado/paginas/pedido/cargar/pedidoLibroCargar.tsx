import Input from '../../../../componente/formulario/input'
import { formValuesPedidoLibro, pedidoLibro, pedidoLibroFormEdit } from '../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PedidoLibroConstruccionProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import BuscadorLibro from '../../../../componente/buscador/buscadorLibro';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import './pedidoCargar.css';
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface';
import { usePedidoContext } from '../../../../contexto/contextoPedido';
import PresupuestoSimple from '../../../../componente/pedido/presupuesto/presupuestoSimple';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import Desplegable from '../../../../componente/formulario/desplegable';
import { pasarDesplegable } from '../../../../utils/formulario';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import PedidoLibroCard from '../componente/pedidoLibroCard';
import Boton from '../../../../componente-estilo/boton/boton';

const crearLibropedido = (libro: LibroProp, pedidoParcial: formValuesPedidoLibro, sedes: SedeProp[], estado?: Estado): PedidoLibroConstruccionProp => {
  return {
    id: crypto.randomUUID(),
    libro: libro,
    cantidad: Number(pedidoParcial.cantidad) === 0 ? 1 : Number(pedidoParcial.cantidad),
    detalles: pedidoParcial.detalles ?? '',
    sede: sedes.find(s => s.id === pedidoParcial.sede),
    especificaciones: libro.especificacionesDefecto ?? [],
    estado: estado ?? Estado.POR_CONFIRMAR
  }
}

const PedidoLibroCargar = () => {
  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.items);
  const { datos, setDatos } = usePedidoContext();
  const { control, formState: { errors }, watch } = useForm<formValuesPedidoLibro>({
    resolver: zodResolver(pedidoLibro),
    defaultValues: pedidoLibroFormEdit({ pedidoLibro: datos?.pedidoActual || undefined, libro: datos?.pedidoActual?.libro, sede:sedes[0] })
  });
  const pedidoParcial = watch();

  const handleLibro = (libro: LibroProp) => {
    setDatos(prev => {
      const newPedido: PedidoLibroConstruccionProp = crearLibropedido(libro, pedidoParcial, sedes, Estado.CONSTRUCCION);

      if (!prev) return {
        pedidos: [],
        pedidoActual: newPedido
      }

      return {
        ...prev,
        pedidoActual: newPedido
      }
    });
  }


  const handlePropuesta = (propuesta: PropuestaProp) => {
    console.log('handlePropuesta: ',propuesta)
    if (propuesta.libro && propuesta.libro.length > 0) { 
      console.log('aqui estoy')
      setDatos(prev => {
        const pedidos:PedidoLibroConstruccionProp[] = propuesta.libro?.map(l=> crearLibropedido(l, pedidoParcial, sedes)) ?? [];
        console.log('Pedidos: ', pedidos)
        const newDatos = {
          ...prev,
          pedidos: [...prev?.pedidos ?? [], ...pedidos]
        }
        return newDatos;
      });
    }
  }

  const handleClick = () => {
    setDatos(prev => {
      if (!prev || !prev.pedidoActual) return prev
      const pedidos: PedidoLibroConstruccionProp[] = [...prev.pedidos ?? [], prev.pedidoActual];
      return {
        pedidos,
        pedidoActual: undefined
      }
    })
  }

  return (
    <div className='pedidoLibroCargar'>
      <div className='form-horizontal'>
        <Desplegable name='sede' control={control} label='Sede' tipo='text' error={errors.sede} esquema={pedidoLibro} opciones={pasarDesplegable({ items: sedes })} />
        <Input<formValuesPedidoLibro> name='cantidad' control={control} label='Cantidad de libros' tipo='number' error={errors.cantidad} esquema={pedidoLibro} />
        <Input<formValuesPedidoLibro> name='detalles' control={control} label='Detalle del pedido' tipo='text' error={errors.detalles} esquema={pedidoLibro} />
      </div>
      <BuscadorLibro selectLibro={handleLibro} selectPropuesta={handlePropuesta} />
      <PresupuestoSimple />
      {datos?.pedidoActual && (
        <>
          <PedidoLibroCard pL={datos.pedidoActual} estadoClas={Estado.CONSTRUCCION} />
          <Boton texto='Agregar libro' onClick={handleClick} />
        </>
      )
      }
      {datos?.pedidos?.map(p => <PedidoLibroCard pL={p} estadoClas={Estado.POR_CONFIRMAR} key={p.id}/>)
      }
    </div>
  )
}

export default PedidoLibroCargar
