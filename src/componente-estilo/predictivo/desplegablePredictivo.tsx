import { ReactNode, RefObject } from 'react';
import './predictivo.css';
import Centro from '../centro/centro';

interface DespelgableProp {
  children: ReactNode;
  //Hace referencia al final de la lista.
  finListaRef?: RefObject<HTMLDivElement>;
  //error al hacer peticion a la api
  error?: string | null;
  //Loading para saber si la petición fue enviada y esta cargando los datos
  loading?: boolean; 
}

const DesplegablePredictivo = ({ 
  children, 
  finListaRef, 
  error = undefined,
  loading = false
}: DespelgableProp) => {
  return (
    <Centro
      finListaRef={finListaRef}
      error={error}
      loading={loading}
      desplegable
    >
      {children}
    </Centro>
  );
};

export default DesplegablePredictivo;
