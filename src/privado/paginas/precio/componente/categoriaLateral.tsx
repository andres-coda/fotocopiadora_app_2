import Boton from '../../../../componente-estilo/boton/boton';
import Texto from '../../../../componente-estilo/texto/texto';
import Arrow from '../../../../assets/arrow.svg?react';
import { useEffect, useState } from 'react';
import Copiar from '../../../../assets/copiar.svg?react';
import Check from '../../../../assets/check.svg?react';
import { PrecioGrupoProp } from '../../../../componente/lateral/preciosCategoria';
import './categoriaLateral.css';

interface Prop {
  grupo: PrecioGrupoProp;
  copiarGrupo: (grupo: PrecioGrupoProp) => void;
}

const CategoriaLateral = ({ grupo, copiarGrupo }: Prop) => {
  const [activo, setActivo] = useState<boolean>(false);
  const [copiada, setCopiada] = useState<string | null>(null);

  useEffect(() => {
    if (!copiada) return;

    const timer = setTimeout(() => setCopiada(null), 1000);
    return () => clearTimeout(timer);
  }, [copiada]);

  return (
    <div className="categorias-lateral">
      <Texto texto={grupo.nombre}  inline nuevoEstilo='categoria-texto'/>
      <Boton
        icono={copiada === grupo.nombre ? <Check /> : <Copiar />}
        edit
        cerrar
        nuevoEstilo="btn-icono-chico btn-copiar-flotante"
        titulo={copiada === grupo.nombre ? 'Copiado' : `Copiar los precios de ${grupo.nombre}`}
        onClick={() => copiarGrupo(grupo)}
      />
      <Boton
        cerrar
        edit
        nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
        onClick={() => setActivo(prev => !prev)}
        icono={<Arrow />}
      />
      {activo && (
        <div className='categoria-precio'>
          {grupo.precios.map(p => (
            <div key={p.id} className='categoria-precio-interno'>
              <Texto texto={`${p.nombre}: `} chica/>
              <Texto texto={`$ ${p.importe.toString()}`}  chica derecha/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriaLateral;
