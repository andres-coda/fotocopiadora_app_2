import { Dispatch, SetStateAction, MouseEventHandler, forwardRef, RefObject, ChangeEvent, useState, useEffect } from 'react';

//import Mas from '../../assets/icons/mas.svg?react'
//import Lupa from '../../assets/icons/lupa.svg?react'
//import BtnFiltro from '../../assets/icons/filtro.svg?react'
//import BtnOrden from '../../assets/icons/orden.svg?react'
import Titulo from '../../componente-estilo/texto/titulo';
import Botonera from '../../componente-estilo/botonera/botonera';
import Boton from '../../componente-estilo/boton/boton';
import './filtro.css'

export enum varianteEnum { COMPLETO = 'completo', SIMPLE = 'simple', MINIMALISTA = 'minimalista' };

interface BuscadorFiltrosProp {
  // Búsqueda
  texto?: string;
  setValor: Dispatch<SetStateAction<string>>;
  valor: string;

  // Título
  titulo?: string;

  // Handlers de botones
  handleMas?: MouseEventHandler<HTMLButtonElement>;
  handleFiltro?: MouseEventHandler<HTMLButtonElement>;
  handleOrden?: MouseEventHandler<HTMLButtonElement>;
  handleIzquierda?: MouseEventHandler<HTMLButtonElement>;
  handleDerecha?: MouseEventHandler<HTMLButtonElement>;


  // Etiquetas
  etiquetaMas?: string;
  etiquetaArriba?: string;

  // Estilos
  nuevoEstilo?: string;
  variante?: varianteEnum; // Controla qué botones mostrar
}

const BuscadorFiltros = forwardRef<HTMLDivElement, BuscadorFiltrosProp>(({
  texto = 'Buscar',
  setValor,
  valor,
  titulo,
  handleMas,
  handleFiltro,
  handleOrden,
  handleIzquierda,
  handleDerecha,
  etiquetaMas,
  etiquetaArriba = 'Al comienzo',
  nuevoEstilo,
  variante = varianteEnum.COMPLETO
}, ref) => {

  const [visible, setVisible] = useState<boolean>(false);
  const [tieneFoco, setTieneFoco] = useState<boolean>(false);

  useEffect(() => {
    if (valor !== '' || tieneFoco) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [valor, tieneFoco]);

  const handleArrow = () => {
    (ref as RefObject<HTMLDivElement>)?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValor(e.target.value)
  }

  return (
    <>
      {titulo && <Titulo titulo={titulo} nuevoEstilo='buscador-titulo' />}

      <div className={`buscador-filtros-completo ${nuevoEstilo || ''}`}>
        {/* Input de búsqueda */}
        <div className={`input-buscador-completo ${variante !== varianteEnum.MINIMALISTA
          ? 'div-reducido'
          : !visible ? 'div-oculto' : ''}`
        }>
          <Boton
            icono={<p>Flecha</p>}
            terciario
            nuevoEstilo={
              `btn-icono-chico btn-buscador-completo ${!visible ? 'btn-oculto-buscador' : ''}`
            }
            onClick={() => setVisible(false)}
          />
          <div className={`inputs-span-buscador ${/*!visible ? 'btn-oculto' : */''}`}>
            <div className="inputs-entero-buscador">
              <input
                type='text'
                id={'buscador'}
                name={'buscador'}
                placeholder=' '
                onChange={handleChange}
                value={valor}
                onFocus={() => setTieneFoco(true)}
                onBlur={() => setTieneFoco(false)}
                autoComplete='off'
              />
              <label htmlFor={'buscador'}>{texto}</label>
            </div>
          </div>
        </div>


        {/* Botonera */}
        <Botonera nuevoEstilo={`botonera-buscador-filtros ${visible && variante === varianteEnum.MINIMALISTA
          ? 'div-oculto'
          : ''}`
        }>

          {variante === varianteEnum.MINIMALISTA &&
            <Boton
              icono={<p>Lupa</p>}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={() => setVisible(true)}
              titulo='Anterior'
            />}
          {/* Botones de navegación/paginación */}
          {handleIzquierda && (
            <Boton
              icono={<p>Flecha</p>}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={handleIzquierda}
              titulo='Anterior'
            />
          )}

          {handleDerecha && (
            <Boton
              icono={<p>Flecha</p>}
              terciario
              nuevoEstilo='btn-icono-chico btn-icono-derecha'
              onClick={handleDerecha}
              titulo='Siguiente'
            />
          )}

          {/* Botones de filtro y orden */}
          {handleFiltro && (
            <Boton
              icono={<p>Filtro</p>}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={handleFiltro}
              titulo='Filtros'
            />
          )}

          {handleOrden && (
            <Boton
              icono={<p>Orden</p>}
              terciario
              nuevoEstilo='btn-icono-chico'
              onClick={handleOrden}
              titulo='Ordenar'
            />
          )}

          {/* Botón scroll arriba */}
          {etiquetaArriba &&
            <Boton
              icono={<p>Flecha</p>}
              secundario
              nuevoEstilo='btn-icono-chico btn-icono-arriba'
              onClick={handleArrow}
              titulo={etiquetaArriba}
            />
          }

          {/* Botón agregar */}
          {handleMas && (
            <Boton
              icono={<p>Mas</p>}
              nuevoEstilo='btn-icono-chico'
              onClick={handleMas}
              titulo={etiquetaMas || 'Agregar'}
            />
          )}
        </Botonera>
      </div>
    </>
  );
});

BuscadorFiltros.displayName = 'BuscadorFiltros';

export default BuscadorFiltros;