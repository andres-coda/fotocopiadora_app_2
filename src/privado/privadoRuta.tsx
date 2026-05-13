import { Navigate, Route } from "react-router-dom"
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { RutasPrivadas } from "./rutas/rutasPrivadas";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import CargarDatosIniciales from "../redux/cargadatos/cargarDatosIniciales";

const PrivadoRuta = () => {
  return (

    <CargarDatosIniciales>
        <PrivadoContenedor>
          <RutaInvalida>
            <Route path="/" element={<Navigate to={RutasPrivadas.LIBRO_LISTA} />}></Route>
          </RutaInvalida>
        </PrivadoContenedor>
    </CargarDatosIniciales>
  )
}

export default PrivadoRuta;
