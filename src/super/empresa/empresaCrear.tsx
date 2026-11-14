import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  empresaCrearSuper,
  empresaCrearSuperFormDefault,
  formValuesEmpresaCrearSuper,
} from '../../modelo/Entidades/empresa/esqEmpresa.esquema';
import Formulario from '../../componente/formulario/formulario';
import Input from '../../componente/formulario/input';
import CartelExito from '../../componente/cartelExito/cartelExito';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';
import { useNavigate } from 'react-router-dom';
import { RutasSupers } from '../ruta/rutaSupers';
import { rutaBase } from '../../privado/rutas/rutasPrivadas';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import { formatTelefono, parseTelefono } from '../../utils/formulario';

const EmpresaCrear = () => {
  const { crearEmpresa, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValuesEmpresaCrearSuper>({
    resolver: zodResolver(empresaCrearSuper),
    defaultValues: empresaCrearSuperFormDefault,
  });

  const onSubmit = (data: formValuesEmpresaCrearSuper) => {
    console.log('data: ', data);
    console.log('data del formulario: ',control._formValues.telefono);
    crearEmpresa(data);
  };

  if (responseEmpresa)
    return (
      <CartelExito
        mensaje={`La empresa ---[ ${responseEmpresa.nombre} ]--- fue creada con exito junto con su administrador`}
        onCerrar={() => navigate(`/${rutaBase.SUPER}/${RutasSupers.EMPRESA_LISTA}`)}
      />
    );

  return (
    <ContenedorCentro scroll>

      <Formulario
        titulo="Nueva empresa"
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => navigate(`/${rutaBase.SUPER}/${RutasSupers.EMPRESA_LISTA}`)}
        etiquetaPrimaria="Crear empresa"
        textBtnConfirmar="Crear"
        etiquetaSecundaria="Atras"
        textBtnSecundario="Atras"
        loading={loadingEmpresa}
        errorFetch={errorFetchEmpresa}
      >
        <Input<formValuesEmpresaCrearSuper>
          name="nombre"
          control={control}
          label="Nombre de la empresa"
          tipo="text"
          error={errors.nombre}
          esquema={empresaCrearSuper}
        />
        <Input<formValuesEmpresaCrearSuper>
          name="email"
          control={control}
          label="Email de la empresa"
          tipo="text"
          error={errors.email}
          esquema={empresaCrearSuper}
        />
        <Input<formValuesEmpresaCrearSuper>
          name="telefono"
          control={control}
          label="Telefono de la empresa"
          tipo="text"
          error={errors.telefono}
          esquema={empresaCrearSuper}
          formatValue={v => formatTelefono(v)}
          parseValue={v => parseTelefono(v)}
        />
        <Input<formValuesEmpresaCrearSuper>
          name="adminNombre"
          control={control}
          label="Nombre del administrador"
          tipo="text"
          error={errors.adminNombre}
          esquema={empresaCrearSuper}
        />
        <Input<formValuesEmpresaCrearSuper>
          name="adminEmail"
          control={control}
          label="Email del administrador"
          tipo="text"
          error={errors.adminEmail}
          esquema={empresaCrearSuper}
        />
        <Input<formValuesEmpresaCrearSuper>
          name="adminPassword"
          control={control}
          label="Contraseña del administrador"
          tipo="password"
          error={errors.adminPassword}
          esquema={empresaCrearSuper}
        />
      </Formulario>
    </ContenedorCentro>
  );
};

export default EmpresaCrear;