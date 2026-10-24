import { useDispatch, useSelector } from 'react-redux';
import Texto from '../../../../componente-estilo/texto/texto';
import { useModalContext } from '../../../../contexto/contextoModal';
import useSedeDeleteApi from '../../../../servicio/sede/useSedeDeleteApi';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { appStore } from '../../../../redux/store';
import Cargando from '../../../../componente/cargando/cargando';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Boton from '../../../../componente-estilo/boton/boton';
import Eliminar from '../../../../assets/deleted.svg?react';
import Atras from '../../../../assets/arrow.svg?react';
import { eliminarSedeRedux } from '../../../../redux/state/sede.state';
import CartelExito from '../../../../componente/cartelExito/cartelExito';

const EliminarSede = () => {
  const sede: SedeProp | undefined = useSelector((store: appStore) => store.sede.datoSeleccionado);
  const { eliminarSede, responseSede, errorFetchSede, loadingSede } = useSedeDeleteApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  const eliminarSedeDelRedux = () => {
    if (sede) dispatch(eliminarSedeRedux(sede.id));
    setModal(false);
  };

  if (loadingSede || !sede) return <Cargando />;
  if (errorFetchSede) return <Texto texto={errorFetchSede} error chica />;
  if (responseSede)
    return (
      <CartelExito
        mensaje={`La sede ---[ ${sede.nombre} ]--- fue eliminada con exito`}
        onCerrar={eliminarSedeDelRedux}
        delay={3000}
      />
    );

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar la sede`} centrado mediana />
        <Texto texto={`---[ ${sede.nombre} ]---`} chica centrado />
        <Botonera>
          <Boton
            icono={<Atras />}
            secundario
            onClick={() => setModal(false)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Atras"
          />
          <Boton
            icono={<Eliminar />}
            onClick={() => eliminarSede(sede.id)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Eliminar sede"
          />
        </Botonera>
      </div>
    </div>
  );
};

export default EliminarSede;
