import './libros.css'
import Centro from '../../../componente-estilo/centro/centro'
import LibroCard from './componente/libroCard'
import TextoVacio from '../../../componente/Textos/textoVacio'
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto'
import { useState } from 'react'
import { listaLibroPropuestaSeleccionable, normalizarLibroPropuesta } from './util/funcionesAdicionales'
import useBuscadorLibro from './hook/useBuscadorLibro'
import PropuestaCard from '../propuesta/componente/propuestaCard'


const Libros_lista = () => {
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([listaLibroPropuestaSeleccionable[0].nombre]);

  const { valor, setValor, contenedorRef, handleNuevoElemento, libros, propuestas } = useBuscadorLibro({
    opcionesActivas
  })

  return (
    <>
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
      <Centro ref={contenedorRef} nuevoEstilo='centro-libro'>
        {propuestas.map(d => <PropuestaCard propuesta={d} key={d.id} />)}
        {libros.map(d => <LibroCard libro={d} key={d.id} />)}
        {
          libros.length === 0 && propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre) &&
          <TextoVacio entidad='libros y propuestas' />
        }
        {
          propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre) &&
          <TextoVacio entidad='libros' />
        }
        {
          propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) &&
          <TextoVacio entidad='propuestas' />
        }
      </Centro>
    </>
  )
}

export default Libros_lista