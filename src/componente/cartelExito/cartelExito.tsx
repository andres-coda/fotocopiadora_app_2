import { useEffect } from 'react';
import Texto from '../../componente-estilo/texto/texto';
import useRetardo from '../../hooks/tiempo/useRetardo';

interface Props {
  mensaje: string;
  onCerrar: () => void;
  delay?: number;
}

/**
 * Cartel de exito reutilizable.
 * Muestra el mensaje y, tras el retardo, ejecuta `onCerrar` (usado para cerrar el modal).
 */
const CartelExito = ({ mensaje, onCerrar, delay = 2000 }: Props) => {
  const retardoCerrar = useRetardo(onCerrar, delay);

  useEffect(() => {
    retardoCerrar();
  }, []);

  return <Texto texto={mensaje} centrado />;
};

export default CartelExito;
