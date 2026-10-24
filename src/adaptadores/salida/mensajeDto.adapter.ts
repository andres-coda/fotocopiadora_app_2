import { MensajeDtoProp } from '../../modelo/Entidades/mensaje/dtoMensaje.interface';
import { formValuesMensaje } from '../../modelo/Entidades/mensaje/esqMensaje.esquema';

/**
 * Arma el body de POST/PUT /mensaje.
 * POST solo declara nombre y mensaje en su DTO, pero el whitelist del back
 * descarta favorito sin error; PUT si acepta favorito.
 * El mensaje vacio no entra en el objeto.
 */
export const mensajeDtoAdapter = (p: formValuesMensaje): MensajeDtoProp => {
  const dto: MensajeDtoProp = {
    nombre: p.nombre,
    favorito: p.favorito,
  };
  if (p.mensaje) dto.mensaje = p.mensaje;
  return dto;
};
