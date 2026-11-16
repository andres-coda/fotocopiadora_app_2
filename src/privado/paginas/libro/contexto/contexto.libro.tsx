import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { contextoProps } from '../../../../modelo/contexto/Contexto.interface';
import { LibroCompletoProp, LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { ComponenteProp } from '../../../../modelo/Entidades/libro/componente.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import { PaginadoProp } from '../../../../adaptadores/entrada/paginado.adapter';

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

export interface ArmadoProp {
  libroNombre?: libroSelecProp;
  libroPrincipal?: ArmadoLibroUnoProp;
  libroSecundario?: ArmadoLibroDosProp;
}

// Criterios con los que se disparo la busqueda de libros completos. Se guardan
// resueltos al momento de buscar para que todas las paginas consulten exactamente
// lo mismo: en el flujo de alta `armado.libroPrincipal` esta vacio y los valores
// reales viven en el formulario.
export interface BusquedaLibroCompletoProp {
  id: string;
  nivel?: string;
  componentes?: string;
  id_libro_completo?:string;
  libro_completo?:LibroCompletoProp;
}

const armadoInicial = {
  libroNombre: undefined,
  libroPrincipal: undefined,
  libroSecundario: undefined,
};

interface ContextoLibroValor {
  librosCompletos?: PaginadoProp<LibroCompletoProp> | undefined;
  setLibrosCompleto: Dispatch<SetStateAction<PaginadoProp<LibroCompletoProp> | undefined>>;
  busquedaCompleta?: BusquedaLibroCompletoProp | undefined;
  setBusquedaCompleta: Dispatch<SetStateAction<BusquedaLibroCompletoProp | undefined>>;
  armado: ArmadoProp;
  setArmado: Dispatch<SetStateAction<ArmadoProp>>;
}

export const contextoLibro = createContext<ContextoLibroValor | undefined>(undefined);

export const ProveedorLibroContext = ({ children }: contextoProps) => {
  const [armado, setArmado] = useState<ArmadoProp>(armadoInicial);
  const [librosCompletos, setLibrosCompleto] = useState<PaginadoProp<LibroCompletoProp> | undefined>(undefined);
  const [busquedaCompleta, setBusquedaCompleta] = useState<BusquedaLibroCompletoProp | undefined>(undefined);

  const libro: LibroProp | undefined = useSelector(
    (store: appStore) => store.libro.datoSeleccionado
  );

  useEffect(() => {
    if (!libro) {
      setArmado(armadoInicial);
      setBusquedaCompleta(undefined);
      return;
    }
    setArmado({
      libroNombre: { ...libro, id_libro: undefined, materia: libro.materia.nombre },
      libroPrincipal: { ...libro },
      libroSecundario: { ...libro },
    });
    setBusquedaCompleta(undefined);
  }, [libro]);
  return (
    <contextoLibro.Provider
      value={{
        armado,
        setArmado,
        librosCompletos,
        setLibrosCompleto,
        busquedaCompleta,
        setBusquedaCompleta,
      }}
    >
      {children}
    </contextoLibro.Provider>
  );
};

export const useLibroContext = () => {
  const contexto = useContext(contextoLibro);
  if (!contexto) {
    throw new Error('El contexto de libro se esta llamando fuera de su proveedor');
  }

  return contexto;
};
