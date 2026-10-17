import { useDispatch, useSelector } from "react-redux";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../../../redux/store";
import useSedeApi from "../../../../servicio/sede/useSedeApi";
import { useForm } from "react-hook-form";
import { formValuesSede, sede, sedeFormEdit } from "../../../../modelo/Entidades/sede/esqSede.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import { actualizarSedeRedux, resetSeleccionarSede } from "../../../../redux/state/sede.state";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";

const SedeCargar = () => {
  const sedeSelect: SedeProp | undefined = useSelector((store: appStore) => store.sede.datoSeleccionado);
  const { editarSede, crearSede, responseSede, errorFetchSede, loadingSede } = useSedeApi()
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(sedeSelect?.id);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesSede>({
    resolver: zodResolver(sede),
    defaultValues: sedeFormEdit(sedeSelect)
  });

  const { retroceder } = useFormulario<SedeProp, formValuesSede, SedeProp>({
    resetSelect: resetSeleccionarSede,
    reset,
  })

  const finalizar = () => {
    if (esEdicion && responseSede) dispatch(actualizarSedeRedux(responseSede as SedeProp));
    setModal(false);
  }

  const onSubmit = (data: formValuesSede) => {
    if (esEdicion && sedeSelect) {
      editarSede(data, sedeSelect.id);
    } else {
      crearSede(data);
    }
  }

  if (responseSede) return (
    <CartelExito
      mensaje={`La sede ---[ ${responseSede.nombre} ]--- fue ${esEdicion ? 'editada' : 'creada'} con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Centro>
      <Formulario
        titulo={`${sedeSelect ? `Editar sede` : 'Nueva sede'}`}
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
