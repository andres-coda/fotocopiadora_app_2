import { Especificaciones } from "../modelo/Entidades/especificacion/especificacion.enum";
import { LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { PrecioAbareviatura } from "../modelo/Entidades/precio/precio.enum";
import { PrecioProp } from "../modelo/Entidades/precio/precio.interface";

interface EstimarPrecioProp {
  libro: LibroProp,
  precios: PrecioProp[],
  especificaciones?: Especificaciones[],
  cantidad?: number;
}

interface PgProp {
  pg: number;
  doble: boolean;
}

const DEFAULT_ESPECIFICACIONES = [
  Especificaciones.COLOR,
  Especificaciones.DOBLE_FAZ,
  Especificaciones.ANILLADO,
];

const obtenerEspecificaciones = (
  libro: LibroProp,
  especificaciones?: Especificaciones[]
): Especificaciones[] => {
  if (especificaciones?.length) return especificaciones;

  if (libro.especificacionesDefecto?.length) {
    return libro.especificacionesDefecto;
  }

  return DEFAULT_ESPECIFICACIONES;
};

const tieneAdhesivos = (libro: LibroProp, esp: Especificaciones[]): boolean => {
  return (esp.includes(Especificaciones.ADHESIVO) ||
    esp.includes(Especificaciones.TROKELADO)) &&
    (libro.adhesivos ?? 0) > 0;
}

const calcularPrecioAdhesivos = (esp: Especificaciones[], libro: LibroProp, precios: PrecioProp[]): number => {

  if (tieneAdhesivos(libro, esp)) {
    const abreviatura = esp.includes(Especificaciones.ADHESIVO)
      ? PrecioAbareviatura.ADHESIVO
      : PrecioAbareviatura.TROKELADO;

    return libro.adhesivos! * buscarPrecio(precios, [abreviatura]);
  }
  return 0;
}

const calcularHojas = (
  libro: LibroProp,
  esp: Especificaciones[]
): PgProp => {
  const doble = esp.includes(Especificaciones.DOBLE_FAZ);

  let pg = doble
    ? Math.ceil(libro.cantidadPg / 2)
    : libro.cantidadPg;

  if (libro.adhesivos && !tieneAdhesivos(libro, esp)) {
    pg += doble
      ? libro.adhesivos * 2
      : libro.adhesivos;
  }

  return {
    pg,
    doble,
  };
};

const buscarPrecio = (
  precios: PrecioProp[],
  abreviaturas: PrecioAbareviatura[]
): number => {
  return Number(
    precios.find(
      p =>
        abreviaturas.every(a =>
          p.abreviatura?.includes(a)
        )
    )?.importe ?? 0
  );
};

const calcularPrecioAnillado = (
  pg: number,
  precios: PrecioProp[]
): number => {
  const base = 100;
  const rango = 150;

  if (pg <= base) return buscarPrecio(precios, [PrecioAbareviatura.ANILLADO_1]);
  if (pg <= base + rango) return buscarPrecio(precios, [PrecioAbareviatura.ANILLADO_2]);
  if (pg <= base + rango * 2 - 50) return buscarPrecio(precios, [PrecioAbareviatura.ANILLADO_3]);
  if (pg <= base + rango * 3 - 50) return buscarPrecio(precios, [PrecioAbareviatura.ANILLADO_4]);
  return 0;
};

export const calcularPrecio = ({
  libro,
  precios,
  especificaciones,
  cantidad = 1,
}: EstimarPrecioProp): number => {
  const esp = obtenerEspecificaciones(
    libro,
    especificaciones
  );

  const hojas: PgProp = calcularHojas(libro, esp);

  const esColor = esp.includes(Especificaciones.COLOR);
  const dobleFaz = hojas.doble;

  const abreviaturas: PrecioAbareviatura[] = [
    esColor
      ? PrecioAbareviatura.COLOR
      : PrecioAbareviatura.BLANCO_Y_NEGRO,

    dobleFaz
      ? PrecioAbareviatura.DOBLE_FAZ
      : PrecioAbareviatura.SIMPLE_FAZ,
  ];

  const precioBase = buscarPrecio(
    precios,
    abreviaturas
  );

  const adhesivos = calcularPrecioAdhesivos(esp, libro, precios);
  const anillado = calcularPrecioAnillado(hojas.pg + (tieneAdhesivos(libro, esp) ? libro.adhesivos ?? 0 : 0), precios);

  return (precioBase * hojas.pg + anillado + adhesivos) * cantidad;
};

