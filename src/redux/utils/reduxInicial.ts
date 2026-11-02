import { limiteDefecto } from "../../utils/constantes";
import { orden, UltimaBusquedaProp, ReduxProp } from "../modelo/reduxContext.interface";
import { EmpresaSesionProp } from "../state/empresa.state";

const busquedaReduxInicial = <T>(orden: keyof T, limite?:number): UltimaBusquedaProp<T> => {
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

export const empresaInicial: EmpresaSesionProp = {
  empresa: null,
  cargando: false,
  error: null,
  solicitada: false,
};