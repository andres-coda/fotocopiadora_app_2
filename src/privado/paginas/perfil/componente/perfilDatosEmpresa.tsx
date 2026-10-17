import Boton from "../../../../componente-estilo/boton/boton";
import Texto from "../../../../componente-estilo/texto/texto";
import { EmpresaProp } from "../../../../modelo/Entidades/empresa/empresa.interface";
import { formatoTelefonoMostrar } from "../../../../utils/formatoDatos";

interface Props {
  empresa: EmpresaProp;
  onEditar: () => void;
}

// formatoTelefonoMostrar exige al menos 10 digitos; si no aplica, se muestra crudo.
const telefonoMostrar = (telefono: string): string => {
  try {
    return formatoTelefonoMostrar(telefono);
  } catch {
    return telefono;
  }
}

const PerfilDatosEmpresa = ({ empresa, onEditar }: Props) => {
  return (
    <div className="perfil-seccion__datos">
      <Texto texto={`Nombre: ${empresa.nombre}`} chica />
      <Texto texto={`Email: ${empresa.email}`} chica />
      <Texto texto={`Telefono: ${telefonoMostrar(empresa.telefono)}`} chica />
      <Boton texto="Editar" secundario onClick={onEditar} />
    </div>
  );
}

export default PerfilDatosEmpresa;
