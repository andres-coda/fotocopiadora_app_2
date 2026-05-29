import { Dispatch, SetStateAction } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import Buscador from "./buscador";

const listaSeleccionable = [{ nombre: 'Todo' }, { nombre: 'Propuestas' }, { nombre: 'Libros' }];

interface PropuestaAgregada {
  id: string;               // id de la propuesta
  nombre: string;           // nombre de la propuesta
  cantidadLibros: number;   // del campo cantidadLibros de PropuestaProp
  libros: LibroProp[];      // libros filtrados que tienen esta propuesta
}

interface Prop {
  valor: string;
  setValor: Dispatch<SetStateAction<string>>;
  opcionesActivas?: string[];
  setOpcionesActivas?: Dispatch<SetStateAction<string[]>>;
  normalizar?: (elementos: string[]) => string[];

}

const BuscadorLibro = ({ valor, setValor, opcionesActivas, setOpcionesActivas }: Prop) => {

  const normalizar = (elementos: string[]): string[] => {
    return [elementos[elementos.length - 1]];
  }
  return (
    <div>
      { opcionesActivas && setOpcionesActivas &&
        <InputCheckFueraForm
          lista={listaSeleccionable}
          setelementosSelect={setOpcionesActivas}
          elementosSelect={opcionesActivas}
          normalizar={normalizar}
        />
      }
      <Buscador
        valor={valor}
        setValor={setValor}
        texto="Buscar libro"
        etiquetaMas="Nuevo libro"
      />
    </div>
  )
};

export default BuscadorLibro;