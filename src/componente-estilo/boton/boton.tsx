import './boton.css'
import { MouseEvent } from "react";
import useBoton from './hooks/useBoton';
import { BotonProp } from './modelo/boton.interface';
import Texto from '../texto/texto';

function Boton({
  onClick,
  texto = '',
  icono = undefined,
  titulo = '',
  secundario = undefined,
  terciario = undefined,
  edit = undefined,
  cerrar = undefined,
  nuevoEstilo = undefined,
  submit = undefined,
  reset = undefined,
}: BotonProp) {

  const { clase, tipo, colorTexto } = useBoton({ secundario, terciario, cerrar, edit, nuevoEstilo, submit, reset })

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (!onClick) return
    onClick(e);
  }

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`btn-general ${clase} ${!texto&& 'btn-icono'}`}
      type={tipo}
      title={titulo ? titulo : undefined}
    >{icono 
      ? icono
      : <Texto 
        texto={texto} 
        centrado
        inverso={colorTexto=='inverso'} 
        nuevoEstilo={colorTexto=='nuevoEstilo'
          ? 'btn-texto'
          : undefined
        }/>
    }</button>
  )
}

export default Boton;