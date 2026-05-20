import { useSelector } from "react-redux";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { appStore } from "../../../../redux/store";
import Centro from "../../../../componente-estilo/centro/centro";
import { RefObject, useRef, useState } from "react";
import './libroSelect.css'
import { transformarComponente } from "../../../../utils/componente";
import Texto from "../../../../componente-estilo/texto/texto";
import { transformarEspecificacinesATexto } from "../../../../utils/especificaciones";
import { calcularPrecio } from "../../../../utils/precio";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { Especificaciones } from "../../../../modelo/Entidades/especificacion/especificacion.enum";
import EspecificacionesSelect from "../../../../componente/especificaciones/especificacionesSelect";
import Boton from "../../../../componente-estilo/boton/boton";

const LibroSelect = () => {
  const libro: LibroProp | null = useSelector((store: appStore) => store.libro.selected);
  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  const [especificaciones, setEspecificaciones] = useState<Especificaciones[]>(libro?.especificacionesDefecto ?? [])
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  if (!libro) return <p>No se encontro el libro seleccionado</p>

  const presupuestoTexto = `El libro ${libro.nombre} ${libro.nivel}
${transformarComponente(libro.componentes)},
${transformarEspecificacinesATexto(especificaciones, libro)},
te sale $${calcularPrecio({ libro, precios, especificaciones })}`;

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
      <div className="copiado-presupuesto libro-select">
        <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
        <Texto texto={presupuestoTexto} />
        <EspecificacionesSelect setEspecificaciones={setEspecificaciones} especificaciones={especificaciones} />
        <Boton secundario texto="Copiar" onClick={() => navigator.clipboard.writeText(presupuestoTexto)}></Boton>
      </div>
    </Centro>
  )
}

export default LibroSelect