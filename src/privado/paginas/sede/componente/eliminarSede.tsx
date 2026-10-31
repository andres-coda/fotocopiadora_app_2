import { useSelector } from 'react-redux';
import useSedeDeleteApi from '../../../../servicio/sede/useSedeDeleteApi';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { appStore } from '../../../../redux/store';
import { eliminarSedeRedux } from '../../../../redux/state/sede.state';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';


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

const EliminarSede = () => {
  const sede: SedeProp | undefined = useSelector((store: appStore) => store.sede.datoSeleccionado);
  const { eliminarSede, responseSede, errorFetchSede, loadingSede } = useSedeDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarSede}
      volanta={volantaEliminarSede(sede?.nombre)}
      entidad="sede"
      texto={textoEliminarSede(sede?.nombre)}
      msjExito={msjExitoEliminarSede(sede?.nombre)}
      eliminarElemento={eliminarSede}
      loading={loadingSede}
      errorFetch={errorFetchSede}
      response={responseSede}
      elemento={sede}
      eliminarElementoRedux={eliminarSedeRedux}
    />
  );
};

export default EliminarSede;
