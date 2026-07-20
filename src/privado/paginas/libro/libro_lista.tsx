import { useDispatch, useSelector } from 'react-redux'
import { appStore } from '../../../redux/store'
import './libros.css'
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface'
import { ReduxProp, UltimaBusquedaProp } from '../../../redux/modelo/reduxContext.interface'
import Centro from '../../../componente-estilo/centro/centro'
import { useEffect, useState } from 'react'
import LibroCard from './componente/libroCard'
import InputBuscar from '../../../componente/formulario/inputBuscar'
import { busquedaLibroInicial, crearBusquedaLibro, resetBusquedaLibro } from '../../../redux/state/libro_empresa.state'
import useLibrosApi from '../../../servicio/libro/useLibrosApi'
import TextoVacio from '../../../componente/Textos/textoVacio'

const Libros_lista = () => {
  const dispatch = useDispatch()
  const librosDatos: ReduxProp<LibroProp> = useSelector((store: appStore) => store.libro_empresa);
  const libros: LibroProp[] = useSelector((store: appStore) => store.libro_empresa.busquedaActual.datosQuery);
  const [valor, setValor] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const { obtenerLibrosBusqueda, responseLibros } = useLibrosApi()

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(valor);
    }, 500);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    if (query.length < 3) {
      dispatch(resetBusquedaLibro());
    } else {
      const busqueda: UltimaBusquedaProp<LibroProp> | undefined = librosDatos.ultimasBusqueda.find(d => d.query === query);
      if (busqueda) {
        dispatch(crearBusquedaLibro(busqueda));
      } else {
        obtenerLibrosBusqueda({ query })
      }
    }
  }, [query])

  useEffect(() => {
    if (responseLibros) {
      dispatch(crearBusquedaLibro({ ...busquedaLibroInicial, query: query, datosQuery: responseLibros }))
    }
  }, [responseLibros])

  console.log("Render");
  console.log("query:", query);
  console.log("busquedaActual:", librosDatos.busquedaActual);
  console.log("libros:", libros);

  if (!librosDatos.busquedaActual) return (<TextoVacio entidad='libros' />)

  return (
    <Centro>
      <InputBuscar
        name='buscar'
        texto='Buscar libro'
        valor={valor}
        setValor={setValor}
      />
      {libros.map(d => <LibroCard libro={d} key={d.id} />)}
    </Centro>
  )
}

export default Libros_lista