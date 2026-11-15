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
  const {armado, setLibrosCompleto, setBusquedaCompleta} = useLibroContext();
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
    defaultValues: libroMedioFormEdit({armado}),
  });

  useEffect(()=>{
    if(responseLibros){
      setLibrosCompleto(responseLibros);
    }
  },[responseLibros])

  const onSubmit=()=>{
    console.log('libro nombre: ', armado.libroNombre);
    console.log('libro principal: ', armado.libroPrincipal)
    console.log('libro secundario: ', armado.libroSecundario);
    
    console.log('libro nivel: ', armado.libroPrincipal?.nivel ??  watch().nivel)
    console.log('libro id: ', armado.libroNombre?.id_libro);
    console.log('libro nombre: ', armado.libroNombre);
    console.log('libro nombre form: ', watch().nombre);
    console.log('libro nombre form: ', watch().nombre);


    if(!armado.libroNombre?.id_libro || armado.libroNombre.nombre != watch().nombre) {
      console.log('falta desarrollar para libro nuevo')
      return
    }
    if(!armado.libroNombre.nombre || !armado.libroNombre.id_libro) return

    // Los criterios se resuelven una sola vez, aca, y quedan guardados para que
    // las paginas siguientes consulten exactamente el mismo conjunto: en el flujo
    // de alta `armado.libroPrincipal` esta vacio y los datos reales estan en el
    // formulario, asi que la pagina 2 perdia los filtros de la pagina 1.
    const criterios = {
      id: armado.libroNombre.id_libro,
      nivel: armado.libroPrincipal?.nivel ?? watch().nivel,
      componentes: armado.libroPrincipal?.componentes_texto ?? watch().componentes,
    };

    setBusquedaCompleta(criterios);
    obtenerLibrosCompleto({
      ...criterios,
      nombre: armado.libroNombre.nombre,
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
