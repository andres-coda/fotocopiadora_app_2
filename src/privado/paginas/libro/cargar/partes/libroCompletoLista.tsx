import { useEffect } from 'react';
import Boton from '../../../../../componente-estilo/boton/boton';
import Botonera from '../../../../../componente-estilo/botonera/botonera';
import Centro from '../../../../../componente-estilo/centro/centro';
import useFinPagina from '../../../../../hooks/finPagina/useFinPagina';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { BusquedaApiProp } from '../../../../../modelo/HTTP/peticiones.interface';
import useLibroCompletoApi from '../../../../../servicio/libro/useLibroCompletoApi';
import { limiteDefecto } from '../../../../../utils/constantes';
import { PantallaCargarLibro, useLibroContext } from '../../contexto/contexto.libro';
import LibroParteCard from '../../componente/card/libroParteCard';
import './libroParte.css';
import { nombreLibroXstring } from '../../../../../utils/formatoDatos';

const LibroCompletoLista = () => {
  const {
    armado,
    librosCompletos,
    setLibrosCompleto,
    busquedaCompleta,
    setBusquedaCompleta,
    setPantalla,
  } = useLibroContext();

  const { obtenerLibrosCompleto, responseLibros, errorFetchLibros, loadingLibros } =
    useLibroCompletoApi();

  // Criterios resueltos al disparar la busqueda. Se usan como "query" del
  // paginado: mientras no cambien, se sigue buscando lo mismo y solo cambia la
  // pagina. Reconstruirlos desde `armado` rompia a partir de la pagina 2.
  const criterios = busquedaCompleta?.libro_seleccionado
    ? `${busquedaCompleta.libro_seleccionado.id}|${busquedaCompleta.libro_seleccionado.nivel ?? ''}|${busquedaCompleta.libro_seleccionado.componentes ?? ''}`
    : '';

  const obtenerBusqueda = ({ limite, pagina }: BusquedaApiProp) => {
    if (!busquedaCompleta?.libro_seleccionado) return;

    obtenerLibrosCompleto({
      ...busquedaCompleta.libro_seleccionado,
      limite,
      pagina,
    });
  };

  useEffect(() => {
    if (responseLibros?.total === 0) {
      setPantalla(PantallaCargarLibro.SECUNDARIO);
    }
    if (responseLibros) {
      setLibrosCompleto(prev => ({
        ...prev,
        ...responseLibros,
        datos: [...(prev?.datos ?? []), ...responseLibros.datos],
      }));

      setPantalla(PantallaCargarLibro.LISTA);
    }
  }, [responseLibros]);

  const { finListaRef, contenedorRef } = useFinPagina<LibroCompletoProp>({
    datos: {
      ...librosCompletos,
      sortBy: 'nombre',
      sortOrder: 'asc',
      datosQuery: librosCompletos?.datos ?? [],
      limite: librosCompletos?.limite ?? limiteDefecto,
      pagina: librosCompletos?.pagina ?? 1,
      total: librosCompletos?.total ?? 0,
      query: criterios,
    },
    loading: loadingLibros,
    limiteLetrasBusqueda: 0,
    query: criterios,
    obtenerBusqueda,
    // El que scrollea es `.modal-interno`, no el `.centro`: sin esto el
    // centinela queda siempre "a la vista" y se piden todas las paginas juntas.
    esperarScroll: true,
  });

  const handleLibro = (libro: LibroCompletoProp) => {
    setBusquedaCompleta(prev =>
      prev ? { ...prev, id_libro_completo: libro.id, libro_completo: libro } : prev
    );
    setPantalla(PantallaCargarLibro.SECUNDARIO)
  };

  return (
    <div className="libro-partes-lista">
      <Centro
        texto={nombreLibroXstring({ ...armado.libroNombre, ...armado.libroPrincipal })}
        ref={contenedorRef}
        finListaRef={finListaRef}
        error={errorFetchLibros}
        vacio={
          !librosCompletos || librosCompletos.datos.length === 0 || librosCompletos.total === 0
        }
        loading={loadingLibros}
        entidad="libros"
        query="los datos seleccionados para crear el libro"
      >
        {librosCompletos?.datos.map(libro => (
          <LibroParteCard key={libro.id} libro={libro} handleLibro={handleLibro} />
        ))}
      </Centro>
      <Botonera derecha flotante abajo>
        <Boton
          secundario
          texto="atras"
          onClick={() => {
            setLibrosCompleto(undefined), setPantalla(PantallaCargarLibro.INICIO)
          }}
        />
        <Boton texto="siguiente" onClick={() => setPantalla(PantallaCargarLibro.SECUNDARIO)} />
      </Botonera>
    </div>
  );
};

export default LibroCompletoLista;
