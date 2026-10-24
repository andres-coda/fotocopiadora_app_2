import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import Editar from '../../../../assets/edit.svg?react';
import Eliminar from '../../../../assets/deleted.svg?react';
import './sedeCard.css';
import useEditar from '../../../../hooks/editar/useEditar';
import { Dispatch, SetStateAction } from 'react';
import { useModalContext } from '../../../../contexto/contextoModal';
import { useDispatch } from 'react-redux';
import { seleccionarSede } from '../../../../redux/state/sede.state';

interface Props {
  sede: SedeProp;
  setEliminar: Dispatch<SetStateAction<boolean>>;
}

const SedeCard = ({ sede, setEliminar }: Props) => {
  const { handleEdit } = useEditar({ setModalLocal: true, sede });
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  return (
    <Card nuevoEstilo={'card-sede'}>
      <Texto texto={`${sede.nombre}`} chica />
      <Botonera nuevoEstilo="botonera-sede">
        <Boton
          icono={<Eliminar />}
          edit
          nuevoEstilo="btn-icono-chico"
          titulo={`Eliminar sede`}
          onClick={() => {
            (setEliminar(true), setModal(true), dispatch(seleccionarSede(sede)));
          }}
        />
        <Boton
          icono={<Editar />}
          secundario
          nuevoEstilo="btn-icono-chico"
          titulo={`Editar sede`}
          onClick={() => handleEdit({ sede })}
        />
      </Botonera>
    </Card>
  );
};

export default SedeCard;
