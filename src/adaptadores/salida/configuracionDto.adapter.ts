import { ConfiguracionDtoProp } from "../../modelo/Entidades/configuracion/dtoConfiguracion.interface";
import { formValuesConfiguracion } from "../../modelo/Entidades/configuracion/esqConfiguracion.esquema";

/**
 * Arma el body de PUT /configuracion omitiendo toda clave sin valor real.
 * El back valida @IsUUID('4') y @IsInt(): mandar '' o null seria rechazado.
 * Por eso los strings vacios y los undefined/null no entran en el objeto.
 */
export const configuracionDtoAdapter = (p: formValuesConfiguracion): ConfiguracionDtoProp => {
  const dto: ConfiguracionDtoProp = {};

  if (p.fechaEntrega) dto.fechaEntrega = p.fechaEntrega;
  if (p.horaEntrega !== undefined && p.horaEntrega !== null) dto.horaEntrega = p.horaEntrega;
  if (p.idSede) dto.idSede = p.idSede;
  if (p.idDatoCobro) dto.idDatoCobro = p.idDatoCobro;
  if (p.idMsjPedidoTomado) dto.idMsjPedidoTomado = p.idMsjPedidoTomado;
  if (p.idMsjPedidoRetirado) dto.idMsjPedidoRetirado = p.idMsjPedidoRetirado;
  if (p.msjRetiro !== undefined) dto.msjRetiro = p.msjRetiro;
  if (p.msjEnvio !== undefined) dto.msjEnvio = p.msjEnvio;

  return dto;
}
