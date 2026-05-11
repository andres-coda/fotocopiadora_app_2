import { useEffect, useState } from "react";

interface Props {
  funcion: (...args: any[]) => void; // Puedes cambiar 'any[]' a un tipo más específico si conoces los argumentos
  diley: number;
}

function useRetardo(funcion: Props['funcion'], diley: Props['diley']) {
  const [tiempoId, setTiempoId] = useState<number | undefined>(undefined);

  const retardarFuncion = (...args: any[]) => {
    clearTimeout(tiempoId);
    const nuevoTiempo = setTimeout(() => {
      funcion(...args)
    }, diley);
    setTiempoId(nuevoTiempo);
  }

  useEffect(() => {
    return (() => {
      clearTimeout(tiempoId);
    })
  }, [tiempoId])

  return retardarFuncion

}

export default useRetardo;