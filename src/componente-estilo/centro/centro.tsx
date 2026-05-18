import { forwardRef, ReactNode, RefObject } from "react"
import './centro.css'
import Titulo from "../texto/titulo";

interface CentroProp {
  children?: ReactNode | undefined;
  texto?:string;
  ref?: RefObject<HTMLDivElement>;
  chico?:boolean;
  nuevoEstilo?: string;
}

const Centro =  forwardRef<HTMLDivElement, CentroProp>(({children, texto, chico=undefined, nuevoEstilo = undefined}, ref)=>{
  return (
    <div className={`centro ${chico ? 'centro-chico':''} ${nuevoEstilo ? nuevoEstilo : ''}`} ref={ref}>
      {texto && <Titulo titulo={texto}/>}
      {children}
    </div>
  )
});

export default Centro;