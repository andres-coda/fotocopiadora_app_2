import { useSelector } from "react-redux";
import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface";
import { appStore } from "../../../../redux/store";
import usePropuestaDeleteApi from "../../../../servicio/propuesta/usePropuestaDeleteApi";
import EliminarElemento from "../../../../componente-estilo/eliminar/eliminarElemento";
import { eliminarPropuestaRedux } from "../../../../redux/state/propuesta.state";

interface Prop{
  retroceder?: ()=>void
}

const EliminarPropuesta = ({retroceder}:Prop) => {
  const propuesta: PropuestaProp | undefined = useSelector(
    (store: appStore) => store.propuesta.datoSeleccionado
  );
  const {
    eliminarPropuesta: eliminar,
    responsePropuesta,
    errorFetchPropuesta,
    loadingPropuesta,
  } = usePropuestaDeleteApi();

  return (
    <EliminarElemento
      articulo="la"
      entidad="propuesta"
      texto={`${propuesta?.nombre}`}
      eliminarElemento={eliminar}
      loading={loadingPropuesta}
      errorFetch={errorFetchPropuesta}
      response={responsePropuesta}
      elemento={propuesta}
      eliminarElementoRedux={eliminarPropuestaRedux}
      retroceder={retroceder}
    />
  );
};

export default EliminarPropuesta;
