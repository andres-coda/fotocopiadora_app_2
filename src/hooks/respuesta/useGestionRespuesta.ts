import { useEffect } from "react";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { ReduxProp, UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { HasId } from "../../modelo/general/hasId.interface";
import { useDispatch } from "react-redux";

interface Prop<T> {
  datos: ReduxProp<T>;
  response?: PaginadoProp<T> | null;
  query: string;
  crearDatos?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  crearBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  agregarBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  //Huella de los filtros/orden con los que se hizo el pedido.
  clave?: string;
}

const useGestionResponse = <T extends HasId>({
  datos,
  response = undefined,
  query,
  crearBusqueda,
  crearDatos = undefined,
  agregarBusqueda,
  clave = undefined,
}: Prop<T>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!response) return;
    const respuestaDto: UltimaBusquedaProp<T> = {
      ...datos.busquedaActual,
      ...response,
      // La query ya no se stampa desde el front: el back la devuelve como echo
      // del termino con el que se pidio. Si falta (back viejo), cae a ''.
      query: response.query ?? '',
      datosQuery: response.datos,
      ...(clave !== undefined ? { clave } : {}),
    };

    if (!datos.cargaInicial && crearDatos) {
      dispatch(crearDatos(respuestaDto));
      return;
    }

    // La respuesta es de otra busqueda (la query cambio mientras estaba en
    // vuelo, p. ej. se borro el input): se descarta para no repoblar la lista
    // con resultados viejos. La paginacion legitima pasa porque response.query
    // coincide con la query vigente.
    if ((response.query ?? '') !== query) return;
    // Una pagina 2 o posterior de otra clave (filtros cambiados) tampoco suma:
    // la pagina 1 de la nueva clave reemplaza la lista.
    if (response.pagina !== 1 && clave !== undefined && datos.busquedaActual.clave !== clave) return;
    if (response.pagina === 1) {
      dispatch(crearBusqueda(respuestaDto));
    } else {
      dispatch(agregarBusqueda(respuestaDto));
    }
  }, [response])

}

export default useGestionResponse
