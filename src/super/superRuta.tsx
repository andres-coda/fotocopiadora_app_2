import { Navigate, Route } from "react-router-dom";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { ProveiderPedidoContext } from "../contexto/contextoPedido";
import { RutasSupers } from "./ruta/rutaSupers";
import Empresas from "./empresa/empresas";
import EmpresaCrear from "./empresa/empresaCrear";
import EmpresaDetalle from "./empresa/empresaDetalle";
import LibrosSuper from "./libro/libros";
import Solicitudes from "./solicitud/solicitudes";
import SolicitudDetalle from "./solicitud/solicitudDetalle";
import PerfilSuper from "./perfil/perfilSuper";

const SuperRuta = () => {
  return (
    <PrivadoContenedor>
      <ProveiderPedidoContext>
        <RutaInvalida>
          <Route path="/" element={<Navigate to={RutasSupers.EMPRESA_LISTA} />}></Route>
          <Route path={RutasSupers.EMPRESA_LISTA} element={<Empresas />}></Route>
          <Route path={RutasSupers.EMPRESA_CREAR} element={<EmpresaCrear />}></Route>
          <Route path={RutasSupers.EMPRESA} element={<EmpresaDetalle />}></Route>
          <Route path={RutasSupers.LIBRO_LISTA} element={<LibrosSuper />}></Route>
          <Route path={RutasSupers.SOLICITUD_LISTA} element={<Solicitudes />}></Route>
          <Route path={`${RutasSupers.SOLICITUD_DETALLE}/:id`} element={<SolicitudDetalle />}></Route>
            <Route path={RutasSupers.PERFIL} element={<PerfilSuper />}></Route>
        </RutaInvalida>
      </ProveiderPedidoContext>
    </PrivadoContenedor>
  );
};

export default SuperRuta;
