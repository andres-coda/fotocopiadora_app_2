import { useDispatch } from "react-redux"
import { ReduxSimple, ReduxSimpleElemento } from "../../redux/modelo/reduxContext.interface";
import { HasId } from "../../modelo/general/hasId.interface";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect } from "react";

interface Prop<T extends HasId> {
  obtenerBusqueda: () => void;
  loading?: boolean;
  error?:string | null;
  response?:T[] | null;
  responseElemento?: T | null;
  datos?: ReduxSimple<T>;
  dato?:ReduxSimpleElemento<T>;
  setLoading: ActionCreatorWithPayload<boolean>;
  setError: ActionCreatorWithPayload<string>;
  cargaInicial?: ActionCreatorWithPayload<T[]>;
  cargaInicialElemento?: ActionCreatorWithPayload<T | null>;
  token:string | null;
}

const useCargaDatosInicialesSimplesArray = <T extends HasId>({
  datos = undefined,
  dato = undefined, 
  obtenerBusqueda, 
  cargaInicial = undefined, 
  cargaInicialElemento = undefined,
  loading=false, 
  setLoading, 
  error = undefined, 
  response = undefined, 
  responseElemento = undefined,
  setError, 
  token = null
}:Prop<T>) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!datos && !dato) return
    if(datos && !datos.cargaInicial && !datos.loading && token) {
      obtenerBusqueda();
    }
    if(dato && !dato.cargaInicial && !dato.loading && token) {
      obtenerBusqueda();
    }
  },[datos?.cargaInicial, token, dato?.cargaInicial]);

  useEffect(()=>{
    dispatch(setLoading(loading))
  },[loading])

  useEffect(()=>{
    if(!response && !responseElemento) return
    if(response && cargaInicial){
      dispatch(cargaInicial(response))
      return
    }
    if(responseElemento && cargaInicialElemento){
      dispatch(cargaInicialElemento(responseElemento))
    }
  },[response, cargaInicial, responseElemento, cargaInicialElemento])

  useEffect(()=>{
      dispatch(setError(error || ''))
  },[error])
}

export default useCargaDatosInicialesSimplesArray
