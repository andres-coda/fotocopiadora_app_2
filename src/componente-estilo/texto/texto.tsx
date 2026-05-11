import useTexto from './hooks/useTexto'
import { textoProps } from './modelo/texto.interface'
import './texto.css'

function Texto({
  texto,
  chica = undefined,
  mediana = undefined,
  negrita = undefined,
  grande = undefined,
  muyGrande = undefined,
  sombra = undefined,
  error = undefined,
  inverso = undefined,
  centrado = undefined,
  derecha = undefined,
  ajustado = undefined,
  alCien = undefined,
  nuevoEstilo = undefined,
  etiqueta = undefined
}: textoProps) {

  const { clase } = useTexto({ 
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
    nuevoEstilo,
  })
  return (
    <p className={`texto ${clase}`} title={etiqueta && etiqueta}>{texto}</p>
  )
}

export default Texto