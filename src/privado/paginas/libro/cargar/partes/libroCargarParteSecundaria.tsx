import { zodResolver } from '@hookform/resolvers/zod';
import Formulario from '../../../../../componente/formulario/formulario';
import {
  formValuesLibro,
  libro,
  libroFormEdit,
} from '../../../../../modelo/Entidades/libro/esqLibro.esquema';
import useLibroApi from '../../../../../servicio/libro/useLibroApi';
import CargarLibroDatosExtras, { CamposBloqueados } from '../cargarLibroDatosExtras';
import CargarLibroDatosLocal from '../cargarLibroDatosLocal';
import { useForm } from 'react-hook-form';
import { BusquedaLibroCompletoInicial, PantallaCargarLibro, useLibroContext } from '../../contexto/contexto.libro';
import useEspecificacionesSelect from '../../../../../hooks/presupuesto/useEspecificacionesSelect';
import { espDefaultInicial } from '../../../../../utils/especificaciones';
import LibroParteCard from '../../componente/card/libroParteCard';
import { LibroCompletoProp } from '../../../../../modelo/Entidades/libro/libro.interface';
import { useEffect } from 'react';

const LibroCargarParteSecundaria = () => {
  const { armado, busquedaCompleta, setBusquedaCompleta, librosCompletos, setPantalla } = useLibroContext();
  const { especificaciones, setEspecificaciones } = useEspecificacionesSelect(espDefaultInicial);

  const { crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi();
  const libroCompleto = busquedaCompleta?.libro_completo;

  // Regla del formulario: un dato que ya existe en el catalogo no se toca desde
  // aca, uno vacio se puede completar. En el alta desde cero no hay
  // `libro_completo`, asi que todos los campos quedan editables.
  const bloqueados: CamposBloqueados = {
    descripcion: !!libroCompleto?.descripcion,
    autor: !!libroCompleto?.autor,
    edicion: libroCompleto?.edicion != null && `${libroCompleto.edicion}` !== '',
    anio: !!libroCompleto?.anio,
    img: !!libroCompleto?.img,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit({ armado, libroCompleto }),
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

  const handleLibro = (_libro: LibroCompletoProp) => {
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
        libroCompleto && (
          <LibroParteCard libro={libroCompleto} handleLibro={handleLibro} />
        )
      }
    >
      <>
        <CargarLibroDatosExtras<formValuesLibro>
          control={control}
          errors={errors}
          setValue={setValue}
          bloqueados={bloqueados}
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
