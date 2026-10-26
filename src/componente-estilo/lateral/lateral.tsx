import { ReactNode } from "react";
import './lateral.css'

interface Prop {
  children: ReactNode;
  nuevoEstilo?: string;
}

const Lateral = ({nuevoEstilo = '', children}:Prop) => {
  return (
    <div className={`lateral ${nuevoEstilo}`}>
      {children}
    </div>
  )
}

export default Lateral
