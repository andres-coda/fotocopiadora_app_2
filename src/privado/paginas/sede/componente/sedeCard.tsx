import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import useEditar from "../../../../hooks/editar/useEditar";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";


interface Props {
  sede: SedeProp
}

const SedeCard = ({ sede }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_CARGAR}`,
    sede
  });

  return (
    <Card
      onClick={() => handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)}
      nuevoEstilo={'card-sede'}
    >
      <Texto texto={`${sede.nombre}`} mediana centrado/>
      
    </Card>
  )
}

export default SedeCard