import { FieldError, Control, FieldValues, Path } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";

export interface InputProps<T extends FieldValues> {
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
  nuevoEstilo?:string;
}

export type CheckInputProps<T extends FieldValues> = Pick<InputProps<T>, 'name' | 'control' | 'label' | "tipo" | 'alingDerecha'>;

export interface Opcion {
  value: string;
  label: string;
}

export interface DesplegableProps<T extends FieldValues> extends InputProps<T> {
  opciones: Opcion[];
}