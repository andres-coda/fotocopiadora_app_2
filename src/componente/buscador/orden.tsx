import Desplegable from "../formulario/desplegable"
import Formulario from "../formulario/formulario"
import InputCheck from "../formulario/inputCheck"
import { formValuesOrden, ordenForm } from '../../modelo/orden/esqOrden.esquema';
import useOrden from "../../hooks/buscador/useOrden";
import { HasId } from "../../modelo/general/hasId.interface";
import { useOrdenProp } from "../../hooks/buscador/useBuscadorProp.interface";
import { Opcion } from "../formulario/modelo/input.interface";

interface componenteOrdenProp<T extends HasId> extends useOrdenProp<T>{
  opciones: Opcion[];
  entidad:string;
}

const Orden = <T extends HasId>({ sortBy, sortOrder, setOrden, opciones, entidad }:componenteOrdenProp<T>) => {
  const { control, handleSubmit, onSubmit, errors} = useOrden<T>({ sortBy, sortOrder, setOrden })
  return (
    <Formulario
          textBtnConfirmar='Confirmar orden'
          titulo={`Ordenar ${entidad} por`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='div-horizontal'>
            <Desplegable<formValuesOrden> name='orden' control={control} label={'Ordenar por '} error={errors.orden} esquema={ordenForm} opciones={opciones} />
            <InputCheck<formValuesOrden> name='ascendente' control={control} label='Ascendente?' />
          </div>

        </Formulario>
  )
}

export default Orden
