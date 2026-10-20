import Boton from "../../../../componente-estilo/boton/boton";
import Texto from "../../../../componente-estilo/texto/texto";
import Titulo from "../../../../componente-estilo/texto/titulo";
import { EmpresaProp } from "../../../../modelo/Entidades/empresa/empresa.interface";
import { formatoTelefonoMostrar } from "../../../../utils/formatoDatos";
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import Editar from '../../../../assets/edit.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Arrow from '../../../../assets/arrow.svg?react';
import './perfilEmpresa.css'
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import { useState } from "react";
import Switch from "../../../../componente-estilo/switch/switch";
import Desplegable from "../../../../componente/formulario/desplegable";
import { configuracion, configuracionFormEdit, formValuesConfiguracion } from "../../../../modelo/Entidades/configuracion/esqConfiguracion.esquema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Opcion } from "../../../../componente/formulario/modelo/input.interface";
import useSedesApi from "../../../../servicio/sede/useSedesApi";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import MensajeCard from "./mensajeCard";
import { SedeProp } from "../../../../modelo/Entidades/sede/sede.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { pasarDesplegable } from "../../../../utils/formulario";
import Input from "../../../../componente/formulario/input";
import useMensajesApi from "../../../../servicio/mensaje/useMensajesApi";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";

interface Props {
  empresa: EmpresaProp;
  onEditar: () => void;
  usuario: usuarioProps;
}

/**
 * Los desplegables se llenan con listados que pueden venir vacios: un operador
 * sin permisos recibe error al listar, y aun con permisos el listado viene
 * paginado. Para no perder la seleccion actual ni dejar el campo vacio,
 * inyectamos siempre como primera opcion la entidad ya configurada.
 */
const opcionesConActual = (
  items: { id: string; nombre: string }[] | undefined,
  actual?: { id: string; nombre: string }
): Opcion[] => {
  const lista = items ?? [];
  const todas = actual && actual.id
    ? [actual, ...lista.filter(x => x.id !== actual.id)]
    : lista;

  return todas.map(x => ({ value: x.id, label: x.nombre }));
}


const valorO = (valor: string | number | undefined): string =>
  valor === undefined || valor === null || valor === '' ? 'Sin definir' : String(valor);


const siNo = (valor: boolean): string => (valor ? 'Si' : 'No');

// formatoTelefonoMostrar exige al menos 10 digitos; si no aplica, se muestra crudo.
const telefonoMostrar = (telefono: string): string => {
  try {
    return formatoTelefonoMostrar(telefono);
  } catch {
    return telefono;
  }
}

const PerfilDatosEmpresa = ({ empresa, onEditar, usuario }: Props) => {
  const [enviarWapp, setEnviarWap] = useState<boolean>(false);

  const [activo, setActivo] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors }, watch } = useForm<formValuesConfiguracion>({
    resolver: zodResolver(configuracion),
    defaultValues: configuracionFormEdit(empresa?.configuracion)
  });

  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.busquedaActual.datosQuery);
  const mensa: SedeProp[] = useSelector((store: appStore) => store.sede.busquedaActual.datosQuery);

  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<string | undefined>(watch().idMsjPedidoTomado);

  const { obtenerMensajesBusqueda, responseMensajes, loadingMensajes, errorFetchMensajes } = useMensajesApi();
  const { finListaRef: finMensajes, datos: mensajes, setDatos: setMensaje } = useBusquedaSimple<MensajeProp>({
    valor: mensajeSeleccionado != watch().idMsjPedidoTomado ? watch().idMsjPedidoTomado ?? '' : '',
    response: responseMensajes,
    loading: loadingMensajes,
    limiteLetrasBusqueda: 3,
    obtenerBusqueda: obtenerMensajesBusqueda
  });


  return (
    <Card nuevoEstilo="empresa-dato">
      <Titulo titulo={empresa.nombre} />
      <div className="empresa-renglon">
        <Email />
        <Texto texto={empresa.email} />
      </div>
      <div className="empresa-renglon">
        <Telefono />
        <Texto texto={telefonoMostrar(empresa.telefono)} />
      </div>
      <Texto texto='Sesión actual' negrita />
      <div className="empresa-renglon">
        <Monigote />
        <Texto texto={usuario.nombre} />
      </div>
      <div className="empresa-renglon">
        <Email />
        <Texto texto={usuario.email} />
      </div>
      <div className={`renglon-desplegable ${activo ? 'renglon-desplegable-activo' : ''}`}>
        <Texto texto='Configuraciones' mediana negrita />
        <Boton
          cerrar
          nuevoEstilo={`btn-icono-chico ${activo ? 'btn-icono-arriba' : 'btn-icono-abajo'}`}
          onClick={() => setActivo(prev => !prev)}
          icono={<Arrow />}
        />
        {activo && empresa.configuracion && <div className="configuracion">
          <div className="empresa-renglon">
            <Texto texto={`Fecha de entrega de pedido por defecto: `} />
            <Input<formValuesConfiguracion> name='fechaEntrega' control={control} error={errors.fechaEntrega} esquema={configuracion} tipo="date" label="" />
          </div>
          <div className="empresa-renglon">
            <Texto texto={`Hora de entrega de pedido por defecto: `} ajustado />
            <Input<formValuesConfiguracion> name='horaEntrega' control={control} error={errors.horaEntrega} esquema={configuracion} tipo="number" label="Cambiar hora por defecto" />
          </div>

          <div className="empresa-renglon">
            <Texto texto={`Sede seleccionada por defecto: `} />
            <Desplegable<formValuesConfiguracion> nuevoEstilo='empresa-desplegable' name='idSede' control={control} label='Sede' tipo='text' error={errors.idSede} esquema={configuracion} opciones={pasarDesplegable({ items: sedes })} />
          </div>
          <div className="empresa-renglon">
            <Texto texto='Enviar whatsapp informativo cuando se retira un pedido: ' etiqueta="Cambiar configuración por defecto" />
            <Switch activo={enviarWapp} onActivar={setEnviarWap} titulo="Cambiar configuración por defecto" />
          </div>
          <div className="empresa-renglon">
            <Texto texto={`Mensaje enviado por defecto cuando se toma un pedido: `} />
            <Input<formValuesConfiguracion> nuevoEstilo='empresa-desplegable' name='idMsjPedidoTomado' control={control} label='Pedido tomado' tipo='text' error={errors.idMsjPedidoTomado} esquema={configuracion} />
            {mensajes && mensajes.datosQuery.length > 0 &&
              <DesplegablePredictivo
                children={mensajes.datosQuery.map(m => <MensajeCard mensaje={m} key={m.id} />)}
                finRegistros={finMensajes}
              />
            }
          </div>
          <div className="empresa-renglon">
            <Texto texto='Enviar whatsapp informativo cuando se toma un pedido: ' etiqueta="Cambiar configuración por defecto" />
            <Switch activo={enviarWapp} onActivar={setEnviarWap} titulo="Cambiar configuración por defecto" />
          </div>
          <div className="empresa-renglon">
            <Texto texto={`Mensaje enviado por defecto cuando se retira un pedido: `} />
            <Input<formValuesConfiguracion> nuevoEstilo='empresa-desplegable' name='idMsjPedidoRetirado' control={control} label='Pedido retirado' tipo='text' error={errors.idMsjPedidoRetirado} esquema={configuracion} />
            {mensajes && mensajes.datosQuery.length > 0 &&
              <DesplegablePredictivo
                children={mensajes.datosQuery.map(m => <MensajeCard mensaje={m} key={m.id} />)}
                finRegistros={finMensajes}
              />
            }
          </div>
          <div className="empresa-renglon">
            <Texto texto={`Mensaje de datos de cobro predeterminado: `} />
            <Input<formValuesConfiguracion> nuevoEstilo='empresa-desplegable' name='idDatoCobro' control={control} label='Dato de cobro' tipo='text' error={errors.idDatoCobro} esquema={configuracion} />
            {mensajes && mensajes.datosQuery.length > 0 &&
              <DesplegablePredictivo
                children={mensajes.datosQuery.map(m => <MensajeCard mensaje={m} key={m.id} />)}
                finRegistros={finMensajes}
              />
            }
          </div>
        </div>}
      </div>
      <Botonera
        nuevoEstilo="empresa-botonera"
      >
        <Boton edit onClick={onEditar} texto='Cerrar sesión' />
        <Boton secundario nuevoEstilo="btn-icono-chico" onClick={onEditar} icono={<Editar />} />
        {usuario.role === 'admin' && <Boton secundario onClick={onEditar} texto='Lista usuarios' />}
        <Boton onClick={onEditar} texto='Configuraciones' />
      </Botonera>
    </Card>
  );
}

export default PerfilDatosEmpresa;
