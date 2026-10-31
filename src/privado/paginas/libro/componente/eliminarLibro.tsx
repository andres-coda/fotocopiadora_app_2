import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { nombreLibroXstring } from '../../../../utils/formatoDatos';
import { eliminarLibroRedux } from '../../../../redux/state/libro.state';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import useLibroDeleteApi from '../../../../servicio/libro/useLibroDeleteApi';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';

const tituloEliminarLibro = 'Eliminar libro';

const volantaEliminarLibro = (libro: string | undefined): string | undefined => {
  if (!libro || libro === '') return undefined;
  return `¿Desea confirmar la eliminación del libro ---[ ${libro} ]--- ?`;
};

const textoEliminarLibro = (libro: string | undefined): string | undefined => {
  if (!libro || libro === '') return undefined;
  return `Además de eliminarse el libro ---[ ${libro} ]--- se eliminaran todos los pedidos relacionados a este libro.`;
};

const msjExitoEliminarLibro = (libro: string | undefined): string | undefined => {
  if (!libro || libro === '') return undefined;
  return `El libro ---[ ${libro} ]--- fue eliminado con exito`;
};

interface Prop {
  libro: LibroProp;
}
const EliminarLibro = ({ libro }: Prop) => {
  const { eliminarLibro, errorFetchLibro, loadingLibro, responseLibro } = useLibroDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarLibro}
      volanta={volantaEliminarLibro(nombreLibroXstring(libro))}
      entidad="libro"
      texto={textoEliminarLibro(nombreLibroXstring(libro))}
      msjExito={msjExitoEliminarLibro(nombreLibroXstring(libro))}
      eliminarElemento={eliminarLibro}
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
      response={responseLibro}
      elemento={libro}
      eliminarElementoRedux={eliminarLibroRedux}
      ruta={`${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_LISTA}`}
    />
  );
};

export default EliminarLibro;
