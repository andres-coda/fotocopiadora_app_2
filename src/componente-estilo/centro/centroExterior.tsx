import Titulo from '../texto/titulo';
import { CentroDefectoProp } from './interface/centro.interface';
import useCentro from './hook/useCentro';
import CentroOpciones from './centroOpciones';
import './estilos/centro.css';

export const ContenedorCentro = ({
  children,
  texto = undefined,
  error = undefined,
  loading = false,
  nuevoEstilo = '',
  desplegable = false,
  scroll = false,
  centro = undefined,
  vacio = false,
  entidad = undefined,
  query = undefined,
  filtro = undefined,
  buscador = undefined,
}: CentroDefectoProp) => {
  const { claseExterior } = useCentro({ desplegable, scroll, nuevoEstilo, centro });
  return (
    <div className={claseExterior}>
      {texto && <Titulo titulo={texto} />}
      {buscador && buscador}
      <CentroOpciones
        error={error}
        loading={loading}
        vacio={vacio}
        entidad={entidad}
        filtro={filtro}
        query={query}
        children={children}
      />
    </div>
  );
};
