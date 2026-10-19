import { useEffect, useState } from "react";
import { DatoCobroProp } from "../../../../modelo/Entidades/dato_cobro/datoCobro.interface";
import useDatosCobroApi from "../../../../servicio/dato_cobro/useDatosCobroApi";
import { useModalContext } from "../../../../contexto/contextoModal";
import Boton from "../../../../componente-estilo/boton/boton";
import Cargando from "../../../../componente/cargando/cargando";
import Texto from "../../../../componente-estilo/texto/texto";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import DatoCobroCard from "./datoCobroCard";
import './perfilDatosCobro.css'

interface Props {
  esAdmin: boolean;
  onNuevo: () => void;
  onEditar: (datoCobro: DatoCobroProp) => void;
  onEliminar: (datoCobro: DatoCobroProp) => void;
}

/**
 * dato_cobro no tiene slice de Redux. El response de useApiPaginado se limpia
 * solo a los 3s, asi que la lista se retiene en estado local y se refresca
 * cada vez que cambia el estado del modal (alta, edicion o baja).
 */
const PerfilDatosCobro = ({ esAdmin, onNuevo, onEditar, onEliminar }: Props) => {
  const { obtenerDatosCobroBusqueda, responseDatosCobro, loadingDatosCobro, errorFetchDatosCobro } = useDatosCobroApi();
  const { modal } = useModalContext();
  const [datos, setDatos] = useState<DatoCobroProp[]>([]);

  useEffect(() => {
    // La lista es sin paginar: una empresa tiene pocos datos de cobro.
    obtenerDatosCobroBusqueda({ query: '', limite: 20, pagina: 1 });
  }, [modal]);

  useEffect(() => {
    if (responseDatosCobro) setDatos(responseDatosCobro.datos);
  }, [responseDatosCobro]);

  return (
    <div className="perfil-datos-cobro">
      {esAdmin && <Boton texto="Nuevo dato de cobro" onClick={onNuevo} titulo="Nuevo dato de cobro" />}
      {errorFetchDatosCobro && <Texto texto={errorFetchDatosCobro} error chica />}
      {loadingDatosCobro && datos.length === 0 && <Cargando />}
      {!loadingDatosCobro && datos.length === 0 && <TextoVacio entidad="datos de cobro" />}
      {datos.map(dato => (
        <DatoCobroCard
          key={dato.id}
          datoCobro={dato}
          esAdmin={esAdmin}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default PerfilDatosCobro;
