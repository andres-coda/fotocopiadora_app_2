import { ReactNode } from "react"
import './contenedor.css'

interface Prop{
    children: ReactNode,
}

const PrivadoContenedor = ({children}:Prop) => {
  return (
    <div className="contenedor-particular">
        {children}
    </div>
  )
}

export default PrivadoContenedor