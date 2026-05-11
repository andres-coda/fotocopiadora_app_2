import { z } from "zod";
import { FiltersState, orden } from "../../redux/modelo/reduxContext.interface";
import { HasId } from "../general/hasId.interface";

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

export interface ordenProp<T> extends Pick<FiltersState<T>, 'sortBy' | 'sortOrder'>{}

export const ordenDto =<T extends HasId>(data:formValuesOrden):ordenProp<T> => {
  return {
    sortBy:data.orden as keyof T,
    sortOrder: data.ascendente ? 'asc' : 'desc'
  }
}