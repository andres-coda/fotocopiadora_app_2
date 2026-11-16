import { Control, FieldErrors, Path, UseFormSetValue } from 'react-hook-form';
import Input from '../../../../componente/formulario/input';
import {
  formValuesLibroDatosExtras,
  libroDatosExtras,
} from '../../../../modelo/Entidades/libro/esqLibro.esquema';
import { parseDecimal } from '../../../../utils/formulario';
import CargarLibroImagen from './cargarLibroImagen';

/**
 * Campos que ya vienen cargados desde el catalogo (`libro_completo`) y que, por
 * lo tanto, no se editan al crear el libro de la empresa. Solo quedan abiertos
 * los que llegaron vacios.
 */
export interface CamposBloqueados {
  descripcion?: boolean;
  autor?: boolean;
  edicion?: boolean;
  anio?: boolean;
  img?: boolean;
}

interface Prop<T extends formValuesLibroDatosExtras> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroDatosExtras>;
  setValue: UseFormSetValue<T>;
  nuevo?:boolean;
  bloqueados?: CamposBloqueados;
}

const CargarLibroDatosExtras = <T extends formValuesLibroDatosExtras>({
  control,
  errors,
  setValue,
  bloqueados,
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
        bloqueado={bloqueados?.descripcion}
      />
      <Input<T>
        name={nameAutor}
        control={control}
        label="Autor"
        tipo="text"
        error={errors.autor}
        esquema={libroDatosExtras}
        bloqueado={bloqueados?.autor}
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
          bloqueado={bloqueados?.edicion}
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
          bloqueado={bloqueados?.anio}
        />
      </div>
      <CargarLibroImagen<T>
        control={control}
        errors={errors}
        setValue={setValue}
        bloqueada={bloqueados?.img}
      />
    </>
  );
};

export default CargarLibroDatosExtras;
