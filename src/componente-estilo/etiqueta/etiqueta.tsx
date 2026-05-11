import Texto from '../texto/texto'
import './etiqueta.css'

interface Prop{
    etiqueta:string;
    activo: boolean;
}

const Etiqueta = ({etiqueta, activo}:Prop) => {
  return (
    <div className={`etiqueta ${!activo ? 'etiqueta-inactivo' : ''}`}>
      <Texto texto={etiqueta} centrado chica nuevoEstilo={`${!activo ? 'sombra' : ''}`} />
    </div>
  )
}

export default Etiqueta
