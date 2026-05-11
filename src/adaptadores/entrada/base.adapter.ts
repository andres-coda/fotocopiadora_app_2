import { BaseAdapterProp, BaseProp } from "../../modelo/Entidades/base/base.interface"
import { ultFechaAdapter } from "../../utils/calendario";

export const baseAdapter = (base:BaseAdapterProp):BaseProp | undefined => {
  if (!base ) return undefined;

  const ultAct = ultFechaAdapter({ ...base });

  return {
    id: base.id,
    deleted: base.deleted,
    ultAct: ultAct
  }
}