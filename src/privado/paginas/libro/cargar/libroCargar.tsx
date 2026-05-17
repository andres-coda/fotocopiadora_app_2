import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
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
import { resetSelectLibro } from "../../../../redux/state/libro.state";
import InputCheck from "../../../../componente/formulario/inputCheck";

const LibroCargar = () => {
  const libroSelect: LibroProp | null = useSelector((store: appStore) => store.libro.selected);
  const { editarLibro, crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit(libroSelect)
  });

  const { retroceder } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSelectLibro,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesLibro) => {
    if (libroSelect?.id) {
      editarLibro(data, libroSelect.id);
    } else {
      crearLibro(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${libroSelect ? `Editar libro` : 'Nuevo libro'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar libro"
        etiquetaSecundaria="Atras"
        loading={loadingLibro}
        errorFetch={errorFetchLibro}
      >
        <>
          <Input<formValuesLibro> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={libro} />
          <Input<formValuesLibro> name='componentes' control={control} label='Componentes, ej: Student, Activity, etc...' tipo='text' error={errors.componentes} esquema={libro} />
          <Input<formValuesLibro> name='nivel' control={control} label='Nivel, ej: 1, 2A, etc' tipo='text' error={errors.nivel} esquema={libro} />
          <Input<formValuesLibro> name='descripcion' control={control} label='Descripción para impresión' tipo='text' error={errors.descripcion} esquema={libro} />
          <div className="form-horizontal">
            <Input<formValuesLibro> name='editorial' control={control} label='Editorial' tipo='text' error={errors.editorial} esquema={libro} />
            <Input<formValuesLibro> name='autor' control={control} label='Autor' tipo='text' error={errors.autor} esquema={libro} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesLibro> name='edicion' control={control} label='Edición, ej: 1ra, 2da...' tipo='text' error={errors.edicion} esquema={libro} />
            <Input<formValuesLibro> name='anio' control={control} label='Año, ej: 2018' tipo='text' error={errors.anio} esquema={libro} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesLibro> name='cantidadPg' control={control} label='Cantidad de páginas' tipo='text' error={errors.cantidadPg} esquema={libro} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
            <Input<formValuesLibro> name='adhesivos' control={control} label='Cantidad de adhesivos' tipo='text' error={errors.adhesivos} esquema={libro} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
          </div>
          <Input<formValuesLibro> name='img' control={control} label='Url de imagen' tipo='text' error={errors.img} esquema={libro} />
          <div className="form-horizontal-flexible">
            <InputCheck<formValuesLibro> name='color' control={control} label='Color' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='byn' control={control} label='Blanco y negro' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='anillado' control={control} label='Anillado' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='d_f' control={control} label='Doble faz' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='s_f' control={control} label='Simple faz' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='adhesivo' control={control} label='Con adhesivo' tipo='checkbox' />
          </div>
          <Input<formValuesLibro> name='materia' control={control} label='Materia' tipo='text' error={errors.materia} esquema={libro} />
        </>
      </Formulario>
    </Centro>
  )
}

export default LibroCargar;
