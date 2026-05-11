import { mens } from "./enum/mens.enum";

export const entidad = {
  "ANTIGUEDAD": "antiguedad",
  "ANTIGUEDAD_TIPO": "antiguedad_tipo",
  "CARGO": "cargo",
  "CBU": "cbu",
  "CLASIFICACION": "clasificacion",
  "CONCEPTO": "concepto",
  "CONSTANTE": "constante",
  "EMPLEADO": "empleado",
  "EMPLEADOR":"empleador",
  "LICENCIA": "licencia",
  "LIQUIDACION": "liquidacion",
  "LIQINDIVIDUAL": "liquidacionIndividual",
  "OBRASOCIAL": "obraSocial",
  "OSEMPRESA": "obraSocialEmpresa",
  "REVISTA": "revista",
  "SECCIONES":"secciones",
  "FORMULA": "formula",
  "CONVENIO": "convenio",
  "GRUPO": "grupo",
  "EMPLEADOR_SECCION": "empleador_seccion",
  "SINDICATO" : "sindicato",
} as const;

type entidadType =(typeof entidad)[keyof typeof entidad];

export interface Mensaje{
  mensaje:mens;
  entidad:entidadType;
  id:string;
}
