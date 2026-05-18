import { useSelector } from "react-redux";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../../redux/store";
import useClienteApi from "../../../../servicio/cliente/useClienteApi";
import { useForm } from "react-hook-form";
import { cliente, clienteFormEdit, formValuesCliente } from "../../../../modelo/Entidades/cliente/esqCliente.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { addClientes, resetSelectCliente, selectCliente } from "../../../../redux/state/cliente.state";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";

const ClienteCargar = () => {
  const clienteSelect: ClienteProp | null = useSelector((store: appStore) => store.cliente.selected);
  const { editarCliente, crearCliente, responseCliente, errorFetchCliente, loadingCliente } = useClienteApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesCliente>({
    resolver: zodResolver(cliente),
    defaultValues: clienteFormEdit(clienteSelect)
  });

  const { retroceder } = useFormulario<ClienteProp, formValuesCliente, ClienteProp>({
    response: responseCliente,
    selectElemento: selectCliente,
    agregarElemento: addClientes,
    resetSelect: resetSelectCliente,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`,
  })

  const onSubmit = (data: formValuesCliente) => {
    if (clienteSelect?.id) {
      editarCliente(data, clienteSelect.id);
    } else {
      crearCliente(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${clienteSelect ? `Editar cliente` : 'Nuevo cliente'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar cliente"
        etiquetaSecundaria="Atras"
        loading={loadingCliente}
        errorFetch={errorFetchCliente}
      >
        <>
          <Input<formValuesCliente> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={cliente} />
          <Input<formValuesCliente> name='telefono' control={control} label='Telefono' tipo='text' error={errors.telefono} esquema={cliente} />
          <Input<formValuesCliente> name='email' control={control} label='Email' tipo='text' error={errors.email} esquema={cliente} />
        </>
      </Formulario>
    </Centro>
  )
}

export default ClienteCargar;
