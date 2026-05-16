import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HasId } from "../../modelo/general/hasId.interface";
import { Opcion } from "../../componente/formulario/modelo/input.interface";

interface recetProp<F extends FieldValues> {
  reset?: UseFormReset<F>
  resetSelect?: () => UnknownAction;
  ruta?: string;
  setModal?: Dispatch<SetStateAction<boolean>>;
  atras?: boolean;
  watch?:string;
}

interface useFormularioProp<T, F extends FieldValues,P extends HasId> extends recetProp<F> {
  response?: T | null;
  selectElemento?: (e:T) => UnknownAction;
  selectElementoWatch?: (e:P) => UnknownAction;
  itemsWatch?: P[];
  setWatch?: Dispatch<SetStateAction<P>>
}

interface Prop<T, K extends keyof T = keyof T>{
  items: T[]
  clave?: K; 
}

const useFormulario = <T, F extends FieldValues,P extends HasId>({
  reset,
  resetSelect = undefined,
  ruta = undefined,
  setModal = undefined,
  atras = undefined,
  response = undefined,
  selectElemento = undefined,
  selectElementoWatch = undefined,
  watch = undefined,
  itemsWatch = undefined,  
  setWatch = undefined,
}: useFormularioProp<T, F, P>) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      if (selectElemento) dispatch(selectElemento(response))
      resetForm({})
    }
  }, [response])

  useEffect(() => {
    if (watch && itemsWatch && itemsWatch.length!=0 && resetSelect ) {
        const dato:P | undefined = itemsWatch.find(c => c.id === watch)
        if(dato){
          if(setWatch) setWatch(dato);
          if(selectElementoWatch) dispatch(selectElementoWatch(dato))
        } else {
          dispatch(resetSelect());
        }
    }
  }, [watch, itemsWatch])

  const resetForm = ({
    reset: resetLocal = undefined,
    resetSelect: resetSelectLocal = undefined,
    ruta: rutaLocal = undefined,
    setModal: setModalLocal = undefined,
    atras: atrasLocal = undefined,
  }: recetProp<F>) => {

    const newReset = resetLocal || reset;
    const newResetSelect = resetSelect || resetSelectLocal;
    const newSetModal = setModalLocal || setModal;
    const newRuta = rutaLocal || ruta;
    const newAtras = atrasLocal || atras;

    if (newReset) newReset();
    if (newResetSelect) dispatch(newResetSelect());
    if (newSetModal) newSetModal(false);
    if (newAtras) { navigate(-1) };
    if (newRuta) navigate(newRuta);
  }

  const retroceder = () => {
    resetForm({ atras: true })
  }

  const pasarDesplegable = <T extends HasId, K extends keyof T = keyof T>({ items, clave }: Prop<T, K>): Opcion[] => {
    const newClave: K = (clave || 'nombre') as K
    const opciones: Opcion[] =  [{ value: '', label: 'Seleccionar' }]
    items.map(d => {
      opciones.push({ value: d.id, label: String(d[newClave]) });
    });
    return opciones
  }

  return { resetForm, retroceder, pasarDesplegable }
}

export default useFormulario;