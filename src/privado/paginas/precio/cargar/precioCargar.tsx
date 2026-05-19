import { useSelector } from "react-redux";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../../redux/store";
import usePrecioApi from "../../../../servicio/precio/usePrecioApi";
import { useForm } from "react-hook-form";
import { formValuesPrecio, precio, precioFormEdit } from "../../../../modelo/Entidades/precio/esqPrecio.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { addPrecios, resetSelectPrecio } from "../../../../redux/state/precio.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";

const PrecioCargar = () => {
  const precioSelect: PrecioProp | null = useSelector((store: appStore) => store.precio.selected);
  const { editarPrecio, crearPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } = usePrecioApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesPrecio>({
    resolver: zodResolver(precio),
    defaultValues: precioFormEdit(precioSelect)
  });

  const { retroceder } = useFormulario<PrecioProp, formValuesPrecio, PrecioProp>({
    response: responsePrecio,
    resetSelect: resetSelectPrecio,
    agregarElemento: addPrecios,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_LISTO}`,
  })

  const onSubmit = (data: formValuesPrecio) => {
    if (precioSelect?.id) {
      editarPrecio(data, precioSelect.id);
    } else {
      crearPrecio(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${precioSelect ? `Editar precio` : 'Nuevo precio'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar precio"
        etiquetaSecundaria="Atras"
        loading={loadingPrecio}
        errorFetch={errorFetchPrecio}
      >
          <Input<formValuesPrecio> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={precio} />
          <Input<formValuesPrecio> name='importe' control={control} label='Importe' tipo='text' error={errors.importe} esquema={precio} />
         
      </Formulario>
    </Centro>
  )
}

export default PrecioCargar;
