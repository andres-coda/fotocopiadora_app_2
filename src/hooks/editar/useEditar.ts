import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";
import { PropEditar } from "./useEditar.interface";
import { useDispatch } from "react-redux";
import { selectCliente } from "../../redux/state/cliente.state";
import { selectLibro } from "../../redux/state/libro.state";
import { selectPedido } from "../../redux/state/pedido.state";
import { selectSede } from "../../redux/state/sede.state";
import { selectPrecio } from "../../redux/state/precio.state";

const useEditar = ({ 
  ruta, 
  setModalLocal, 
  cliente,
  libro,
  pedido,
  sede,
  precio
}: PropEditar) => {
  const { setModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const select = () => {
    if (cliente) dispatch(selectCliente(cliente));
    if (libro) dispatch(selectLibro(libro));
    if (pedido) dispatch(selectPedido(pedido));
    if (sede) dispatch(selectSede(sede));
    if (precio) dispatch(selectPrecio(precio));
  }



  const handleEdit = () => {
    select();

    ruta && navigate(ruta);
    if (setModalLocal) {
      setModalLocal(true);
      setModal(true);
    }
  }

  const handleSelect = (rutaLocal?: string) => {
    select();
    rutaLocal && navigate(rutaLocal);
  }


  return { handleEdit, handleSelect }
}

export default useEditar
