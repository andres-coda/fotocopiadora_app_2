import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import Editar from '../../../../assets/edit.svg?react';
import Eliminar from '../../../../assets/deleted.svg?react';
import './sedeCard.css';
import { useModalContext } from '../../../../contexto/contextoModal';

interface Props {
  sede: SedeProp;
  onEditar: (sede: SedeProp) => void;
  onEliminar: (sede: SedeProp) => void;
}

const SedeCard = ({ sede, onEditar, onEliminar }: Props) => {
  const { setModal } = useModalContext();

  return (
    <Card nuevoEstilo={'card-sede'} limitado>
      <Texto texto={`${sede.nombre}`} chica />
      <Botonera nuevoEstilo="botonera-sede">
        <Boton
          icono={<Eliminar />}
          edit
          nuevoEstilo="btn-icono-chico"
          titulo={`Eliminar sede`}
          onClick={() => {
            onEliminar(sede);
            setModal(true);
          }}
        />
        <Boton
          icono={<Editar />}
          secundario
          nuevoEstilo="btn-icono-chico"
          titulo={`Editar sede`}
          onClick={() => {
            onEditar(sede);
            setModal(true);
          }}
        />
      </Botonera>
    </Card>
  );
};

export default SedeCard;
