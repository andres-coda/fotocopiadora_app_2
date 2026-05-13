import Boton from "../../../../componente-estilo/boton/boton"
import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
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
          <Texto texto={`Aporte afiliado: ${libro.apAfiliado}`} />
          <Texto texto={`Aporte solidario no afiliado: ${libro.apNoAfiliado}`} />
        </div>
        <Boton icono={<Editar />} nuevoEstilo='btn-icono-chico' terciario onClick={handleEdit} />
      </div>
    </Card>
  )
}

export default LibroCard