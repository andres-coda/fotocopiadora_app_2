import { BotoneraClaseProp } from "./botonera.interface"

const useBotonera = ({ nuevoEstilo = '', derecha = false, ajustada = false, flotante = false, abajo = false }: BotoneraClaseProp) => {
  const clase: string = [
    'botonera',
    derecha && 'botonera-derecha',
    ajustada && 'botonera-ajustada',
    flotante && 'botonera-flotante',
    abajo && 'botonera-abajo',
    nuevoEstilo
  ]
    .filter(Boolean)
    .join(' ');

  return { clase }
}

export default useBotonera
