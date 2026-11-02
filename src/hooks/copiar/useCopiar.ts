import { useEffect, useState } from "react";

interface Prop{
  mensaje: string;
}

const useCopiar = () => {
  const [copiado, setCopiado] = useState<boolean>(false);

  useEffect(() => {
    if (!copiado) return;

    const timer = setTimeout(() => setCopiado(false), 1500);
    return () => clearTimeout(timer);
  }, [copiado]);

  const handleCopiar = ({mensaje}:Prop) => {
    navigator.clipboard.writeText(mensaje);
    setCopiado(true);
  };

  return {copiado, handleCopiar}

}

export default useCopiar
