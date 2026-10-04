import { useSelector } from "react-redux";
import Centro from "../../../../componente-estilo/centro/centro"
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { appStore } from "../../../../redux/store";
import Texto from "../../../../componente-estilo/texto/texto";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";
import LibroSelectNombre from "../componente/libroSelectNombre";
import LibroSelectExtra from "../componente/libroSelectExtra";
import LibroSelectLocal from "../componente/libroSelectLocal";
import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Modal from "../../../../componente/modal/modal";
import LibroEditarFormulario from "./libroEditarFormulario";
import { useEffect, useState } from "react";
import { useModalContext } from "../../../../contexto/contextoModal";

export interface EditarLibroEstadoProp {
  local: boolean;
  extra: boolean;
  stock: boolean;
  datos: boolean;
}

export const estadoDefault: EditarLibroEstadoProp = {
  local: false,
  extra: false,
  stock: false,
  datos: false,
}



const LibroEditar = () => {
  const libro: LibroProp | undefined = useSelector((store: appStore) => store.libro.datoSeleccionado);


  const {setModal, modal} = useModalContext()

  const [editarEstado, setEditarEstado] = useState<EditarLibroEstadoProp>(estadoDefault)

  useEffect(()=>{
    if(!modal)
    setEditarEstado(estadoDefault);
  },[modal, setEditarEstado])


  if (!libro) {
    return (
      <Texto texto={'No hay libro seleccionado para editar'} />
    )
  }
  return (
    <Centro
      nuevoEstilo="libro-edit"
    >
      {libro.img ? (
        <img src={libro.img} alt={libro.nombre} className="libro-img" />
      ) : (null)}
      <div className="div-vertical" title={nombreLibroXstring(libro)}>
        <div className='libro-edit-parte'>
          <Texto texto={'Editar datos primarios'} mediana centrado />
          <LibroSelectNombre libro={libro} />
          <Botonera>
            <Boton texto="Petición para editar" secundario onClick={()=>{setEditarEstado(prev=>({...prev, datos:true})), setModal(true)}}/>
          </Botonera>
        </div>
        <div className='libro-edit-parte'>
          <Texto texto={'Editar datos extras'} mediana centrado />
          <LibroSelectExtra libro={libro} />
          <Botonera>
            <Boton texto="Petición para editar" secundario onClick={()=>{setEditarEstado(prev=>({...prev, extra:true})), setModal(true)}}/>
          </Botonera>
        </div>
        <div className='libro-edit-parte'>
          <Texto texto={'Editar datos funcionales'} mediana centrado />
          <LibroSelectLocal libro={libro} edit />
          <Botonera>
            <Boton texto="Editar" onClick={()=>{setEditarEstado(prev=>({...prev, local:true})), setModal(true)}}/>
          </Botonera>
        </div>
        <div className='libro-edit-parte'>
          <Texto texto={'Editar stock'} mediana centrado />
          <Texto textoResaltado={`Stock: `} texto={`${libro.stock?.stock ?? 0}`} chica />
          <Botonera>
            <Boton texto="Editar stock" onClick={()=>{setEditarEstado(prev=>({...prev, stock:true})), setModal(true)}}/>
          </Botonera>
        </div>
      </div>
      <Modal>
        <LibroEditarFormulario
          libroSelect={libro}
          local={editarEstado.local}
          datos={editarEstado.datos}
          stock={editarEstado.stock}
          extra={editarEstado.extra}
        />
      </Modal>
    </Centro>
  )
}

export default LibroEditar


/*
<Formulario
      titulo={`Editar datos del libro ${nombreLibroXstring(libro)}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Guardar libro"
      etiquetaSecundaria="Atras"
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
    >
      <>
        <CargarLibroDatosLocal control={control} errors={errors} especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
      </>
    </Formulario>
*/