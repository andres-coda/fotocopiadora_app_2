import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import DesplegableArrow from '../../../../componente-estilo/desplegable/desplegableArrow';
import SedeCard from '../../sede/componente/sedeCard';
import Boton from '../../../../componente-estilo/boton/boton';
import Mas from '../../../../assets/mas.svg?react';

interface Props {
  onAgregarSede: () => void;
  onEditarSede: (sede: SedeProp) => void;
  onEliminarSede: (sede: SedeProp) => void;
}

const SedesPerfil = ({ onAgregarSede, onEditarSede, onEliminarSede }: Props) => {
  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.datos);

  return (
    <DesplegableArrow titulo="Listas de sedes" verde grid nuevoEstilo="sede-lista">
      {sedes.length !== 0 &&
        sedes.map(s => (
          <SedeCard
            sede={s}
            key={s.id}
            onEditar={() => onEditarSede(s)}
            onEliminar={() => onEliminarSede(s)}
          />
        ))}
      <Boton nuevoEstilo={`btn-icono-chico`} onClick={() => onAgregarSede()} icono={<Mas />} />
    </DesplegableArrow>
  );
};

export default SedesPerfil;
