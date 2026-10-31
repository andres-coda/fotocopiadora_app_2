import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface";
import usePropuestaDeleteApi from "../../../../servicio/propuesta/usePropuestaDeleteApi";
import EliminarElemento from "../../../../componente-estilo/eliminar/eliminarElemento";
import { eliminarPropuestaRedux } from "../../../../redux/state/propuesta.state";

const tituloEliminarPropuesta = 'Eliminar propuesta';

const volantaEliminarPropuesta = (propuesta: string | undefined): string | undefined => {
  if (!propuesta || propuesta === '') return undefined;
  return `¿Desea confirmar la eliminación del propuesta ---[ ${propuesta} ]--- ?`;
};

const textoEliminarPropuesta = (propuesta: string | undefined): string | undefined => {
  if (!propuesta || propuesta === '') return undefined;
  return `Al eliminar el propuesta ---[ ${propuesta} ]--- también se borrara de la lista de favoritos de los trabajadores que así lo tengan.`;
};

const msjExitoEliminarPropuesta = (propuesta: string | undefined): string | undefined => {
  if (!propuesta || propuesta === '') return undefined;
  return `El propuesta ---[ ${propuesta} ]--- fue eliminado con exito`;
};

interface Prop{
  retroceder?: ()=>void;
  propuesta?:PropuestaProp
}

const EliminarPropuesta = ({retroceder, propuesta}:Prop) => {

  const {
    eliminarPropuesta: eliminar,
    responsePropuesta,
    errorFetchPropuesta,
    loadingPropuesta,
  } = usePropuestaDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarPropuesta}
      volanta={volantaEliminarPropuesta(propuesta?.nombre)}
      entidad="propuesta"
      texto={textoEliminarPropuesta(propuesta?.nombre)}
      msjExito={msjExitoEliminarPropuesta(propuesta?.nombre)}
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
