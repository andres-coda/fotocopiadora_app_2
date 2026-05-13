import { Controller, FieldValues } from 'react-hook-form'
import './input.css'
import { CheckInputProps } from './modelo/input.interface'
import Texto from '../../componente-estilo/texto/texto'

const InputCheck = <T extends FieldValues>({
  name,
  control,
  label,
  tipo = 'checkbox',
  alingDerecha = undefined
}: CheckInputProps<T>) => {
  return (
    <div className='input-checkbox'>
      <label className='input-checkbox-label' htmlFor={name}>
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            <input
              id={String(name)}
              type={tipo}
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              autoComplete="off"
            />}
        />
        <Texto texto={label} derecha={alingDerecha} chica/>
      </label>
    </div>
  )
}

export default InputCheck
