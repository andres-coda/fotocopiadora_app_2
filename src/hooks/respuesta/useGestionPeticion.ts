import { useEffect, useRef } from "react";
import { HasId } from "../../modelo/general/hasId.interface"
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface"
import { ReduxProp, UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface"
import { limiteDefecto } from "../../utils/constantes";
import { useDispatch } from "react-redux";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Prop<T> {
  datos: ReduxProp<T>
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  //La condicion debe negarse para realizar el llamado
  condicion?: boolean;
  //Para realizar el llamado la query tiene que ser mayor al limite, distinta a otras 
  //querys guardadas en cache, y tener carga inicial. O paginar
  query?: string;
  limiteLetrasBusqueda?: number;
  resetearBusqueda: ActionCreatorWithoutPayload;
  crearBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  limite?: number;
  //Huella de los filtros/orden vigentes. Si cambia, la busqueda se repite aunque
  //el texto sea el mismo; con `clave` presente, un texto corto tambien consulta.
  clave?: string;
}

const useGestionPeticion = <T extends HasId>({
  datos,
  obtenerBusqueda,
  condicion = false,
  query = '',
  limiteLetrasBusqueda = limiteDefecto,
  resetearBusqueda,
  crearBusqueda,
  limite = datos.busquedaActual.limite,
  clave = undefined
}: Prop<T>) => {
  const dispatch = useDispatch();

  // Refs de REQUEST (query con la que se disparo cada pedido): se usan para
  // paginar solo la busqueda vigente y para no repetir una busqueda ya hecha.
  // El reset los pone en '' para que la respuesta vieja se descarte.
  const queryRef = useRef<string>('');
  const claveRef = useRef<string | undefined>(undefined);

  //Recetea la busqueda a datos iniciales cuando la query es menor al limite
  //y no hay filtros que justifiquen un pedido.
  useEffect(() => {
    if (query.length >= limiteLetrasBusqueda || clave) return;
    queryRef.current = '';
    claveRef.current = undefined;
    dispatch(resetearBusqueda());
  }, [query, clave]);

  //realiza peticion si la query es mayor al limite (o hay filtros), si no hay condicion, 
  //si ya se cargo inicialmente y si la query actual es distinta a la query de la peticion
  useEffect(() => {
    const consulta = query.length >= limiteLetrasBusqueda || Boolean(clave);
    if (!consulta || condicion || !datos.cargaInicial) return;
    if (queryRef.current === query && claveRef.current === clave) return;

    const busqueda: UltimaBusquedaProp<T> | undefined = datos.ultimasBusqueda.find(
      (d) => d.query?.toLowerCase() === query.toLowerCase() && d.clave === clave
    );
    queryRef.current = query;
    claveRef.current = clave;
    if (busqueda) {
      dispatch(crearBusqueda(busqueda));
    } else {
      obtenerBusqueda({ query, limite });
    }
  }, [query, condicion, datos.cargaInicial, clave]);

  //realiza la peticion para la carga inicial de datos si no hay condicion
  useEffect(() => {
    if (!datos.cargaInicial && !condicion) {
      obtenerBusqueda({ query: '', limite });
    }
  }, [condicion]);
  return { queryRef }
}

export default useGestionPeticion
