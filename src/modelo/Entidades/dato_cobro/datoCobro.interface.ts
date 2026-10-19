// La tabla dato_cobro no tiene fecha_creacion, fecha_actualizacion ni deleted:
// por eso no extiende BaseAdapterProp y no puede usar baseAdapter.
export interface DatoCobroAdapterProp {
  id: string;
  nombre: string;
  mensaje?: string | null;
}

export interface DatoCobroProp {
  id: string;
  nombre: string;
  mensaje?: string;
}

export const datoCobroInicial: DatoCobroProp = {
  id: '',
  nombre: '',
  mensaje: undefined,
}
