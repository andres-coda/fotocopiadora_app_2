import './botonera.css';
import { BotoneraProps } from './botonera.interface';
import useBotonera from './useBotonera';

function Botonera({ children, nuevoEstilo, derecha, ajustada, flotante, abajo }: BotoneraProps) {
  const { clase } = useBotonera({ nuevoEstilo, derecha, ajustada, flotante, abajo });
  return <div className={clase}>{children}</div>;
}

export default Botonera;
