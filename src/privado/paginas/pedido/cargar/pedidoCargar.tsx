import { useSelector } from "react-redux";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import { appStore } from "../../../../redux/store";
import usePedidoApi from "../../../../servicio/pedido/usePedidoApi";
import { useForm } from "react-hook-form";
import { formValuesPedido, pedido, pedidoFormEdit } from "../../../../modelo/Entidades/pedido/esqPedido.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { addPedidos, resetSelectPedido } from "../../../../redux/state/pedido.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Input from "../../../../componente/formulario/input";
import { formatTelefono, parseDecimal } from "../../../../utils/formulario";

const PedidoCargar = () => {
  const pedidoSelect: PedidoProp | null = useSelector((store: appStore) => store.pedido.selected);

  const { editarPedido, crearPedido, responsePedido, errorFetchPedido, loadingPedido } = usePedidoApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesPedido>({
    resolver: zodResolver(pedido),
    defaultValues: pedidoFormEdit({ pedido: pedidoSelect || undefined, cliente: pedidoSelect?.cliente })
  });

  const { retroceder } = useFormulario<PedidoProp, formValuesPedido, PedidoProp>({
    response: responsePedido,
    resetSelect: resetSelectPedido,
    agregarElemento: addPedidos,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO}`,
  })

  const onSubmit = (data: formValuesPedido) => {
    if (pedidoSelect?.id) {
      editarPedido(data, pedidoSelect.id);
    } else {
      crearPedido(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${pedidoSelect ? `Editar pedido` : 'Nuevo pedido'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar pedido"
        etiquetaSecundaria="Atras"
        loading={loadingPedido}
        errorFetch={errorFetchPedido}
      >
        <>
          <div className="form-vertical">
            <Input<formValuesPedido> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={pedido} />
            <Input<formValuesPedido> name='telefono' control={control} label='Telefono' tipo='text' error={errors.telefono} esquema={pedido} formatValue={(v) => formatTelefono(v)} parseValue={(v) => parseDecimal(v, 12, 2)} />
            <Input<formValuesPedido> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={pedido} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesPedido> name='archivos' control={control} label='Archivos' tipo='text' error={errors.archivos} esquema={pedido} />
            <Input<formValuesPedido> name='anillados' control={control} label='Anillados' tipo='text' error={errors.anillados} esquema={pedido} />
          </div>
          <Input<formValuesPedido> name='fechaEntrega' control={control} label='Fecha de entrega' tipo='date' error={errors.fechaEntrega} esquema={pedido} />
          <div className="form-horizontal">
            <Input<formValuesPedido> name='importeTotal' control={control} label='Total' tipo='text' error={errors.importeTotal} esquema={pedido} formatValue={(v) => parseDecimal(v, 12, 2)} parseValue={(v) => parseDecimal(v, 12, 2)} />
            <Input<formValuesPedido> name='sena' control={control} label='Seña' tipo='text' error={errors.sena} esquema={pedido} formatValue={(v) => parseDecimal(v, 12, 2)} parseValue={(v) => parseDecimal(v, 12, 2)} />
          </div>
        </>
      </Formulario>
    </Centro>
  )
}

export default PedidoCargar;