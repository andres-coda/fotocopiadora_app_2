import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { ReduxProp, orden } from "../../../../redux/modelo/reduxContext.interface";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";
import useMensajesApi from "../../../../servicio/mensaje/useMensajesApi";
import { crearMensajes } from "../../../../redux/state/mensaje.state";
import Boton from "../../../../componente-estilo/boton/boton";
import Cargando from "../../../../componente/cargando/cargando";
import Texto from "../../../../componente-estilo/texto/texto";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import MensajeCard from "./mensajeCard";
import './perfilMensajes.css'

interface Props {
  esAdmin: boolean;
  onNuevo: () => void;
  onEditar: () => void;
  setEliminar: Dispatch<SetStateAction<boolean>>;
}

const PerfilMensajes = ({ esAdmin, onNuevo, onEditar, setEliminar }: Props) => {
  const mensajeDatos: ReduxProp<MensajeProp> = useSelector((store: appStore) => store.mensaje);
  const { obtenerMensajesBusqueda, responseMensajes, loadingMensajes, errorFetchMensajes } = useMensajesApi();
  const dispatch = useDispatch();

  useEffect(() => {
    // La lista es sin paginar: una empresa tiene pocos mensajes. Si superara el
    // limite habria que agregar buscador y paginacion como en sede.
    obtenerMensajesBusqueda({ query: '', limite: 20, pagina: 1 });
  }, []);

  useEffect(() => {
    if (responseMensajes) {
      dispatch(crearMensajes({
        query: '',
        datosQuery: responseMensajes.datos,
        total: responseMensajes.total,
        pagina: responseMensajes.pagina,
        limite: responseMensajes.limite,
        sortBy: 'nombre' as keyof MensajeProp,
        sortOrder: 'asc' as orden,
      }));
    }
  }, [responseMensajes]);

  const mensajes: MensajeProp[] = mensajeDatos.busquedaActual.datosQuery;

  return (
    <div className="perfil-mensajes">
      {esAdmin && <Boton texto="Nuevo mensaje" onClick={onNuevo} titulo="Nuevo mensaje" />}
      {errorFetchMensajes && <Texto texto={errorFetchMensajes} error chica />}
      {loadingMensajes && mensajes.length === 0 && <Cargando />}
      {!loadingMensajes && mensajes.length === 0 && <TextoVacio entidad="mensajes" />}
      {mensajes.map(dato => (
        <MensajeCard
          key={dato.id}
          mensaje={dato}
          esAdmin={esAdmin}
          onEditar={onEditar}
          setEliminar={setEliminar}
        />
      ))}
    </div>
  );
}

export default PerfilMensajes;
