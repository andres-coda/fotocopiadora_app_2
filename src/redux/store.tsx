import { configureStore } from '@reduxjs/toolkit';
import { ReduxProp } from './modelo/reduxContext.interface';
import { LibroProp } from '../modelo/Entidades/libro/libro.interface';
import { ClienteProp } from '../modelo/Entidades/cliente/cliente.interface';
import { clienteSlice } from './state/cliente.state';
import { especificacionSlice, EspecificacionState } from './state/especificacion.state';
import { PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import { pedidoSlice } from './state/pedido.state';
import { pedidoLibroSlice, PedidoLibroStateProp } from './state/pedido_libro.state';
import { PrecioProp } from '../modelo/Entidades/precio/precio.interface';
import { precioSlice } from './state/precio.state';
import { categoriaSlice, CategoriaState } from './state/categoria.state';
import { SedeProp } from '../modelo/Entidades/sede/sede.interface';
import { sedeSlice } from './state/sede.state';
import { MensajeProp } from '../modelo/Entidades/mensaje/mensaje.interface';
import { mensajeSlice } from './state/mensaje.state';
import { SesionStateProp, sesionSlice } from './state/sesion.state';
import { PropuestaProp } from '../modelo/Entidades/propuesta/propuesta.interface';
import { libroSlice } from './state/libro.state';
import { propuestaSlice } from './state/propuesta.state';
import { usuarioProps } from '../modelo/usuario/Usuario.interface';
import { usuarioSlice } from './state/usuarios.state';
import { empresaSlice, EmpresaStateProp } from './state/empresa.state';

export interface appStore {
  cliente: ReduxProp<ClienteProp>;
  especificacion: EspecificacionState;
  pedido: ReduxProp<PedidoProp>;
  pedidoLibro: PedidoLibroStateProp;
  precio: ReduxProp<PrecioProp>;
  categoria: CategoriaState;
  sede: ReduxProp<SedeProp>;
  mensaje: ReduxProp<MensajeProp>;
  propuesta: ReduxProp<PropuestaProp>;
  libro: ReduxProp<LibroProp>;
  usuario: ReduxProp<usuarioProps>;
  sesion: SesionStateProp;
  empresa: EmpresaStateProp;
}

export default configureStore<appStore>({
  reducer: {
    cliente: clienteSlice.reducer,
    especificacion: especificacionSlice.reducer,
    pedido: pedidoSlice.reducer,
    propuesta: propuestaSlice.reducer,
    pedidoLibro: pedidoLibroSlice.reducer,
    precio: precioSlice.reducer,
    categoria: categoriaSlice.reducer,
    sede: sedeSlice.reducer,
    mensaje: mensajeSlice.reducer,
    libro: libroSlice.reducer,
    usuario: usuarioSlice.reducer,
    sesion: sesionSlice.reducer,
    empresa: empresaSlice.reducer,
  },
});
