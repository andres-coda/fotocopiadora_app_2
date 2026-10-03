import { Control, FieldErrors, Path } from "react-hook-form";
import Input from "../../../../componente/formulario/input";
import { formValuesLibroDatosExtras, libroDatosExtras } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { parseDecimal } from "../../../../utils/formulario";

interface Prop<T extends formValuesLibroDatosExtras> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroDatosExtras>;
}

const CargarLibroDatosExtras = <T extends formValuesLibroDatosExtras>({ control, errors }: Prop<T>) => {
  const nameDescripcion = 'descripcion' as Path<T>;
  const nameAutor = 'autor' as Path<T>;
  const nameEdicion = 'edicion' as Path<T>;
  const nameAnio = 'anio' as Path<T>;
  const nameImg = 'img' as Path<T>;

  return (
    <>
      <Input<T> name={nameDescripcion} control={control} label='Descripción' tipo='text' error={errors.descripcion} esquema={libroDatosExtras} />
      <Input<T> name={nameAutor} control={control} label='Autor' tipo='text' error={errors.autor} esquema={libroDatosExtras} />

      <div className="form-horizontal">
        <Input<T> name={nameEdicion} control={control} label='Edición, ej: 1, 2...' tipo='text' error={errors.edicion} esquema={libroDatosExtras} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
        <Input<T> name={nameAnio} control={control} label='Año, ej: 2018' tipo='text' error={errors.anio} esquema={libroDatosExtras} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
      </div>
      <Input<T> name={nameImg} control={control} label='Url de imagen' tipo='text' error={errors.img} esquema={libroDatosExtras} />
    </>
  )
}

export default CargarLibroDatosExtras
