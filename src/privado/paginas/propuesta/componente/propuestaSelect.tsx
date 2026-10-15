import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface"
import LibroCard from "../../libro/componente/libroCard";
import Editar from '../../../../assets/edit.svg?react'
import Arrow from '../../../../assets/arrow.svg?react'
import { useModalContext } from "../../../../contexto/contextoModal";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import useEditar from "../../../../hooks/editar/useEditar";
import Texto from "../../../../componente-estilo/texto/texto";
import './propuestacard.css'

interface Prop {
  propuesta:PropuestaProp;
}

const PropuestaSelect = ({propuesta}:Prop) => {
  const { setModal } = useModalContext();  
  const { handleSelect, handleEdit } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`,
    propuesta
  });
  return (
    <div className="propuesta-select">
      <Texto texto={propuesta.nombre} centrado negrita mediana/>
      {propuesta.libro?.map(l => <LibroCard libro={l} key={l.id} />)}
          <Botonera>
            <Boton icono={<Arrow />} secundario nuevoEstilo={`btn-icono-chico`} titulo={`Mostrar todos los libros`} onClick={() => {setModal(false)}} />
            <Boton icono={<Editar />} nuevoEstilo="btn-icono-chico" titulo={`Editar propuesta`} onClick={() => handleEdit({ propuesta })} />
          </Botonera>
    </div>
  )
}

export default PropuestaSelect
