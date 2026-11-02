import { useEffect, useState } from "react";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";

const tiempoBusqueda = 300;


interface Prop{
  valor:string;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  limiteLetrasBusqueda?: number;
  paginado?:boolean;
}

const useBuscadorQuery = ({valor, obtenerBusqueda, limiteLetrasBusqueda = 3, paginado = false}:Prop) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    console.log('valor: ', valor);
    const timer = setTimeout(() => {
      setQuery(valor);
    }, tiempoBusqueda);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    if (query.length >= limiteLetrasBusqueda && !paginado) {
      obtenerBusqueda({ query });
    }
  }, [query, paginado]);

  return {query}
}

export default useBuscadorQuery
