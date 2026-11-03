import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { crearContextProp } from '../modelo/cargarDatos.interface';
import { UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';
import { crearEspecificaciones } from '../state/especificacion.state';
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

const convertirArrayAUltimaBusqueda = <T>(
  datos: T[],
  sortBy: keyof T,
  sortOrder: orden
): UltimaBusquedaProp<T> => {
  return {
    datosQuery: datos,
    sortBy,
    sortOrder,
    pagina: 1,
    limite: datos.length,
    total: datos.length,
  };
};

export const crearElementosContexto = ({
  especificaciones = undefined,
  precios = undefined,
  sedes = undefined,
  mensajes = undefined,
  dispatch,
}: crearContextProp) => {
  if (especificaciones) {
    const esp: UltimaBusquedaProp<EspecificacionProp> =
      convertirArrayAUltimaBusqueda<EspecificacionProp>(
        especificaciones,
        'ultAct' as keyof EspecificacionProp,
        'asc'
      );
    dispatch(crearEspecificaciones(esp as any));
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
