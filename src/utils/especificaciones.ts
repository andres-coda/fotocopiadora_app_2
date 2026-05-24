import { Especificaciones } from "../modelo/Entidades/especificacion/especificacion.enum";
import { EspecificacionProp } from "../modelo/Entidades/especificacion/especificacion.interface";
import { LibroProp } from "../modelo/Entidades/libro/libro.interface";

export const transformarEspecificaciones = (esp: Especificaciones[] | undefined, espParticular: Especificaciones): boolean => {
  if (!esp || !espParticular) return false;
  return esp.includes(espParticular);
}

export const transformarEspecificacinesATexto = (esp: Especificaciones[] | undefined, libro: LibroProp | undefined): string => {
  if (!esp || esp.length === 0) return '';
  return esp.map(e => {
    switch (e) {
      case Especificaciones.ABROCHADO:
        return 'abrochado';
      case Especificaciones.ADHESIVO:
        return libro && libro?.adhesivos && libro.adhesivos > 0
          ? `con ${libro?.adhesivos} adhesivo blanco brilloso`
          : '';
      case Especificaciones.ANILLADO:
        return 'anillado';
      case Especificaciones.COLOR:
        return 'en color';
      case Especificaciones.BLANCO_Y_NEGRO:
        return 'en blanco y negro';
      case Especificaciones.DOBLE_FAZ:
        return 'doble faz';
      case Especificaciones.SIMPLE_FAZ:
        return 'simple faz';
      case Especificaciones.SELECCION:
        return 'parte seleccionada';
      case Especificaciones.SUELTO:
        return 'suelto';
      case Especificaciones.TROKELADO:
        return libro && libro?.adhesivos && libro.adhesivos > 0
          ? `con ${libro?.adhesivos} adhesivo blanco brilloso trokelado`
          : '';
    }
  }
  ).join(', ');
}

export const transformarEspecificacinParticularATexto = (esp: EspecificacionProp): string => {
  return especificacionEnumXString(esp.nombre);
}


export const especificacionEnumXString = (e: Especificaciones) => {
  switch (e) {
    case Especificaciones.ABROCHADO:
      return 'abrochado';
    case Especificaciones.ADHESIVO:
      return 'adhesivo'
    case Especificaciones.ANILLADO:
      return 'anillado';
    case Especificaciones.COLOR:
      return 'color';
    case Especificaciones.BLANCO_Y_NEGRO:
      return 'blanco y negro';
    case Especificaciones.DOBLE_FAZ:
      return 'doble faz';
    case Especificaciones.SIMPLE_FAZ:
      return 'simple faz';
    case Especificaciones.SELECCION:
      return 'selección';
    case Especificaciones.SUELTO:
      return 'suelto';
    case Especificaciones.TROKELADO:
      return 'adhesivo trokelado'
    default: return 'No esta'
  }
}

