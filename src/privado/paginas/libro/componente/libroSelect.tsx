import { useSelector } from "react-redux";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { appStore } from "../../../../redux/store";
import Centro from "../../../../componente-estilo/centro/centro";
import { RefObject, useRef } from "react";
import './libroSelect.css'
import { transformarComponente } from "../../../../utils/componente";
import Texto from "../../../../componente-estilo/texto/texto";
import Presupuesto from "../../../../componente/pedido/presupuesto/presupuesto";

const LibroSelect = () => {
  const libro: LibroProp | null = useSelector((store: appStore) => store.libro.selected);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  if (!libro) return <p>No se encontro el libro seleccionado</p>

  return (
    <Centro ref={contenedorRef}>
      <div className="div-vertical libro-select">
        <div className="libro-superior">
          {libro.img ? (
            <img src={libro.img} alt={libro.nombre} className="libro-img" />
          ) : (null)}
          <div className="div-vertical">
            <Texto texto={`${libro.nombre} - ${libro.nivel} - ${transformarComponente(libro.componentes)} `} grande centrado negrita />
            <Texto textoResaltado={'Año de edición:  '} texto={libro.anio ?? ''} chica />
            {libro.edicion && <Texto textoResaltado={'Número de edición:  '} texto={`${libro.edicion}`} chica />}
            <Texto textoResaltado={'Editorial:  '} texto={`${libro.editorial ?? ''}`} chica />
            <Texto textoResaltado={'Autor:  '} texto={`${libro.autor ?? ''}`} chica />
            <Texto textoResaltado={'Materia:  '} texto={`${libro.materia.nombre}`} chica />
            <Texto textoResaltado={'Descripción:  '} texto={`${libro.descripcion ?? ''}`} chica />
            <Texto textoResaltado={'Cantidad de páginas:  '} texto={`${libro.cantidadPg}`} />
            <Texto textoResaltado={'Cantidad de adhesivos:  '} texto={`${libro.adhesivos ?? 0}`} />
          </div>
        </div>
      </div>
      <Presupuesto libro={libro} />
    </Centro>
  )
}

export default LibroSelect