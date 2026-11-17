import { useState } from "react";
import { clienteInicial, ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import { UseFormWatch } from "react-hook-form";
import { formValuesPedido } from "../../../../modelo/Entidades/pedido/esqPedido.esquema";
import { normalizarTelefono } from "../../../../utils/telefono";
import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";

interface Prop {
  watch: UseFormWatch<formValuesPedido>;
  enviarWatsapp?: boolean;
  pedidoSelect?:PedidoProp;
}


type CampoCliente = 'nombre' | 'telefono' | 'email';

// `normalizarTelefono` devuelve undefined cuando el numero no cierra; en ese
// caso se compara el texto crudo para no dar por iguales dos numeros distintos.
const telefonoComparable = (telefono?: string): string =>
  normalizarTelefono(telefono) ?? telefono?.trim() ?? '';


const usePedidoCargar = ({
  enviarWatsapp = false,
  watch,
  pedidoSelect
}: Prop) => {
  

  // Campo del formulario que el usuario esta editando.
  const [campoCliente, setCampoCliente] = useState<CampoCliente>();

  const [enviarWappManual, setEnviarWappManual] = useState<boolean>(enviarWatsapp);

  // Al editar, el pedido ya trae su cliente: se siembra como seleccionado para
  // que el buscador no dispare solo al entrar al formulario. Sin esto el
  // telefono precargado caia en `valor` y el desplegable se abria encima del
  // formulario. `pedidoSelect.cliente` es el shape del adapter, asi que le
  // faltan `ultAct`, `resumen` y `pedidos`; se completan desde `clienteInicial`
  // en vez de castear.
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteProp | undefined>(() =>
    pedidoSelect?.cliente
      ? {
        ...clienteInicial,
        id: pedidoSelect.cliente.id,
        nombre: pedidoSelect.cliente.nombre,
        telefono: pedidoSelect.cliente.telefono,
        email: pedidoSelect.cliente.email,
      }
      : undefined
  );

  const clienteBuscado = {
    nombre: watch().nombre ?? '',
    telefono: watch().telefono ?? '',
    email: watch().email ?? '',
  };

  const esElMismoCliente =
    clienteSeleccionado !== undefined &&
    clienteBuscado.nombre === (clienteSeleccionado.nombre ?? '') &&
    clienteBuscado.email === (clienteSeleccionado.email ?? '') &&
    telefonoComparable(clienteBuscado.telefono) ===
    telefonoComparable(clienteSeleccionado.telefono);

  // Si el usuario edito nombre o email, lo que hay en el formulario ya no es el
  // cliente que habia seleccionado: no se manda uno viejo al back.
  const clienteParaPedido = esElMismoCliente ? clienteSeleccionado : undefined;

  // Se busca solo por el campo que tiene el foco y solo si su valor se aparto
  // del cliente ya elegido. Sin foco no se busca nada, asi entrar o salir de un
  // campo no dispara peticiones; y con el cliente intacto tampoco, para que el
  // desplegable no se reabra sobre una edicion en curso.
  const valorCampoConFoco = campoCliente ? clienteBuscado[campoCliente] : '';
  const referenciaConFoco =
    clienteSeleccionado !== undefined && campoCliente !== undefined
      ? (clienteSeleccionado[campoCliente] ?? '')
      : undefined;

  // El telefono se compara normalizado: el formulario y el adapter pueden
  // guardarlo en formatos distintos, y sin esto alcanza con que el form
  // reescriba el numero en otro formato para que el guard se caiga y el
  // desplegable se reabra con un cliente que no cambio.
  const elCampoNoCambio =
    referenciaConFoco !== undefined &&
    (campoCliente === 'telefono'
      ? telefonoComparable(valorCampoConFoco) === telefonoComparable(referenciaConFoco)
      : valorCampoConFoco === referenciaConFoco);

  const valorBusquedaCliente = campoCliente && !elCampoNoCambio ? valorCampoConFoco : '';

  return { valorBusquedaCliente, clienteParaPedido, setCampoCliente, setClienteSeleccionado, enviarWappManual, setEnviarWappManual }
}

export default usePedidoCargar
