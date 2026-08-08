import { useSelector } from "react-redux";
import { PrecioNombreProp, PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../../redux/store";
import usePrecioApi from "../../../../servicio/precio/usePrecioApi";
import { useForm } from "react-hook-form";
import { formValuesPrecio, precio, precioFormEdit } from "../../../../modelo/Entidades/precio/esqPrecio.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import { resetSeleccionarPrecio } from "../../../../redux/state/precio.state";
import { useState } from "react";
import usePreciosNombreApi from "../../../../servicio/precio/usePrecioNombreApi";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import PrecioNombreCard from "../componente/precioNombreCard";
import { parseDecimal } from "../../../../utils/formulario";

const limiteBusquedaPrecioNombre = 3;

const PrecioCargar = () => {
  const precioSelect: PrecioProp | undefined = useSelector((store: appStore) => store.precio.datoSeleccionado);
  const { editarPrecio, crearPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } = usePrecioApi()

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesPrecio>({
    resolver: zodResolver(precio),
    defaultValues: precioFormEdit(precioSelect)
  });

  const [precioSeleccionado, setPrecioSeleccionado] = useState<string | undefined>(undefined);

  const { obtenerPreciosBusqueda, responsePrecios: responsePrecioNombre, loadingPrecios } = usePreciosNombreApi();
  const { finListaRef: finPrecio, datos: precios, setDatos: setPrecios } = useBusquedaSimple<PrecioNombreProp>({
    valor: precioSeleccionado != watch().nombre ? watch().nombre : '',
    response: responsePrecioNombre,
    loading: loadingPrecios,
    limiteLetrasBusqueda: limiteBusquedaPrecioNombre,
    obtenerBusqueda: obtenerPreciosBusqueda
  });

  const { retroceder } = useFormulario<PrecioProp, formValuesPrecio, PrecioProp>({
    response: responsePrecio,
    resetSelect: resetSeleccionarPrecio,
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

  const handleSelectPrecioNombre = (c: PrecioNombreProp) => {
      setPrecios(undefined);
      reset({
        ...watch(),
        nombre: c.nombre,
      });
      setPrecioSeleccionado(c.nombre);
    };

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
        {precios && precios.datosQuery.length > 0 && <DesplegablePredictivo
          children={precios.datosQuery.map(c => <PrecioNombreCard precioNombre={c} selectPrecioNombre={handleSelectPrecioNombre} />)}
          finRegistros={finPrecio}
        />}
        <Input<formValuesPrecio> name='importe' control={control} label='Importe' tipo='text' error={errors.importe} esquema={precio}  formatValue={(v) => parseDecimal(v, 9, 2)} parseValue={(v) => parseDecimal(v, 9, 2)} />

      </Formulario>
    </Centro>
  )
}

export default PrecioCargar;
