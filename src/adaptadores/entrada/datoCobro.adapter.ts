import { DatoCobroAdapterProp, DatoCobroProp } from "../../modelo/Entidades/dato_cobro/datoCobro.interface";

// No usa baseAdapter: la tabla dato_cobro no tiene fechas ni deleted.
export const datoCobroAdapter = (datoCobro?: DatoCobroAdapterProp): DatoCobroProp | undefined => {
  if (!datoCobro) return undefined;

  const newDatoCobro: DatoCobroProp = {
    id: datoCobro.id,
    nombre: datoCobro.nombre,
    mensaje: datoCobro.mensaje ?? undefined,
  }
  return newDatoCobro;
}

export const datoCobroAdapterArray = (datos?: DatoCobroAdapterProp[]): DatoCobroProp[] => {
  const newDatosCobro: DatoCobroProp[] =
    datos?.flatMap(d => {
      const datoCobro = datoCobroAdapter(d);
      return datoCobro ? [datoCobro] : [];
    }) ?? [];

  return newDatosCobro;
}
