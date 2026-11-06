import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import LibroCard from '../../privado/paginas/libro/componente/libroCard';
import { seleccionarLibro } from '../../redux/state/libro.state';
import useLibrosApi from '../../servicio/libro/useLibrosApi';
// useLibroDeleteApi removed (unused).
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import { rutaPrivadaBase, RutasPrivadas } from '../../privado/rutas/rutasPrivadas';

const LibrosSuper = () => {
  const navigate = useNavigate();
  const [valor, setValor] = useState<string>('');
  const { obtenerLibrosBusqueda, responseLibros, loadingLibros, errorFetchLibros } = useLibrosApi();
  // eliminarLibro available via useLibroDeleteApi if needed.

  useEffect(() => {
    obtenerLibrosBusqueda({ query: '', limite: 20, pagina: 1 });
  }, []);

  const handleBuscar = () => {
    obtenerLibrosBusqueda({ query: valor, limite: 20, pagina: 1 });
  };

  const dispatch = useDispatch();
  const libros: LibroProp[] = (responseLibros as any)?.datos ?? [];

  return (
    <ContenedorCentro loading={loadingLibros} error={errorFetchLibros ?? undefined}>
      <div style={{ padding: '1rem' }}>
        <input
          type="text"
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="Buscar libro"
        />
        <button type="button" onClick={handleBuscar}>Buscar</button>
      </div>
      {libros.map((libro: LibroProp) => (
        <LibroCard
          libro={libro}
          key={libro.id}
          selecLibro={(l) => { dispatch(seleccionarLibro(l)); navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_EDITAR}`); }}
        />
      ))}
      {libros.length === 0 && !loadingLibros && <Texto texto="Sin resultados" />}
    </ContenedorCentro>
  );
};

export default LibrosSuper;