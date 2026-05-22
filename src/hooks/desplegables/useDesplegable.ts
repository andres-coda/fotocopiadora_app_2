import { Opcion } from "../../componente/formulario/modelo/input.interface";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";


interface Prop<T, K extends keyof T = keyof T>{
  items: T[]
  clave?: K; 
}

const useDesplegable = () => {  
  const pasarDesplegable = <T extends BaseProp, K extends keyof T = keyof T>({items, clave}:Prop<T, K>): Opcion[] => {
      const newClave:K= (clave || 'nombre') as K
      const opciones: Opcion[] = items.map(d => {
          return { value: d.id, label:  String(d[newClave]) }
        });
      return opciones
    }

    return { pasarDesplegable }
}

export default useDesplegable
