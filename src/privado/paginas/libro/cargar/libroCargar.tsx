import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import Input from "../../../../componente/formulario/input";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { parseDecimal } from "../../../../utils/formulario";
import { LibroNombreProp, LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import useLibroApi from "../../../../servicio/libro/useLibroApi";
import { formValuesLibro, libro, libroFormEdit } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { addLibros, resetSelectLibro } from "../../../../redux/state/libro.state";
import InputCheck from "../../../../componente/formulario/inputCheck";
import Predictivo from "../../../../componente-estilo/predictivo/predictivo";
import { ComponenteProp } from "../../../../modelo/Entidades/libro/componente.interface";
import useLibroNombreApi from "../../../../servicio/libro/useLibrosNombre";
import { useState } from "react";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import LibroCardNombre from "../componente/libroCardNombre";
import useComponenteApi from "../../../../servicio/componente/useComponentesApi";
import Texto from "../../../../componente-estilo/texto/texto";
import Card from "../../../../componente-estilo/card/card";
import ComponenteCard from "../componente/componenteCard";

const limiteBusquedaLibro: number = 3;

const LibroCargar = () => {
  const libroSelect: LibroProp | undefined = useSelector((store: appStore) => store.libro_empresa.datoSeleccionado);
  
  const [libroSeleccionado, setLibroSeleccionado] = useState<string | undefined>(undefined);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState<string | undefined>(undefined);
  
  const { editarLibro, crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit(libroSelect)
  });
  
  
  const { obtenerLibrosNombre, responseLibros: responseLibroNombre, loadingLibros, errorFetchLibros } = useLibroNombreApi();
  const { finListaRef: finLibros, datos: libros, setDatos: setLibros } = useBusquedaSimple<LibroNombreProp>({
    valor: libroSeleccionado != watch().nombre ? watch().nombre : '',
    response: responseLibroNombre,
    loading: loadingLibros,
    limiteLetrasBusqueda: limiteBusquedaLibro,
    obtenerBusqueda: obtenerLibrosNombre
  });

  const handleSelectLibro = (l: LibroNombreProp) => {
    setLibros(undefined);
    reset({
      ...watch(),
      nombre: l.nombre,
      editorial: l.editorial,
      materia: l.materia.nombre
    });
    setLibroSeleccionado(l.nombre);
  };

  const {obtenerComponentes, responseComponentes, loadingComponentes} = useComponenteApi()
  const { finListaRef: finComponentes, datos: componentes, setDatos: setComponentes } = useBusquedaSimple<ComponenteProp>({
    valor: componenteSeleccionado != watch().componentes ? watch().componentes ?? '' : '',
    response: responseComponentes,
    loading: loadingComponentes,
    limiteLetrasBusqueda: limiteBusquedaLibro,
    obtenerBusqueda: obtenerComponentes
  });

  const handleSelectComponente = (c: ComponenteProp) => {
    setComponentes(undefined);
    reset({
      ...watch(),
      componentes: c.nombre,
    });
    setComponenteSeleccionado(c.nombre);
  };
  
  const { retroceder } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSelectLibro,
    agregarElemento: addLibros,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesLibro) => {
    if (libroSelect?.id) {
      editarLibro(data, libroSelect.id);
    } else {
      crearLibro(data);
    }
  }
  return (
    <Centro>
      <Formulario
        titulo={`${libroSelect ? `Editar libro` : 'Nuevo libro'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar libro"
        etiquetaSecundaria="Atras"
        loading={loadingLibro}
        errorFetch={errorFetchLibro}
      >
        <>

          <Input<formValuesLibro> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={libro} />
          {libros && libros.datosQuery.length > 0 &&
            <DesplegablePredictivo
              children={libros.datosQuery.map(l => <LibroCardNombre libro={l} selectLibro={handleSelectLibro} key={l.id}/>)}
              finRegistros={finLibros}
            />
          }
          <div>
            <Input<formValuesLibro> name='componentes' control={control} label='Componentes, ej: Student, Activity, etc...' tipo='text' error={errors.componentes} esquema={libro} />
            {componentes && componentes.datosQuery.length > 0 && <DesplegablePredictivo
              children={componentes.datosQuery.map(c => <ComponenteCard componente={c} selectComponente={handleSelectComponente}/>)}
              finRegistros={finComponentes}
            />}
          </div>
          <Input<formValuesLibro> name='nivel' control={control} label='Nivel, ej: 1, 2A, etc' tipo='text' error={errors.nivel} esquema={libro} />
          <Input<formValuesLibro> name='descripcion' control={control} label='Descripción para impresión' tipo='text' error={errors.descripcion} esquema={libro} />
          <div className="form-horizontal">
            <Input<formValuesLibro> name='editorial' control={control} label='Editorial' tipo='text' error={errors.editorial} esquema={libro} />
            <Input<formValuesLibro> name='autor' control={control} label='Autor' tipo='text' error={errors.autor} esquema={libro} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesLibro> name='edicion' control={control} label='Edición, ej: 1ra, 2da...' tipo='text' error={errors.edicion} esquema={libro} />
            <Input<formValuesLibro> name='anio' control={control} label='Año, ej: 2018' tipo='text' error={errors.anio} esquema={libro} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesLibro> name='cantidadPg' control={control} label='Cantidad de páginas' tipo='text' error={errors.cantidadPg} esquema={libro} formatValue={(v) => parseDecimal(v, 4, 0)} parseValue={(v) => parseDecimal(v, 4, 0)} />
            <Input<formValuesLibro> name='adhesivos' control={control} label='Cantidad de adhesivos' tipo='text' error={errors.adhesivos} esquema={libro} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
          </div>
          <Input<formValuesLibro> name='img' control={control} label='Url de imagen' tipo='text' error={errors.img} esquema={libro} />
          <div className="form-horizontal-flexible">
            <InputCheck<formValuesLibro> name='color' control={control} label='Color' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='byn' control={control} label='Blanco y negro' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='anillado' control={control} label='Anillado' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='d_f' control={control} label='Doble faz' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='s_f' control={control} label='Simple faz' tipo='checkbox' />
            <InputCheck<formValuesLibro> name='adhesivo' control={control} label='Con adhesivo' tipo='checkbox' />
          </div>
          <Input<formValuesLibro> name='materia' control={control} label='Materia' tipo='text' error={errors.materia} esquema={libro} />
        </>
      </Formulario>
    </Centro>
  )
}

export default LibroCargar;
