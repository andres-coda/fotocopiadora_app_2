import { useEffect, useState } from 'react';
import LibroCard from '../../privado/paginas/libro/componente/libroCard';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import { listaLibroPropuestaSeleccionable, normalizarLibroPropuesta } from '../../privado/paginas/libro/util/funcionesAdicionales';
import useBuscadorLibro from '../../privado/paginas/libro/hook/useBuscadorLibro';
import BuscadorPaginadoCompleto from '../../componente/buscador/buscadorPaginadoCompleto';
import Centro from '../../componente-estilo/centro/centro';
import PropuestaCard from '../../privado/paginas/propuesta/componente/propuestaCard';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import PropuestaSelect from '../../privado/paginas/propuesta/componente/propuestaSelect';
import LibroCargar from '../../privado/paginas/libro/cargar/libroCargar';
import Modal from '../../componente/modal/modal';
import useBusquedaPaginada from '../../hooks/buscador/useBusquedaPaginada';
import { ReduxProp } from '../../redux/modelo/reduxContext.interface';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import useLibrosApi from '../../servicio/libro/useLibrosApi';
import { useModalContext } from '../../contexto/contextoModal';
import { agregarLibrosBusquedaActual, crearBusquedaLibro, resetBusquedaLibro, resetSeleccionarLibro, seleccionarLibro } from '../../redux/state/libro.state';
import { useNavigate } from 'react-router-dom';
import { RutasSupers, rutaSuperBase } from '../ruta/rutaSupers';
import LibroSelectSuper from './libroSelectSuper';
import LibroEditar from '../../privado/paginas/libro/cargar/libro_editar';

const LibrosSuper = () => {
  const libroDatos: ReduxProp<LibroProp> = useSelector((store: appStore) => store.libro);
  const { obtenerLibrosBusqueda, responseLibros, loadingLibros, errorFetchLibros } = useLibrosApi();
  const [valor, setValor] = useState<string>('');
  const navigate = useNavigate()
  const { modal, setModal } = useModalContext();
  const [select, setSelect] = useState<boolean>(false);
  const [cargar, setCargar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const dispatch = useDispatch();

  const seleccionarLibroFc = (libro:LibroProp) => {
    setSelect(true);
    setModal(true);
    dispatch(seleccionarLibro(libro))
  }

  useEffect(()=>{
    if(!modal){
      setCargar(false);
      setEditar(false);
      setEliminar(false);
      setSelect(false);
      dispatch(resetSeleccionarLibro());
    }
  },[modal])

 const { contenedorRef, finListaRef } = useBusquedaPaginada<LibroProp>({
    valor,
    datosRedux: libroDatos,
    resetBusqueda: resetBusquedaLibro,
    crearBusqueda: crearBusquedaLibro,
    obtenerBusqueda: obtenerLibrosBusqueda,
    agregarBusqueda: agregarLibrosBusquedaActual,
    response: responseLibros,
    loading: loadingLibros,
  });

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar libro"
        valor={valor}
        setValor={setValor}
        titulo="Lista de libros"
        listaSeleccionable={listaLibroPropuestaSeleccionable}
        normalizar={normalizarLibroPropuesta}
        etiquetaArriba="Al comienzo de la lista"
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={
          !libroDatos.busquedaActual.datosQuery ||
          libroDatos.busquedaActual.datosQuery.length === 0}
        entidad='libros'
        query={valor}
        error={errorFetchLibros }
        loading={loadingLibros}
      >
        {libroDatos.busquedaActual.datosQuery.map(d=>(
          <LibroCard libro={d} key={`libro-${d}`} selecLibro={seleccionarLibroFc} />
        ))}
      </Centro>
      <Modal>
        {cargar && <LibroCargar />}
        {select && !editar && !eliminar && <LibroSelectSuper onEditar={setEditar} onEliminar={setEliminar}/>}
        {editar && <LibroEditar/>}
      </Modal>
    </>
  );
};


export default LibrosSuper;