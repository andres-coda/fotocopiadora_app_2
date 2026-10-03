import { Control, FieldErrors, Path } from "react-hook-form";
import EspecificacionesSelect from "../../../../componente/especificaciones/especificacionesSelect";
import Input from "../../../../componente/formulario/input";
import { formValuesLibroDatosLocales, libroDatosLocal } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { parseDecimal } from "../../../../utils/formulario";
import { Especificaciones } from "../../../../modelo/Entidades/especificacion/especificacion.enum";
import { Dispatch, SetStateAction } from "react";
import Texto from "../../../../componente-estilo/texto/texto";

interface Prop<T extends formValuesLibroDatosLocales> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroDatosLocales>;
  especificaciones: Especificaciones[];
  setEspecificaciones: Dispatch<SetStateAction<Especificaciones[]>>
}

const CargarLibroDatosLocal = <T extends formValuesLibroDatosLocales> ({ control, errors, especificaciones, setEspecificaciones }: Prop<T>) => {

  // T always contains the part keys; these casts only bridge the generic to its constraint
  const nameCantidadPg = 'cantidadPg' as Path<T>;
  const nameAdhesivos = 'adhesivos' as Path<T>;

  return (
    <>
      <Texto texto={'Especificaciones por defecto'} centrado mediana inline/>
      <EspecificacionesSelect especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
      <div className="form-horizontal">
        <Input<T> name={nameCantidadPg} control={control} label='Cantidad de páginas' tipo='text' error={errors.cantidadPg} esquema={libroDatosLocal} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
        <Input<T> name={nameAdhesivos} control={control} label='Cantidad de adhesivos' tipo='text' error={errors.adhesivos} esquema={libroDatosLocal} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
      </div>
    </>
  )
}

export default CargarLibroDatosLocal
