import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { contextoProps } from "../modelo/contexto/Contexto.interface";
import { PedidoLibroConstruccionProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";

interface Prop {
  pedidos?: PedidoLibroConstruccionProp[];
  pedidoActual?: PedidoLibroConstruccionProp;
}

export const PedidoContexto = createContext<{
  datos: Prop | undefined;
  setDatos: Dispatch<SetStateAction<Prop | undefined>>;
}>({
  datos: undefined,
  setDatos: () => undefined
});

export const ProveiderPedidoContext = ({ children }: contextoProps) => {
  const [datos, setDatos] = useState<Prop | undefined>(undefined);

  return (
    <PedidoContexto.Provider value={{ setDatos, datos }}>
      {children}
    </PedidoContexto.Provider>
  )
}

export const usePedidoContext = () => {
  const contexto = useContext(PedidoContexto);
  if (!contexto) {
    throw new Error('Los datos se esta llamando fuera de su proveedor');
  }

  return contexto;
}