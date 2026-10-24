import { useDispatch, useSelector } from 'react-redux';
import Texto from '../../../../componente-estilo/texto/texto';
import { useModalContext } from '../../../../contexto/contextoModal';
import useClienteDeleteApi from '../../../../servicio/cliente/useClienteDeleteApi';
import { ClienteProp } from '../../../../modelo/Entidades/cliente/cliente.interface';
import { appStore } from '../../../../redux/store';
import Cargando from '../../../../componente/cargando/cargando';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Boton from '../../../../componente-estilo/boton/boton';
import Eliminar from '../../../../assets/deleted.svg?react';
import Atras from '../../../../assets/arrow.svg?react';
import { eliminarClienteRedux } from '../../../../redux/state/cliente.state';
import CartelExito from '../../../../componente/cartelExito/cartelExito';
import { useNavigate } from 'react-router-dom';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import { formatoTelefonoMostrar } from '../../../../utils/formatoDatos';

const EliminarCliente = () => {
  const cliente: ClienteProp | undefined = useSelector(
    (store: appStore) => store.cliente.datoSeleccionado
  );
  const { eliminarCliente, responseCliente, errorFetchCliente, loadingCliente } =
    useClienteDeleteApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clienteMostrar = cliente?.telefono
    ? formatoTelefonoMostrar(cliente.telefono)
    : (cliente?.email ?? '');

  const finalizar = () => {
    if (cliente) dispatch(eliminarClienteRedux(cliente.id));
    setModal(false);
    navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_LISTA}`);
  };

  if (loadingCliente || !cliente) return <Cargando />;
  if (errorFetchCliente) return <Texto texto={errorFetchCliente} error chica />;
  if (responseCliente)
    return (
      <CartelExito
        mensaje={`El cliente ---[ ${clienteMostrar} ]--- fue eliminado con exito`}
        onCerrar={finalizar}
        delay={3000}
      />
    );

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el cliente`} centrado mediana />
        <Texto texto={`---[ ${clienteMostrar} ]---`} chica centrado />
        <Botonera>
          <Boton
            icono={<Atras />}
            secundario
            onClick={() => setModal(false)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Atras"
          />
          <Boton
            icono={<Eliminar />}
            onClick={() => eliminarCliente(cliente.id)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Eliminar cliente"
          />
        </Botonera>
      </div>
    </div>
  );
};

export default EliminarCliente;
