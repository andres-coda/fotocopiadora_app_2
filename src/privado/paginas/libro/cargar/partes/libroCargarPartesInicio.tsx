import { useEffect } from "react";
import { useLibroContext } from "../../contexto/contexto.libro";
import LibroCargarPartes from "./libroCargarPartes"
import LibroCompletoLista from "./libroCompletoLista"
import LibroCargarParteSecundaria from "./libroCargarParteSecundaria";

const LibroCargarPartesInicio = () => {
  const {librosCompletos, armado, busquedaCompleta} = useLibroContext();

  useEffect(()=> {
    console.log('armado nombre: ', armado.libroNombre)
    console.log('armado principal: ', armado.libroPrincipal)
    console.log('armado extra: ', armado.libroSecundario)
  },[armado.libroNombre])

  return (
    <>
      {!librosCompletos && <LibroCargarPartes/>}
      {!busquedaCompleta?.id_libro_completo && librosCompletos?.datos && librosCompletos?.datos.length > 0 && <LibroCompletoLista/>}
      {busquedaCompleta?.id_libro_completo && <LibroCargarParteSecundaria/>}
    </>
  )
}

export default LibroCargarPartesInicio
