import { Controller, FieldValues } from 'react-hook-form';
import './input.css';
import Texto from '../../componente-estilo/texto/texto';
import { TextAreaProps } from './modelo/input.interface';
import { esCampoRequerido } from '../../utils/formulario';

/**
 * Textarea con el mismo contrato que `Input`: label flotante, campo requerido
 * derivado del esquema Zod y mensaje de error debajo.
 */
const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  error = undefined,
  esquema,
  filas = 4,
}: TextAreaProps<T>) => {
  return (
    <div className="inputs-span">
      <span>
        {esCampoRequerido(esquema, name) && <Texto texto="*" derecha chica negrita error />}
      </span>
      <div className={`inputs-entero ${error && 'is-invalida'}`}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              id={String(name)}
              // El espacio es lo que habilita el label flotante
              // (`textarea:not(:placeholder-shown) + label`).
              placeholder=" "
              rows={filas}
              autoComplete="off"
              {...field}
              value={field.value ?? ''}
            />
          )}
        />
        <label htmlFor={String(name)}>{label}</label>
      </div>
      <span>{error && <Texto texto={String(error.message)} error chica />}</span>
    </div>
  );
};

export default TextArea;
