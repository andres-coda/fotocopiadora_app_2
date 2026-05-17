import { Navigate, Route } from "react-router-dom"
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { RutasPrivadas } from "./rutas/rutasPrivadas";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import CargarDatosIniciales from "../redux/cargadatos/cargarDatosIniciales";
import Libros from "./paginas/libro/libros";
import LibroCargar from "./paginas/libro/cargar/libroCargar";
import LibroSelect from "./paginas/libro/componente/libroSelect";

const PrivadoRuta = () => {
  return (

    <CargarDatosIniciales>
        <PrivadoContenedor>
          <RutaInvalida>
            <Route path="/" element={<Navigate to={RutasPrivadas.LIBRO_LISTA} />}></Route>
            <Route path={RutasPrivadas.LIBRO_LISTA} element={<Libros/>}></Route>
            <Route path={RutasPrivadas.LIBRO_CARGAR} element={<LibroCargar/>}></Route>
            <Route path={RutasPrivadas.LIBRO} element={<LibroSelect/>}></Route>
          </RutaInvalida>
        </PrivadoContenedor>
    </CargarDatosIniciales>
  )
}

export default PrivadoRuta;
