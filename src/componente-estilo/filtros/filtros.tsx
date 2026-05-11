import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Botonera from "../botonera/botonera";
import Boton from "../boton/boton";
import BtnFiltro from '../../assets/icons/filtro.svg?react'
import BtnOrden from '../../assets/icons/orden.svg?react'
import Arrow from '../../assets/icons/arrow-small.svg?react'
import Mas from '../../assets/icons/mas.svg?react'
import './filtros.css'
import InputBuscarFiltro from "../../componente/formulario/inputBuscadorFiltro";

interface FiltrosProp {
  handleFiltro?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleOrden?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleIzquierda?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleDerecha?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleMas?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleScrollArriba?: MouseEventHandler<HTMLButtonElement> | undefined;
  texto?: string | undefined;
  valorBuscador?: string | undefined;
  setValor?: Dispatch<SetStateAction<string>> | undefined;
  key?: string;
}

export const FiltrosBotonera = ({
  handleFiltro = undefined,
  handleOrden = undefined,
  handleDerecha = undefined,
  handleIzquierda = undefined,
  handleScrollArriba = undefined,
  handleMas= undefined,
  texto = undefined,
  valorBuscador = undefined,
  setValor = undefined,
}: FiltrosProp) => {
  const [buscador, setBuscador] = useState<boolean>(false);

  return (
    <div className="filtro-contenedor">
        {valorBuscador != undefined && setValor &&
          <InputBuscarFiltro
            name='buscar'
            texto={texto
              ? texto
              : 'Buscar'
            }
            valor={valorBuscador}
            setValor={setValor}
            boton={true}
            setBuscador={setBuscador}
          />
        }
      {!buscador && <Botonera nuevoEstilo="filtro-botonera">
        {handleFiltro && <Boton icono={<BtnFiltro />} nuevoEstilo="btn-icono-chico" terciario onClick={handleFiltro} />}
        {handleOrden && <Boton icono={<BtnOrden />} nuevoEstilo="btn-icono-chico" terciario onClick={handleOrden} />}
        {handleIzquierda && <Boton icono={<Arrow />} nuevoEstilo="btn-icono-chico" terciario onClick={handleIzquierda} />}
        {handleDerecha && <Boton icono={<Arrow />} nuevoEstilo="btn-icono-chico btn-icono-derecha" terciario onClick={handleDerecha} />}
        {handleScrollArriba && <Boton
          icono={<Arrow />}
          onClick={handleScrollArriba}
          nuevoEstilo="btn-icono-chico btn-icono-arriba"
          secundario
        />}
        {handleMas && <Boton
          icono={<Mas />}
          onClick={handleMas}
          nuevoEstilo="btn-icono-chico"
          edit
        />}
      </Botonera>}
    </div>
  )
}