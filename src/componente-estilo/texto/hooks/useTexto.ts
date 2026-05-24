import { estilosTextoProps } from "../modelo/texto.interface";

function useTexto({ 
    chica, 
    mediana, 
    negrita, 
    grande, 
    muyGrande, 
    sombra, 
    error, 
    inverso,
    centrado, 
    derecha, 
    ajustado,
    alCien,
    inline,
    nuevoEstilo 
  }: estilosTextoProps) {
  const clase = [
    centrado && !derecha && 'centrado',
    derecha && 'derecha',
    chica && !mediana && !grande && !muyGrande && 'chica',
    mediana && !grande && !muyGrande && 'mediana',
    grande && !muyGrande && 'grande',
    muyGrande && 'muyGrande',
    negrita && 'negrita',
    sombra && !error && !inverso && 'sombra',
    error && !inverso && 'error',
    inverso && 'inverso',
    ajustado && 'ajustado',
    alCien && 'alCien',
    inline && 'inline',
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ')

  return { clase }
}

export default useTexto;