import { Controller, FieldValues } from 'react-hook-form';
import './input.css'
import Texto from '../../componente-estilo/texto/texto';
import { DesplegableProps } from "./modelo/input.interface";
import { esCampoRequerido } from '../../utils/formulario';

const Desplegable = <T extends FieldValues>({
  name,
  control,
  label,
  opciones,
  error = undefined,
  alingDerecha = undefined,
  onFocus,
  onBlur,
  esquema
}: DesplegableProps<T>) => {
  return (
    <div className='inputs-span'>
      <span>{esCampoRequerido(esquema, name) && <Texto texto='*' derecha chica negrita error />}</span>
      <div className={`inputs-entero ${error && 'is-invalida'} ${alingDerecha && 'alin-derecha'}`}>
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            <select
              id={String(name)}
              {...field}
              value={field.value ?? ""}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled>Seleccionar...</option>
              {opciones.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>}
        />
        <label htmlFor={String(name)}>
          {label}
        </label>
      </div>
      <span>{error && <Texto texto={String(error.message)} error chica />}</span>
    </div>
  )
}

export default Desplegable;