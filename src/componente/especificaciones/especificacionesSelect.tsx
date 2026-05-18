import { Dispatch } from "react";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { appStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { transformarEspecificacinParticularATexto } from "../../utils/especificaciones";
import './especificacionesSelect.css'

interface EspSelectProp {
  setEspecificaciones: Dispatch<React.SetStateAction<Especificaciones[]>>
  especificaciones: Especificaciones[]
}

const EspecificacionesSelect = ({ setEspecificaciones, especificaciones }: EspSelectProp) => {
  const esp: EspecificacionProp[] = useSelector((store: appStore) => store.especificacion.items);

  const incompatibilidades: Record<
    Especificaciones,
    Especificaciones[]
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

  const toggleEspecificacion = (
    especificacion: Especificaciones
  ) => {
    setEspecificaciones(prev => {
      const existe = prev.includes(especificacion);

      if (existe) {
        return prev.filter(e => e !== especificacion);
      }

      const incompatibles =
        incompatibilidades[especificacion] ?? [];

      const filtradas = prev.filter(
        e => !incompatibles.includes(e)
      );

      return [...filtradas, especificacion];
    });
  };

  return (
    <ul className="esp-lista">
      {
        esp.map(e => (
          <li key={e.id}>
            <label className="check">
              <input type="checkbox" 
              checked={especificaciones.includes(e.nombre)}
              onChange={() => toggleEspecificacion(e.nombre)} 
              />
              <span></span>
              {transformarEspecificacinParticularATexto(e)}
            </label>           
          </li>
        ))
      };
    </ul>
  )
}

export default EspecificacionesSelect;