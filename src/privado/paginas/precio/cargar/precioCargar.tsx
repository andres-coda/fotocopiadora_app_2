import { useDispatch, useSelector } from 'react-redux';
import {
  CategoriaProp,
  PrecioNombreProp,
  PrecioProp,
} from '../../../../modelo/Entidades/precio/precio.interface';
import { appStore } from '../../../../redux/store';
import usePrecioApi from '../../../../servicio/precio/usePrecioApi';
import { useForm } from 'react-hook-form';
import {
  formValuesPrecio,
  precio,
  precioFormEdit,
} from '../../../../modelo/Entidades/precio/esqPrecio.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import {
  actualizarPrecioRedux,
  agregarPrecioInicioRedux,
} from '../../../../redux/state/precio.state';
import { useState } from 'react';
import usePreciosNombreApi from '../../../../servicio/precio/usePrecioNombreApi';
import useBusquedaSimple from '../../../../hooks/buscador/useBuscadorSimple';
import DesplegablePredictivo from '../../../../componente-estilo/predictivo/desplegablePredictivo';
import PrecioNombreCard from '../componente/precioNombreCard';
import CategoriaCard from '../componente/categoriaCard';
import useCategoriaNombreApi from '../../../../servicio/precio/useCategoriaNombreApi';
import { parseDecimal } from '../../../../utils/formulario';
import { useModalContext } from '../../../../contexto/contextoModal';
import CartelExito from '../../../../componente/cartelExito/cartelExito';

const limiteBusquedaPrecioNombre = 3;

const PrecioCargar = () => {
  const precioSelect: PrecioProp | undefined = useSelector(
    (store: appStore) => store.precio.datoSeleccionado
  );
  const { editarPrecio, crearPrecio, responsePrecio, errorFetchPrecio, loadingPrecio } =
    usePrecioApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();
  const esEdicion = Boolean(precioSelect?.id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<formValuesPrecio>({
    resolver: zodResolver(precio),
    defaultValues: precioFormEdit(precioSelect),
  });

  const [precioSeleccionado, setPrecioSeleccionado] = useState<string | undefined>(undefined);

  const {
    obtenerPreciosBusqueda,
    responsePrecios: responsePrecioNombre,
    loadingPrecios,
  } = usePreciosNombreApi();
  const {
    finListaRef: finPrecio,
    datos: precios,
    setDatos: setPrecios,
  } = useBusquedaSimple<PrecioNombreProp>({
    valor:
      precioSeleccionado != watch().nombre && precioSelect?.nombre != watch().nombre
        ? watch().nombre
        : '',
    response: responsePrecioNombre,
    loading: loadingPrecios,
    limiteLetrasBusqueda: limiteBusquedaPrecioNombre,
    obtenerBusqueda: obtenerPreciosBusqueda,
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | undefined>(undefined);

  const { obtenerCategoriasBusqueda, responseCategorias, loadingCategorias } =
    useCategoriaNombreApi();
  const {
    finListaRef: finCategorias,
    datos: categorias,
    setDatos: setCategorias,
  } = useBusquedaSimple<CategoriaProp>({
    valor:
      categoriaSeleccionada != watch().categoria &&
      precioSelect?.categoria?.nombre != watch().categoria
        ? (watch().categoria ?? '')
        : '',
    response: responseCategorias,
    loading: loadingCategorias,
    limiteLetrasBusqueda: limiteBusquedaPrecioNombre,
    obtenerBusqueda: obtenerCategoriasBusqueda,
  });

  const handleSelectCategoria = (c: CategoriaProp) => {
    setCategorias(undefined);
    reset({
      ...watch(),
      categoria: c.nombre,
    });
    setCategoriaSeleccionada(c.nombre);
  };

  const finalizar = () => {
    if (responsePrecio) {
      if (esEdicion) dispatch(actualizarPrecioRedux(responsePrecio as PrecioProp));
      else dispatch(agregarPrecioInicioRedux(responsePrecio as PrecioProp));
    }
    setModal(false);
  };

  const onSubmit = (data: formValuesPrecio) => {
    if (esEdicion && precioSelect) {
      editarPrecio(data, precioSelect.id);
    } else {
      crearPrecio(data);
    }
  };

  const handleSelectPrecioNombre = (c: PrecioNombreProp) => {
    setPrecios(undefined);
    reset({
      ...watch(),
      nombre: c.nombre,
    });
    setPrecioSeleccionado(c.nombre);
  };

  if (responsePrecio)
    return (
      <CartelExito
        mensaje={`El precio ---[ ${responsePrecio.nombre} - $ ${responsePrecio.importe} ]--- fue ${esEdicion ? 'editado' : 'creado'} con exito`}
        onCerrar={finalizar}
      />
    );

  return (
    <Formulario
      titulo={`${precioSelect ? `Editar precio` : 'Nuevo precio'}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => setModal(false)}
      etiquetaPrimaria="Guardar precio"
      etiquetaSecundaria="Atras"
      loading={loadingPrecio}
      errorFetch={errorFetchPrecio}
    >
      <Input<formValuesPrecio>
        name="nombre"
        control={control}
        label="Nombre"
        tipo="text"
        error={errors.nombre}
        esquema={precio}
      />
      {precios && precios.datosQuery.length > 0 && (
        <DesplegablePredictivo
          children={precios.datosQuery.map(c => (
            <PrecioNombreCard precioNombre={c} selectPrecioNombre={handleSelectPrecioNombre} />
          ))}
          finRegistros={finPrecio}
        />
      )}
      <Input<formValuesPrecio>
        name="importe"
        control={control}
        label="Importe"
        tipo="text"
        error={errors.importe}
        esquema={precio}
        formatValue={v => parseDecimal(v, 9, 2)}
        parseValue={v => parseDecimal(v, 9, 2)}
      />
      <div>
        <Input<formValuesPrecio>
          name="categoria"
          control={control}
          label="Categoría"
          tipo="text"
          error={errors.categoria}
          esquema={precio}
        />
        {categorias && categorias.datosQuery.length > 0 && (
          <DesplegablePredictivo
            children={categorias.datosQuery.map(c => (
              <CategoriaCard categoria={c} selectCategoria={handleSelectCategoria} key={c.id} />
            ))}
            finRegistros={finCategorias}
          />
        )}
      </div>
    </Formulario>
  );
};

export default PrecioCargar;
