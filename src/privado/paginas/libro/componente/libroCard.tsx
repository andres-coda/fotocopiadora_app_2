import Boton from "../../../../componente-estilo/boton/boton"
import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
import useEditar from "../../../../hooks/editar/useEditar"
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"

interface Props {
  libro: LibroProp
}

const LibroCard = ({ libro }: Props) => {
  const { handleEdit } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_CARGAR}`,
    libro
  })
  return (
    <Card
      ultActualizacion={libro.ultAct}
    >
      <Texto texto={libro.nombre} mediana centrado />
      <div className='card-horizontal'>
        <div className='card-vertical'>
          <Texto texto={`${libro.nombre} - ${libro.componentes} - ${libro.nivel}`} />
          <Texto texto={`Editorial: ${libro.editorial}`} />
        </div>
        <Boton icono={<p>Editar</p>} nuevoEstilo='btn-icono-chico' terciario onClick={handleEdit} />
      </div>
    </Card>
  )
}

export default LibroCard