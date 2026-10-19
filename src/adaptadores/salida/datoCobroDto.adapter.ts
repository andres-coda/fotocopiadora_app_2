import { DatoCobroDtoProp } from "../../modelo/Entidades/dato_cobro/dtoDatoCobro.interface";
import { formValuesDatoCobro } from "../../modelo/Entidades/dato_cobro/esqDatoCobro.esquema";

/**
 * Arma el body de POST/PUT /dato-cobro.
 * POST y PUT aceptan nombre y mensaje; el mensaje vacio no entra en el objeto.
 */
export const datoCobroDtoAdapter = (p: formValuesDatoCobro): DatoCobroDtoProp => {
  const dto: DatoCobroDtoProp = {
    nombre: p.nombre,
  };
  if (p.mensaje) dto.mensaje = p.mensaje;
  return dto;
}
