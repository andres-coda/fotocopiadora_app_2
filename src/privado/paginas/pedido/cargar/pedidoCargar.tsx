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
import PedidoLibroCargar from "./pedidoLibroCargar";
import { usePedidoContext } from "../../../../contexto/contextoPedido";
import { useEffect, useState } from "react";
import { normalizarPedidoLibro } from "../../../../modelo/Entidades/pedido_libro/esqPedidoLibro.esquema";
import { calcularPrecio } from "../../../../utils/precio";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { PedidoLibroConstruccionProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import Texto from "../../../../componente-estilo/texto/texto";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import DesplegableConteiner from "../../../../componente-estilo/deslegable/desplegableConteiner";
import useBuscador from "../../../../hooks/buscador/useBuscador";
import { filterContext } from "../../../../redux/modelo/reduxContext.interface";
import ClienteCard from "../../cliente/componente/clienteCard";

const calcularTotal = (precios: PrecioProp[], libros?: PedidoLibroConstruccionProp[]): number => {
  return libros?.reduce(
    (acc, p) =>
      acc + calcularPrecio({ libro: p.libro, precios, especificaciones: p.especificaciones, cantidad: p.cantidad }
      ),
    0
  ) ?? 0
}

const PedidoCargar = () => {
  const pedidoSelect: PedidoProp | null = useSelector((store: appStore) => store.pedido.selected);
  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  const clienteRedux: filterContext<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const { editarPedido, crearPedido, responsePedido, errorFetchPedido, loadingPedido } = usePedidoApi()
  const { datos, setDatos } = usePedidoContext();
  const [error, setError] = useState<string>('');
  const [cliente, setCliente] = useState<ClienteProp | undefined>(undefined);

  const { valor, setValor, elementosFiltrados } = useBuscador<ClienteProp>({
    elementos: clienteRedux.items,
    sortBy: clienteRedux.filter.sortBy,
  })

  useEffect(() => {
    if (pedidoSelect?.libroPedidos && pedidoSelect?.libroPedidos.length > 0) {
      setDatos({ pedidos: normalizarPedidoLibro(pedidoSelect.libroPedidos) })
    }
  }, []);

  const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<formValuesPedido>({
    resolver: zodResolver(pedido),
    defaultValues: pedidoFormEdit({ pedido: pedidoSelect || undefined, cliente: pedidoSelect?.cliente })
  });

  const dataForm = watch();

  useEffect(() => {
    const total = calcularTotal(precios, datos?.pedidos);

    setValue('importeTotal', total.toString());
  }, [datos?.pedidos, precios, setValue]);

  const { retroceder } = useFormulario<PedidoProp, formValuesPedido, PedidoProp>({
    response: responsePedido,
    resetSelect: resetSelectPedido,
    agregarElemento: addPedidos,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO}`,
  })


  const onSubmit = (data: formValuesPedido) => {
    if (datos?.pedidos && datos?.pedidos?.length > 0) {
      if (pedidoSelect?.id) {
        editarPedido(data, pedidoSelect.id, datos.pedidos);
      } else {
        crearPedido(data, datos.pedidos, cliente);
      }
    } else {
      setError('requiere agregar libros al pedido')
    }
  }

  const handleClickCliente = (cliente: ClienteProp) => {
    setValue('nombre', cliente.nombre)
    setValue('telefono', cliente.telefono)
    setValue('email', cliente.email)
    setCliente(cliente);
    setValor('')
  }


  useEffect(() => {
    if(cliente?.telefono != dataForm.telefono){
      setCliente(undefined);
      setValor(`${dataForm.telefono}`)
    }

  }, [dataForm.email, dataForm.telefono, dataForm.nombre])

  return (
    <Centro
      nuevoEstilo="pedido-cargar"
    >
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
          <div className="form-horizontal pedido-cliente">
            <Input<formValuesPedido> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={pedido} />
            <Input<formValuesPedido> name='telefono' control={control} label='Telefono' tipo='text' error={errors.telefono} esquema={pedido} formatValue={(v) => formatTelefono(v)} parseValue={(v) => parseDecimal(v, 12, 2)} />
            <Input<formValuesPedido> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={pedido} />
            {(valor.length < 3 || elementosFiltrados.length === 0)
              ? null
              : <DesplegableConteiner>
                {elementosFiltrados.map(e => <ClienteCard key={e.id} cliente={e} onClick={handleClickCliente} />)}
              </DesplegableConteiner>
            }
          </div>
          <div className="form-horizontal">
            <Input<formValuesPedido> name='archivos' control={control} label='Archivos' tipo='text' error={errors.archivos} esquema={pedido} />
            <Input<formValuesPedido> name='anillados' control={control} label='Anillados' tipo='text' error={errors.anillados} esquema={pedido} />
          </div>
          <PedidoLibroCargar />
          <Input<formValuesPedido> name='fechaEntrega' control={control} label='Fecha de entrega' tipo='date' error={errors.fechaEntrega} esquema={pedido} />
          <div className="form-horizontal pedido-total">
            <Input<formValuesPedido> name='importeTotal' control={control} label={`Total: $${calcularTotal(precios, datos?.pedidos)}`} tipo='text' error={errors.importeTotal} esquema={pedido} formatValue={(v) => parseDecimal(v, 12, 2)} parseValue={(v) => parseDecimal(v, 12, 2)} />
            <Input<formValuesPedido> name='sena' control={control} label='Seña' tipo='text' error={errors.sena} esquema={pedido} formatValue={(v) => parseDecimal(v, 12, 2)} parseValue={(v) => parseDecimal(v, 12, 2)} />
            <Texto texto={`Saldo: $${Number(dataForm.importeTotal) - Number(dataForm.sena)}`} mediana ajustado centrado nuevoEstilo="saldo"/>
          </div>
        </>
      </Formulario>
      <Texto texto={error} error />
    </Centro >
  )
}

export default PedidoCargar;