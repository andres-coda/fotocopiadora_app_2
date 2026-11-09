import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../redux/store";
import { usuarioProps } from "../../../modelo/usuario/Usuario.interface";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import useUsuariosApi from "../../../servicio/usuario/useUsuariosApi";
import useGestionPeticion from "../../../hooks/respuesta/useGestionPeticion";
import { agregarUsuariosBusquedaActual, crearBusquedaUsuario, crearUsuarios, resetBusquedaUsuario, resetReduxUsuario } from "../../../redux/state/usuarios.state";
import useGestionResponse from "../../../hooks/respuesta/useGestionRespuesta";
import useFinPagina from "../../../hooks/finPagina/useFinPagina";
import { EmpresaProp } from "../../../modelo/Entidades/empresa/empresa.interface";
import { BusquedaApiProp } from "../../../modelo/HTTP/peticiones.interface";
import { useEffect } from "react";
import { esSuper } from "../../../utils/usuario";

const useUsuariosEmpresa = () => {
  const sesion: usuarioProps | null = useSelector((store: appStore) => store.sesion.dato);
  const usuarioRedux: ReduxProp<usuarioProps> = useSelector(
    (store: appStore) => store.usuario
  );

  const dispatch = useDispatch();

  
  const empresaSelect: EmpresaProp | undefined= useSelector((store: appStore) => store.empresa.datoSeleccionado);
  
  const { obtenerUsuarios, obtenerUsuariosByIdEmpresa, responseUsuarios, loadingUsuarios, errorFetchUsuarios } =
  useUsuariosApi();
  
  useEffect(()=>{
    if(esSuper(sesion) && empresaSelect && usuarioRedux.cargaInicial){
      dispatch(resetReduxUsuario())
    }
  },[])

  const obtenerBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
    if(loadingUsuarios) return
    if(esSuper(sesion) && empresaSelect) {
      obtenerUsuariosByIdEmpresa({id:empresaSelect.id, pagina, limite});
      return
    }
    if(sesion?.role === 'admin') {
      obtenerUsuarios({limite, pagina})
    }
  }

  const { queryRef } = useGestionPeticion({
    query: empresaSelect?.id ?? '',
    datos: usuarioRedux,
    obtenerBusqueda,
    resetearBusqueda: resetBusquedaUsuario,
    crearBusqueda: crearBusquedaUsuario,
    condicion:loadingUsuarios,
  });

  useGestionResponse<usuarioProps>({
    datos: usuarioRedux,
    response: responseUsuarios,
    query: queryRef.current,
    crearDatos: crearUsuarios,
    crearBusqueda: crearBusquedaUsuario,
    agregarBusqueda: agregarUsuariosBusquedaActual,
  })

  const { finListaRef, contenedorRef } = useFinPagina<usuarioProps>({
    datos: usuarioRedux.busquedaActual,
    loading: loadingUsuarios,
    obtenerBusqueda,
  });

  return {contenedorRef, finListaRef, sesion, errorFetchUsuarios, loadingUsuarios, 
    vacio:usuarioRedux.cargaInicial && usuarioRedux.busquedaActual.datosQuery.length === 0, 
    usuarios: usuarioRedux.busquedaActual.datosQuery
   }
}

export default useUsuariosEmpresa
