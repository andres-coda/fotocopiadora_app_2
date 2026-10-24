import { useDispatch, useSelector } from 'react-redux';
import { ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
import { appStore } from '../../../../redux/store';
import useClienteApi from '../../../../servicio/cliente/useClienteApi';
import { useForm } from 'react-hook-form';
import {
  cliente,
  clienteFormEdit,
  formValuesCliente,
} from '../../../../modelo/Entidades/cliente/esqCliente.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import { formatTelefono, parseDecimal } from '../../../../utils/formulario';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';
import {
  actualizarClienteRedux,
  agregarClienteInicioRedux,
} from '../../../../redux/state/cliente.state';
import { useModalContext } from '../../../../contexto/contextoModal';
import CartelExito from '../../../../componente/cartelExito/cartelExito';

const ClienteCargar = () => {
  const clienteSelect: ClienteProp | undefined = useSelector(
    (store: appStore) => store.cliente.datoSeleccionado
  );
  const { editarCliente, crearCliente, responseCliente, errorFetchCliente, loadingCliente } =
    useClienteApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(clienteSelect?.id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValuesCliente>({
    resolver: zodResolver(cliente),
    defaultValues: clienteFormEdit(clienteSelect),
  });

  const finalizar = () => {
    if (responseCliente) {
      if (esEdicion) dispatch(actualizarClienteRedux(responseCliente as ClienteProp));
      else dispatch(agregarClienteInicioRedux(responseCliente as ClienteProp));
    }
    setModal(false);
  };

  const onSubmit = (data: formValuesCliente) => {
    if (esEdicion && clienteSelect) {
      editarCliente(data, clienteSelect.id);
    } else {
      crearCliente(data);
    }
  };

  if (responseCliente) {
    const clienteMostrar = responseCliente.telefono
      ? formatoTelefonoMostrar(responseCliente.telefono)
      : (responseCliente.email ?? '');

    return (
      <CartelExito
        mensaje={`El cliente ---[ ${clienteMostrar} ]--- fue ${esEdicion ? 'editado' : 'creado'} con exito`}
        onCerrar={finalizar}
      />
    );
  }

  return (
    <Formulario
      titulo={`${esEdicion ? 'Editar cliente' : 'Nuevo cliente'}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar cliente"
      etiquetaSecundaria="Atras"
      loading={loadingCliente}
      errorFetch={errorFetchCliente}
    >
      <>
        <Input<formValuesCliente>
          name="nombre"
          control={control}
          label="Nombre"
          tipo="text"
          error={errors.nombre}
          esquema={cliente}
        />
        <Input<formValuesCliente>
          name="telefono"
          control={control}
          label="Telefono"
          tipo="text"
          error={errors.telefono}
          esquema={cliente}
          formatValue={v => formatTelefono(v)}
          parseValue={v => parseDecimal(v, 12, 2)}
        />
        <Input<formValuesCliente>
          name="email"
          control={control}
          label="Email"
          tipo="text"
          error={errors.email}
          esquema={cliente}
        />
      </>
    </Formulario>
  );
};

export default ClienteCargar;
