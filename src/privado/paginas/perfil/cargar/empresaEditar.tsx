import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { empresa, empresaFormEdit, formValuesEmpresa } from "../../../../modelo/Entidades/empresa/esqEmpresa.esquema";
import { EmpresaProp } from "../../../../modelo/Entidades/empresa/empresa.interface";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import { useModalContext } from "../../../../contexto/contextoModal";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useEmpresaApi from "../../../../servicio/empresa/useEmpresaApi";
import { formatTelefono, parseDecimal } from "../../../../utils/formulario";

interface Props {
  empresa: EmpresaProp;
  onActualizar: (empresa: EmpresaProp) => void;
}

const EmpresaEditar = ({ empresa: empresaActual, onActualizar }: Props) => {
  const { editarEmpresa, responseEmpresa, errorFetchEmpresa, loadingEmpresa } = useEmpresaApi();
  const { setModal } = useModalContext();

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesEmpresa>({
    resolver: zodResolver(empresa),
    defaultValues: empresaFormEdit(empresaActual)
  });

  const finalizar = () => {
    if (responseEmpresa) onActualizar(responseEmpresa);
    setModal(false);
  }

  const onSubmit = (data: formValuesEmpresa) => {
    editarEmpresa(data, empresaActual.id);
  }

  if (responseEmpresa) return (
    <CartelExito
      mensaje={`Los datos de la empresa ---[ ${responseEmpresa.nombre} ]--- fueron editados con exito`}
      onCerrar={finalizar}
    />
  )

  return (
    <Formulario
      titulo='Editar empresa'
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar empresa"
      etiquetaSecundaria="Atras"
      loading={loadingEmpresa}
      errorFetch={errorFetchEmpresa}
    >
      <Input<formValuesEmpresa> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={empresa} />
      <Input<formValuesEmpresa> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={empresa} />
      <Input<formValuesEmpresa> name='telefono' control={control} label='Telefono' tipo='text' error={errors.telefono} esquema={empresa} formatValue={(v) => formatTelefono(v)} parseValue={(v) => parseDecimal(v, 12, 2)} />
    </Formulario>
  )
}

export default EmpresaEditar;
