import './libros.css'
import Centro from '../../../componente-estilo/centro/centro'
import LibroCard from './componente/libroCard'
import TextoVacio from '../../../componente/Textos/textoVacio'
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto'
import { useEffect, useState } from 'react'
import { listaLibroPropuestaSeleccionable, normalizarLibroPropuesta } from './util/funcionesAdicionales'
import useBuscadorLibro from './hook/useBuscadorLibro'
import PropuestaCard from '../propuesta/componente/propuestaCard'
import { useDispatch } from 'react-redux'
import { resetSeleccionarLibro, seleccionarLibro } from '../../../redux/state/libro_empresa.state'
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface'
import { useNavigate } from 'react-router-dom'
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas'


const Libros_lista = () => {
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([listaLibroPropuestaSeleccionable[0].nombre]);
  
  const { valor, setValor, contenedorRef, handleNuevoElemento, libros, propuestas, finListaRef } = useBuscadorLibro({
    opcionesActivas
  })
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(resetSeleccionarLibro());
  },[])
  const selectLibro =(libro:LibroProp ) => {
    dispatch(seleccionarLibro(libro));
    navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)
  }

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
        {libros.map(d => <LibroCard libro={d} key={d.id} selecLibro={selectLibro}/>)}
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
      </Centro>
    </>
  )
}

export default Libros_lista