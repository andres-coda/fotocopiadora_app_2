import { MouseEventHandler, ReactNode } from 'react';

export interface BotonEstilosProp {
  secundario?: boolean | undefined;
  terciario?: boolean | undefined;
  edit?: boolean | undefined;
  cerrar?: boolean | undefined;
  nuevoEstilo?: string | undefined;
  submit?: boolean | undefined;
  reset?: boolean | undefined;
  btnFiltro?: boolean;
  hayTexto?:boolean;
  iconoChico?:boolean;
}

export interface BotonProp extends Omit<BotonEstilosProp, 'hayTexto'> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  texto?: string;
  icono?: ReactNode;
  titulo?: string | undefined;
}
