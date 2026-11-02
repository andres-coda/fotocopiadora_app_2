import { useDispatch } from "react-redux";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import useFinPagina from "./useFinPagina";
import { useEffect } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Prop<T> {
  datos: UltimaBusquedaProp<T>;
  query?: string;
  loading?: boolean;
  limiteLetrasBusqueda?: number;
  cargaInicial?: boolean;
  response?: PaginadoProp<T> | null;
  crearBusquedaRedux?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  crearBusquedaInicial?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  actualizarBusquedaRedux?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
}

const useFinPaginaRedux = <T>({
  datos, query = undefined, loading = false, limiteLetrasBusqueda = 0, cargaInicial = false, obtenerBusqueda,
  response = undefined, crearBusquedaRedux = undefined, actualizarBusquedaRedux = undefined,
  crearBusquedaInicial = undefined
}: Prop<T>) => {

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('datos: ', datos);
    console.log('carga inicial: ', cargaInicial)
  },[])

  useEffect(() => {
    if (!response) return;
    const respuestaDto: UltimaBusquedaProp<T> = {
      ...datos, ...response,
      datosQuery: response.datos,
    };

    if(cargaInicial && crearBusquedaInicial) {
      dispatch(crearBusquedaInicial(respuestaDto))
      return
    }

    if (response.pagina === 1 && crearBusquedaRedux) {
      dispatch(crearBusquedaRedux(respuestaDto));
    } else if(actualizarBusquedaRedux){
      dispatch(actualizarBusquedaRedux(respuestaDto));
    }
  }, [response]);


  const { finListaRef, contenedorRef } = useFinPagina({
    datos, query, loading, limiteLetrasBusqueda, cargaInicial, obtenerBusqueda
  })

  return { finListaRef, contenedorRef }
}

export default useFinPaginaRedux
