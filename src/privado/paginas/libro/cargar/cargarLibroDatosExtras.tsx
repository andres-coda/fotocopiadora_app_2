import { Control, FieldErrors, Path, UseFormSetValue } from 'react-hook-form';
import Input from '../../../../componente/formulario/input';
import {
  formValuesLibroDatosExtras,
  libroDatosExtras,
} from '../../../../modelo/Entidades/libro/esqLibro.esquema';
import { parseDecimal } from '../../../../utils/formulario';
import CargarLibroImagen from './cargarLibroImagen';

interface Prop<T extends formValuesLibroDatosExtras> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroDatosExtras>;
  setValue: UseFormSetValue<T>;
}

const CargarLibroDatosExtras = <T extends formValuesLibroDatosExtras>({
  control,
  errors,
  setValue,
}: Prop<T>) => {
  const nameDescripcion = 'descripcion' as Path<T>;
  const nameAutor = 'autor' as Path<T>;
  const nameEdicion = 'edicion' as Path<T>;
  const nameAnio = 'anio' as Path<T>;

  return (
    <>
      <Input<T>
        name={nameDescripcion}
        control={control}
        label="Descripción"
        tipo="text"
        error={errors.descripcion}
        esquema={libroDatosExtras}
      />
      <Input<T>
        name={nameAutor}
        control={control}
        label="Autor"
        tipo="text"
        error={errors.autor}
        esquema={libroDatosExtras}
      />

      <div className="form-horizontal">
        <Input<T>
          name={nameEdicion}
          control={control}
          label="Edición, ej: 1, 2..."
          tipo="text"
          error={errors.edicion}
          esquema={libroDatosExtras}
          formatValue={v => parseDecimal(v, 2, 0)}
          parseValue={v => parseDecimal(v, 2, 0)}
        />
        <Input<T>
          name={nameAnio}
          control={control}
          label="Año, ej: 2018"
          tipo="text"
          error={errors.anio}
          esquema={libroDatosExtras}
          formatValue={v => parseDecimal(v, 4, 0)}
          parseValue={v => parseDecimal(v, 4, 0)}
        />
      </div>
      <CargarLibroImagen<T> control={control} errors={errors} setValue={setValue} />
    </>
  );
};

export default CargarLibroDatosExtras;
