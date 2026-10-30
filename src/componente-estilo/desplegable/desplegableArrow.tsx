import { ReactNode, useState } from 'react';
import Boton from '../boton/boton';
import Texto from '../texto/texto';
import Arrow from '../../assets/arrow.svg?react';
import './desplegable.css';

interface Prop {
  children: ReactNode;
  nuevoEstilo?: string;
  titulo: string;
  verde?:boolean;
  gris?:boolean;
}

const DesplegableArrow = ({ children, titulo, nuevoEstilo = '', verde = false, gris = false }: Prop) => {
  const [activo, setActivo] = useState<boolean>(false);
  return (
    <div 
    className={`
    desplegable-arrow ${nuevoEstilo ? nuevoEstilo : ''} 
    ${verde ? 'desplegable-verde' : ''}
    ${gris ? 'desplegable-gris' : ''}
    `}>
      <Texto texto={titulo} mediana negrita />
      <Boton
        cerrar
        nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
        onClick={() => setActivo(prev => !prev)}
        icono={<Arrow />}
      />
      {activo && children}
    </div>
  );
};

export default DesplegableArrow;
