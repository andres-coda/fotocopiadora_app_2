import { SedeProp } from '../../../../modelo/Entidades/sede/sede.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import DesplegableArrow from '../../../../componente-estilo/desplegable/desplegableArrow';
import SedeCard from '../../sede/componente/sedeCard';
import Boton from '../../../../componente-estilo/boton/boton';
import Mas from '../../../../assets/mas.svg?react';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import { EmpresaProp } from '../../../../modelo/Entidades/empresa/empresa.interface';
import { esSuper } from '../../../../utils/usuario';

interface Props {
  onAgregarSede?: () => void;
  onEditarSede?: (sede: SedeProp) => void;
  onEliminarSede?: (sede: SedeProp) => void;
}

const SedesPerfil = ({
  onAgregarSede = undefined,
  onEditarSede = undefined,
  onEliminarSede = undefined,
}: Props) => {
  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.datos);
  const sesion: usuarioProps | null = useSelector((store: appStore) => store.sesion.dato);
  const empresa: EmpresaProp | undefined = useSelector(
    (store: appStore) => store.empresa.datoSeleccionado
  );

  const sedesRender: SedeProp[] = sedes.filter(
    s => !esSuper(sesion) || empresa?.id === s.idEmpresa
  );

  return (
    <DesplegableArrow
      titulo="Listas de sedes"
      verde
      grid
      vacio={sedesRender.length === 0}
      entidad='sedes'
      botones={
        onAgregarSede && <Boton iconoChico onClick={() => onAgregarSede()} icono={<Mas />} />
      }
      nuevoEstilo="sede-lista"
    >
      {sedesRender
        .map(s => (
          <SedeCard sede={s} key={s.id} onEditar={onEditarSede} onEliminar={onEliminarSede} />
        ))}
    </DesplegableArrow>
  );
};

export default SedesPerfil;
