export const estadoSolicitudTexto = (e: number) => {
  if (e === 1) return 'Pendiente';
  if (e === 2) return 'Aceptada';
  if (e === 3) return 'Rechazada';
  return 'Desconocido';
};