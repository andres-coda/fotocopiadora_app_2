import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
import useEditar from "../../../../hooks/editar/useEditar"
import './libroCard.css'
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { transformarComponente } from "../../../../utils/componente"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import { useEffect } from "react"
import useLibroApi from "../../../../servicio/libro/useLibroApi"
import Boton from "../../../../componente-estilo/boton/boton"
import Copiar from "../../../../assets/copiar.svg?react"
import usePresupuesto from "../../../../hooks/presupuesto/usePresupuesto"

interface Props {
  libro: LibroProp
}

const LibroCard = ({ libro }: Props) => {
  const {copiarPresupuesto} = usePresupuesto({libro})
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    libro
  });
  const { obtenerLibroById, responseLibro, loadingLibro, errorFetchLibro } = useLibroApi()

  useEffect(() => {
    if (responseLibro) {
      handleSelect({ rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`, libro: responseLibro })
    }
  }, [responseLibro])

  return (
    <Card
      onClick={() => obtenerLibroById(libro.id)}
      nuevoEstilo={'card-libro'}
    >
      <img src={libro.img} alt={libro.nombre} />
      {!loadingLibro && !errorFetchLibro
        ? <div className="card-vertical vertical-libro-card">
          <div className="card-horizontal">
            <Texto texto={`${libro.nombre} - ${libro.nivel} - ${transformarComponente(libro.componentes)}`} chica negrita centrado />
            <Boton icono={<Copiar />} edit nuevoEstilo="btn-icono-chico" titulo={`Copiar presupuesto`} onClick={copiarPresupuesto}/>

          </div>
          <div className="card-horizontal">
            <div className='card-vertical'>
              <div className='card-horizontal'>
                {libro.anio && <Texto texto={`Año de edición: ${libro.anio}`} chica></Texto>}
                {libro.edicion && <Texto texto={`Edición: ${libro.anio}`} chica></Texto>}
              </div>
              <Texto texto={`Editorial: ${libro.editorial}`} chica />
            </div>
          </div>

          <Texto texto={`${libro.cantidadPg}' ${libro.adhesivos ? `- ${libro.adhesivos}''` : ''}`} etiqueta="Cantidad pg' - cantidad adhesivos ''" chica derecha ajustado nuevoEstilo="pg-flotante"></Texto>
        </div>
        : !errorFetchLibro
          ? <Texto texto={'Cargando...'} centrado mediana />
          : <Texto texto={errorFetchLibro} centrado mediana />
      }
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