import { SolicitudDtoProp } from "../../modelo/Entidades/solicitud/dtoSolicitud.interface";
import { formValuesPeticion } from "../../modelo/Entidades/solicitud/esqSolicitud.esquema";

export const peticionDtoAdapter = (p: formValuesPeticion, estado:number): SolicitudDtoProp => {
  if(estado != 2 && estado != 3 ) throw new Error('Estado no valido para la peticiónn')
  const newSolicitud: SolicitudDtoProp = {
    observacion: p.observacion,
    estado
  };
  return newSolicitud;
};