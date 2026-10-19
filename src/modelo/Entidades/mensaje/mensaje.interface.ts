// La tabla mensaje no tiene fecha_creacion, fecha_actualizacion ni deleted:
// por eso no extiende BaseAdapterProp y no puede usar baseAdapter.
export interface MensajeAdapterProp {
  id: string;
  nombre: string;
  mensaje?: string | null;
  favorito?: boolean;
}

export interface MensajeProp {
  id: string;
  nombre: string;
  mensaje?: string;
  favorito: boolean;
}

export const mensajeInicial: MensajeProp = {
  id: '',
  nombre: '',
  mensaje: undefined,
  favorito: false,
}
