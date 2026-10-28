interface FechaProp {
  fecha?: Date;
}

interface RestarFechasProp {
  desde: string;
  hasta?: string;
}

export interface AntiguedadResult {
  anios: string;
  meses: string;
}

export interface FechasProp {
  alta: string;
  baja?: string;
}

export interface ultActProp {
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export const formatoFecha = ({ fecha }: FechaProp): string => {
  if (!fecha) return '';
  const date = new Date(fecha);
  const dia = date.getDay() + 1;
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  return `${dia}-${mes}-${año}`;
};

export const formatoHora = ({ fecha }: FechaProp): string => {
  if (!fecha) return '';
  const date = new Date(fecha);
  const horas = date.getHours();
  const minutos = date.getMinutes();
  return `${horas} : ${minutos} hs`;
};

export const formatearFechaParaDB = (fechaString: string): string => {
  if (!fechaString) {
    return '';
  }
  const fechaConHora = `${fechaString}T12:00:00`;

  const fecha = new Date(fechaConHora);

  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
};

/**
 * input type="date" exige YYYY-MM-DD. La API manda una columna `date`
 * serializada como ISO completo (2026-10-30T03:00:00.000Z), asi que se toma la
 * parte de fecha del string: es la fecha real guardada, sin corrimientos por
 * zona horaria. Si el valor ya viene como YYYY-MM-DD, devuelve lo mismo.
 */
export const fechaParaInput = (fecha?: string | Date): string => {
  if (!fecha) return '';

  if (typeof fecha === 'string') {
    const soloFecha = /^(\d{4}-\d{2}-\d{2})/.exec(fecha);
    if (soloFecha) return soloFecha[1];
  }

  const date = fecha instanceof Date ? fecha : new Date(fecha);
  if (Number.isNaN(date.getTime())) return '';

  const anio = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
};

export const esMayorQueHoy = (fechaParametro?: string): boolean => {
  if (!fechaParametro) return false;
  const hoy = new Date().toISOString().split('T')[0];
  return fechaParametro > hoy;
};

export const RestarFechasAnos = ({ desde, hasta }: RestarFechasProp): number => {
  if (!desde) throw new Error('La fecha del inicio es undefined');

  const fechaHasta = hasta || new Date().toISOString().split('T')[0];

  const [añoDesde, mesDesde, diaDesde] = desde.split('-').map(Number);
  const [añoHasta, mesHasta, diaHasta] = fechaHasta.split('-').map(Number);

  const diffAnios = añoHasta - añoDesde;

  const mesNoCumplido = mesHasta < mesDesde || (mesHasta === mesDesde && diaHasta < diaDesde);

  return mesNoCumplido ? diffAnios - 1 : diffAnios;
};

export const invertirFecha = (fechaIngreso: string): string => {
  const [anio, mes, dia] = fechaIngreso.split('-');
  return `${dia}-${mes}-${anio}`;
};

export const ultFechaAdapter = ({ fechaActualizacion, fechaCreacion }: ultActProp): string => {
  if (!fechaCreacion) return 'No se conoce';
  const fecha = fechaActualizacion || fechaCreacion;
  const ultAct: string = `${formatoFecha({ fecha })} - ${formatoHora({ fecha })}`;

  return ultAct;
};
