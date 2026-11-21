import { Children } from 'react';
import Texto from '../texto/texto';
import Cargando from '../../componente/cargando/cargando';
import TextoVacio from '../../componente/Textos/textoVacio';
import { CentroOpcionesProp } from './interface/centro.interface';

const CentroOpciones = ({
  error = undefined,
  loading = false,
  vacio = false,
  entidad = undefined,
  filtro = false,
  query = undefined,
  children,
}: CentroOpcionesProp) => {
  // `error` y `loading` reemplazan al contenido en `ContenedorCentro`, asi
  // que solo tienen sentido cuando no hay nada que mostrar. En los listados
  // paginados el loading se prende en cada pagina y un error de la pagina N
  // no debe borrar las cards ya acumuladas: desmontarlas reinicia el scroll y
  // deja al observer de fin de pagina apuntando a un nodo que ya no existe.
  // Con el contenedor vacio, en cambio, el spinner y el error son justo lo
  // que corresponde mostrar.
  const sinContenido = vacio || Children.count(children) === 0;
  const errorVisible = sinContenido ? error : undefined;
  const cargandoVisible = loading && sinContenido;

  if (errorVisible) return <Texto texto={errorVisible} error />;
  if (cargandoVisible) return <Cargando />;
  if (sinContenido) return <TextoVacio entidad={entidad} filtro={filtro} query={query} />;
  return <>{children}</>;
};

export default CentroOpciones;
