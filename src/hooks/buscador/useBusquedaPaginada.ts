import { useDispatch } from "react-redux";
import { orden, ReduxProp, UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import { RefObject, useEffect, useRef, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";

interface UseBuscadorPaginadoProp<T> {
  valor: string;
  datosRedux: ReduxProp<T>;
  resetBusqueda: () => UnknownAction;
  crearBusqueda: (busqueda: UltimaBusquedaProp<T>) => UnknownAction;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  response: PaginadoProp<T> | null;
  orden?: orden;
  limiteLetrasBusqueda?: number;
}

const useBusquedaPaginada = <T>({
  valor,
  datosRedux,
  resetBusqueda,
  crearBusqueda,
  obtenerBusqueda,
  response,
  orden = 'asc',
  limiteLetrasBusqueda = 3,
}: UseBuscadorPaginadoProp<T>) => {

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { setModal } = useModalContext();

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(valor);
    }, 500);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    if (query.length < limiteLetrasBusqueda) {
      dispatch(resetBusqueda());
    } else {
      const busqueda = datosRedux.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase()
      );
      if (busqueda) {
        dispatch(crearBusqueda(busqueda));
      } else {
        obtenerBusqueda({ query })
      }
    }
  }, [query])

  useEffect(() => {
    if (response) {
      dispatch(crearBusqueda({
        query: query,
        datosQuery: response.datos,
        total: response.total,
        pagina: response.pagina,
        limite: response.limite,
        orden
      }))
    }
  }, [response]);

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    } else {
      setModal(true);
    }

  }

  return { contenedorRef, nuevoElemento }

}

export default useBusquedaPaginada;