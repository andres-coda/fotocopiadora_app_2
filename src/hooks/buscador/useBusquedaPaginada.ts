import { useDispatch } from "react-redux";
import { orden, ReduxProp, UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import { useEffect, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";

interface UseBuscadorPaginadoProp<T> {
  datosRedux: ReduxProp<T>;
  resetBusqueda: () => UnknownAction;
  crearBusqueda: (busqueda: UltimaBusquedaProp<T>) => UnknownAction;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  response: PaginadoProp<T> | null;
  orden?: orden;
  limiteLetrasBusqueda?: number;
}

const useBusquedaPaginada = <T>({
  datosRedux,
  resetBusqueda,
  crearBusqueda,
  obtenerBusqueda,
  response,
  orden = 'asc',
  limiteLetrasBusqueda = 3,
}: UseBuscadorPaginadoProp<T>) => {
  const dispatch = useDispatch();

  const [valor, setValor] = useState<string>('');
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

  return { valor, setValor }

}

export default useBusquedaPaginada;