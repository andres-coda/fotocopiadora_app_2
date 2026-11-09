import { BaseSyntheticEvent, ReactNode } from "react";

export interface FormularioEstiloProp {
  estiloBoton?: string;
  claseForm?: string;
  hayTxtBtnConfirmar?:boolean;
  iconoChico?:boolean;
  hayTxtBtnSecundario?: boolean;
}

export interface FormularioProp extends Omit<FormularioEstiloProp, 'hayTxtBtnConfirmar' | 'hayTxtBtnSecundario'> {
  children: ReactNode;
  onSubmit?: (e?: BaseSyntheticEvent) => Promise<void>;
  titulo?: string;
  onReset?: () => void;
  textBtnConfirmar?: string;
  textBtnSecundario?: string;
  onClickSecundario?: () => void;
  etiquetaPrimaria?: string;
  etiquetaSecundaria?: string;
  loading?: boolean;
  errorFetch?: string | null;
  simple?:boolean;
}