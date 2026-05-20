import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";
import { HandleSelectProp, PropEditar, PropEditarCompleto } from "./useEditar.interface";
import { useDispatch } from "react-redux";
import { selectCliente } from "../../redux/state/cliente.state";
import { selectLibro } from "../../redux/state/libro.state";
import { selectPedido } from "../../redux/state/pedido.state";
import { selectSede } from "../../redux/state/sede.state";
import { selectPrecio } from "../../redux/state/precio.state";
import { PedidoClienteProp } from "../../modelo/Entidades/pedido/pedido.interface";

const useEditar =<P extends PedidoClienteProp> ({ 
  ruta, 
  setModalLocal, 
  cliente,
  libro,
  pedido,
  sede,
  precio
}: PropEditarCompleto<P>) => {
  const { setModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const select = ({cliente:cl, libro:l, pedido:p, sede:s, precio:pr}:PropEditar<P>) => {
    const newCliente = cl || cliente;
    const newLibro = l || libro;
    const newPedido = p || pedido;
    const newSede = s || sede;
    const newPrecio = pr || precio;
    if (newCliente) dispatch(selectCliente(newCliente));
    if (newLibro) dispatch(selectLibro(newLibro));
    if (newPedido) dispatch(selectPedido(newPedido));
    if (newSede) dispatch(selectSede(newSede));
    if (newPrecio) dispatch(selectPrecio(newPrecio));
  }



  const handleEdit = ({cliente:cl, libro:l, pedido:p, sede:s, precio:pr}:PropEditar<P>) => {
    select({cliente:cl, libro:l, pedido:p, sede:s, precio:pr});

    ruta && navigate(ruta);
    if (setModalLocal) {
      setModalLocal(true);
      setModal(true);
    }
  }

  const handleSelect = ({rutaLocal, cliente:cl, libro:l, pedido:p, sede:s, precio:pr}:HandleSelectProp<P>) => {
    select({cliente:cl, libro:l, pedido:p, sede:s, precio:pr});
    rutaLocal && navigate(rutaLocal);
  }


  return { handleEdit, handleSelect }
}

export default useEditar
