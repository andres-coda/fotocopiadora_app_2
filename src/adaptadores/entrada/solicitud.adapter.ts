import { PeticionAdapterProp, PeticionProp, SolicitudAdapterProp, SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';

export const peticionAdapter = (peticion?: PeticionAdapterProp): PeticionProp | undefined => {
  if (!peticion) return undefined;
  return {
    id: peticion.id,
    campo: peticion.campo,
    valorAnterior: peticion.valorAnterior ?? null,
    valorNuevo: peticion.valorNuevo ?? null,
    observaciones: peticion.observaciones ?? null,
    estado: peticion.estado,
  };
};

export const peticionAdapterArray = (datos?: PeticionAdapterProp[]): PeticionProp[] => {
  return datos?.flatMap(d => {
    const p = peticionAdapter(d);
    return p ? [p] : [];
  }) ?? [];
};

export const solicitudAdapter = (solicitud?: SolicitudAdapterProp): SolicitudProp | undefined => {
  if (!solicitud) return undefined;
  return {
    id: solicitud.id,
    idLibroCompleto: solicitud.idLibroCompleto,
    nombreLibro: solicitud.nombreLibro,
    fechaCreacion: solicitud.fechaCreacion ? String(solicitud.fechaCreacion) : '',
    fechaResolucion: solicitud.fechaResolucion ? String(solicitud.fechaResolucion) : null,
    idUsuario: solicitud.idUsuario,
    nombreUsuario: solicitud.nombreUsuario,
    estado: solicitud.estado,
    idEmpresa: solicitud.idEmpresa,
    peticiones: peticionAdapterArray(solicitud.peticiones),
  };
};

export const solicitudAdapterArray = (datos?: SolicitudAdapterProp[]): SolicitudProp[] => {
  return datos?.flatMap(d => {
    const s = solicitudAdapter(d);
    return s ? [s] : [];
  }) ?? [];
};