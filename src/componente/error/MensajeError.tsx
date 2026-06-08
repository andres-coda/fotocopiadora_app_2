import Texto from "../../componente-estilo/texto/texto";
import Titulo from "../../componente-estilo/texto/titulo";


interface Prop{
    error:string;
    errorInfo?:string;
}
const MensajeError = ({error, errorInfo}:Prop) => {
  return (
    <div className="cargando">
      <Titulo titulo={error} subtitulo nuevoEstilo="cargando-texto" />
      <Texto texto={errorInfo?? 'Error'} error chica />
    </div>
  )
}

export default MensajeError