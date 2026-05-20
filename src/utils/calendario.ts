interface FechaProp {
  fecha?: Date
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
  fechaActualizacion?: Date;
  fechaCreacion?: Date;
}


export const formatoFecha = ({ fecha }: FechaProp): string => {
  if(!fecha) return '';
  const date = new Date(fecha);
  const dia = date.getDay() + 1;
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  return `${dia}-${mes}-${año}`;
}

export const formatoHora = ({ fecha }: FechaProp): string => {
  if(!fecha) return '';
  const date = new Date(fecha);
  const horas = date.getHours();
  const minutos = date.getMinutes();
  return `${horas} : ${minutos} hs`
}

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

  const mesNoCumplido =
    mesHasta < mesDesde ||
    (mesHasta === mesDesde && diaHasta < diaDesde);

  return mesNoCumplido ? diffAnios - 1 : diffAnios;
};

export const invertirFecha = (fechaIngreso: string): string => {
  const [anio, mes, dia] = fechaIngreso.split('-');
  return `${dia}-${mes}-${anio}`;
};

export const ultFechaAdapter = ({ fechaActualizacion, fechaCreacion }: ultActProp): string => {
  if (!fechaCreacion) return 'No se conoce'
  const fecha = fechaActualizacion || fechaCreacion;
  const ultAct: string = `${formatoFecha({ fecha })} - ${formatoHora({ fecha })}`

  return ultAct
}