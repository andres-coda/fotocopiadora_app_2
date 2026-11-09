import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { contextoProps } from '../../../modelo/contexto/Contexto.interface';


export const empresaContexto = createContext<{
  empresa?: string;
  setEmpresa: Dispatch<SetStateAction<string | undefined>>;
}>({
  empresa: undefined,
  setEmpresa: () => null,
});

export const ProveiderEmpresaContext = ({ children }: contextoProps) => {
  const [empresa, setEmpresa] = useState<string | undefined>(undefined);

  return <empresaContexto.Provider value={{ setEmpresa, empresa }}>{children}</empresaContexto.Provider>;
};

export const useEmpresaContext = () => {
  const contexto = useContext(empresaContexto);
  if (!contexto) {
    throw new Error('El contexto de empresa se esta llamando fuera de su proveedor');
  }

  return contexto;
};
