import { ReactNode } from "react";

export interface BotoneraClaseProp {
  nuevoEstilo?: string | undefined;
  derecha?: boolean;
  ajustada?: boolean;
  flotante?: boolean;
  abajo?:boolean;
}

export interface BotoneraProps extends BotoneraClaseProp {
  children: ReactNode;
}