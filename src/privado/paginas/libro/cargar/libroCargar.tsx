import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import './sindicato.css';
import { sindicatoProps } from "../../../../modelo/sindicato/Sindicato.interface";
import useSindicatoDeleteApi from "../../../../servicios/sindicato/useSindicatoDeleted";
import { formValuesSindcato, sindicato, sindicatoFormEdit } from "../../../../modelo/sindicato/esqSindicato.esquema";
import { resetSelectSindicato } from "../../../../redux/state/sindicatos.state";
import { parseDecimal } from "../../../../utils/formulario";

const SindicatoCargar = () => {
  const sindicatoSelect: sindicatoProps | null = useSelector((store: appStore) => store.sindicatos.selected);
  const { editarSindicato, crearSindicato, responseSindicato, errorFetchSindicato, loadingSindicato } = useSindicatoDeleteApi()
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesSindcato>({
    resolver: zodResolver(sindicato),
    defaultValues: sindicatoFormEdit(sindicatoSelect)
  });
  
  const { retroceder } = useFormulario<boolean,formValuesSindcato, sindicatoProps>({
    response:responseSindicato,
    resetSelect:resetSelectSindicato,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.SINDICATOS}`,
  })

  const onSubmit = (data: formValuesSindcato) => {
    if (sindicatoSelect?.id) {
      editarSindicato(data, sindicatoSelect.id);
    } else {
      crearSindicato(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${sindicatoSelect ? `Editar sindicato` : 'Nuevo sindicato'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={()=>retroceder()}
        etiquetaPrimaria="Guardar sindicato"
        etiquetaSecundaria="Atras"
        loading={loadingSindicato}
        errorFetch={errorFetchSindicato}
      >
        <>
          <Input<formValuesSindcato> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={sindicato} />
          <Input<formValuesSindcato> name='abreviatura' control={control} label='Sigla de abreviatura' tipo='text' error={errors.abreviatura} esquema={sindicato} />
          <Input<formValuesSindcato> name='apAfiliado' control={control} label='Aporte afiliado' tipo='text' error={errors.apAfiliado} esquema={sindicato} formatValue={(v)=>parseDecimal(v,5,2)} parseValue={(v)=>parseDecimal(v,5,2)}/>
          <Input<formValuesSindcato> name='apNoAfiliado' control={control} label='Aporte solidario no afiliado' tipo='text' error={errors.apNoAfiliado} esquema={sindicato} formatValue={(v)=>parseDecimal(v,5,2)} parseValue={(v)=>parseDecimal(v,5,2)}/>
        </>
      </Formulario>
    </Centro>
  )
}

export default SindicatoCargar
