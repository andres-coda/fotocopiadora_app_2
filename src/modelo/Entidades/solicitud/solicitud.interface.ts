// No base import needed.

export interface PeticionAdapterProp {
  id: string;
  campo: string;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
  observaciones?: string | null;
  estado: number;
}

export interface PeticionProp {
  id: string;
  campo: string;
  valorAnterior: string | null;
  valorNuevo: string | null;
  observaciones: string | null;
  estado: number;
}

export const peticionInicial: PeticionProp = {
  id: '',
  campo: '',
  valorAnterior: null,
  valorNuevo: null,
  observaciones: null,
  estado: 1,
};

export interface SolicitudAdapterProp {
  id: string;
  idLibroCompleto: string;
  nombreLibro: string;
  fechaCreacion?: string | Date;
  fechaResolucion?: string | Date | null;
  idUsuario: string;
  nombreUsuario: string;
  estado: number;
  idEmpresa: string;
  peticiones: PeticionAdapterProp[];
}

export interface SolicitudProp {
  id: string;
  idLibroCompleto: string;
  nombreLibro: string;
  fechaCreacion: string;
  fechaResolucion: string | null;
  idUsuario: string;
  nombreUsuario: string;
  estado: number;
  idEmpresa: string;
  peticiones: PeticionProp[];
}

export const solicitudInicial: SolicitudProp = {
  id: '',
  idLibroCompleto: '',
  nombreLibro: '',
  fechaCreacion: '',
  fechaResolucion: null,
  idUsuario: '',
  nombreUsuario: '',
  estado: 1,
  idEmpresa: '',
  peticiones: [],
};