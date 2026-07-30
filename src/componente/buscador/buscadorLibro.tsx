import { useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import BuscadorFiltros from "./buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../privado/rutas/rutasPrivadas";
import DesplegableConteiner from "../../componente-estilo/deslegable/desplegableConteiner";
import PropuestaCard from "../../privado/paginas/propuesta/componente/propuestaCard";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import TextoVacio from "../Textos/textoVacio";
import './buscador.css'
import useBuscadorLibro from "../../privado/paginas/libro/hook/useBuscadorLibro";
import BuscadorPaginadoCompleto from "./buscadorPaginadoCompleto";
import { listaLibroPropuestaSeleccionable, normalizarLibroPropuesta } from "../../privado/paginas/libro/util/funcionesAdicionales";

interface Prop {
  selectLibro: (libro: LibroProp) => void;
  selectPropuesta: (propuestas: PropuestaProp) => void;
}

const BuscadorLibro = ({ selectLibro, selectPropuesta }: Prop) => {
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([listaLibroPropuestaSeleccionable[0].nombre]);
  const { valor, setValor, contenedorRef, handleNuevoElemento, libros, propuestas, finListaRef } = useBuscadorLibro({
    opcionesActivas
  })

  const handlePropuesta = (propuesta: PropuestaProp): void => {
    setValor('');
    selectPropuesta(propuesta);
  }

  const handleLibro = (libro: LibroProp): void => {
    setValor('');
    selectLibro(libro);
  }

  return (
    <div className="buscador-libro">
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar libro'
        handleMas={handleNuevoElemento}
        valor={valor}
        setValor={setValor}
        titulo='Lista de libros'
        opcionesActivas={opcionesActivas}
        setOpcionesActivas={setOpcionesActivas}
        listaSeleccionable={listaLibroPropuestaSeleccionable}
        normalizar={normalizarLibroPropuesta}
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas={!opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) ? `Nuevo libro` : 'Nueva propuesta'}
      />
      {valor.length < 3
        ? null
        : <DesplegableConteiner>
          {propuestas.map(d => <PropuestaCard propuesta={d} key={d.id} selecPropuesta={handlePropuesta}/>)}
          {libros.map(d => <LibroCard libro={d} key={d.id} selecLibro={handleLibro}/>)}
          {
            libros.length === 0 && propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre) &&
            <TextoVacio entidad='libros y propuestas' />
          }
          {
            libros.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre) &&
            <TextoVacio entidad='libros' />
          }
          {
            propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) &&
            <TextoVacio entidad='propuestas' />
          }
          <div ref={finListaRef}>
            <p>Fin de lista</p>
          </div>
        </DesplegableConteiner>
      }

    </div>
  )
};

export default BuscadorLibro;