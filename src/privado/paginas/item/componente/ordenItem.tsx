import { useDispatch } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Formulario from '../../../../componente/formulario/formulario';
import Desplegable from '../../../../componente/formulario/desplegable';
import Boton from '../../../../componente-estilo/boton/boton';
import Deleted from '../../../../assets/deleted.svg?react';
import { useModalContext } from '../../../../contexto/contextoModal';
import { cambiarOrdenPedidoLibroArreglo } from '../../../../redux/state/pedido_libro.state';
import { ordenPedidoLibroInicial } from '../../../../modelo/Entidades/pedido_libro/pedidoLibroFiltro.interface';
import { Opcion } from '../../../../componente/formulario/modelo/input.interface';
import './ordenItem.css';

const esqOrdenItem = z.object({
  criterios: z
    .array(
      z.object({
        campo: z.enum(['fechaEntrega', 'fechaCreacion', 'libro', 'cliente']),
        direccion: z.enum(['asc', 'desc']),
      })
    )
    .min(1),
});

type FormOrdenItem = z.infer<typeof esqOrdenItem>;

const opcionesCampo: Opcion[] = [
  { value: 'fechaEntrega', label: 'Fecha de entrega' },
  { value: 'fechaCreacion', label: 'Fecha de creación' },
  { value: 'libro', label: 'Libro' },
  { value: 'cliente', label: 'Cliente' },
];

const opcionesDireccion: Opcion[] = [
  { value: 'asc', label: 'Ascendente' },
  { value: 'desc', label: 'Descendente' },
];

const OrdenItem = () => {
  const dispatch = useDispatch();
  const { setModal } = useModalContext();

  const { control, handleSubmit } = useForm<FormOrdenItem>({
    resolver: zodResolver(esqOrdenItem),
    defaultValues: { criterios: ordenPedidoLibroInicial.map(c => ({ ...c })) },
  });

  const { fields, append, remove } = useFieldArray<FormOrdenItem>({
    control,
    name: 'criterios',
  });

  const quitarCriterio = (index: number) => {
    // No se puede quedar sin criterios.
    if (fields.length <= 1) return;
    remove(index);
  };

  const onSubmit = (data: FormOrdenItem) => {
    dispatch(cambiarOrdenPedidoLibroArreglo(data.criterios));
    setModal(false);
  };

  return (
    <Formulario
      claseForm="orden-item__form"
      onSubmit={handleSubmit(onSubmit)}
      textBtnConfirmar="Aplicar orden"
    >
      <div className="orden-item">
        {fields.map((fila, index) => (
          <div className="orden-item__fila" key={fila.id}>
            <span className="orden-item__prioridad">{index + 1}°</span>

            <Desplegable<FormOrdenItem>
              name={`criterios.${index}.campo`}
              control={control}
              label="Ordenar por"
              opciones={opcionesCampo}
              esquema={esqOrdenItem}
            />

            <Desplegable<FormOrdenItem>
              name={`criterios.${index}.direccion`}
              control={control}
              label="Dirección"
              opciones={opcionesDireccion}
              esquema={esqOrdenItem}
            />

            <Boton
              icono={<Deleted />}
              terciario
              nuevoEstilo={`btn-icono-chico ${fields.length <= 1 ? 'orden-item__quitar-deshabilitado' : ''}`}
              onClick={() => quitarCriterio(index)}
              titulo="Quitar criterio"
            />
          </div>
        ))}

        <div className="orden-item__agregar">
          <Boton
            texto="+ Agregar criterio"
            secundario
            onClick={() => append({ campo: 'fechaEntrega', direccion: 'asc' })}
          />
        </div>
      </div>
    </Formulario>
  );
};

export default OrdenItem;
