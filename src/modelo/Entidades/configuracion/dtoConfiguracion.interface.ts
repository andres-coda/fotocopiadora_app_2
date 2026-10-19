// Cuerpo de PUT /configuracion. Todos los campos son opcionales: solo se
// aplican los que vienen definidos. Nunca idEmpresa ni fechaActualizacion:
// la PK no se edita y la fecha la setea el back.
export interface ConfiguracionDtoProp {
  fechaEntrega?: string;
  horaEntrega?: number;
  idSede?: string;
  idDatoCobro?: string;
  idMsjPedidoTomado?: string;
  idMsjPedidoRetirado?: string;
  msjRetiro?: boolean;
  msjEnvio?: boolean;
}
