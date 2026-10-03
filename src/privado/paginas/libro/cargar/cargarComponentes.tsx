import { Control, FieldErrors, Path, UseFormReset, UseFormWatch } from "react-hook-form";
import Input from "../../../../componente/formulario/input"
import { formValuesLibroComponentes, libroComponentes } from "../../../../modelo/Entidades/libro/esqLibro.esquema";
import DesplegablePredictivo from "../../../../componente-estilo/predictivo/desplegablePredictivo";
import ComponenteCard from "../componente/componenteCard";
import NivelCard from "../componente/nivelCard";
import { useState } from "react";
import useComponenteApi from "../../../../servicio/componente/useComponentesApi";
import useBusquedaSimple from "../../../../hooks/buscador/useBuscadorSimple";
import { ComponenteProp } from "../../../../modelo/Entidades/libro/componente.interface";
import useNivelApi from "../../../../servicio/nivel/useNivel";
import { NivelProp } from "../../../../modelo/Entidades/libro/nivel.interface";

interface Prop<T extends formValuesLibroComponentes> {
  control: Control<T>;
  errors: FieldErrors<formValuesLibroComponentes>;
    watch: UseFormWatch<T>;
    reset: UseFormReset<T>;
}

const CargarComponentes = <T extends formValuesLibroComponentes>({ control, errors, watch, reset }: Prop<T>) => {
  const nameNivel = 'nivel' as Path<T>;
  const nameComponentes = 'componentes' as Path<T>;

  const [componenteSeleccionado, setComponenteSeleccionado] = useState<string | undefined>(undefined);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<string | undefined>(undefined);

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
  return (
    <>
      <div>
        <Input<T> name={nameComponentes} control={control} label='Componentes, ej: Student, Activity, etc...' tipo='text' error={errors.componentes} esquema={libroComponentes} />
        {componentes && componentes.datosQuery.length > 0 && <DesplegablePredictivo
          children={componentes.datosQuery.map(c => <ComponenteCard componente={c} selectComponente={handleSelectComponente} />)}
          finRegistros={finComponentes}
        />}
      </div>
      <div>
        <Input<T> name={nameNivel} control={control} label='Nivel, ej: 1, 2A, etc' tipo='text' error={errors.nivel} esquema={libroComponentes} />
        {niveles && niveles.datosQuery.length > 0 && <DesplegablePredictivo
          children={niveles.datosQuery.map(n => <NivelCard nivel={n} selectNivel={handleSelectNivel} />)}
          finRegistros={finNiveles}
        />}
      </div>
    </>
  )
}

export default CargarComponentes