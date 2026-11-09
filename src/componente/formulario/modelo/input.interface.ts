import { FieldError, Control, FieldValues, Path } from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

export interface InputClaseProp {
  nuevoEstilo?: string;
  alingDerecha?: boolean;
  hayError?:boolean;
  nuevoEstiloInput?: string;
  chico?:boolean;
  esDesplegable?:boolean;
}


export interface InputProps<T extends FieldValues> extends Omit<InputClaseProp, 'hayError'| 'nuevoEstiloInput' | 'chico' | 'esDesplegable'>{
  name: Path<T>;
  control: Control<T>;
  label: string;
  tipo?: string | undefined;
  error?: FieldError | undefined;
  alingDerecha?: boolean | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  esquema: ZodObject<ZodRawShape>;
  formatValue?: (value: string) => string;
  parseValue?: (value: string) => string;
  nuevoEstilo?: string;
}

export type CheckInputProps<T extends FieldValues> = Pick<
  InputProps<T>,
  'name' | 'control' | 'label' | 'tipo' | 'alingDerecha'
>;

export interface TextAreaProps<T extends FieldValues>
  extends Pick<InputProps<T>, 'name' | 'control' | 'label' | 'error' | 'esquema'>, Pick<InputClaseProp, 'nuevoEstiloInput'> {
  filas?: number;
}

export interface Opcion {
  value: string;
  label: string;
}

export interface DesplegableProps<T extends FieldValues> extends InputProps<T>,Pick<InputClaseProp, 'nuevoEstiloInput' | 'chico'>  {
  opciones: Opcion[];
  texto?: string;
  loading?:boolean;
  noEsRequerido?:boolean;
}
