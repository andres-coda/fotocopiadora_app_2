import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
import useEditar from "../../../../hooks/editar/useEditar"
import './libroCard.css'
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { transformarComponente } from "../../../../utils/componente"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import { useEffect } from "react"

interface Props {
  libro: LibroProp
}

const LibroCard = ({ libro }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    libro
  });

  useEffect(() => {
    console.log('libro ', libro);
  }, [])
  return (
    <Card
      onClick={() => handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)}
      nuevoEstilo={'card-libro'}
    >
      <img src={libro.img} alt={libro.nombre} />
      <div className="card-vertical vertical-libro-card">
        <Texto texto={`${libro.nombre} - ${transformarComponente(libro.componentes)} - ${libro.nivel}`} chica negrita centrado/>
        <div className="card-horizontal">

          <div className='card-vertical'>
            <Texto texto={`Editorial: ${libro.editorial}`} chica/>
            <div className='card-horizontal'>
              {libro.anio && <Texto texto={`Año de edición: ${libro.anio}`} chica></Texto>}
              {libro.edicion && <Texto texto={`Edición: ${libro.anio}`} chica></Texto>}
            </div>
          </div>
        </div>

      <Texto texto={`${libro.cantidadPg}'`} etiqueta="Cantidad pg" chica derecha  nuevoEstilo="pg-flotante"></Texto>
      </div>
      <ul>
        <li className='enStock' title='libros en stock'>{libro.stock.stock}</li>
        <li className='pendiente' title='libros pendientes'>{libro.stock.pendiente}</li>
        <li className='terminado' title='libros para entregar'>{libro.stock.listo}</li>
        <li className='retirado' title='libros retirados'>{libro.stock.retirado}</li>
      </ul>
    </Card>
  )
}

export default LibroCard