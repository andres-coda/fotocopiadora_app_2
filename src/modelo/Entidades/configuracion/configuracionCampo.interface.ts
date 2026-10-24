/**
 * Campos de configuración que se editan desde un modal de un solo valor.
 * La fecha de entrega y los switches no entran: se guardan al instante.
 */
export type CampoConfig =
  | 'horaEntrega'
  | 'idSede'
  | 'idMsjPedidoTomado'
  | 'idMsjPedidoRetirado'
  | 'idDatoCobro';
