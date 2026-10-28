import { configureStore } from '@reduxjs/toolkit';
import { ReduxProp } from './modelo/reduxContext.interface';
import { LibroProp } from '../modelo/Entidades/libro/libro.interface';
import { ClienteProp } from '../modelo/Entidades/cliente/cliente.interface';
import { clienteSlice } from './state/cliente.state';
import { EspecificacionProp } from '../modelo/Entidades/especificacion/especificacion.interface';
import { especificacionSlice } from './state/especificacion.state';
import { MateriaProp } from '../modelo/Entidades/libro/materia.interface';
import { materiaSlice } from './state/materia.state';
import { PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import { pedidoSlice } from './state/pedido.state';
import { pedidoLibroSlice, PedidoLibroStateProp } from './state/pedido_libro.state';
import { PrecioProp } from '../modelo/Entidades/precio/precio.interface';
import { precioSlice } from './state/precio.state';
import { SedeProp } from '../modelo/Entidades/sede/sede.interface';
import { sedeSlice } from './state/sede.state';
import { MensajeProp } from '../modelo/Entidades/mensaje/mensaje.interface';
import { mensajeSlice } from './state/mensaje.state';
import { SesionStateProp, sesionSlice } from './state/sesion.state';
import { PropuestaProp } from '../modelo/Entidades/propuesta/propuesta.interface';
import { libroSlice } from './state/libro.state';
import { propuestaSlice } from './state/propuesta.state';
import { EmpresaStateProp, empresaSlice } from './state/empresa.state';

export interface appStore {
  cliente: ReduxProp<ClienteProp>;
  especificacion: ReduxProp<EspecificacionProp>;
  materia: ReduxProp<MateriaProp>;
  pedido: ReduxProp<PedidoProp>;
  pedidoLibro: PedidoLibroStateProp;
  precio: ReduxProp<PrecioProp>;
  sede: ReduxProp<SedeProp>;
  mensaje: ReduxProp<MensajeProp>;
  propuesta: ReduxProp<PropuestaProp>;
  libro: ReduxProp<LibroProp>;
  sesion: SesionStateProp;
  empresa: EmpresaStateProp;
}

export default configureStore<appStore>({
  reducer: {
    cliente: clienteSlice.reducer,
    especificacion: especificacionSlice.reducer,
    materia: materiaSlice.reducer,
    pedido: pedidoSlice.reducer,
    propuesta: propuestaSlice.reducer,
    pedidoLibro: pedidoLibroSlice.reducer,
    precio: precioSlice.reducer,
    sede: sedeSlice.reducer,
    mensaje: mensajeSlice.reducer,
    libro: libroSlice.reducer,
    sesion: sesionSlice.reducer,
    empresa: empresaSlice.reducer,
  },
});
