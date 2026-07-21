import { Dispatch, forwardRef, MouseEventHandler, RefObject, SetStateAction } from "react";
import Titulo from "../../componente-estilo/texto/titulo";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import InputBuscar from "../formulario/inputBuscar";
import Botonera from "../../componente-estilo/botonera/botonera";
import Boton from "../../componente-estilo/boton/boton";
import BtnFiltro from '../../assets/filtro.svg?react'
import BtnOrden from '../../assets/orden.svg?react'
import Arrow from '../../assets/arrow-small.svg?react'
import Mas from '../../assets/mas.svg?react'
import './filtro.css'


interface BuscadorPaginadoCompletoProp {
  texto?: string;
  valor: string;
  setValor: Dispatch<SetStateAction<string>>;

  titulo?: string;
  etiquetaMas?: string;
  etiquetaArriba?: string;

  handleMas?: MouseEventHandler<HTMLButtonElement>;
  handleFiltro?: MouseEventHandler<HTMLButtonElement>;
  handleOrden?: MouseEventHandler<HTMLButtonElement>;

  nuevoEstilo?: string;

  setOpcionesActivas?: Dispatch<SetStateAction<string[]>>;
  opcionesActivas?: string[];
  normalizar?: (elementos: string[]) => string[];
  listaSeleccionable?: {
    nombre: string;
  }[]
}

const BuscadorPaginadoCompleto = forwardRef<HTMLDivElement, BuscadorPaginadoCompletoProp>(({
  texto = 'Buscar', valor, setValor,
  titulo, etiquetaMas, etiquetaArriba,
  handleMas, handleFiltro, handleOrden,
  nuevoEstilo = '',
  setOpcionesActivas, opcionesActivas, listaSeleccionable, normalizar
}, ref) => {

  const handleArrow = () => {
      (ref as RefObject<HTMLDivElement>)?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
      {titulo && <Titulo titulo={titulo} nuevoEstilo='buscador-titulo' />}

      {opcionesActivas && setOpcionesActivas && listaSeleccionable &&
        <InputCheckFueraForm
          lista={listaSeleccionable}
          setelementosSelect={setOpcionesActivas}
          elementosSelect={opcionesActivas}
          normalizar={normalizar}
        />
      }
      <div className={`buscador-filtros-completo ${nuevoEstilo}`}>
        <InputBuscar valor={valor} setValor={setValor} texto={texto} name={'buscar'}/>

        <Botonera nuevoEstilo={`botonera-buscador-filtros`}>
         
          {/* Botones de filtro y orden */}
          {handleFiltro && (
            <Boton
              icono={<BtnFiltro />}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={handleFiltro}
              titulo='Filtros'
            />
          )}

          {handleOrden && (
            <Boton
              icono={<BtnOrden />}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={handleOrden}
              titulo='Ordenar'
            />
          )}

          {/* Botón scroll arriba */}
          {etiquetaArriba &&
            <Boton
              icono={<Arrow />}
              secundario
              nuevoEstilo='btn-icono-chico btn-icono-arriba'
              onClick={handleArrow}
              titulo={etiquetaArriba}
            />
          }

          {/* Botón agregar */}
          {handleMas && (
            <Boton
              icono={<Mas />}
              nuevoEstilo='btn-icono-chico'
              onClick={handleMas}
              titulo={etiquetaMas || 'Agregar'}
            />
          )}
        </Botonera>
      </div>
    </>
  )
});

export default BuscadorPaginadoCompleto;