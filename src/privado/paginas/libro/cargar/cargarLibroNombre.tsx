import { Control, FieldErrors, UseFormReset, UseFormWatch, Path } from "react-hook-form";
import Input from "../../../../componente/formulario/input";
import { formValuesLibroNombre, libro } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import LibroCardNombre from "../componente/libroCardNombre";
import EditorialCard from "../componente/editorialCard";
import MateriaCard from "../componente/materiaCard";
import { useState } from "react";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import { EditorialNombreProp, LibroNombreProp } from "../../../../modelo/Entidades/libro/libro.interface";
import useLibroNombreApi from "../../../../servicio/libro/useLibrosNombre";
import useMateriasApi from "../../../../servicio/materia/useMateriasApi";
import { MateriaProp } from "../../../../modelo/Entidades/libro/materia.interface";
import useEditorialNombreApi from "../../../../servicio/libro/useEditorialNombreApi";

interface Prop<T extends formValuesLibroNombre> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroNombre>;
  watch: UseFormWatch<T>;
  reset: UseFormReset<T>;
}

interface libroSelecProp {
  nombre?: string;
  editorial?: string;
  materia?: string;
}

const libroSelectDefecto = <T extends formValuesLibroNombre>( watch: UseFormWatch<T>):libroSelecProp | undefined => {
  if(!watch()) return undefined;
  return {
    nombre: watch().nombre,
    editorial: watch().editorial,
    materia: watch().materia
  }
}


const limiteBusquedaLibro: number = 3;

const CargarLibroNombre = <T extends formValuesLibroNombre>({ control, errors, watch, reset }: Prop<T>) => {

  const nameNombre = 'nombre' as Path<T>;
  const nameMateria = 'materia' as Path<T>;
  const nameEditorial = 'editorial' as Path<T>;

  const [libroSeleccionado, setLibroSeleccionado] = useState<libroSelecProp | undefined>(libroSelectDefecto<T>(watch));

  const { obtenerLibrosNombre, responseLibros: responseLibroNombre, loadingLibros } = useLibroNombreApi();
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
      nombre: l.nombre,
      editorial: l.editorial ?? '',
      materia: l.materia.nombre ?? ''
    });
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


  return (
    <>
      <div>
        <Input<T> name={nameNombre} control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={libro} />
        {libros && libros.datosQuery.length > 0 &&
          <DesplegablePredictivo
            children={libros.datosQuery.map(l => <LibroCardNombre libro={l} selectLibro={handleSelectLibro} key={l.id} />)}
            finRegistros={finLibros}
          />
        }
      </div>
      <div>
        <Input<T> name={nameEditorial} control={control} label='Editorial' tipo='text' error={errors.editorial} esquema={libro} />
        {editoriales && editoriales.datosQuery.length > 0 && <DesplegablePredictivo
          children={editoriales.datosQuery.map(e => <EditorialCard editorial={e} selectEditorial={handleSelectEditorial} key={e.id} />)}
          finRegistros={finEditoriales}
        />}
      </div>

      <div>
        <Input<T> name={nameMateria} control={control} label='Materia' tipo='text' error={errors.materia} esquema={libro} />
        {materias && materias.datosQuery.length > 0 && <DesplegablePredictivo
          children={materias.datosQuery.map(e => <MateriaCard materia={e} selectMateria={handleSelectMateria} key={e.id} />)}
          finRegistros={finMaterias}
        />}
      </div>
    </>
  )
}

export default CargarLibroNombre
