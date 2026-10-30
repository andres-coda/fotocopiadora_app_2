import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Boton from '../../../../componente-estilo/boton/boton';
import Switch from '../../../../componente-estilo/switch/switch';
import Texto from '../../../../componente-estilo/texto/texto';
import { ConfiguracionProp } from '../../../../modelo/Entidades/configuracion/configuracion.interface';
import { CampoConfig } from '../../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import { formValuesConfiguracion } from '../../../../modelo/Entidades/configuracion/esqConfiguracion.esquema';
import { setConfiguracionEmpresa } from '../../../../redux/state/empresa.state';
import useConfiguracionApi from '../../../../servicio/configuracion/useConfiguracionApi';
import Editar from '../../../../assets/edit.svg?react';

import './configuracion.css'

interface Props {
  configuracion?: ConfiguracionProp;
  onEditarCampo: (campo: CampoConfig) => void;
}

interface FilaProps {
  etiqueta: string;
  valor: string;
  onEditar: () => void;
}

/**
 * Fila de solo lectura: muestra el valor actual y abre el modal de edición.
 * Los campos cuyo valor no está configurado se muestran como "Sin definir".
 */
const FilaConfiguracion = ({ etiqueta, valor, onEditar }: FilaProps) => (
  <div className="configuracion-campo">
    <div className="configuracion-campo__datos">
      <Texto texto={etiqueta} chica />
      <Texto texto={valor} negrita />
    </div>
    <Boton
      icono={<Editar />}
      terciario
      nuevoEstilo="btn-icono-chico"
      titulo={`Editar ${etiqueta.toLowerCase()}`}
      onClick={onEditar}
    />
  </div>
);

const textoHora = (hora?: number): string =>
  hora === undefined || hora === null ? 'Sin definir' : `${hora} hs`;

const Configuracion = ({ configuracion, onEditarCampo }: Props) => {
  const dispatch = useDispatch();
  const {
    editarConfiguracion,
    responseConfiguracion,
    loadingConfiguracion,
    errorFetchConfiguracion,
  } = useConfiguracionApi();

  // Estado optimista: el control responde al instante y luego se sincroniza
  // con la configuración que devuelve el PUT.
  const [fecha, setFecha] = useState<string>(configuracion?.fechaEntrega ?? '');
  const [msjRetiro, setMsjRetiro] = useState<boolean>(configuracion?.msjRetiro ?? false);
  const [msjEnvio, setMsjEnvio] = useState<boolean>(configuracion?.msjEnvio ?? false);

  useEffect(() => {
    setFecha(configuracion?.fechaEntrega ?? '');
    setMsjRetiro(configuracion?.msjRetiro ?? false);
    setMsjEnvio(configuracion?.msjEnvio ?? false);
  }, [configuracion]);

  // Si el guardado falla, se descarta el estado optimista y se vuelve a lo persistido.
  useEffect(() => {
    if (errorFetchConfiguracion) {
      setFecha(configuracion?.fechaEntrega ?? '');
      setMsjRetiro(configuracion?.msjRetiro ?? false);
      setMsjEnvio(configuracion?.msjEnvio ?? false);
    }
  }, [errorFetchConfiguracion, configuracion]);

  useEffect(() => {
    if (responseConfiguracion) dispatch(setConfiguracionEmpresa(responseConfiguracion));
  }, [responseConfiguracion, dispatch]);

  // Solo viaja el campo tocado: el DTO omite el resto y el back no lo modifica.
  const guardar = (parcial: formValuesConfiguracion) => editarConfiguracion(parcial);

  const cambiarFecha = (valor: string) => {
    if (loadingConfiguracion) return;
    setFecha(valor);
    guardar({ fechaEntrega: valor });
  };

  const cambiarMsjRetiro = (valor: boolean) => {
    if (loadingConfiguracion) return;
    setMsjRetiro(valor);
    guardar({ msjRetiro: valor });
  };

  const cambiarMsjEnvio = (valor: boolean) => {
    if (loadingConfiguracion) return;
    setMsjEnvio(valor);
    guardar({ msjEnvio: valor });
  };

  return (
    <div className="configuracion">
      <section className="configuracion-seccion">
        <Texto texto="Entrega" mediana negrita />
        <div className="configuracion-campo">
          <Texto texto="Fecha de entrega por defecto" chica />
          <div className="inputs-entero configuracion-campo__fecha">
            <input
              id="fechaEntrega"
              type="date"
              value={fecha}
              onChange={e => cambiarFecha(e.target.value)}
              disabled={loadingConfiguracion}
            />
          </div>
        </div>
        <FilaConfiguracion
          etiqueta="Hora de entrega por defecto"
          valor={textoHora(configuracion?.horaEntrega)}
          onEditar={() => onEditarCampo('horaEntrega')}
        />
      </section>

      <section className="configuracion-seccion">
        <Texto texto="Sede por defecto" mediana negrita />
        <FilaConfiguracion
          etiqueta="Sede seleccionada por defecto"
          valor={configuracion?.sede?.nombre ?? 'Sin definir'}
          onEditar={() => onEditarCampo('idSede')}
        />
      </section>

      <section className="configuracion-seccion">
        <Texto texto="Mensajes automáticos" mediana negrita />
        <FilaConfiguracion
          etiqueta="Mensaje cuando se toma un pedido"
          valor={configuracion?.msjTomado?.nombre ?? 'Sin definir'}
          onEditar={() => onEditarCampo('idMsjPedidoTomado')}
        />
        <FilaConfiguracion
          etiqueta="Mensaje cuando se retira un pedido"
          valor={configuracion?.msjRetirado?.nombre ?? 'Sin definir'}
          onEditar={() => onEditarCampo('idMsjPedidoRetirado')}
        />
        <div className="configuracion-campo">
          <Texto texto="Enviar WhatsApp informativo al tomar un pedido" chica />
          <Switch activo={msjEnvio} onActivar={cambiarMsjEnvio} />
        </div>
        <div className="configuracion-campo">
          <Texto texto="Enviar WhatsApp informativo al retirar un pedido" chica />
          <Switch activo={msjRetiro} onActivar={cambiarMsjRetiro} />
        </div>
      </section>

      <section className="configuracion-seccion">
        <Texto texto="Datos de cobro" mediana negrita />
        <FilaConfiguracion
          etiqueta="Dato de cobro predeterminado"
          valor={configuracion?.datoCobrado?.nombre ?? 'Sin definir'}
          onEditar={() => onEditarCampo('idDatoCobro')}
        />
      </section>

      <div className="configuracion-estado">
        {loadingConfiguracion && <Texto texto="Guardando..." chica />}
        {!loadingConfiguracion && errorFetchConfiguracion && (
          <Texto texto={errorFetchConfiguracion} error chica />
        )}
        {!loadingConfiguracion && !errorFetchConfiguracion && responseConfiguracion && (
          <Texto texto="Guardado" chica />
        )}
      </div>
    </div>
  );
};

export default Configuracion;
