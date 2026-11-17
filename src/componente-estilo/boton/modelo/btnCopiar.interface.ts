export interface BtnCopiarClasProp {
  nuevoEstilo?:string;
  flotante?:boolean;
  derecha?:boolean;
}

export interface BtnCopiarProp extends BtnCopiarClasProp{
  copiar: () => void;
  //Texto del boton antes de copiar
  texto?:string;
  nuevoEstilo?:string;
  flotante?:boolean;
  derecha?:boolean;
}