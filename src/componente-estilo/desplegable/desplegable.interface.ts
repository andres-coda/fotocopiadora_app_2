import { ReactNode, RefObject } from "react";

export interface DesplegableClasProp {
  nuevoEstilo?: string;
  verde?: boolean;
  gris?: boolean;

}

export interface DesplegableProp extends DesplegableClasProp {
  children: ReactNode;
  titulo: string;
  grid?: boolean;
  //Hace referencia al final de la lista.
  finListaRef?: RefObject<HTMLDivElement>;
  //Se utiliza para nombrar cuando no hay elementos en la lista
  entidad?: string;
  //Se utiliza para poner el texto de que no hay elementos en la lista, es condicion
  //de los datos que van en el children
  vacio?: boolean;
  //Loading para saber si la petición fue enviada y esta cargando los datos
  loading?: boolean; 
  //error al hacer peticion a la api
  error?: string | null;
  contenedorRef?: RefObject<HTMLDivElement>
}