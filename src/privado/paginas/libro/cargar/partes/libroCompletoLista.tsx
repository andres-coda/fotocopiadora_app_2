import Boton from '../../../../../componente-estilo/boton/boton';
import Botonera from '../../../../../componente-estilo/botonera/botonera';
import Card from '../../../../../componente-estilo/card/card';
import Centro from '../../../../../componente-estilo/centro/centro';
import Texto from '../../../../../componente-estilo/texto/texto';
import { nombreLibroXstring } from '../../../../../utils/formatoDatos';
import { useLibroContext } from '../../contexto/contexto.libro';

const LibroCompletoLista = () => {
  const { librosCompletos, setLibrosCompleto } = useLibroContext();

  const handleLibro = () => {};
  return (
    <Centro>
      {librosCompletos?.datos.map(libro => (
        <Card onClick={handleLibro} tituloCard={libro.nombre} retirado>
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
      <Botonera derecha>
        <Boton
        texto='siguiente'
        />
      </Botonera>
    </Centro>
  );
};

export default LibroCompletoLista;
