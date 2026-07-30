import { ReactNode, RefObject } from "react";
import './predictivo.css'

interface DespelgableProp {
  children: ReactNode;
  finRegistros?: RefObject<HTMLDivElement>
}

const DesplegablePredictivo = ({ children, finRegistros }: DespelgableProp) => {
  return (
    <div className="predictivo-contenedor">
      {children}
      {
        finRegistros && <div ref={finRegistros}></div>
      }
    </div>
  )
}

export default DesplegablePredictivo;