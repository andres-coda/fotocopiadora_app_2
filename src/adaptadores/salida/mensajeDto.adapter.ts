import {
  MensajeDtoProp,
  MensajeFavoritoDtoProp,
} from '../../modelo/Entidades/mensaje/dtoMensaje.interface';
import { formValuesMensaje } from '../../modelo/Entidades/mensaje/esqMensaje.esquema';

/**
 * Arma el body de POST/PUT /mensaje.
 * El favorito ya no es parte del mensaje: se administra por usuario con
 * PUT /mensaje/:id/favorito.
 * El mensaje vacio no entra en el objeto.
 */
export const mensajeDtoAdapter = (p: formValuesMensaje): MensajeDtoProp => {
  const dto: MensajeDtoProp = {
    nombre: p.nombre,
  };
  if (p.mensaje) dto.mensaje = p.mensaje;
  return dto;
};

export const mensajeFavoritoDtoAdapter = (favorito: boolean): MensajeFavoritoDtoProp => ({
  favorito,
});
