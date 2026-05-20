import { Navigate, Route } from "react-router-dom"
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { RutasPrivadas } from "./rutas/rutasPrivadas";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import CargarDatosIniciales from "../redux/cargadatos/cargarDatosIniciales";
import Libros from "./paginas/libro/libros";
import LibroCargar from "./paginas/libro/cargar/libroCargar";
import LibroSelect from "./paginas/libro/componente/libroSelect";
import Clientes from "./paginas/cliente/cliente";
import ClienteCargar from "./paginas/cliente/cargar/clienteCargar";
import ClienteSelect from "./paginas/cliente/componente/clienteSelect";
import Precios from "./paginas/precio/precio";
import PrecioCargar from "./paginas/precio/cargar/precioCargar";
import Sedes from "./paginas/sede/sede";
import SedeCargar from "./paginas/sede/cargar/sedeCargar";
import Pedidos from "./paginas/pedido/pedidos";

const PrivadoRuta = () => {
  return (

    <CargarDatosIniciales>
        <PrivadoContenedor>
          <RutaInvalida>
            <Route path="/" element={<Navigate to={RutasPrivadas.LIBRO_LISTA} />}></Route>
            <Route path={RutasPrivadas.LIBRO_LISTA} element={<Libros/>}></Route>
            <Route path={RutasPrivadas.LIBRO_CARGAR} element={<LibroCargar/>}></Route>
            <Route path={RutasPrivadas.LIBRO} element={<LibroSelect/>}></Route>
            <Route path={RutasPrivadas.CLIENTE_LISTA} element={<Clientes/>}></Route>
            <Route path={RutasPrivadas.CLIENTE_CARGAR} element={<ClienteCargar/>}></Route>
            <Route path={RutasPrivadas.CLIENTE} element={<ClienteSelect/>}></Route>
            <Route path={RutasPrivadas.PRECIO_LISTO} element={<Precios/>}></Route>
            <Route path={RutasPrivadas.PRECIO_CARGAR} element={<PrecioCargar/>}></Route>
            <Route path={RutasPrivadas.SEDE_LISTA} element={<Sedes/>}></Route>
            <Route path={RutasPrivadas.SEDE_CARGAR} element={<SedeCargar/>}></Route>
            <Route path={RutasPrivadas.PEDIDO_LISTA} element={<Pedidos/>}></Route>
            <Route path={RutasPrivadas.PEDIDO_CARGAR} element={<SedeCargar/>}></Route>
          </RutaInvalida>
        </PrivadoContenedor>
    </CargarDatosIniciales>
  )
}

export default PrivadoRuta;
