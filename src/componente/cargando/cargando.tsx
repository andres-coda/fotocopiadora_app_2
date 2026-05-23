import Titulo from "../../componente-estilo/texto/titulo"
import './cargando.css'

const Cargando = () => {
  return (
    <div className="cargando">
      <Titulo titulo="Cargando" subtitulo nuevoEstilo="cargando-texto" />
      <Titulo titulo="" subtitulo nuevoEstilo="cargando-puntos" />
    </div>
  )
}

export default Cargando
