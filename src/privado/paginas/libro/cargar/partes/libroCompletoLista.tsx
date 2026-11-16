import { useEffect } from 'react';
import Boton from '../../../../../componente-estilo/boton/boton';
import Botonera from '../../../../../componente-estilo/botonera/botonera';
import Centro from '../../../../../componente-estilo/centro/centro';
import useFinPagina from '../../../../../hooks/finPagina/useFinPagina';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { BusquedaApiProp } from '../../../../../modelo/HTTP/peticiones.interface';
import useLibroCompletoApi from '../../../../../servicio/libro/useLibroCompletoApi';
import { limiteDefecto } from '../../../../../utils/constantes';
import { useLibroContext } from '../../contexto/contexto.libro';
import LibroParteCard from '../../componente/card/libroParteCard';

const LibroCompletoLista = () => {
  const { librosCompletos, setLibrosCompleto, busquedaCompleta, setBusquedaCompleta } = useLibroContext();

  const { obtenerLibrosCompleto, responseLibros, errorFetchLibros, loadingLibros } =
    useLibroCompletoApi();

  // Criterios resueltos al disparar la busqueda. Se usan como "query" del
  // paginado: mientras no cambien, se sigue buscando lo mismo y solo cambia la
  // pagina. Reconstruirlos desde `armado` rompia a partir de la pagina 2.
  const criterios = busquedaCompleta
    ? `${busquedaCompleta.id}|${busquedaCompleta.nivel ?? ''}|${busquedaCompleta.componentes ?? ''}`
    : '';

  const obtenerBusqueda = ({ limite, pagina }: BusquedaApiProp) => {
    if (!busquedaCompleta) return;

    obtenerLibrosCompleto({
      ...busquedaCompleta,
      limite,
      pagina,
    });
  };

useEffect(()=>{
  if(responseLibros){
    setLibrosCompleto(prev=> ({
      ...prev,
      ...responseLibros,
      datos:[...(prev?.datos ?? []), ...responseLibros.datos]
    }))
  }
},[responseLibros])

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

  const handleLibro = (libro:LibroCompletoProp) => {
    setBusquedaCompleta(prev=>(prev ? {...prev, id_libro_completo:libro.id, libro_completo:libro} : prev));
    console.log('libro: ',libro)
  };

  return (
    <>
      <Centro 
      ref={contenedorRef}
      finListaRef={finListaRef}
      error={errorFetchLibros}
      >
        {librosCompletos?.datos.map(libro => (
          <LibroParteCard key={libro.id} libro={libro} handleLibro={handleLibro}/>
        ))}
      </Centro>
      <Botonera derecha flotante abajo>
        <Boton secundario texto="atras" onClick={() => setLibrosCompleto(undefined)} />
        <Boton texto="siguiente" />
      </Botonera>
    </>
  );
};

export default LibroCompletoLista;
