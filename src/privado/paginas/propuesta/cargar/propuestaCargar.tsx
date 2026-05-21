import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesPropuesta, propuesta, propuestaFormEdit } from "../../../../modelo/Entidades/propuesta/esqPropuesta.esquema";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import usePropuestaApi from "../../../../servicio/propuesta/usePropuestaApi";
import { addPropuestas, resetSelectPropuesta } from "../../../../redux/state/propuesta.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import { useState } from "react";
import Input from "../../../../componente/formulario/input";

const PropuestaCargar = () => {
  const propuestaSelect: PropuestaProp | null = useSelector((store: appStore) => store.propuesta.selected);
  const [librosIds, setLibrosIds] = useState<string[]>([]);

  const { editarPropuesta, crearPropuesta, responsePropuesta, errorFetchPropuesta, loadingPropuesta } = usePropuestaApi()

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesPropuesta>({
    resolver: zodResolver(propuesta),
    defaultValues: propuestaFormEdit(propuestaSelect)
  });

  const { retroceder } = useFormulario<PropuestaProp, formValuesPropuesta, PropuestaProp>({
    response: responsePropuesta,
    resetSelect: resetSelectPropuesta,
    agregarElemento: addPropuestas,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesPropuesta) => {
    if (propuestaSelect?.id) {
      editarPropuesta(data, propuestaSelect.id, librosIds);
    } else {
      crearPropuesta(data, librosIds);
    }
  }

  return (
    <Centro>
      <Formulario
        titulo={`${propuestaSelect ? `Editar propuesta` : 'Nuevo propuesta'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar propuesta"
        etiquetaSecundaria="Atras"
        loading={loadingPropuesta}
        errorFetch={errorFetchPropuesta}
      >
          <Input<formValuesPropuesta> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={propuesta} />
          
      </Formulario>
    </Centro>
  )
}

export default PropuestaCargar;