import { useEffect } from "react";
import { ContenedorCentro } from "../../../../../componente-estilo/centro/centroExterior"
import { useLibroContext } from "../../contexto/contexto.libro";
import LibroCargarPartes from "./libroCargarPartes"
import LibroCompletoLista from "./libroCompletoLista"

const LibroCargarPartesInicio = () => {
  const {librosCompletos, armado} = useLibroContext();

  useEffect(()=> {
    console.log('armado nombre: ', armado.libroNombre)
    console.log('armado principal: ', armado.libroPrincipal)
    console.log('armado extra: ', armado.libroSecundario)
  },[armado.libroNombre])

  return (
    <>
      {!librosCompletos && <LibroCargarPartes/>}
      {librosCompletos?.datos && librosCompletos?.datos.length > 0 && <LibroCompletoLista/>}
    </>
  )
}

export default LibroCargarPartesInicio
