import Card from '../../../../../componente-estilo/card/card';
import Texto from '../../../../../componente-estilo/texto/texto';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { nombreLibroXstring } from '../../../../../utils/formatoDatos';
import './libroCard.css';

interface Prop {
  libro: LibroCompletoProp;
  handleLibro: (libro: LibroCompletoProp) => void;
}

const LibroParteCard = ({ libro, handleLibro }: Prop) => {
  return (
    <Card
      onClick={() => handleLibro(libro)}
      tituloCard={libro.nombre}
      retirado
      nuevoEstilo="libro_parte_card"
    >
      <img src={libro.img} alt={nombreLibroXstring(libro)} />
      <div className="card-vertical">
        <Texto texto={nombreLibroXstring(libro)} negrita centrado/>
        <div className="card-horizontal">
          <Texto
            textoResaltado={'Edición:  '}
            texto={`${libro.edicion ?? ''}`}
            etiqueta={`${libro.edicion ?? ''}`}
            chica
            inline
          />
          <Texto
            textoResaltado={'Año:  '}
            texto={libro.anio ?? ''}
            etiqueta={libro.anio ?? ''}
            chica
            inline
          />
        </div>
        <div className="card-horizontal">
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
        </div>
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
  );
};

export default LibroParteCard;
