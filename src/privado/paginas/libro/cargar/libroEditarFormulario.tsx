import { zodResolver } from '@hookform/resolvers/zod';
import Formulario from '../../../../componente/formulario/formulario';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import './libro_cargar.css';
import { formValuesLibro, libro, libroFormEdit } from '../../../../modelo/Entidades/libro/esqLibro.esquema';
import useLibroApi from '../../../../servicio/libro/useLibroApi';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useEspecificacionesSelect from '../../../../hooks/presupuesto/useEspecificacionesSelect';
import useFormulario from '../../../../hooks/formulario/useFormulario';
import { resetSeleccionarLibro, seleccionarLibro } from '../../../../redux/state/libro.state';
import { nombreLibroXstring } from '../../../../utils/formatoDatos';
import CargarLibroNombre from './cargarLibroNombre';
import CargarComponentes from './cargarComponentes';
import CargarLibroDatosExtras from './cargarLibroDatosExtras';
import CargarLibroDatosLocal from './cargarLibroDatosLocal';
import { useModalContext } from '../../../../contexto/contextoModal';
import Texto from '../../../../componente-estilo/texto/texto';
import { EditarLibroEstadoProp, estadoDefault } from './libro_editar';
import CargarStock from './cargarStock';

interface Prop {
  local?: boolean;
  extra?: boolean;
  stock?: boolean;
  datos?: boolean;
  libroSelect: LibroProp;
}

const LibroEditarFormulario = ({ libroSelect, local = false, extra = false, stock = false, datos = false }: Prop) => {
  const { editarLibroExtra, editarLibroPrincipal, editarLibroEmpresa, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit(libroSelect)
  });


  const { setModal } = useModalContext()


  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(libroSelect.especificacionesDefecto ?? []);

  const { resetForm } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSeleccionarLibro,
    selectElemento: seleccionarLibro,
    reset,
  })

  const onSubmit = (data: formValuesLibro) => {
    if (local) {
      editarLibroEmpresa({ data, id: libroSelect.id, especificaciones });
    }
    if (extra) {
      editarLibroExtra({ data, id: libroSelect.id })
    }
    if (datos) {
      editarLibroPrincipal({ data, id: libroSelect.id, componentes: data })
    }
  }

  const retroceder = () => {
    reset(libroFormEdit());
    setModal(false);
  }

  useEffect(() => {
    if (responseLibro) {
      reset(libroFormEdit());
      setModal(false);
    }
  }, [responseLibro]);

  if (local) return (
    <Formulario
      titulo={`Editar ${nombreLibroXstring(libroSelect)}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Editar"
      etiquetaSecundaria="Atras"
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
      claseForm={'cargar-libro'}
      textBtnConfirmar="Guardar"
      textBtnSecundario="Atras"
    >
      <>
        <CargarLibroDatosLocal<formValuesLibro> control={control} errors={errors} especificaciones={especificaciones} setEspecificaciones={setEspecificaciones} />
      </>
    </Formulario>
  );

  if (extra) return (
    <Formulario
      titulo={`Editar ${nombreLibroXstring(libroSelect)}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Editar"
      etiquetaSecundaria="Atras"
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
      claseForm={'cargar-libro'}
      textBtnConfirmar="Guardar"
      textBtnSecundario="Atras"
    >
      <>
        <CargarLibroDatosExtras<formValuesLibro> control={control} errors={errors} />
      </>
    </Formulario>
  );

  if (datos) return (
    <Formulario
      titulo={`Editar ${nombreLibroXstring(libroSelect)}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Editar"
      etiquetaSecundaria="Atras"
      loading={loadingLibro}
      errorFetch={errorFetchLibro}
      claseForm={'cargar-libro'}
      textBtnConfirmar="Guardar"
      textBtnSecundario="Atras"
    >
      <>
        <CargarLibroNombre<formValuesLibro> control={control} errors={errors} watch={watch} reset={reset} />
        <CargarComponentes<formValuesLibro> control={control} errors={errors} watch={watch} reset={reset} />

      </>
    </Formulario>
  );

  if (stock) return (
    <CargarStock libroSelect={libroSelect}/>
  )

  return (
    <Texto texto={'Todavia no esta desarrollada esta opción'} />
  )
}

export default LibroEditarFormulario
