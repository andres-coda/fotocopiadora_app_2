import { ReactNode } from "react"
import './botonera.css'

interface Props {
  children: ReactNode;
  nuevoEstilo?: string | undefined;
}

function Botonera({ children, nuevoEstilo = undefined }: Props) {
  return (
    <div className={`botonera ${nuevoEstilo|| ''}`}>
      {children}
    </div>
  )
}

export default Botonera