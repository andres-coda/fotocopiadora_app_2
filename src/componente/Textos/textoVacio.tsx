import Texto from '../../componente-estilo/texto/texto';

interface Prop {
  entidad?: string;
  filtro?: boolean;
  query?:string;
}

 const texto = ({entidad, filtro, query}:Prop) => {
  const newEntidad = entidad || 'elementos';
  const newFiltro = `que coincida con los filtros`
  const newQuery = query ? `que coincida con ${query}` : '';
    return `¡¡¡ No hay ${newEntidad} en la lista ${filtro ? newFiltro : ''} ${filtro && query ? 'y' : ''} ${newQuery} !!!`
  }

const TextoVacio = ({ entidad, filtro = false, query = undefined}: Prop) => {
 
  return (
    <Texto
      texto={texto({entidad, filtro, query})}
      mediana
      centrado
    />
  );
};

export default TextoVacio;
