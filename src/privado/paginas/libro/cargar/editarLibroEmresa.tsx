import { useSelector } from "react-redux";
import Centro from "../../../../componente-estilo/centro/centro"
import Formulario from "../../../../componente/formulario/formulario"
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import CargarLibroDatosLocal from "./cargarLibroDatosLocal"
import { appStore } from "../../../../redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesLibroDatosLocales, libroDatosLocal, libroFormEdit } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { useForm } from "react-hook-form";
import useLibroApi from "../../../../servicio/libro/useLibroApi";
import useEspecificacionesSelect from "../../../../hooks/presupuesto/useEspecificacionesSelect";
import { espDefaultInicial } from "../../../../utils/especificaciones";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { resetSeleccionarLibro, seleccionarLibro } from "../../../../redux/state/libro.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Texto from "../../../../componente-estilo/texto/texto";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";


const EditarLibroEmresa = () => {
  const libroSelect: LibroProp | undefined = useSelector((store: appStore) => store.libro.datoSeleccionado);


  const { editarLibroEmpresa, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()
  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesLibroDatosLocales>({
    resolver: zodResolver(libroDatosLocal),
    defaultValues: libroFormEdit(libroSelect)
  });

  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(espDefaultInicial, libroSelect?.id);
    
  const { retroceder } = useFormulario<LibroProp, formValuesLibroDatosLocales, LibroProp>({
    response: responseLibro,
    resetSelect: resetSeleccionarLibro,
    selectElemento: seleccionarLibro,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesLibroDatosLocales) => {
    if (libroSelect?.id) {
      editarLibroEmpresa({data, id:libroSelect.id, especificaciones});
    } 
  }

  if(!libroSelect) {
    return(
      <Texto texto={'No hay libro seleccionado para editar'}/>
    )
  }
  return (
    <Centro>
      <Formulario
        titulo={`Editar datos del libro ${nombreLibroXstring(libroSelect)}`}
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
    </Centro>
  )
}

export default EditarLibroEmresa
