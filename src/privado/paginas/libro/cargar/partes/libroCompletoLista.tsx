import { useEffect } from 'react';
import Boton from '../../../../../componente-estilo/boton/boton';
import Botonera from '../../../../../componente-estilo/botonera/botonera';
import Card from '../../../../../componente-estilo/card/card';
import Centro from '../../../../../componente-estilo/centro/centro';
import Texto from '../../../../../componente-estilo/texto/texto';
import useFinPagina from '../../../../../hooks/finPagina/useFinPagina';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { BusquedaApiProp } from '../../../../../modelo/HTTP/peticiones.interface';
import useLibroCompletoApi from '../../../../../servicio/libro/useLibroCompletoApi';
import { limiteDefecto } from '../../../../../utils/constantes';
import { nombreLibroXstring } from '../../../../../utils/formatoDatos';
import { useLibroContext } from '../../contexto/contexto.libro';

const LibroCompletoLista = () => {
  const { librosCompletos, setLibrosCompleto, busquedaCompleta } = useLibroContext();

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

  const handleLibro = () => {};
  return (
    <>
      <Centro 
      ref={contenedorRef}
      finListaRef={finListaRef}
      error={errorFetchLibros}
      >
        {librosCompletos?.datos.map(libro => (
          <Card key={libro.id} onClick={handleLibro} tituloCard={libro.nombre} retirado>
            <img src={libro.img} alt={nombreLibroXstring(libro)} />
            <div className="card-vertical">
              <Texto texto={libro.nombre} />
              <div className="card-horizontal">
                <Texto
                  textoResaltado={'Año de edición:  '}
                  texto={libro.anio ?? ''}
                  etiqueta={libro.anio ?? ''}
                  chica
                  inline
                />
                <Texto
                  textoResaltado={'Número de edición:  '}
                  texto={`${libro.edicion ?? ''}`}
                  etiqueta={`${libro.edicion ?? ''}`}
                  chica
                  inline
                />
              </div>
              <Texto
                textoResaltado={'Editorial: '}
                texto={libro.editorial ?? ''}
                etiqueta={libro.editorial ?? ''}
                chica
                inline
              />
              <Texto
                textoResaltado={'Autor:  '}
                texto={libro.autor ?? ''}
                etiqueta={libro.autor ?? ''}
                chica
                inline
              />
              <Texto
                textoResaltado={'Materia:  '}
                texto={libro.materia.nombre}
                etiqueta={libro.materia.nombre ?? ''}
                chica
                inline
              />
              <Texto
                textoResaltado={'Descripcion:  '}
                texto={libro.descripcion ?? ''}
                etiqueta={libro.descripcion ?? ''}
                chica
              />
            </div>
          </Card>
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
