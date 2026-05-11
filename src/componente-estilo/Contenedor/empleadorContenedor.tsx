import { ReactNode } from "react"
import './contenedor.css'

interface Prop{
    children: ReactNode,
}

const EmpleadorContenedor = ({children}:Prop) => {
  return (
    <div className="contenedor-particular">
        {children}
    </div>
  )
}

export default EmpleadorContenedor