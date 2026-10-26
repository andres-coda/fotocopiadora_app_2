import { useDispatch, useSelector } from 'react-redux';
import { ConfiguracionProp } from '../../modelo/Entidades/configuracion/configuracion.interface';
import { appStore } from '../../redux/store';
import Texto from '../../componente-estilo/texto/texto';
import Input from '../formulario/input';
import { useForm } from 'react-hook-form';
import {
  configEntrega,
  formValuesConfigEntrega,
} from '../../modelo/Entidades/configuracion/esqConfiguracion.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import useConfiguracionApi from '../../servicio/configuracion/useConfiguracionApi';
import { setConfiguracionEmpresa } from '../../redux/state/empresa.state';
import './lateralIzquierdo.css';
import Card from '../../componente-estilo/card/card';
import Lateral from '../../componente-estilo/lateral/lateral';
import PreciosCategoria from './preciosCategoria';

const LateralIzquierdo = () => {
  const configuracion: ConfiguracionProp | undefined = useSelector(
    (store: appStore) => store.empresa.empresa?.configuracion
  );

  const dispatch = useDispatch();

  const {
    cambiarFechaEntrega,
    responseConfiguracion,
    loadingConfiguracion,
    errorFetchConfiguracion,
  } = useConfiguracionApi();

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<formValuesConfigEntrega>({
    resolver: zodResolver(configEntrega),
    defaultValues: { fechaEntrega: configuracion?.fechaEntrega ?? undefined },
  });

  const fecha = watch().fechaEntrega;

  useEffect(() => {
    if (fecha && fecha != configuracion?.fechaEntrega) {
      if (!loadingConfiguracion) cambiarFechaEntrega({ fechaEntrega: fecha });
    }
  }, [fecha]);

  useEffect(() => {
    if (responseConfiguracion) {
      dispatch(setConfiguracionEmpresa(responseConfiguracion));
    }
  }, [responseConfiguracion]);

  return (
    <Lateral>
      <Card nuevoEstilo="fecha-entrega">
        <Texto texto={`Entrega`} mediana negrita />
        <Input<formValuesConfigEntrega>
          name="fechaEntrega"
          control={control}
          label="Fecha"
          tipo="date"
          error={errors.fechaEntrega}
          esquema={configEntrega}
        />
        {errorFetchConfiguracion && <Texto texto={errorFetchConfiguracion} error chica />}
        <Texto textoResaltado="Hora: " texto={`${configuracion?.horaEntrega ?? '00'}:00`} />
      </Card>
      <PreciosCategoria />
    </Lateral>
  );
};

export default LateralIzquierdo;
