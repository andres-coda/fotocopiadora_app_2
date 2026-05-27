import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { contextoProps } from "../../../../modelo/contexto/Contexto.interface";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";

export const contextoLibro = createContext<{
  libro: LibroProp | undefined;
  setLibro: Dispatch<SetStateAction<LibroProp | undefined>>;
}>({
  libro: undefined,
  setLibro: () => null
});

export const ProveiderModalContext = ({ children }: contextoProps) => {
  const [libro, setLibro] = useState<LibroProp | undefined>(undefined);

  return (
    <contextoLibro.Provider value={{ setLibro, libro }}>
      {children}
    </contextoLibro.Provider>
  )
}

export const useLibroContext = () => {
  const contexto = useContext(contextoLibro);
  if (!contexto) {
    throw new Error('El contexto de libro se esta llamando fuera de su proveedor');
  }

  return contexto;
}