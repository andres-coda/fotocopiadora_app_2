import { ReactNode } from "react";
import './lateral.css'
import { useAutenticacion } from "../../hooks/autenticacion/useAutenticacion";

interface Prop {
  children: ReactNode;
  nuevoEstilo?: string;
}

const Lateral = ({nuevoEstilo = '', children}:Prop) => {
  const { token } = useAutenticacion();
 
  return (
    <div className={`lateral ${nuevoEstilo}`}>
      {token && children}
    </div>
  )
}

export default Lateral
