import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import Texto from "../texto/texto";
import './predictivo.css'

interface Prop<T extends BaseProp> {
  elementos: T[];
  nombre?: string;
  keys: (keyof T)[];
}

const Predictivo = <T extends BaseProp>({ nombre, elementos, keys }: Prop<T>) => {
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