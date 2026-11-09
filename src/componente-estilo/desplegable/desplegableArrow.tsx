import { useState } from 'react';
import Boton from '../boton/boton';
import Texto from '../texto/texto';
import Arrow from '../../assets/arrow.svg?react';
import './desplegable.css';
import Centro from '../centro/centro';
import useDesplegableClase from './useDesplegableClase';
import { ContenedorCentro } from '../centro/centroExterior';
import { DesplegableProp } from './desplegable.interface';
import Botonera from '../botonera/botonera';

const DesplegableArrow = ({
  children,
  titulo,
  nuevoEstilo = '',
  verde = false,
  gris = false,
  grid = false,
  finListaRef = undefined,
  entidad = undefined,
  vacio = false,
  loading = false,
  error = undefined,
  contenedorRef = undefined,
  botones = undefined,
}: DesplegableProp) => {
  const [activo, setActivo] = useState<boolean>(false);
  const { clase } = useDesplegableClase({ verde, gris, nuevoEstilo });
  return (
    <div className={clase}>
      <Texto texto={titulo} mediana negrita />
      <Boton
        cerrar
        nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
        onClick={() => setActivo(prev => !prev)}
        icono={<Arrow />}
      />
      {activo && grid && (
        <Centro
          finListaRef={finListaRef}
          entidad={entidad}
          vacio={vacio}
          loading={loading}
          error={error}
          ref={contenedorRef}
        >
          {children}
        </Centro>
      )}
      {activo && !grid && (
        <ContenedorCentro loading={loading} error={error}>
          {children}
        </ContenedorCentro>
      )}
      {activo && botones && <Botonera derecha>{botones}</Botonera>}
    </div>
  );
};

export default DesplegableArrow;
