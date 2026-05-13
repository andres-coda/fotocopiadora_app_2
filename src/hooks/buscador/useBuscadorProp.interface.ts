import { UnknownAction } from "@reduxjs/toolkit";
import { SetStateAction, Dispatch } from "react";
import { filtroLlamada } from "../../redux/modelo/reduxContext.interface";
import { HasId } from "../../modelo/general/hasId.interface";
import { ordenProp } from "../../modelo/orden/esqOrden.esquema";
import { FiltroIndividual } from "../../filtro/filtro.interface";

export interface useBuscadorCompletoProp<T extends HasId>{
  estadoFiltros:filtroLlamada[]
  filtros:FiltroIndividual<T>[]
  keyBuscador?: (keyof T)[];
  keyExterna?: (v: string, e: T) => boolean;
  sortBy: keyof T;
  sortOrder?: 'asc' | 'desc';
  setModalLocal?: Dispatch<SetStateAction<boolean>>
  elementos?: T[];
  elementoSelect?: T | null,
  resetSelectElemento?:()=> UnknownAction;
}

export interface BuscadorProp<T extends HasId> extends Omit<useBuscadorCompletoProp<T>, 'estadoFiltros' | 'filtros'>{
  filtros?: (e: T) => boolean;
}

export interface useFiltroProp<T extends HasId> extends Pick<useBuscadorCompletoProp<T>, 'estadoFiltros' | 'filtros'>{
  estadoFiltros:filtroLlamada[]
  filtros:FiltroIndividual<T>[]
}

export interface useOrdenProp<T extends HasId> extends Pick<useBuscadorCompletoProp<T>, 'sortBy' | 'sortOrder'>{
  setOrden:(e:ordenProp<T>)=> UnknownAction;
}