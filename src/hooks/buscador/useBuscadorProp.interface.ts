import { UnknownAction } from "@reduxjs/toolkit";
import { SetStateAction, Dispatch } from "react";
import { filtroLlamada } from "../../redux/modelo/reduxContext.interface";
import { ordenProp } from "../../modelo/orden/esqOrden.esquema";
import { FiltroIndividual } from "../../filtro/filtro.interface";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";

export interface useBuscadorCompletoProp<T extends BaseProp>{
  estadoFiltros:filtroLlamada[]
  filtros:FiltroIndividual<T>[]
  sortBy: keyof T;
  sortOrder?: 'asc' | 'desc';
  setModalLocal?: Dispatch<SetStateAction<boolean>>
  elementos?: T[];
  elementoSelect?: T | null,
  propuestas?: PropuestaProp[],
  resetSelectElemento?:()=> UnknownAction;
}

export interface BuscadorProp<T extends BaseProp> extends Omit<useBuscadorCompletoProp<T>, 'estadoFiltros' | 'filtros'>{
  filtros?: (e: T) => boolean;
}

export interface useFiltroProp<T extends BaseProp> extends Pick<useBuscadorCompletoProp<T>, 'estadoFiltros' | 'filtros'>{
  estadoFiltros:filtroLlamada[]
  filtros:FiltroIndividual<T>[]
}

export interface useOrdenProp<T extends BaseProp> extends Pick<useBuscadorCompletoProp<T>, 'sortBy' | 'sortOrder'>{
  setOrden:(e:ordenProp<T>)=> UnknownAction;
}