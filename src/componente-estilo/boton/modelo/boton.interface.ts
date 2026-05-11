import { MouseEventHandler, ReactNode } from "react";

export interface BotonEstilosProp{
    secundario?:boolean | undefined;
    terciario?:boolean | undefined;
    edit?: boolean | undefined;
    cerrar?: boolean | undefined;
    nuevoEstilo?:string | undefined;
    submit?: boolean | undefined;
    reset?: boolean | undefined;
}

export interface BotonProp extends BotonEstilosProp{
    onClick?: MouseEventHandler<HTMLButtonElement>;
    texto?: string; 
    icono?: ReactNode;
    titulo?: string | undefined;
}
