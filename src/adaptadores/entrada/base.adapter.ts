import { BaseAdapterProp, BaseProp } from "../../modelo/Entidades/base/base.interface"
import { ultFechaAdapter } from "../../utils/calendario";

interface BaseAdapterFunctionProp<T extends BaseAdapterProp> {
  base: T;
}
export const baseAdapter = <T extends BaseAdapterProp>({ base }: BaseAdapterFunctionProp<T>): BaseProp | undefined => {
  if (!base) return undefined;

  const ultAct = ultFechaAdapter({ ...base });

  return {
    id: base.id,
    deleted: base.deleted,
    ultAct: ultAct,
  }
}