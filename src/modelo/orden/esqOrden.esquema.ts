import { z } from "zod";
import { orden } from "../../redux/modelo/reduxContext.interface";
import { BaseProp } from "../Entidades/base/base.interface";

export const ordenForm = z.object({
  orden: z.string().optional(),
  ascendente: z.boolean().optional(),
})

export type formValuesOrden = z.infer<typeof ordenForm>;

interface Prop<T>{
  edit: keyof T; 
  ascendente: orden;
}

export const ordenFormEdit=<T> ({edit, ascendente}:Prop<T>): formValuesOrden  => {
  return {
    orden: edit as string,
    ascendente: ascendente === 'asc' ? true : false,
  }
}

export interface ordenProp<T> extends Pick<{ sortBy: keyof T; sortOrder: orden }, 'sortBy' | 'sortOrder'>{}

export const ordenDto =<T extends BaseProp>(data:formValuesOrden):ordenProp<T> => {
  return {
    sortBy:data.orden as keyof T,
    sortOrder: data.ascendente ? 'asc' : 'desc'
  }
}