import { Dispatch } from "react";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { appStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { transformarEspecificacinParticularATexto } from "../../utils/especificaciones";
import './especificacionesSelect.css'
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";

interface EspSelectProp {
  setEspecificaciones: Dispatch<React.SetStateAction<Especificaciones[]>>
  especificaciones: Especificaciones[]
}

const incompatibilidades: Record<
  string,
  string[]
> = {
  [Especificaciones.ANILLADO]: [
    Especificaciones.SUELTO,
    Especificaciones.ABROCHADO,
  ],

  [Especificaciones.SUELTO]: [
    Especificaciones.ANILLADO,
    Especificaciones.ABROCHADO,
  ],

  [Especificaciones.ABROCHADO]: [
    Especificaciones.ANILLADO,
    Especificaciones.SUELTO,
  ],

  [Especificaciones.TROKELADO]: [
    Especificaciones.ADHESIVO,
  ],

  [Especificaciones.ADHESIVO]: [
    Especificaciones.TROKELADO,
  ],

  [Especificaciones.DOBLE_FAZ]: [
    Especificaciones.SIMPLE_FAZ,
  ],

  [Especificaciones.SIMPLE_FAZ]: [
    Especificaciones.DOBLE_FAZ,
  ],

  [Especificaciones.COLOR]: [
    Especificaciones.BLANCO_Y_NEGRO,
  ],

  [Especificaciones.BLANCO_Y_NEGRO]: [
    Especificaciones.COLOR,
  ],
  [Especificaciones.SELECCION]: [
    Especificaciones.SELECCION,
  ],
};

const EspecificacionesSelect = ({ setEspecificaciones, especificaciones }: EspSelectProp) => {
  const esp: EspecificacionProp[] = useSelector((store: appStore) => store.especificacion.items);



  const normalizarEspecificaciones = (elementos: Especificaciones[]): Especificaciones[] => {
    let resultado = [...new Set(elementos)];

    for (const elemento of resultado) {

      const incompatibles =
        incompatibilidades[elemento] ?? [];

      resultado = resultado.filter(e => {

        if (e === elemento) {
          return true;
        }

        return !incompatibles.includes(e);
      });
    }

    return resultado;
  }

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