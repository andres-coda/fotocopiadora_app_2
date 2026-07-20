import { appStore } from '../../../redux/store'
import './libros.css'
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface'
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface'
import Centro from '../../../componente-estilo/centro/centro'
import LibroCard from './componente/libroCard'
import InputBuscar from '../../../componente/formulario/inputBuscar'
import { crearBusquedaLibro, resetBusquedaLibro } from '../../../redux/state/libro_empresa.state'
import useLibrosApi from '../../../servicio/libro/useLibrosApi'
import TextoVacio from '../../../componente/Textos/textoVacio'
import useBusquedaPaginada from '../../../hooks/buscador/useBusquedaPaginada'
import { useSelector } from 'react-redux'

const Libros_lista = () => {
  const librosDatos: ReduxProp<LibroProp> = useSelector((store: appStore) => store.libro_empresa);
  const { obtenerLibrosBusqueda, responseLibros } = useLibrosApi()

  const { valor, setValor } = useBusquedaPaginada<LibroProp>({
    datosRedux: librosDatos,
    resetBusqueda: resetBusquedaLibro,
    crearBusqueda: crearBusquedaLibro,
    obtenerBusqueda: obtenerLibrosBusqueda,
    response: responseLibros,
  });

  return (
    <Centro>
      <InputBuscar
        name='buscar'
        texto='Buscar libro'
        valor={valor}
        setValor={setValor}
      />
      {
        !librosDatos.busquedaActual || librosDatos.busquedaActual.datosQuery.length === 0
          ? (<TextoVacio entidad='libros' />)
          : librosDatos.busquedaActual.datosQuery.map(d => <LibroCard libro={d} key={d.id} />)
      }
    </Centro>
  )
}

export default Libros_lista