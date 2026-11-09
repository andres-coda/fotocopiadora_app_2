import { InputClaseProp } from "../modelo/input.interface";


const useInput = ({
  nuevoEstilo = '',
  alingDerecha = false,
  hayError = false,
  nuevoEstiloInput = '',
  chico = false,
  esDesplegable = false
}:InputClaseProp) => {
  const claseInputCompleto =[
    'inputs-span',
    esDesplegable && chico && 'no-span',
    nuevoEstiloInput
  ]
  .filter(Boolean)
  .join(' ');

  const claseInput = [
    'inputs-entero',
    hayError && 'is-invalida',
    alingDerecha && 'alin-derecha',
    chico && 'select-chico',
    esDesplegable && 'no-label',
  ]
  .filter(Boolean)
  .join(' ');

  const claseDesplegable = [
    'desplegable-horizontal',
    nuevoEstilo
  ]
  .filter(Boolean)
  .join(' ');

  return {claseDesplegable, claseInput, claseInputCompleto}
}

export default useInput
