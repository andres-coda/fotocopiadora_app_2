
interface Props{
  activo?:boolean
  nuevoEstilo?:string;
}

const usePedidoClase = ({activo=false, nuevoEstilo = ''}:Props) => {

  const claseCard = [
    'card-pedido',
    activo && 'card-pedido-activo',
    nuevoEstilo
  ]
  .filter(Boolean)
  .join(' ');

  return {claseCard}
}

export default usePedidoClase
