import { Dispatch, forwardRef, MouseEventHandler, RefObject, SetStateAction } from 'react';
import Boton from '../../componente-estilo/boton/boton'
import Botonera from '../../componente-estilo/botonera/botonera'
import InputBuscar from '../formulario/inputBuscar'
import Arrow from '../../assets/arrow-small.svg?react'
import Mas from '../../assets/mas.svg?react'
import './buscador.css'
import Titulo from '../../componente-estilo/texto/titulo';

interface BuscadorProp {
  texto?: string ;
  setValor: Dispatch<SetStateAction<string>>;
  valor: string;
  handleMas?: MouseEventHandler<HTMLButtonElement> ;
  etiquetaMas?: string ;
  etiquetaArriba?: string ;
  nuevoEstilo?:string ;
  titulo?:string;
}

const Buscador = forwardRef<HTMLDivElement, BuscadorProp>(({
  texto = undefined,
  handleMas = undefined,
  setValor,
  valor,
  etiquetaArriba = undefined,
  etiquetaMas = undefined,
  nuevoEstilo = undefined,
  titulo = undefined,
}, ref) => {

  const handleArrow = ()  =>{
    (ref as RefObject<HTMLDivElement>)?.current?.scrollTo({top:0, behavior: 'smooth'});    
  }
  
  return (
    <>
    {titulo && <Titulo titulo={titulo} nuevoEstilo='buscador-titulo'/>}
    <div className={`buscador ${nuevoEstilo && nuevoEstilo}`}>
      <InputBuscar
        name='buscar'
        texto={texto
          ? texto
          : 'Buscar'
        }
        valor={valor}
        setValor={setValor}
        />
      <Botonera nuevoEstilo='botonera-buscador'>
        { etiquetaArriba && <Boton icono={<Arrow/>}  secundario nuevoEstilo='btn-icono-chico btn-icono-arriba' onClick={handleArrow} titulo={etiquetaArriba ? etiquetaArriba : ''}/>}
        <Boton icono={<Mas/>} nuevoEstilo='btn-icono-mediano' onClick={handleMas && handleMas} titulo={etiquetaMas ? etiquetaMas : ''}/>
      </Botonera>
    </div>
      </>
  )
})

export default Buscador