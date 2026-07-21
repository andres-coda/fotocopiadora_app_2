import { configureStore } from "@reduxjs/toolkit";
import { usuarioProps } from "../modelo/usuario/Usuario.interface";
import { userSlice } from "./state/user.state";
import { filterContext, ReduxProp } from "./modelo/reduxContext.interface";
import { LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { libroSlice } from "./state/libro.state";
import { ClienteProp } from "../modelo/Entidades/cliente/cliente.interface";
import { clienteSlice } from "./state/cliente.state";
import { EspecificacionProp } from "../modelo/Entidades/especificacion/especificacion.interface";
import { especificacionSlice } from "./state/especificacion.state";
import { MateriaProp } from "../modelo/Entidades/libro/materia.interface";
import { materiaSlice } from "./state/materia.state";
import { PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { pedidoSlice } from "./state/pedido.state";
import { PedidoLibroProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { pedidoLibroSlice } from "./state/pedido_libro.state";
import { PrecioProp } from "../modelo/Entidades/precio/precio.interface";
import { precioSlice } from "./state/precio.state";
import { SedeProp } from "../modelo/Entidades/sede/sede.interface";
import { sedeSlice } from "./state/sede.state";
import { ComponenteProp } from "../modelo/Entidades/libro/componente.interface";
import { componenteSlice } from "./state/componente.state";
import { PropuestaProp } from "../modelo/Entidades/propuesta/propuesta.interface";
import { libroEmpresaSlice } from "./state/libro_empresa.state";
import { propuestaSlice } from "./state/propuesta.state";

export interface appStore {
  libro: filterContext<LibroProp>,
  cliente:  ReduxProp<ClienteProp>,
  especificacion: filterContext<EspecificacionProp>
  materia: filterContext<MateriaProp>,
  pedido: filterContext<PedidoProp>,
  pedidoLibro: filterContext<PedidoLibroProp>,
  precio: ReduxProp<PrecioProp>,
  componente: filterContext<ComponenteProp>,
  sede: filterContext<SedeProp>,
  propuesta: ReduxProp<PropuestaProp>,
  usuario: usuarioProps,
  libro_empresa: ReduxProp<LibroProp>,
}

export default configureStore<appStore>({
  reducer: {
    usuario: userSlice.reducer,
    libro: libroSlice.reducer,
    cliente: clienteSlice.reducer,
    especificacion: especificacionSlice.reducer,
    materia: materiaSlice.reducer,
    pedido: pedidoSlice.reducer,
    propuesta: propuestaSlice.reducer,
    pedidoLibro: pedidoLibroSlice.reducer,
    precio: precioSlice.reducer,
    sede: sedeSlice.reducer,
    componente: componenteSlice.reducer,
    libro_empresa: libroEmpresaSlice.reducer
  }
})