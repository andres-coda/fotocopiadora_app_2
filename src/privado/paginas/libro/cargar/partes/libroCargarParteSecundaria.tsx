import { zodResolver } from '@hookform/resolvers/zod';
import Formulario from '../../../../../componente/formulario/formulario';
import {
  formValuesLibro,
  libro,
  libroFormEdit,
} from '../../../../../modelo/Entidades/libro/esqLibro.esquema';
import useLibroApi from '../../../../../servicio/libro/useLibroApi';
import CargarLibroDatosExtras from '../cargarLibroDatosExtras';
import CargarLibroDatosLocal from '../cargarLibroDatosLocal';
import { useForm } from 'react-hook-form';
import { BusquedaLibroCompletoInicial, PantallaCargarLibro, useLibroContext } from '../../contexto/contexto.libro';
import { useModalContext } from '../../../../../contexto/contextoModal';
import useEspecificacionesSelect from '../../../../../hooks/presupuesto/useEspecificacionesSelect';
import { espDefaultInicial } from '../../../../../utils/especificaciones';
import LibroParteCard from '../../componente/card/libroParteCard';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { useEffect } from 'react';

const LibroCargarParteSecundaria = () => {
  const { armado, busquedaCompleta, setBusquedaCompleta, librosCompletos, setPantalla } = useLibroContext();
  const { setModal } = useModalContext();
  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(espDefaultInicial);

  const { crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit({ armado, libroCompleto:busquedaCompleta?.libro_completo }),
  });

  useEffect(()=>{
    if(responseLibro){
      setBusquedaCompleta({
        ...BusquedaLibroCompletoInicial,
        libro_guardado: responseLibro
      });
      setPantalla(PantallaCargarLibro.GURDADO)
    }
  },[responseLibro]);

  const onSubmit = (data: formValuesLibro) => {
    crearLibro({ data, especificaciones, id_libro_completo: busquedaCompleta?.id_libro_completo });
  };

  const handleLibro = (libro: LibroCompletoProp) => {
    setBusquedaCompleta(undefined);
  };

  const handleAtras = () => {
    setBusquedaCompleta(undefined)
    reset()
    if(librosCompletos && librosCompletos.total === 0){
      setPantalla(PantallaCargarLibro.INICIO);
      return;
    }
    setPantalla(PantallaCargarLibro.INICIO);
  }

  return (
    <Formulario
      centrado
      titulo={`Nuevo libro`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() =>handleAtras()}
      etiquetaPrimaria="Avanza al siguiente paso para crear el libro"
      etiquetaSecundaria="Atras"
      claseForm={'cargar-libro'}
      textBtnConfirmar="Suiguiente"
      textBtnSecundario="Atras"
      errorFetch={errorFetchLibro}
      loading={loadingLibro}
      encabezado={
        busquedaCompleta?.libro_completo && (
          <LibroParteCard libro={busquedaCompleta?.libro_completo} handleLibro={handleLibro} />
        )
      }
    >
      <>
        <CargarLibroDatosExtras<formValuesLibro>
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <CargarLibroDatosLocal<formValuesLibro>
          control={control}
          errors={errors}
          especificaciones={especificaciones}
          setEspecificaciones={setEspecificaciones}
        />
      </>
    </Formulario>
  );
};

export default LibroCargarParteSecundaria;
