import { RefObject, useEffect, useRef } from "react";
import { UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";

interface Prop<T> {
  datos?: UltimaBusquedaProp<T>;
  query?: string;
  loading?: boolean;
  limiteLetrasBusqueda?: number;
  cargaInicial?: boolean;
  claves?:boolean;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
}

const useFinPagina = <T>({
  datos, query = undefined, loading = false, limiteLetrasBusqueda = 0, cargaInicial = false, obtenerBusqueda, claves = false
}: Prop<T>) => {
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);
  // Ref para no recrear el observer cada vez que cambia `loading` (eso disparaba
  // una carga extra al terminar cada pagina).
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  useEffect(() => {
    if (!datos && !cargaInicial) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        if ((query != undefined && query.length >= limiteLetrasBusqueda && datos?.query != query) || 
        (claves)
        ) {
          return;
        }
        if (loadingRef.current) {
          return;
        }

        const paginaActual = datos ? Number(datos.pagina) : 0;
        const limite = datos ? Number(datos.limite) : undefined;
        const total = datos ? Number(datos.total) : 0;

        // Ya no hay mas paginas: no pedir otra.
        if (datos && paginaActual != 0 && limite && paginaActual * limite >= total) {
          return;
        }

        obtenerBusqueda({
          pagina: paginaActual + 1,
          limite: limite,
          query: query || '',
        });
      },
      {
        root: contenedorRef.current,
        threshold: 0.2,
      }
    );

    if (finListaRef.current) {
      observer.observe(finListaRef.current);
    }

    return () => observer.disconnect();
  }, [datos?.query, datos?.pagina, query, cargaInicial]);

  return { contenedorRef, finListaRef }
}

export default useFinPagina