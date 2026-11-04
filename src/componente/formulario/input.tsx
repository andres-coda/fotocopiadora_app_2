import { Controller, FieldValues } from 'react-hook-form';
import './input.css';
import Texto from '../../componente-estilo/texto/texto';
import { InputProps } from './modelo/input.interface';
import { esCampoRequerido } from '../../utils/formulario';

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  tipo = undefined,
  error = undefined,
  alingDerecha = undefined,
  onFocus,
  onBlur,
  esquema,
  formatValue,
  parseValue,
}: InputProps<T>) => {
  return (
    <div className="inputs-span">
      <span>
        {esCampoRequerido(esquema, name) && <Texto texto="*" derecha chica negrita error />}
      </span>
      <div className={`inputs-entero ${error && 'is-invalida'} ${alingDerecha && 'alin-derecha'}`}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={String(name)}
              type={tipo}
              placeholder={' '}
              autoComplete="off"
              {...field}
              value={formatValue ? formatValue(field.value) : (field.value ?? '')}
              onChange={e => {
                const raw = e.target.value;
                field.onChange(parseValue ? parseValue(raw) : raw);
              }}
              onFocus={onFocus}
              // `{...field}` ya trae el `onBlur` de react-hook-form, que marca
              // el campo como `touched`. Pisarlo con el `onBlur` propio (o con
              // `undefined` cuando el consumidor no pasa ninguno) lo dejaba sin
              // ejecutar en todos los formularios. Se encadenan los dos.
              onBlur={() => {
                field.onBlur();
                onBlur?.();
              }}
            />
          )}
        />
        <label htmlFor={String(name)}>{label}</label>
      </div>
      <span>{error && <Texto texto={String(error.message)} error chica />}</span>
    </div>
  );
};
export default Input;
