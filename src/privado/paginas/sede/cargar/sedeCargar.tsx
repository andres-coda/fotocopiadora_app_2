import { useSelector } from "react-redux";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../../../redux/store";
import useSedeApi from "../../../../servicio/sede/useSedeApi";
import { useForm } from "react-hook-form";
import { formValuesSede, sede, sedeFormEdit } from "../../../../modelo/Entidades/sede/esqSede.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { addSedes, resetSelectSede } from "../../../../redux/state/sede.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";

const SedeCargar = () => {
  const sedeSelect: SedeProp | null = useSelector((store: appStore) => store.sede.selected);
  const { editarSede, crearSede, responseSede, errorFetchSede, loadingSede } = useSedeApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesSede>({
    resolver: zodResolver(sede),
    defaultValues: sedeFormEdit(sedeSelect)
  });

  const { retroceder } = useFormulario<SedeProp, formValuesSede, SedeProp>({
    response: responseSede,
    resetSelect: resetSelectSede,
    agregarElemento: addSedes,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.SEDE_LISTA}`,
  })

  const onSubmit = (data: formValuesSede) => {
    if (sedeSelect?.id) {
      editarSede(data, sedeSelect.id);
    } else {
      crearSede(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${sedeSelect ? `Editar sede` : 'Nuevo sede'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar sede"
        etiquetaSecundaria="Atras"
        loading={loadingSede}
        errorFetch={errorFetchSede}
      >
          <Input<formValuesSede> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={sede} />
         
      </Formulario>
    </Centro>
  )
}

export default SedeCargar;
