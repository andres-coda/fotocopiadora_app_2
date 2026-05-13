import { useForm } from "react-hook-form";
import { formValuesOrden, ordenDto, ordenForm, ordenFormEdit } from "../../modelo/orden/esqOrden.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrdenProp } from "./useBuscadorProp.interface";
import { useDispatch } from "react-redux";
import { HasId } from "../../modelo/general/hasId.interface";
import { useModalContext } from "../../contexto/contextoModal";



const useOrden =<T extends HasId>({sortBy, sortOrder, setOrden}:useOrdenProp<T>) => {

    const dispatch = useDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm<formValuesOrden>({
      resolver: zodResolver(ordenForm),
      defaultValues: ordenFormEdit<T>({
        edit: sortBy,
        ascendente: sortOrder,
      })
    })
    const { setModal } = useModalContext();
  
    const onSubmit = (data: formValuesOrden) => {
      dispatch(setOrden(ordenDto<T>(data)));
      setModal(false)
    }

    return {control, handleSubmit, errors , onSubmit }

}

export default useOrden;