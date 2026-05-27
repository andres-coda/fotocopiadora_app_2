import Boton from "../../../componente-estilo/boton/boton";
import Texto from "../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../modelo/Entidades/libro/libro.interface";
import { Especificaciones } from "../../../modelo/Entidades/especificacion/especificacion.enum";
import usePresupuesto from "../../../hooks/presupuesto/usePresupuesto";
import Copiar from '../../../assets/copiar.svg?react'
import useEspecificacionesSelect from "../../../hooks/presupuesto/useEspecificacionesSelect";
import InputCheckFueraForm from "../../formulario/inputCheckFueraForm";

interface Prop {
  libro: LibroProp;
  nuevasEsp?: Especificaciones[];
  simple?:boolean;
}

const Presupuesto = ({ libro, nuevasEsp, simple }: Prop) => {
  const {especificaciones, setEspecificaciones, listaEspecificaciones, normalizarEspecificaciones} = useEspecificacionesSelect(nuevasEsp ?? libro.especificacionesDefecto ?? [], libro.id);
  const { presupuesto, copiarPresupuesto } = usePresupuesto({ libro, nuevasEsp:especificaciones });

  if(simple) return (
    <div className="copiado-presupuesto libro-select">
      <InputCheckFueraForm lista={listaEspecificaciones} elementosSelect={especificaciones} setelementosSelect={setEspecificaciones} normalizar={normalizarEspecificaciones}/>
      <Boton icono={<Copiar />} secundario onClick={copiarPresupuesto} nuevoEstilo='btn-icono-mediano' titulo={presupuesto}/>
    </div>
  )

  return (
    <div className="copiado-presupuesto libro-select">
      <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
      <Texto texto={presupuesto} />
      <InputCheckFueraForm lista={listaEspecificaciones} elementosSelect={especificaciones} setelementosSelect={setEspecificaciones} normalizar={normalizarEspecificaciones}/>
      <Boton icono={<Copiar />} secundario onClick={copiarPresupuesto} nuevoEstilo='btn-icono-mediano' titulo="Copiar presupuesto"/>
    </div>

  )
}

export default Presupuesto;