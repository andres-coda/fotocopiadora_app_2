import { HasId } from "../../modelo/general/hasId.interface";
import { limiteDefecto } from "../../utils/constantes";
import { orden, UltimaBusquedaProp, ReduxProp, ReduxSimple, ReduxSimpleElemento } from "../modelo/reduxContext.interface";

export const busquedaReduxInicial = <T>(orden: keyof T, limite?: number): UltimaBusquedaProp<T> => {
  return {
    query: undefined,
    datosQuery: [],
    sortBy: orden,
    sortOrder: 'asc' as orden,
    pagina: 0,
    limite: limite || limiteDefecto,
    total: 0,
  }
}

export const estadoInicialRedux = <T>(orden: keyof T, limite?: number): ReduxProp<T> => {
  return {
    datosIniciales: busquedaReduxInicial<T>(orden, limite),
    busquedaActual: busquedaReduxInicial<T>(orden, limite),
    ultimasBusqueda: [],
    datoSeleccionado: undefined,
    cargaInicial: false
  }
}

export const estadoInicialSimple = <T extends HasId>(): ReduxSimple<T> => {
  return {
    datos: [],
    cargaInicial: false,
    error:undefined,
    loading: false,
  }
}

export const estadoInicialSimpleElemento = <T extends HasId>(): ReduxSimpleElemento<T> => {
  return {
    dato: null,
    cargaInicial: false,
    error:undefined,
    loading: false,
  }
}