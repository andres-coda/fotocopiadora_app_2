import { useSelector } from 'react-redux';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import { appStore } from '../../redux/store';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import { nombreLibroXstring } from '../../utils/formatoDatos';
import Boton from '../../componente-estilo/boton/boton';
import Editar from '../../assets/edit.svg?react';
import Eliminar from '../../assets/deleted.svg?react';
import LibroSelectNombre from '../../privado/paginas/libro/componente/libroSelectNombre';
import LibroSelectExtra from '../../privado/paginas/libro/componente/libroSelectExtra';
import LibroSelectLocal from '../../privado/paginas/libro/componente/libroSelectLocal';
import { Dispatch, SetStateAction } from 'react';
import '../../privado/paginas/libro/componente/libroSelect.css';
import Botonera from '../../componente-estilo/botonera/botonera';
import DesplegableEmpresas from './componente/desplegableEmpresas';

interface Prop {
  onEliminar?: Dispatch<SetStateAction<boolean>>;
  onEditar?: Dispatch<SetStateAction<boolean>>;
}

const LibroSelectSuper = ({ onEditar = undefined, onEliminar = undefined }: Prop) => {
  const libro: LibroProp | undefined = useSelector(
    (store: appStore) => store.libro.datoSeleccionado
  );

  if (!libro) return <p>No se encontro el libro seleccionado</p>;
  return (
    <ContenedorCentro scroll>
      <div className="libro-superior" title={nombreLibroXstring(libro)}>
        {libro.img ? <img src={libro.img} alt={libro.nombre} className="libro-img" /> : null}
        <div className="div-vertical">
          <LibroSelectNombre libro={libro} />
          <LibroSelectExtra libro={libro} />
        </div>
      </div>
      <Botonera derecha>
        {onEliminar && (
          <Boton
            icono={<Eliminar />}
            secundario
            onClick={() => onEliminar(true)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Eliminar libro"
          />
        )}
        {onEditar && (
          <Boton
            icono={<Editar />}
            onClick={() => onEditar(true)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Editar libro"
          />
        )}
      </Botonera>
      <DesplegableEmpresas/>
    </ContenedorCentro>
  );
};

export default LibroSelectSuper;
