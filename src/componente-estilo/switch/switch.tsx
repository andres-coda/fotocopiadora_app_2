import './switch.css';
import { MouseEvent } from 'react';
import useSwitch from './hooks/useSwitch';
import { SwitchProp } from './modelo/switch.interface';
import Texto from '../texto/texto';

function Switch({
  activo,
  onActivar,
  nuevoEstilo = undefined,
  titulo = '',
  texto = undefined,
}: SwitchProp) {
  const { clase } = useSwitch({ activo, nuevoEstilo });

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    onActivar(!activo);
  };

  return (
    <div className="swith-contenedor">
      {texto && <Texto texto={texto} chica inline ajustado />}
      <button
        onClick={e => handleClick(e)}
        className={`switch ${clase}`}
        type="button"
        role="switch"
        aria-checked={activo}
        title={titulo}
      />
    </div>
  );
}

export default Switch;
