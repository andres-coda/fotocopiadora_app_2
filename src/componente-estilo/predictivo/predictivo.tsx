import { HasId } from "../../modelo/general/hasId.interface";
import Texto from "../texto/texto";
import './predictivo.css'

interface Prop<T extends HasId> {
  elementos: T[];
  nombre?: string;
  keys: (keyof T)[];
}

const Predictivo = <T extends HasId>({ nombre, elementos, keys }: Prop<T>) => {
  if (!nombre || nombre.length < 2 || elementos.length === 0) return null;

  const filtrados = elementos.filter(elemento =>
    keys.some(key =>
      String(elemento[key])
        .toLowerCase()
        .includes(nombre.toLowerCase())
    )
  );

  return (
    <div className="predictivo-contenedor">
      {filtrados.map(e => (
        <div key={e.id}>
          {keys.map(key => (
            <Texto
              key={String(key)}
              texto={String(e[key])}
            />
          ))}
        </div>
      ))}
    </div>

  )
}

export default Predictivo;