import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import './libro_cargar.css';
import Formulario from "../../../../componente/formulario/formulario";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import useLibroApi from "../../../../servicio/libro/useLibroApi";
import { formValuesLibro, libro, libroFormEdit } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { resetSeleccionarLibro, seleccionarLibro } from "../../../../redux/state/libro.state";
import useEspecificacionesSelect from "../../../../hooks/presupuesto/useEspecificacionesSelect";
import CargarLibroNombre from "./cargarLibroNombre";
import CargarLibroDatosLocal from "./cargarLibroDatosLocal";
import CargarComponentes from "./cargarComponentes";
import { espDefaultInicial } from "../../../../utils/especificaciones";
import CargarLibroDatosExtras from "./cargarLibroDatosExtras";
import Texto from "../../../../componente-estilo/texto/texto";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Boton from "../../../../componente-estilo/boton/boton";
import { useEffect, useState } from "react";

const LibroCargar = () => {
  const { crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit()
  });

  const [nombreLibro, setNombreLibro] = useState<string | undefined>(undefined)

  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(espDefaultInicial);

  const { retroceder, resetForm } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSeleccionarLibro,
    selectElemento: seleccionarLibro,
    reset,
  })

  const onSubmit = (data: formValuesLibro) => {
    crearLibro({ data, especificaciones })
  }

  useEffect(()=>{
    if(responseLibro){
      setNombreLibro(nombreLibroXstring(responseLibro));
    }
  },[responseLibro])

  if (nombreLibro) return (
    <div className="crear-libro-menu">
      <Texto texto={nombreLibro} mediana centrado/>
      <Texto texto={`El libro fue guardado con exito`} centrado/>
      <Botonera>
        <Boton
          onClick={() => {resetForm({ reset, resetSelect: resetSeleccionarLibro, setModal: true }), setNombreLibro(undefined)}}
          texto="Atras"
          edit
        />
        <Boton onClick={() => {resetForm({ reset, setModal: true, ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}` }), setNombreLibro(undefined)}}
          texto="Ir al libro"
          secundario
        />
        <Boton
          onClick={() => {resetForm({ reset, resetSelect: resetSeleccionarLibro }), setNombreLibro(undefined)}}
          texto="Nuevo libro"
        />
      </Botonera>
    </div>
  )
  return (
    <Formulario
      titulo={`Nuevo libro`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Guardar libro"
      etiquetaSecundaria="Atras"
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
      claseForm={'cargar-libro'}
      textBtnConfirmar="Guardar"
      textBtnSecundario="Atras"
    >
      <>
        <CargarLibroNombre<formValuesLibro> control={control} errors={errors} watch={watch} reset={reset} />
        <CargarComponentes<formValuesLibro> control={control} errors={errors} watch={watch} reset={reset} />

        <CargarLibroDatosExtras<formValuesLibro> control={control} errors={errors} />
        <CargarLibroDatosLocal<formValuesLibro> control={control} errors={errors} especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />

      </>
    </Formulario>
  )
}

export default LibroCargar;