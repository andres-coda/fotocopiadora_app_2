import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { parseDecimal } from "../../../../utils/formulario";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import useLibroApi from "../../../../servicio/libro/useLibroApi";
import { formValuesLibro, libro, libroFormEdit } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { resetSeleccionarLibro, seleccionarLibro } from "../../../../redux/state/libro.state";
import useEspecificacionesSelect from "../../../../hooks/presupuesto/useEspecificacionesSelect";
import CargarLibroNombre from "./cargarLibroNombre";
import CargarLibroDatosLocal from "./cargarLibroDatosLocal";
import CargarComponentes from "./cargarComponentes";
import { espDefaultInicial } from "../../../../utils/especificaciones";

const LibroCargar = () => {   
  const { crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit()
  });

  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(espDefaultInicial);
    
  const { retroceder } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSeleccionarLibro,
    selectElemento: seleccionarLibro,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesLibro) => {
    crearLibro({data, especificaciones})
  }
  return (
    <Centro>
      <Formulario
        titulo={`Nuevo libro`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar libro"
        etiquetaSecundaria="Atras"
        loading={loadingLibro}
        errorFetch={errorFetchLibro}
      >
        <>          
          <CargarLibroNombre control={control} errors={errors} watch={watch} reset={reset}/>
          <CargarComponentes control={control} errors={errors} watch={watch} reset={reset}/>
         
          <Input<formValuesLibro> name='descripcion' control={control} label='Descripción para impresión' tipo='text' error={errors.descripcion} esquema={libro} />
          <Input<formValuesLibro> name='autor' control={control} label='Autor' tipo='text' error={errors.autor} esquema={libro} />

          <div className="form-horizontal">
            <Input<formValuesLibro> name='edicion' control={control} label='Edición, ej: 1, 2...' tipo='text' error={errors.edicion} esquema={libro} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
            <Input<formValuesLibro> name='anio' control={control} label='Año, ej: 2018' tipo='text' error={errors.anio} esquema={libro} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
          </div>
          <Input<formValuesLibro> name='img' control={control} label='Url de imagen' tipo='text' error={errors.img} esquema={libro} />
          <CargarLibroDatosLocal control={control} errors={errors} especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
          
        </>
      </Formulario>
    </Centro>
  )
}

export default LibroCargar;