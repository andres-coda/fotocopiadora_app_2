import Card from "../../../../componente-estilo/card/card"
import Texto from "../../../../componente-estilo/texto/texto"
import useEditar from "../../../../hooks/editar/useEditar"
import './libroCard.css'
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import {useEffect } from "react"
import useLibroApi from "../../../../servicio/libro/useLibroApi"
import Boton from "../../../../componente-estilo/boton/boton"
import Copiar from "../../../../assets/copiar.svg?react"
import usePresupuesto from "../../../../hooks/presupuesto/usePresupuesto"
import Cargando from "../../../../componente/cargando/cargando"
import { nombreLibroXstring } from "../../../../utils/formatoDatos"

interface Props {
  libro: LibroProp;
  selecLibro?: (libro: LibroProp) => void
}

const LibroCard = ({ libro, selecLibro }: Props) => {
  const { copiarPresupuesto } = usePresupuesto({ libro })
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    libro
  });
  const { obtenerLibroById, responseLibro, loadingLibro, errorFetchLibro } = useLibroApi()

  useEffect(() => {
    if (responseLibro) {
      handleSelect({ rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`, libro: responseLibro })
    }
  }, [responseLibro]);

  const handleClick = () => {
    if(selecLibro) {
      selecLibro(libro);
    } else {
      obtenerLibroById(libro.id)
    }
  }

  return (
    <Card
      onClick={handleClick}
      nuevoEstilo={'card-libro'}
      tituloCard={nombreLibroXstring(libro)}
    >
      <img src={libro.img} alt={nombreLibroXstring(libro)} />
      {!loadingLibro && !errorFetchLibro
        ? <div className="card-vertical vertical-libro-card">
          <div className="card-horizontal">
            <Texto texto={nombreLibroXstring(libro)} chica negrita centrado />
            <Boton icono={<Copiar />} edit nuevoEstilo="btn-icono-chico" titulo={`Copiar presupuesto`} onClick={copiarPresupuesto} />

          </div>
          <div className="card-horizontal">
            <div className='card-vertical'>
              <div className='card-horizontal'>
                {libro.anio && <Texto texto={`Año de edición: ${libro.anio}`} chica></Texto>}
                {libro.edicion && <Texto texto={`Edición: ${libro.anio}`} chica></Texto>}
              </div>
              <Texto texto={`Editorial: ${libro.editorial}`} chica inline/>
            </div>
          </div>

          <Texto texto={`${libro.cantidadPg}' ${libro.adhesivos ? `- ${libro.adhesivos}''` : ''}`} etiqueta="Cantidad pg' - cantidad adhesivos ''" chica derecha ajustado nuevoEstilo="pg-flotante"></Texto>
        </div>
        : !errorFetchLibro
          ? <Cargando />
          : <Texto texto={errorFetchLibro} centrado chica />
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