import { Dispatch } from "react";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import './input.css'

type inputSet = string | Especificaciones;
interface ListaProp<P> {
  nombre: P;
  texto?: string;
}

interface InputCheckFueraFromProp<T> {
  setelementosSelect: Dispatch<React.SetStateAction<T[]>>;
  elementosSelect: T[];
  lista: ListaProp<T>[];
  normalizar?: (elementos: T[]) => T[];
  nuevoEstilo?: string;
}

const InputCheckFueraForm = <T extends inputSet>({
  setelementosSelect, lista, elementosSelect = [], normalizar = undefined, nuevoEstilo = undefined
}: InputCheckFueraFromProp<T>) => {

  const toggleElemento = (
    elemento: T
  ) => {

    setelementosSelect(prev => {

      const existe = prev.includes(elemento);

      let nuevos: T[];

      if (existe) {
        nuevos = prev.filter(e => e !== elemento);
      } else {
        nuevos = [...prev, elemento];
      }

      return normalizar
        ? normalizar(nuevos)
        : nuevos;
    });
  };

return (
  <ul className={`inputCheck-fuera-formulario ${nuevoEstilo ?? ''}`}>
    {
      lista.map((e, index) => (
        <li key={`${e.nombre}-${index}`} className="input-checkbox">
          <label className="input-checkbox-label">
            <input
              type="checkbox"
              checked={elementosSelect.includes(e.nombre)}
              onChange={() => toggleElemento(e.nombre)}
            />

            <span></span>

            {e.texto ? e.texto : e.nombre}
          </label>
        </li>
      ))
    }
  </ul>
)
}

export default InputCheckFueraForm;