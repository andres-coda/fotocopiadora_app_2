import { ErrorInfo } from "react";
import Centro from "../../componente-estilo/centro/centro";
import Titulo from "../../componente-estilo/texto/titulo";
import Texto from "../../componente-estilo/texto/texto";
interface Prop{
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
}

const PantallaError = ({error, errorInfo}:Prop) => {
  return (
    <>
    <Centro>
      <Titulo titulo="Algo salió mal nuevo dato" />
      <Texto texto={`Error: ${error}`} error />
      <Texto texto={`Información del error: ${errorInfo?.componentStack ? errorInfo?.componentStack : ''}, ${errorInfo?.digest ? errorInfo?.digest : ''}`} chica />
    </Centro>
    </>
  )
}

export default PantallaError


