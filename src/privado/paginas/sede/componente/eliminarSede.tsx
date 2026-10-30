import { useSelector } from 'react-redux';
import useSedeDeleteApi from '../../../../servicio/sede/useSedeDeleteApi';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { appStore } from '../../../../redux/store';
import { eliminarSedeRedux } from '../../../../redux/state/sede.state';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const EliminarSede = () => {
  const sede: SedeProp | undefined = useSelector((store: appStore) => store.sede.datoSeleccionado);
  const { eliminarSede, responseSede, errorFetchSede, loadingSede } = useSedeDeleteApi();

  return (
    <EliminarElemento
      articulo="la"
      entidad="sede"
      texto={`${sede?.nombre}`}
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
