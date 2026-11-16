import { PantallaCargarLibro, useLibroContext } from '../../contexto/contexto.libro';
import LibroCargarPartes from './libroCargarPartes';
import LibroCompletoLista from './libroCompletoLista';
import LibroCargarParteSecundaria from './libroCargarParteSecundaria';
import LibroCargarGuardado from './libroCargarGuardado';

const LibroCargarPartesInicio = () => {
  const { pantalla } = useLibroContext();

  return (
    <>
      {pantalla === PantallaCargarLibro.INICIO && <LibroCargarPartes />}
      {pantalla === PantallaCargarLibro.LISTA && <LibroCompletoLista />}
      {pantalla === PantallaCargarLibro.SECUNDARIO && <LibroCargarParteSecundaria />}
      {pantalla === PantallaCargarLibro.GURDADO && <LibroCargarGuardado />}
    </>
  );
};

export default LibroCargarPartesInicio;
