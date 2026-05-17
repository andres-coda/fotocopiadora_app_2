import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
import useEditar from "../../../../hooks/editar/useEditar"
import './libroCard.css'
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { transformarComponente } from "../../../../utils/componente"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"

interface Props {
  libro: LibroProp
}

const LibroCard = ({ libro }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    libro
  })
  return (
    <Card
      ultActualizacion={libro.ultAct}
      onClick={()=>handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)}
    >
      <Texto texto={`${libro.nombre} - ${transformarComponente(libro.componentes)} - ${libro.nivel}`} mediana centrado />
      <div className="card-horizontal">
        <img src={libro.img} alt={libro.nombre}/>

        <div className='card-vertical lib-descr-interna'>
          <div className='card-horizontal'>
            {libro.anio ? <h6>{`Autor: ${libro.anio}`}</h6> : null}
            {libro.edicion ? <h6>{`Edición: ${libro.edicion}`}</h6> : null}
          </div>
          <Texto texto={`Editorial: ${libro.editorial}`} />
        </div>
          <div className='libro-pg'>
            <p title='Cantidad pg'>{libro.cantidadPg}'</p>
          </div>
          <ul>
            {libro.stock.stock > 0 && <li className='retirado' title='libros retirados'>{libro.stock.stock}</li>}
            <li className='pendiente' title='libros pendientes'>{libro.stock.pendiente}</li>
            <li className='terminado' title='libros para entregar'>{libro.stock.listo}</li>
            <li className='retirado' title='libros retirados'>{libro.stock.retirado}</li>
          </ul>
      </div>
    </Card>
  )
}

export default LibroCard