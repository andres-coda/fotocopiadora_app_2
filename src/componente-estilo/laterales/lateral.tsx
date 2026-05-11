import { ReactNode } from "react"
import './lateral.css'
import Titulo from "../texto/titulo";

interface LateralProp {
  children?: ReactNode | undefined;
  texto?:string;
  nuevaClase?:string | undefined;
}
export default function Lateral({ children = undefined, texto, nuevaClase=''}: LateralProp) {
  return (
    <div className={`lateral ${nuevaClase}`}>
      {texto &&<Titulo titulo={texto} subtitulo nuevoEstilo="centrado"/>}
      {children}
    </div>
  )
}