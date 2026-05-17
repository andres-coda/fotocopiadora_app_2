import { useSelector } from "react-redux";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { appStore } from "../../../../redux/store";
import Centro from "../../../../componente-estilo/centro/centro";
import { RefObject, useRef } from "react";
import './libroSelect.css'
import { transformarComponente } from "../../../../utils/componente";
import Texto from "../../../../componente-estilo/texto/texto";
import { transformarEspecificacinesATexto } from "../../../../utils/especificaciones";
import { calcularPrecio } from "../../../../utils/precio";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";

const LibroSelect = () => {
  const libro: LibroProp | null = useSelector((store: appStore) => store.libro.selected);
  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  if (!libro) return <p>No se encontro el libro seleccionado</p>
  return (
    <Centro ref={contenedorRef}>
      <div className="libro-superior">
        {libro.img ? (
          <img src={libro.img} alt={libro.nombre} className="libro-img"/>
        ) : (null)}
        <div className='superCard-descr-interna'>
          <Texto texto={`${libro.nombre} - ${transformarComponente(libro.componentes)} - ${libro.nivel}`} grande centrado negrita/>
          <Texto texto={`Año de edición: ${libro.anio ?? ''} - Número de edición: ${libro.edicion ?? ''}`} />
          <Texto texto={`Editorial: ${libro.editorial ?? ''}`} />
          <Texto texto={`Autor: ${libro.autor ?? ''}`} />
          <Texto texto={`Materia: ${libro.materia.nombre}`} mediana/>
          <Texto texto={`Descripción: ${libro.descripcion ?? ''}`} />
        <div className="copiado-presupuesto">
          <Texto texto={'Presupuesto'} centrado negrita></Texto>
          <Texto texto={`El libro ${libro.nombre} ${transformarComponente(libro.componentes)} ${libro.nivel}, ${transformarEspecificacinesATexto(libro.especificacionesDefecto)}, te sale $${calcularPrecio({libro, precios})}`} />
        </div>

      </div>
      </div>
    </Centro>
  )
}

export default LibroSelect