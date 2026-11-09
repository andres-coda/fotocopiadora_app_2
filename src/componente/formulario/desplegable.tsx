import { Controller, FieldValues } from 'react-hook-form';
import Texto from '../../componente-estilo/texto/texto';
import { DesplegableProps } from './modelo/input.interface';
import { esCampoRequerido } from '../../utils/formulario';
import useInput from './hook/useInput';
import './estilos/input.css';

const Desplegable = <T extends FieldValues>({
  name,
  control,
  label,
  opciones,
  error = undefined,
  alingDerecha,
  onFocus,
  onBlur,
  esquema,
  nuevoEstilo,
  texto = undefined,
  loading =false,
  nuevoEstiloInput,
  chico = false,
  noEsRequerido = false
}: DesplegableProps<T>) => {
  const {claseDesplegable, claseInputCompleto, claseInput} = useInput({
    alingDerecha,
    hayError: error ? true : false,
    nuevoEstilo,
    nuevoEstiloInput,
    chico,
    esDesplegable:true
  })
  if(loading) return <Texto texto={'Cambiando...'} desplegable />
  return (
    <div className={claseDesplegable}>
      {texto ? <Texto texto={texto} chica ajustado/> : null}
      <div className={claseInputCompleto}>
        <span>
          {!noEsRequerido && esCampoRequerido(esquema, name) && <Texto texto="*" derecha negrita error />}
        </span>
        <div
          className={claseInput}
        >
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <select
                id={String(name)}
                {...field}
                value={field.value ?? ''}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                {opciones.map(op => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            )}
          />
          <label htmlFor={String(name)}>{label}</label>
        </div>
        <span>{error && <Texto texto={String(error.message)} error/>}</span>
      </div>
    </div>
  );
};

export default Desplegable;
