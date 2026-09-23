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
import { LibroNombreProp, LibroProp, EditorialNombreProp } from "../../../../modelo/Entidades/libro/libro.interface";
import useLibroApi from "../../../../servicio/libro/useLibroApi";
import { formValuesLibro, libro, libroFormEdit } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import { crearLibros, resetSeleccionarLibro, seleccionarLibro } from "../../../../redux/state/libro.state";
import { UltimaBusquedaProp } from "../../../../redux/modelo/reduxContext.interface";
import InputCheck from "../../../../componente/formulario/inputCheck";
import { ComponenteProp } from "../../../../modelo/Entidades/libro/componente.interface";
import useLibroNombreApi from "../../../../servicio/libro/useLibrosNombre";
import useEditorialNombreApi from "../../../../servicio/libro/useEditorialNombreApi";
import { useState } from "react";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import LibroCardNombre from "../componente/libroCardNombre";
import useComponenteApi from "../../../../servicio/componente/useComponentesApi";
import ComponenteCard from "../componente/componenteCard";
import useNivelApi from "../../../../servicio/nivel/useNivel";
import { NivelProp } from "../../../../modelo/Entidades/libro/nivel.interface";
import NivelCard from "../componente/nivelCard";
import EditorialCard from "../componente/editorialCard";
import useMateriasApi from "../../../../servicio/materia/useMateriasApi";
import { MateriaProp } from "../../../../modelo/Entidades/libro/materia.interface";
import MateriaCard from "../componente/materiaCard";

const limiteBusquedaLibro: number = 3;

interface libroSelecProp {
  nombre?: string;
  editorial?: string;
  materia?:string;
}

const LibroCargar = () => {
  const libroSelect: LibroProp | undefined = useSelector((store: appStore) => store.libro.datoSeleccionado);

  const [libroSeleccionado, setLibroSeleccionado] = useState<libroSelecProp | undefined>(undefined);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState<string | undefined>(undefined);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<string | undefined>(undefined);

  const { editarLibro, crearLibro, responseLibro, errorFetchLibro, loadingLibro } = useLibroApi()
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<formValuesLibro>({
    resolver: zodResolver(libro),
    defaultValues: libroFormEdit(libroSelect)
  });


  const { obtenerLibrosNombre, responseLibros: responseLibroNombre, loadingLibros, errorFetchLibros } = useLibroNombreApi();
  const { finListaRef: finLibros, datos: libros, setDatos: setLibros } = useBusquedaSimple<LibroNombreProp>({
    valor: libroSeleccionado?.nombre != watch().nombre ? watch().nombre : '',
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
    setLibroSeleccionado({
      nombre:l.nombre,
      editorial: l.editorial ?? '',
      materia: l.materia.nombre ?? ''
    });
  };

  const { obtenerComponentes, responseComponentes, loadingComponentes } = useComponenteApi();

  const componentesValor = watch().componentes ?? '';

  const partes = componentesValor.split(',');

  const componenteBusqueda =
    partes[partes.length - 1]?.trim() ?? '';

  const { finListaRef: finComponentes, datos: componentes, setDatos: setComponentes } = useBusquedaSimple<ComponenteProp>({
    valor: componenteSeleccionado !== componentesValor ? componenteBusqueda : '',
    response: responseComponentes,
    loading: loadingComponentes,
    obtenerBusqueda: obtenerComponentes
  });

  const handleSelectComponente = (c: ComponenteProp) => {
    setComponentes(undefined);

    const actual = watch().componentes ?? '';

    const partes = actual
      .split(',')
      .map(x => x.trim());

    if (partes.length === 1) {
      partes[0] = c.nombre;
    } else {
      partes[partes.length - 1] = c.nombre;
    }

    reset({
      ...watch(),
      componentes: partes.join(', ')
    });

    setComponenteSeleccionado(partes.join(', '));
  };

  const { obtenerNivels, responseNivels, loadingNivels } = useNivelApi()
  const { finListaRef: finNiveles, datos: niveles, setDatos: setNiveles } = useBusquedaSimple<NivelProp>({
    valor: nivelSeleccionado != watch().nivel ? watch().nivel ?? '' : '',
    response: responseNivels,
    loading: loadingNivels,
    obtenerBusqueda: obtenerNivels
  });

  const handleSelectNivel = (n: NivelProp) => {
    setNiveles(undefined);
    reset({
      ...watch(),
      nivel: n.nombre,
    });
    setNivelSeleccionado(n.nombre);
  };

  const { obtenerEditorialesNombre, responseEditoriales, loadingEditoriales } = useEditorialNombreApi();
  const { finListaRef: finEditoriales, datos: editoriales, setDatos: setEditoriales } = useBusquedaSimple<EditorialNombreProp>({
    valor: libroSeleccionado?.editorial != watch().editorial ? watch().editorial ?? '' : '',
    response: responseEditoriales,
    loading: loadingEditoriales,
    limiteLetrasBusqueda: limiteBusquedaLibro,
    obtenerBusqueda: obtenerEditorialesNombre
  });

  const handleSelectEditorial = (e: EditorialNombreProp) => {
    setEditoriales(undefined);
    reset({
      ...watch(),
      editorial: e.nombre,
    });
    setLibroSeleccionado(prev => ({
      ...prev, 
      editorial: e.nombre
    }));
  };

  const { obtenerMateriaBusqueda, responseMaterias, loadingMaterias } = useMateriasApi();
  const { finListaRef: finMaterias, datos: materias, setDatos: setMaterias } = useBusquedaSimple<MateriaProp>({
    valor: libroSeleccionado?.materia != watch().materia ? watch().materia ?? '' : '',
    response: responseMaterias,
    loading: loadingMaterias,
    limiteLetrasBusqueda: limiteBusquedaLibro,
    obtenerBusqueda: obtenerMateriaBusqueda
  });

  const handleSelectMateria = (m: MateriaProp) => {
    setMaterias(undefined);
    reset({
      ...watch(),
      materia: m.nombre,
    });
    setLibroSeleccionado(prev => ({
      ...prev, 
      materia: m.nombre
    }));
  };

  const crearLibroSimple = (libro: LibroProp) => {
    const payload: UltimaBusquedaProp<LibroProp> = {
      query: undefined,
      datosQuery: [libro],
      sortBy: 'nombre' as keyof LibroProp,
      sortOrder: 'asc',
      pagina: 1,
      limite: 20,
      total: 1
    };
    return crearLibros(payload as any);
  };

  const { retroceder } = useFormulario<LibroProp, formValuesLibro, LibroProp>({
    response: responseLibro,
    resetSelect: resetSeleccionarLibro,
    selectElemento: seleccionarLibro,
    agregarElemento: crearLibroSimple,
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
        errorFetch={errorFetchLibro ?? errorFetchLibros}
      >
        <>

          <Input<formValuesLibro> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={libro} />
          {libros && libros.datosQuery.length > 0 &&
            <DesplegablePredictivo
              children={libros.datosQuery.map(l => <LibroCardNombre libro={l} selectLibro={handleSelectLibro} key={l.id} />)}
              finRegistros={finLibros}
            />
          }
          <div>
            <Input<formValuesLibro> name='componentes' control={control} label='Componentes, ej: Student, Activity, etc...' tipo='text' error={errors.componentes} esquema={libro} />
            {componentes && componentes.datosQuery.length > 0 && <DesplegablePredictivo
              children={componentes.datosQuery.map(c => <ComponenteCard componente={c} selectComponente={handleSelectComponente} />)}
              finRegistros={finComponentes}
            />}
          </div>
          <Input<formValuesLibro> name='nivel' control={control} label='Nivel, ej: 1, 2A, etc' tipo='text' error={errors.nivel} esquema={libro} />
          {niveles && niveles.datosQuery.length > 0 && <DesplegablePredictivo
            children={niveles.datosQuery.map(n => <NivelCard nivel={n} selectNivel={handleSelectNivel} />)}
            finRegistros={finNiveles}
          />}
          <Input<formValuesLibro> name='descripcion' control={control} label='Descripción para impresión' tipo='text' error={errors.descripcion} esquema={libro} />
          <div className="form-horizontal">
            <div>
            <Input<formValuesLibro> name='editorial' control={control} label='Editorial' tipo='text' error={errors.editorial} esquema={libro} />
            {editoriales && editoriales.datosQuery.length > 0 && <DesplegablePredictivo
              children={editoriales.datosQuery.map(e => <EditorialCard editorial={e} selectEditorial={handleSelectEditorial} key={e.id} />)}
              finRegistros={finEditoriales}
            />}
          </div>
            <Input<formValuesLibro> name='autor' control={control} label='Autor' tipo='text' error={errors.autor} esquema={libro} />
          </div>
          <div className="form-horizontal">
            <Input<formValuesLibro> name='edicion' control={control} label='Edición, ej: 1, 2...' tipo='text' error={errors.edicion} esquema={libro} formatValue={(v) => parseDecimal(v, 2, 0)} parseValue={(v) => parseDecimal(v, 2, 0)} />
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
            <InputCheck<formValuesLibro> name='trokelado' control={control} label='Trokelado' tipo='checkbox' />
          </div>
          <Input<formValuesLibro> name='materia' control={control} label='Materia' tipo='text' error={errors.materia} esquema={libro} />
            {materias && materias.datosQuery.length > 0 && <DesplegablePredictivo
              children={materias.datosQuery.map(e => <MateriaCard materia={e} selectMateria={handleSelectMateria} key={e.id} />)}
              finRegistros={finMaterias}
            />}
        </>
      </Formulario>
    </Centro>
  )
}

export default LibroCargar;