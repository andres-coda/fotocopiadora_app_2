import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { crearContextProp } from '../modelo/cargarDatos.interface';
import { UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';
import { setEspecificaciones } from '../state/especificacion.state';
import { setCategorias } from '../state/categoria.state';
import { crearPrecios } from '../state/precio.state';
import { crearSedes } from '../state/sede.state';
import { crearMensajes } from '../state/mensaje.state';

const convertirDatoPlaydon = <T>(
  dato: PaginadoProp<T>,
  sortBy: keyof T,
  sortOrder: orden
): UltimaBusquedaProp<T> => {
  return {
    datosQuery: dato.datos,
    sortBy,
    sortOrder,
    pagina: dato.pagina,
    limite: dato.limite,
    total: dato.total,
  };
};

export const crearElementosContexto = ({
  especificaciones = undefined,
  categorias = undefined,
  precios = undefined,
  sedes = undefined,
  mensajes = undefined,
  dispatch,
}: crearContextProp) => {
  if (especificaciones) {
    dispatch(setEspecificaciones(especificaciones));
  }
  if (categorias) {
    dispatch(setCategorias(categorias));
  }
  if (precios) {
    const pr: UltimaBusquedaProp<PrecioProp> = convertirDatoPlaydon<PrecioProp>(
      precios,
      'ultAct' as keyof PrecioProp,
      'asc'
    );
    dispatch(crearPrecios(pr as any));
  }
  if (sedes) {
    const sd: UltimaBusquedaProp<SedeProp> = convertirDatoPlaydon<SedeProp>(
      sedes,
      'ultAct' as keyof SedeProp,
      'asc'
    );
    dispatch(crearSedes(sd as any));
  }
  if (mensajes) {
    const ms: UltimaBusquedaProp<MensajeProp> = convertirDatoPlaydon<MensajeProp>(
      mensajes,
      'nombre' as keyof MensajeProp,
      'asc'
    );
    dispatch(crearMensajes(ms as any));
  }
};
