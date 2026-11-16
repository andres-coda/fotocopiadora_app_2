import { useNavigate } from 'react-router-dom';
import Boton from '../../../../../componente-estilo/boton/boton';
import Botonera from '../../../../../componente-estilo/botonera/botonera';
import Texto from '../../../../../componente-estilo/texto/texto';
import { useModalContext } from '../../../../../contexto/contextoModal';
import { nombreLibroXstring } from '../../../../../utils/formatoDatos';
import { armadoInicial, BusquedaLibroCompletoInicial, PantallaCargarLibro, useLibroContext } from '../../contexto/contexto.libro';
import { useDispatch } from 'react-redux';
import { seleccionarLibro } from '../../../../../redux/state/libro.state';
import { rutaBase, RutasPrivadas } from '../../../../rutas/rutasPrivadas';

const LibroCargarGuardado = () => {
  const { setPantalla, busquedaCompleta, setArmado, setBusquedaCompleta } = useLibroContext();
  const { setModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!busquedaCompleta?.libro_guardado)
    return (
      <Texto texto="Ocurrio un error al intentar mostrar el libro guardado" mediana centrado />
    );

  return (
    <div className="crear-libro-menu">
      <Texto texto={nombreLibroXstring(busquedaCompleta.libro_guardado)} mediana centrado />
      <Texto texto={`El libro fue guardado con exito`} centrado />
      <Botonera>
        <Boton
          onClick={() => {
            setModal(false);
          }}
          texto="Atras"
          edit
        />
        <Boton
          onClick={() => {
            dispatch(seleccionarLibro(busquedaCompleta.libro_guardado));
            navigate(`/${rutaBase.PRIVADO}/${RutasPrivadas.LIBRO}`), 
            setModal(false);
          }}
          texto="Ir al libro"
          secundario
        />
        <Boton
          onClick={() => {
            setArmado(armadoInicial);
            setBusquedaCompleta(BusquedaLibroCompletoInicial);
            setPantalla(PantallaCargarLibro.INICIO)
          }}
          texto="Nuevo libro"
        />
      </Botonera>
    </div>
  );
};

export default LibroCargarGuardado;
