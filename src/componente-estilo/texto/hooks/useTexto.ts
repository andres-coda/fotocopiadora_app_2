import { estilosTextoProps } from '../modelo/texto.interface';

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
  desplegable,
  nuevoEstilo,
}: estilosTextoProps) {
  const desp = 'inline ajustado chica desplegable-texto';
  const er = 'error chica'

  const clase = [
    'texto',
    centrado && !derecha && 'centrado',
    derecha && 'derecha',
    chica && !mediana && !grande && !muyGrande && 'chica',
    mediana && !grande && !muyGrande && 'mediana',
    grande && !muyGrande && 'grande',
    muyGrande && 'muyGrande',
    negrita && 'negrita',
    sombra && !error && !inverso && 'sombra',
    error && !inverso && er,
    inverso && 'inverso',
    ajustado && 'ajustado',
    alCien && 'alCien',
    inline && 'inline',
    desplegable && desp,
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  return { clase };
}

export default useTexto;
