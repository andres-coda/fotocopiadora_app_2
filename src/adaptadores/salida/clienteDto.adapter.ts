import { ClienteDtoProp } from '../../modelo/Entidades/cliente/dtoCliente.interface';
import { formValuesCliente } from '../../modelo/Entidades/cliente/esqCliente.esquema';
import { normalizarTelefono } from '../../utils/telefono';

export const clienteDtoAdapter = (c: formValuesCliente): ClienteDtoProp => {
  const newGrupo: ClienteDtoProp = {
    nombre: c.nombre,
    // Se vuelve a normalizar aunque el esquema ya lo hizo: este adaptador
    // tambien recibe el telefono del formulario de pedido, que no pasa por el
    // esquema de cliente.
    telefono: normalizarTelefono(c.telefono),
    email: c.email ?? null,
  };
  return newGrupo;
};
