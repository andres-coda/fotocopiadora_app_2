import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { HasId } from "../../modelo/general/hasId.interface"
import { useDispatch } from "react-redux";
import { useModalContext } from "../../contexto/contextoModal";
import { Dispatch, SetStateAction } from "react";

interface Props<T extends HasId> {
  elemento: T;
  selectElemento: ActionCreatorWithPayload<T>;
  setModalParticular?: Dispatch<SetStateAction<boolean>>
}

const useEliminar = <T extends HasId>({ elemento, selectElemento, setModalParticular = undefined }: Props<T>) => {
  const dispatch = useDispatch();
  const { setModal } = useModalContext();


  const eliminarElemento = () => {
    setModal(true);
    dispatch(selectElemento(elemento));
    if (setModalParticular) setModalParticular(true);
  }

  return { eliminarElemento }
}

export default useEliminar
