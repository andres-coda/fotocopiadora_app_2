import { Dispatch, SetStateAction } from "react";
import Formulario from "../../../../componente/formulario/formulario";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { EditarLibroEstadoProp, estadoDefault } from "./libro_editar";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";
import { formValuesLibroStock, libroStock } from "../../../../modelo/Entidades/libro/esqStock.esquema";
import Input from "../../../../componente/formulario/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStockApi from "../../../../servicio/libro/useStockApi";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import { stockIndividualProp } from "../../../../modelo/Entidades/libro/stock.interface";
import { useModalContext } from "../../../../contexto/contextoModal";
import { actualizarStockLocal, resetSeleccionarLibro } from "../../../../redux/state/libro.state";


interface Prop {
  libroSelect: LibroProp;
}

const stockDefault = (stock: number | string | undefined) => {
  return { stock: stock?.toString() ?? '0' }
}

const CargarStock = ({ libroSelect }: Prop) => {

  const { editarStockLibro, responseStock, errorFetchStock, loadingStock } = useStockApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesLibroStock>({
    resolver: zodResolver(libroStock),
    defaultValues: stockDefault(libroSelect.stock?.stock)
  });

  
    const { setModal } = useModalContext()

  const { resetForm } = useFormulario<stockIndividualProp, formValuesLibroStock, LibroProp>({
    response: responseStock,
    resetSelect: resetSeleccionarLibro,
    selectElemento: actualizarStockLocal,
    reset,
  })

  const onSubmit = (data: formValuesLibroStock) => {
    editarStockLibro({ data, id: libroSelect.id })
  }

  const retroceder = () => {
    reset(stockDefault(libroSelect.stock?.stock));
    setModal(false);
  }

  return (
    <Formulario
      titulo={`Nuevo stock para ${nombreLibroXstring(libroSelect)}`}
      onSubmit={handleSubmit(onSubmit)}
      onClickSecundario={() => retroceder()}
      etiquetaPrimaria="Guardar stock"
      etiquetaSecundaria="Atras"
      loading={loadingStock}
      errorFetch={errorFetchStock}
      claseForm={'cargar-libro'}
      textBtnConfirmar="Guardar"
      textBtnSecundario="Atras"
    >
      <>
        <div className='form-horizontal'>
          <Input<formValuesLibroStock> name='stock' control={control} label='Cantidad de libros' tipo='text' error={errors.stock} esquema={libroStock} />
        </div>
      </>
    </Formulario>
  )
}

export default CargarStock;
