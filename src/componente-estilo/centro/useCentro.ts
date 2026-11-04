
import { CentroClaseProp } from "./centro.interface"

const useCentro = ({ scroll, desplegable, nuevoEstilo = '', centro = undefined }: CentroClaseProp) => {
  const claseExterior = centro ? centro : [
    'centro-exterior',
    scroll && 'scroll',
    desplegable && 'centro-predectivo',
    nuevoEstilo
  ]
    .filter(Boolean)
    .join(' ');

  const claseCentro = [
    'centro',
    !scroll && 'scroll',
    desplegable && 'centro-predectivo-interno',
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

    return {claseExterior, claseCentro};
}

export default useCentro
