import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import useSedeDeleteApi from '../../../../servicio/sede/useSedeDeleteApi';
import { appStore } from '../../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setSedes } from '../../../../redux/state/sede.state';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

interface Props {
  sede: SedeProp;
}

const tituloEliminarSede = 'Eliminar sede';

const volantaEliminarSede = (sede: string | undefined): string | undefined => {
  if (!sede || sede === '') return undefined;
  return `¿Desea confirmar la eliminación de la sede ---[ ${sede} ]--- ?`;
};

const textoEliminarSede = (sede: string | undefined): string | undefined => {
  if (!sede || sede === '') return undefined;
  return `Al eliminar la sede ---[ ${sede} ]--- también se borrara de la configuración de por defecto. 
  Los pedidos que fueron realizados con esta sede, seguiran mostrando esta sede, pero ya no sera seleccionable para nuevos pedidos`;
};

const msjExitoEliminarSede = (sede: string | undefined): string | undefined => {
  if (!sede || sede === '') return undefined;
  return `La sede ---[ ${sede} ]--- fue eliminada con exito`;
};

const EliminarSede = ({ sede }: Props) => {
  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.datos);
  const { eliminarSede, responseSede, errorFetchSede, loadingSede } = useSedeDeleteApi();
  const dispatch = useDispatch();

  return (
    <EliminarElemento
      titulo={tituloEliminarSede}
      volanta={volantaEliminarSede(sede?.nombre)}
      entidad="sede"
      texto={textoEliminarSede(sede?.nombre)}
      msjExito={msjExitoEliminarSede(sede?.nombre)}
      eliminarElemento={() => eliminarSede(sede.id)}
      loading={loadingSede}
      errorFetch={errorFetchSede}
      response={responseSede}
      elemento={sede}
      eliminarElementoRedux={() => dispatch(setSedes(sedes.filter(x => x.id !== sede.id)))}
    />
  );
};

export default EliminarSede;