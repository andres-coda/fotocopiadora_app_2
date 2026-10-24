import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Texto from '../../../../componente-estilo/texto/texto';
import Cargando from '../../../../componente/cargando/cargando';
import { useModalContext } from '../../../../contexto/contextoModal';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import useLibroDeleteApi from '../../../../servicio/propuesta/usePropuestaDeleteApi';
import { nombreLibroXstring } from '../../../../utils/formatoDatos';
import Eliminar from '../../../../assets/deleted.svg?react';
import Atras from '../../../../assets/arrow-small.svg?react';
import { useEffect } from 'react';
import useRetardo from '../../../../hooks/tiempo/useRetardo';
import { useDispatch } from 'react-redux';
import { eliminarLibroRedux } from '../../../../redux/state/libro.state';
import { useNavigate } from 'react-router-dom';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';

interface Prop {
  libro: LibroProp;
}
const EliminarLibro = ({ libro }: Prop) => {
  const { eliminarLibro, errorFetchLibro, loadingLibro, responseLibro } = useLibroDeleteApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const retardoRecetRetardo = useRetardo(() => {
    (setModal(false),
      dispatch(eliminarLibroRedux(libro.id)),
      navigate(`${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_LISTA}`));
  }, 3000);

  useEffect(() => {
    if (responseLibro) {
      retardoRecetRetardo();
    }
  }, [responseLibro]);

  if (loadingLibro) return <Cargando />;
  if (errorFetchLibro) return <Texto texto={errorFetchLibro} error chica />;
  if (responseLibro)
    return (
      <Texto
        texto={`El libro ---[ ${nombreLibroXstring(libro)} ]--- fue eliminado con exito`}
        centrado
      />
    );

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el libro`} centrado mediana />
        <Texto
          texto={`Además de eliminarse el libro ---[ ${nombreLibroXstring(libro)} ]--- se eliminaran todos los item pedidos relacionados a este libro. 
              Y si son pedido único, también se eliminaran los pedidos relacionados.`}
          chica
        />
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
            onClick={() => eliminarLibro(libro.id)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Eliminar libro"
          />
        </Botonera>
      </div>
    </div>
  );
};

export default EliminarLibro;
