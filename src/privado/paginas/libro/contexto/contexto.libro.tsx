import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { contextoProps } from '../../../../modelo/contexto/Contexto.interface';
import { LibroCompletoProp, LibroNombreProp, LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { ComponenteProp } from '../../../../modelo/Entidades/libro/componente.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import { PaginadoProp } from '../../../../adaptadores/entrada/paginado.adapter';

interface ContextoLibroProp {
  libro?: LibroProp;
}

export interface ArmadoLibroUnoProp {
  componentes?: ComponenteProp[];
  componentes_texto?: string;
  nivel?: string;
}

export interface ArmadoLibroDosProp extends Omit<
  LibroProp,
  | 'detalleImpresion'
  | 'cantidadPg'
  | 'adhesivos'
  | 'especificacionesDefecto'
  | 'stock'
  | 'propuesta'
> {
  id_libro_completo?: string;
}

export interface libroSelecProp {
  id_libro?:string;
  nombre?: string;
  editorial?: string;
  materia?: string;
}

interface ArmadoProp {
  libroNombre?: libroSelecProp;
  libroPrincipal?: ArmadoLibroUnoProp;
  libroSecundario?: ArmadoLibroDosProp;
}

const armadoInicial = {
  libroNombre: undefined,
  libroPrincipal: undefined,
  libroSecundario: undefined,
};

export const contextoLibro = createContext<{
  librosCompletos?: PaginadoProp<LibroCompletoProp> | undefined;
  setLibrosCompleto: Dispatch<SetStateAction<PaginadoProp<LibroCompletoProp> | undefined>>;
  armado: ArmadoProp;
  setArmado: Dispatch<SetStateAction<ArmadoProp>>;
}>({
  librosCompletos: undefined,
  setLibrosCompleto: () => null,
  armado: armadoInicial,
  setArmado: () => null,
});

export const ProveiderModalContext = ({ children }: contextoProps) => {
  const [armado, setArmado] = useState<ArmadoProp>(armadoInicial);
  const [librosCompletos, setLibrosCompleto] = useState<PaginadoProp<LibroCompletoProp> | undefined>(undefined);

  const libro: LibroProp | undefined = useSelector(
    (store: appStore) => store.libro.datoSeleccionado
  );

  useEffect(() => {
    if (libro) {
      setArmado({
        libroNombre: {...libro, id_libro:undefined, materia: libro.materia.nombre},
        libroPrincipal: {...libro},
        libroSecundario: {...libro}
      });
    }
    setArmado(armadoInicial);
  }, [libro]);
  return <contextoLibro.Provider value={{ armado, setArmado, librosCompletos, setLibrosCompleto }}>{children}</contextoLibro.Provider>;
};

export const useLibroContext = () => {
  const contexto = useContext(contextoLibro);
  if (!contexto) {
    throw new Error('El contexto de libro se esta llamando fuera de su proveedor');
  }

  return contexto;
};
