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
    setValue,
    formState: { errors },
  } = useForm<formValuesConfigEntrega>({
    resolver: zodResolver(configEntrega),
    defaultValues: { fechaEntrega: configuracion?.fechaEntrega ?? undefined },
  });

  const fecha = watch().fechaEntrega;

  // `defaultValues` se lee una sola vez, en el primer render, y en ese momento
  // la empresa todavia no llego: la trae `cargarDatosIniciales` despues del
  // login. React Hook Form no vuelve a aplicar `defaultValues`, asi que el
  // input quedaba vacio aunque hubiera una fecha configurada.
  //
  // Las dependencias son solo la fecha de la configuracion, nunca `fecha`: si
  // dependiera de `fecha`, cada tecla que escribe el operador le revertiria lo
  // escrito al valor guardado. Al abrir, el valor copiado es igual al de la
  // configuracion, asi que el efecto de guardado de abajo no dispara nada.
  useEffect(() => {
    const configurada = configuracion?.fechaEntrega;
    if (!configurada) return;
    setValue('fechaEntrega', configurada);
  }, [configuracion?.fechaEntrega, setValue]);

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
