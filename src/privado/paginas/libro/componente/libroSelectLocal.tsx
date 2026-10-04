import Texto from '../../../../componente-estilo/texto/texto';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { especificacionEnumXString } from '../../../../utils/especificaciones';
import './libroSelect.css'

interface Prop {
  libro: LibroProp;
  nuevoEstilo?: string;
  edit?: boolean;
}

const LibroSelectLocal = ({ libro, nuevoEstilo = '', edit = false }: Prop) => {
  return (
    <div className={`libro-select-nombre ${nuevoEstilo}`}>
      <Texto textoResaltado={'Cantidad de páginas:  '} texto={`${libro.cantidadPg}`} chica/>
      <Texto textoResaltado={'Cantidad de adhesivos:  '} texto={`${libro.adhesivos ?? 0}`} chica/>
      <Texto textoResaltado={'Detalle de impresión:  '} texto={`${libro.detalleImpresion ?? ''}`} chica/>
      {edit && <Texto textoResaltado={'Especificaciones por defecto:  '} texto={`${libro.especificacionesDefecto?.map(e => ` ${especificacionEnumXString(e)}`) ?? ''}`} chica/>}
    </div>
  )
}

export default LibroSelectLocal
