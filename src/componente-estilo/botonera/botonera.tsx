import { ReactNode } from 'react';
import './botonera.css';

interface Props {
  children: ReactNode;
  nuevoEstilo?: string | undefined;
  derecha?: boolean;
}

function Botonera({ children, nuevoEstilo = '', derecha = false }: Props) {
  return <div className={`botonera ${nuevoEstilo} ${derecha ? 'botonera-derecha' : ''}`}>{children}</div>;
}

export default Botonera;
