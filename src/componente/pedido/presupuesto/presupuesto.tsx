import Boton from "../../../componente-estilo/boton/boton";
import Texto from "../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../modelo/Entidades/libro/libro.interface";
import { Especificaciones } from "../../../modelo/Entidades/especificacion/especificacion.enum";
import usePresupuesto from "../../../hooks/presupuesto/usePresupuesto";
import Copiar from '../../../assets/copiar.svg?react'
import useEspecificacionesSelect from "../../../hooks/presupuesto/useEspecificacionesSelect";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";

interface Prop {
  libro: LibroProp;
  nuevasEsp?: Especificaciones[];
}

const Presupuesto = ({ libro, nuevasEsp }: Prop) => {
  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(nuevasEsp ?? libro.especificacionesDefecto ?? [], libro.id);
  const { presupuesto, copiarPresupuesto } = usePresupuesto({ libro, nuevasEsp: especificaciones });


  return (
    <div className="copiado-presupuesto libro-select">
      <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
      <Texto texto={presupuesto} />
      <EspecificacionesSelect especificaciones={especificaciones} setEspecificaciones={setEspecificaciones}/>
      {
        //<InputCheckFueraForm lista={listaEspecificaciones} elementosSelect={especificaciones} setelementosSelect={setEspecificaciones} normalizar={normalizarEspecificaciones} />
      }
      <Boton icono={<Copiar />} secundario onClick={copiarPresupuesto} nuevoEstilo='btn-icono-mediano' titulo="Copiar presupuesto" />
    </div>

  )
}

export default Presupuesto;