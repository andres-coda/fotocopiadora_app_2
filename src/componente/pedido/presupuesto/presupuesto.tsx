import Boton from "../../../componente-estilo/boton/boton";
import Texto from "../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../modelo/Entidades/libro/libro.interface";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";
import { Especificaciones } from "../../../modelo/Entidades/especificacion/especificacion.enum";
import usePresupuesto from "../../../hooks/presupuesto/usePresupuesto";
import Copiar from '../../../assets/copiar.svg?react'

interface Prop {
  libro: LibroProp;
  nuevasEsp?: Especificaciones[];
}

const Presupuesto = ({ libro, nuevasEsp }: Prop) => {
  const { presupuesto, setEspecificaciones, especificaciones, copiarPresupuesto } = usePresupuesto({ libro, nuevasEsp });

  return (
    <div className="copiado-presupuesto libro-select">
      <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
      <Texto texto={presupuesto} />
      <EspecificacionesSelect setEspecificaciones={setEspecificaciones} especificaciones={especificaciones} />
      <Boton icono={<Copiar />} secundario onClick={copiarPresupuesto} nuevoEstilo='btn-icono-mediano' titulo="Copiar presupuesto"/>
    </div>

  )
}

export default Presupuesto;