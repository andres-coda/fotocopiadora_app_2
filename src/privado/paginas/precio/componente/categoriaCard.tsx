import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { CategoriaProp } from '../../../../modelo/Entidades/precio/precio.interface';

interface Prop {
  categoria: CategoriaProp;
  selectCategoria?: (c: CategoriaProp) => void;
}

const CategoriaCard = ({ categoria, selectCategoria }: Prop) => {
  const handleCategoria = () => {
    if (selectCategoria) selectCategoria(categoria);
  };

  return (
    <Card onClick={selectCategoria ? handleCategoria : undefined} tituloCard={categoria.nombre}>
      <Texto texto={categoria.nombre} chica />
    </Card>
  );
};

export default CategoriaCard;
