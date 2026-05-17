import { Especificaciones } from "../modelo/Entidades/especificacion/especificacion.enum";

export const transformarEspecificaciones = (esp: Especificaciones[] | undefined, espParticular: Especificaciones): boolean => {
  if (!esp || !espParticular) return false;
  return esp.includes(espParticular);
}

export const transformarEspecificacinesATexto = (esp: Especificaciones[] | undefined): string => {
  if (!esp || esp.length === 0) return '';
  return esp.map(e => {
    switch (e) {
      case Especificaciones.ABROCHADO:
        return 'abrochado';
      case Especificaciones.ADHESIVO:
        return 'con adhesivo blanco brilloso';
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
        return 'con adhesivo blanco brilloso trokelado';
    }
  }
  ).join(', ');
}

