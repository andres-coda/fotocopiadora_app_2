import { Navigate, Route } from "react-router-dom"
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { RutasPrivadas } from "./rutas/rutasPrivadas";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import CargarDatosIniciales from "../redux/cargadatos/cargarDatosIniciales";
import Libros from "./paginas/libro/libros";

const PrivadoRuta = () => {
  return (

    <CargarDatosIniciales>
        <PrivadoContenedor>
          <RutaInvalida>
            <Route path="/" element={<Navigate to={RutasPrivadas.LIBRO_LISTA} />}></Route>
            <Route path={RutasPrivadas.LIBRO_LISTA} element={<Libros/>}></Route>
          </RutaInvalida>
        </PrivadoContenedor>
    </CargarDatosIniciales>
  )
}

export default PrivadoRuta;
