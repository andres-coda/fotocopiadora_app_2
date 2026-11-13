import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import { cambiarFiltrosPrecio } from '../../../../redux/state/precio.state';
import { CategoriaProp } from '../../../../modelo/Entidades/precio/precio.interface';
import Boton from '../../../../componente-estilo/boton/boton';
import './filtrosActivosPrecio.css';

const FiltrosActivosPrecio = () => {
  const dispatch = useDispatch();
  const filtros = useSelector((store: appStore) => store.precio.filtrosPrecio);
  const categorias: CategoriaProp[] = useSelector((store: appStore) => store.categoria.datos);

  if (filtros.categorias.length === 0) return null;

  const nombreDe = (id: string): string =>
    (categorias ?? []).find(categoria => categoria.id === id)?.nombre ?? 'Categoría';

  const quitar = (id: string) =>
    dispatch(
      cambiarFiltrosPrecio({ categorias: filtros.categorias.filter(categoria => categoria !== id) })
    );

  return (
    <div className="filtros-activos-precio">
      {filtros.categorias.map(id => (
        <Boton
          btnFiltro
          texto={`${nombreDe(id)} ×`}
          onClick={() => quitar(id)}
          titulo={`Quitar el filtro de categoría ${nombreDe(id)}`}
          key={`categoria-${id}`}
        />
      ))}
    </div>
  );
};

export default FiltrosActivosPrecio;
