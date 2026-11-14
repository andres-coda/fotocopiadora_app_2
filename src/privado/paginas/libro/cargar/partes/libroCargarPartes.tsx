import { useEffect, useState } from 'react';
import Formulario from '../../../../../componente/formulario/formulario';
import { formValuesLibroMedio, libroMedio, libroMedioFormEdit } from '../../../../../modelo/Entidades/libro/esqLibro.esquema';
import CargarLibroNombre from '../cargarLibroNombre';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalContext } from '../../../../../contexto/contextoModal';
import CargarComponentes from '../cargarComponentes';
import { useLibroContext } from '../../contexto/contexto.libro';
import useLibroCompletoApi from '../../../../../servicio/libro/useLibroCompletoApi';

const LibroCargarPartes = () => {
  const {armado, setLibrosCompleto} = useLibroContext();
  const {setModal} = useModalContext();

  const {obtenerLibrosCompleto, responseLibros, errorFetchLibros, loadingLibros}=useLibroCompletoApi()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<formValuesLibroMedio>({
    resolver: zodResolver(libroMedio),
    defaultValues: libroMedioFormEdit(),
  });

  useEffect(()=>{
    if(responseLibros){
      setLibrosCompleto(responseLibros);
    }
  },[responseLibros])

  const onSubmit=()=>{
    if(!armado.libroNombre?.id_libro || armado.libroNombre != watch().nombre) {
      console.log('falta desarrollar para libro nuevo')
      return
    }
    if(!armado.libroNombre.nombre || !armado.libroNombre.id_libro) return
    obtenerLibrosCompleto({
      id: armado.libroNombre.id_libro,
      nombre: armado.libroNombre.nombre,
      componentes: armado.libroPrincipal?.componentes_texto,
      nivel: armado.libroPrincipal?.nivel,
    });
  }

  return (
    <Formulario
      titulo={`Nuevo libro`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => {reset(), setModal(false)}}
      etiquetaPrimaria="Avanza al siguiente paso para crear el libro"
      etiquetaSecundaria="Atras"
      claseForm={'cargar-libro'}
      textBtnConfirmar="Suiguiente"
      textBtnSecundario="Atras"
      errorFetch={errorFetchLibros}
      loading = {loadingLibros}
    >
      <>
        <CargarLibroNombre<formValuesLibroMedio>
          control={control}
          errors={errors}
          watch={watch}
          reset={reset}
        />
        <CargarComponentes<formValuesLibroMedio>
          control={control}
          errors={errors}
          watch={watch}
          reset={reset}
        />
      </>
    </Formulario>
  );
};

export default LibroCargarPartes;
