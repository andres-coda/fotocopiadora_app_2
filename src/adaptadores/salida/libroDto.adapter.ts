import { Especificaciones } from '../../modelo/Entidades/especificacion/especificacion.enum';
import {
  libroDtoProp,
  LibroEmresaDtoProp,
  LibroExtraDtoProp,
  LibroPrincipalDtoProp,
} from '../../modelo/Entidades/libro/dtoLibro.interface';
import {
  formValuesLibroComponentes,
  formValuesLibroDatosExtras,
  formValuesLibroDatosLocales,
  formValuesLibroNombre,
} from '../../modelo/Entidades/libro/esqLibro.esquema';
import { CrearLibroProp } from '../../servicio/libro/useLibroApi';

interface EditarLibroLocalAdapterProp {
  data: formValuesLibroDatosLocales;
  especificaciones: Especificaciones[];
}

/**
 * Los campos opcionales del formulario no deben viajar como null: Number(undefined)
 * devuelve NaN y JSON.stringify lo serializa como null. Con undefined la clave
 * desaparece del body y el backend aplica su valor por defecto.
 */
const numeroOpcional = (valor?: string): number | undefined => {
  if (valor === undefined || valor.trim() === '') return undefined;
  const numero = Number(valor);
  return Number.isNaN(numero) ? undefined : numero;
};

/**
 * `edicion` viaja como texto de punta a punta. Un campo vacio en el formulario
 * significa "sin edicion" y tiene que llegar como undefined: pasarlo por Number
 * lo convertia en 0 (o en NaN, que se serializa como null) y el libro quedaba
 * con una edicion que nadie cargo.
 */
const textoOpcional = (valor?: string): string | undefined => {
  const texto = valor?.trim();
  return texto ? texto : undefined;
};

export const libroExtraDtoAdapter = (data: formValuesLibroDatosExtras): LibroExtraDtoProp => {
  const newGrupo: LibroExtraDtoProp = {
    descripcion: data.descripcion,
    autor: data.autor,
    edicion: textoOpcional(data.edicion),
    anio: data.anio,
    img: data.img,
  };
  return newGrupo;
};

export const libroEmpresaEditarDtoAdapter = ({
  data,
  especificaciones,
}: EditarLibroLocalAdapterProp): LibroEmresaDtoProp => {
  const newGrupo: LibroEmresaDtoProp = {
    cantidadPg: Number(data.cantidadPg),
    adhesivos: numeroOpcional(data.adhesivos),
    especificacionesDefecto: especificaciones,
    detalle_impresion: data.detalles_impresion,
  };
  return newGrupo;
};

export const libroPrincipalDtoAdapter = (
  data: formValuesLibroNombre,
  componentes: formValuesLibroComponentes
): LibroPrincipalDtoProp => {
  const newGrupo: LibroPrincipalDtoProp = {
    nombre: data.nombre,
    nivel: componentes.nivel,
    editorial: data.editorial,
    materia: data.materia,
    componentes: transformarComponenteArray(componentes.componentes),
  };
  return newGrupo;
};

/**
 * `id_libro_completo` solo viaja cuando hay un libro del catalogo elegido. Si
 * se agrega siempre, el DTO queda con una clave propia en `undefined` que
 * `Object.keys` ve aunque `JSON.stringify` la descarte: el objeto deja de
 * reflejar el body que se manda.
 */
export const libroDtoAdapter = ({ data, especificaciones, id_libro_completo }: CrearLibroProp): libroDtoProp => {
  const newGrupo: libroDtoProp = {
    ...libroExtraDtoAdapter(data),
    ...libroEmpresaEditarDtoAdapter({ data, especificaciones }),
    ...libroPrincipalDtoAdapter(data, data),
    ...(id_libro_completo ? { id_libro_completo } : {}),
  };
  return newGrupo;
};

const transformarComponenteArray = (c: string | undefined): string[] => {
  if (!c) return [];
  return c
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
};
