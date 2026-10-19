import { DatoCobroProp } from "../../../../modelo/Entidades/dato_cobro/datoCobro.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { datoCobro, datoCobroFormEdit, formValuesDatoCobro } from "../../../../modelo/Entidades/dato_cobro/esqDatoCobro.esquema";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useDatoCobroApi from "../../../../servicio/dato_cobro/useDatoCobroApi";

interface Props {
  datoCobro?: DatoCobroProp;
}

const DatoCobroCargar = ({ datoCobro: datoSelect }: Props) => {
  const { editarDatoCobro, crearDatoCobro, responseDatoCobro, errorFetchDatoCobro, loadingDatoCobro } = useDatoCobroApi();
  const { setModal } = useModalContext();
  const esEdicion = Boolean(datoSelect?.id);

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesDatoCobro>({
    resolver: zodResolver(datoCobro),
    defaultValues: datoCobroFormEdit(datoSelect)
  });

  const finalizar = () => setModal(false);

  const onSubmit = (data: formValuesDatoCobro) => {
    if (esEdicion && datoSelect) {
      editarDatoCobro(data, datoSelect.id);
    } else {
      crearDatoCobro(data);
    }
  }

  if (responseDatoCobro) return (
    <CartelExito
      mensaje={`El dato de cobro ---[ ${responseDatoCobro.nombre} ]--- fue ${esEdicion ? 'editado' : 'creado'} con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo={esEdicion ? 'Editar dato de cobro' : 'Nuevo dato de cobro'}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar dato de cobro"
      etiquetaSecundaria="Atras"
      loading={loadingDatoCobro}
      errorFetch={errorFetchDatoCobro}
    >
      <Input<formValuesDatoCobro> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={datoCobro} />
      <Input<formValuesDatoCobro> name='mensaje' control={control} label='Mensaje' tipo='text' error={errors.mensaje} esquema={datoCobro} />
    </Formulario>
  )
}

export default DatoCobroCargar;
