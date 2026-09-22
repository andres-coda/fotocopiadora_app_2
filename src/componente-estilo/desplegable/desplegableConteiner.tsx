import { ReactNode } from "react";
import './desplegable.css'

interface Prop {
  children: ReactNode;
  nuevoEstilo?: string;
}

const DesplegableConteiner = ({ children, nuevoEstilo }: Prop) => {
  return (
    <div className={`desplegable ${nuevoEstilo ? nuevoEstilo : ''}`}>
      {children}
    </div>
  )
}

export default DesplegableConteiner;