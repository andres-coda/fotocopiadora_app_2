import { useSelector } from "react-redux";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { ReduxProp } from "../../../../redux/modelo/reduxContext.interface";
import { appStore } from "../../../../redux/store";
import useLibrosApi from "../../../../servicio/libro/useLibrosApi";
import { useState } from "react";
import useBusquedaPaginada from "../../../../hooks/buscador/useBusquedaPaginada";
import { agregarLibrosBusquedaActual, crearBusquedaLibro, resetBusquedaLibro } from "../../../../redux/state/libro_empresa.state";
import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface";
import usePropuestasApi from "../../../../servicio/propuesta/usePropuestasApi";
import { agregarPropuestasBusquedaActual, crearBusquedaPropuesta, resetBusquedaPropuesta } from "../../../../redux/state/propuesta.state";
import { listaLibroPropuestaSeleccionable } from "../util/funcionesAdicionales";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";

interface BuscadorLibroProp {
  opcionesActivas: string[];
}

const useBuscadorLibro = ({ opcionesActivas }: BuscadorLibroProp) => {
  const [valor, setValor] = useState<string>('');
  const librosDatos: ReduxProp<LibroProp> = useSelector((store: appStore) => store.libro_empresa);
  const { obtenerLibrosBusqueda, responseLibros, loadingLibros } = useLibrosApi();

  const propuestaDatos: ReduxProp<PropuestaProp> = useSelector((store: appStore) => store.propuesta);
  const { obtenerPropuestas, responsePropuestas, loadingPropuestas } = usePropuestasApi();

  const handleNuevoElemento = () => {
    if(!opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)){
      nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_CARGAR}`)
    }
    nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`)
  }

  const { contenedorRef, nuevoElemento, finListaRef } = useBusquedaPaginada<LibroProp>({
    valor: !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) ? valor : '',
    datosRedux: librosDatos,
    resetBusqueda: resetBusquedaLibro,
    crearBusqueda: crearBusquedaLibro,
    obtenerBusqueda: obtenerLibrosBusqueda,
    agregarBusqueda: agregarLibrosBusquedaActual,
    response: responseLibros,
    loading: loadingLibros,
  });

  const { } = useBusquedaPaginada<PropuestaProp>({
    valor: !opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre) ? valor : '',
    datosRedux: propuestaDatos,
    resetBusqueda: resetBusquedaPropuesta,
    crearBusqueda: crearBusquedaPropuesta,
    obtenerBusqueda: obtenerPropuestas,
    agregarBusqueda: agregarPropuestasBusquedaActual,
    response: responsePropuestas,
    loading: loadingPropuestas,
  });

  const libros: LibroProp[] = !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) ? librosDatos?.busquedaActual?.datosQuery ?? [] : [];

  const propuestas: PropuestaProp[] = !opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre) ? propuestaDatos?.busquedaActual?.datosQuery ?? [] : [];

  return { valor, setValor, handleNuevoElemento, contenedorRef, libros, propuestas, finListaRef }
}

export default useBuscadorLibro;