import { useEffect, useState } from "react";
import { BtnCopiarClasProp } from "../modelo/btnCopiar.interface"


const useBtnCopiar = ({
  nuevoEstilo= '',
  flotante = false,
  derecha = false,
}:BtnCopiarClasProp) => {
  const [copiada, setCopiada] = useState<boolean>(false);

  useEffect(() => {
      if (!copiada) return;
  
      const timer = setTimeout(() => setCopiada(false), 1000);
      return () => clearTimeout(timer);
    }, [copiada]);

  const clase = [
    nuevoEstilo
  ]
    .filter(Boolean)
    .join(' ');

  return {clase, copiada, setCopiada}
}

export default useBtnCopiar
