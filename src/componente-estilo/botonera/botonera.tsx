import { ReactNode } from 'react';
import './botonera.css';

interface Props {
  children: ReactNode;
  nuevoEstilo?: string | undefined;
  derecha?: boolean;
  ajustada?: boolean;
}

function Botonera({ children, nuevoEstilo = '', derecha = false, ajustada = false }: Props) {
  return <div className={`botonera ${nuevoEstilo} ${derecha ? 'botonera-derecha' : ''} ${ajustada? 'botonera-ajustada' : ''}`}>{children}</div>;
}

export default Botonera;
