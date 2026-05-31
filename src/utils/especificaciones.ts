import { Especificaciones } from "../modelo/Entidades/especificacion/especificacion.enum";
import { EspecificacionProp, GruposExlusivosProp } from "../modelo/Entidades/especificacion/especificacion.interface";
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

export const espDefaultInicial: Especificaciones[] = [
  Especificaciones.BLANCO_Y_NEGRO,
  Especificaciones.ABROCHADO,
  Especificaciones.DOBLE_FAZ,
];

export const gruposExclusivos: GruposExlusivosProp[] = [
  {
    opciones: [
      Especificaciones.SIMPLE_FAZ,
      Especificaciones.DOBLE_FAZ,
    ],
    defecto: Especificaciones.DOBLE_FAZ,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.ANILLADO,
      Especificaciones.SUELTO,
      Especificaciones.ABROCHADO,
    ],
    defecto: Especificaciones.ABROCHADO,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.COLOR,
      Especificaciones.BLANCO_Y_NEGRO,
    ],
    defecto: Especificaciones.BLANCO_Y_NEGRO,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.ADHESIVO,
      Especificaciones.TROKELADO,
    ],
    obligatorio: false,
  },
] as const;

export const normalizarEspecificaciones = (
  especificaciones: Especificaciones[]
): Especificaciones[] => {

  let resultado = [...new Set(especificaciones)];

  for (const grupo of gruposExclusivos) {

    const seleccionadas = resultado.filter(e =>
      grupo.opciones.includes(e)
    );

    // ninguna
    if (seleccionadas.length === 0) {

      if (grupo.obligatorio && grupo.defecto) {
        resultado.push(grupo.defecto);
      }

      continue;
    }

    // más de una
    if (seleccionadas.length > 1) {

      const ultima =
        seleccionadas[seleccionadas.length - 1];

      resultado = resultado.filter(
        e => !grupo.opciones.includes(e)
      );

      resultado.push(ultima);
    }
  }

  return resultado;
};

export const sonEspecificacionesIguales = (
  a: string[],
  b: string[]
) =>
  a.length === b.length &&
  a.every(x => b.includes(x));
