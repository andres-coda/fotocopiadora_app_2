import { Opcion } from "../componente/formulario/modelo/input.interface";
import { BaseProp } from "../modelo/Entidades/base/base.interface";
import { PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { Estado } from "../modelo/Entidades/pedido_libro/estado.enum";

const prioridad: Record<Estado, number> = {
  [Estado.PENDIENTE]: 6,
  [Estado.IMPRESO_MITAD]: 5,
  [Estado.IMPRESO_COMPLETO]: 5,
  [Estado.LISTO]: 4,
  [Estado.RETIRADO]: 3,
  [Estado.CANCELADO]: 2,
  [Estado.CONSTRUCCION]: 1,
  [Estado.POR_CONFIRMAR]: 1,
  [Estado.STOCK]: 1,
};

export const estadoFinalPedido = (pedido?: PedidoProp): Estado => {
  if (!pedido) return Estado.CONSTRUCCION;
  const estadoFinal: Estado = pedido.libroPedidos.reduce((acc: Estado, lP) => {
    return prioridad[lP.estado] > prioridad[acc]
      ? lP.estado
      : acc;
  }, Estado.CONSTRUCCION);
  return estadoFinal
}

interface estadoXdesplegable {
  clave: Estado;
  nombre: string;
}

const estadosParaDesplegable: estadoXdesplegable[] = [
  { clave: Estado.PENDIENTE, nombre: 'Pendiente' },
  { clave: Estado.IMPRESO_MITAD, nombre: 'Imprimiendo...' },
  { clave: Estado.IMPRESO_COMPLETO, nombre: 'Impreso' },
  { clave: Estado.LISTO, nombre: 'Listo' },
  { clave: Estado.RETIRADO, nombre: 'Retirado' },
  { clave: Estado.CANCELADO, nombre: 'Cancelado' },
];

export const pasarEstadoDesplegable = (): Opcion[] => {
  const opciones: Opcion[] = estadosParaDesplegable.map(d => {
    return { value: d.clave, label: String(d.nombre) }
  });
  return opciones
}