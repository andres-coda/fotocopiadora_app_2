import { BaseAdapterProp, BaseProp, CampoBusqueda } from "../../modelo/Entidades/base/base.interface"
import { ultFechaAdapter } from "../../utils/calendario";

interface BaseAdapterFunctionProp<T extends BaseAdapterProp> {
  base: T;
  busqueda: CampoBusqueda<T>[]
}
export const baseAdapter = <T extends BaseAdapterProp>({ base, busqueda }: BaseAdapterFunctionProp<T>): BaseProp | undefined => {
  if (!base) return undefined;

  const ultAct = ultFechaAdapter({ ...base });
  const campoBusqueda = busqueda.map(fn => fn(base));

  return {
    id: base.id,
    deleted: base.deleted,
    ultAct: ultAct,
    campoBusqueda
  }
}