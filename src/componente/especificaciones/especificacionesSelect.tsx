import { Dispatch } from "react";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { appStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { normalizarEspecificaciones, transformarEspecificacinParticularATexto } from "../../utils/especificaciones";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";

interface EspSelectProp {
  setEspecificaciones: Dispatch<React.SetStateAction<Especificaciones[]>>
  especificaciones: Especificaciones[]
}

const EspecificacionesSelect = ({ setEspecificaciones, especificaciones }: EspSelectProp) => {
  const esp: EspecificacionProp[] = useSelector((store: appStore) => store.especificacion.items);

  const newEsp = esp.map(e => {
    return { nombre: e.nombre, texto: transformarEspecificacinParticularATexto(e) }
  })

  return (
    <InputCheckFueraForm<Especificaciones>
      elementosSelect={especificaciones}
      setelementosSelect={setEspecificaciones}
      normalizar={normalizarEspecificaciones}
      lista={newEsp}
    />

  )
}

export default EspecificacionesSelect;