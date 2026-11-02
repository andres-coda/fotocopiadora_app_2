import { Navigate, Route } from "react-router-dom";
import PrivadoContenedor from "../componente-estilo/Contenedor/privadoContenedor";
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { ProveiderPedidoContext } from "../contexto/contextoPedido";
import { RutasSupers } from "./ruta/rutaSupers";
import Empresas from "./empresa/empresas";

const SuperRuta = () => {
  return (
    <PrivadoContenedor>
      <ProveiderPedidoContext>
        <RutaInvalida>
          <Route path="/" element={<Navigate to={RutasSupers.EMPRESA_LISTA} />}></Route>
          <Route path={RutasSupers.EMPRESA_LISTA} element={<Empresas />}></Route>
        </RutaInvalida>
      </ProveiderPedidoContext>
    </PrivadoContenedor>
  );
};

export default SuperRuta;
