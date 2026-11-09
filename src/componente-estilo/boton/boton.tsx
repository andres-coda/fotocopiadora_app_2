import './boton.css';
import { MouseEvent } from 'react';
import useBoton from './hooks/useBoton';
import { BotonProp } from './modelo/boton.interface';
import Texto from '../texto/texto';

function Boton({
  onClick = undefined,
  texto = '',
  icono = undefined,
  titulo = '',
  secundario,
  terciario,
  edit,
  btnFiltro,
  cerrar,
  nuevoEstilo,
  submit,
  reset,
  iconoChico
}: BotonProp) {
  const { clase, tipo, colorTexto } = useBoton({
    btnFiltro,
    secundario,
    terciario,
    cerrar,
    edit,
    nuevoEstilo,
    submit,
    reset,
    iconoChico,
    hayTexto: texto ? true : false
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (!onClick) return;
    onClick(e);
  };

  return (
    <button
      onClick={e => handleClick(e)}
      className={clase}
      type={tipo}
      title={titulo ? titulo : undefined}
    >
      {icono ? (
        icono
      ) : (
        <Texto
          texto={texto}
          centrado
          inverso={colorTexto == 'inverso'}
          nuevoEstilo={colorTexto == 'nuevoEstilo' ? 'btn-texto' : undefined}
          chica={btnFiltro}
        />
      )}
    </button>
  );
}

export default Boton;
