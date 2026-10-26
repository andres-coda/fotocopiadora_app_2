import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Formulario from '../../../../componente/formulario/formulario';
import Input from '../../../../componente/formulario/input';
import InputCheckFueraForm from '../../../../componente/formulario/inputCheckFueraForm';
import { useModalContext } from '../../../../contexto/contextoModal';
import { cambiarFiltrosPedidoLibro } from '../../../../redux/state/pedido_libro.state';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import { Especificaciones } from '../../../../modelo/Entidades/especificacion/especificacion.enum';
import {
  filtrosPedidoLibroInicial,
  PedidoLibroFiltrosProp,
} from '../../../../modelo/Entidades/pedido_libro/pedidoLibroFiltro.interface';
import { normalizarEspecificacionesFiltro } from '../../../../utils/especificaciones';
import { listaEspecificaciones, listaEstados } from './filtroItemOpciones';
import './filtroItem.css';

type CategoriaFiltro = 'estado' | 'especificaciones' | 'entrega' | 'tomado';

// Solo las dos fechas pasan por react-hook-form; los multi-check viven en useState local.
const esqFiltroItem = z.object({
  entrega: z.string().optional(),
  tomado: z.string().optional(),
});

type FormFiltroItem = z.infer<typeof esqFiltroItem>;

const categorias: { clave: CategoriaFiltro; label: string }[] = [
  { clave: 'estado', label: 'Estado' },
  { clave: 'especificaciones', label: 'Especificaciones' },
  { clave: 'entrega', label: 'Entrega' },
  { clave: 'tomado', label: 'Tomado' },
];

const FiltroItem = () => {
  const dispatch = useDispatch();
  const { setModal } = useModalContext();

  const filtrosActuales = useSelector((store: appStore) => store.pedidoLibro.filtrosPedidoLibro);
  const [categoria, setCategoria] = useState<CategoriaFiltro>(() => {
    if (filtrosActuales.estado.length > 0) return 'estado';
    if (filtrosActuales.especificaciones.length > 0) return 'especificaciones';
    if (filtrosActuales.entrega) return 'entrega';
    if (filtrosActuales.tomado) return 'tomado';
    return 'estado';
  });
  const [estados, setEstados] = useState<Estado[]>(filtrosActuales.estado);
  const [especificaciones, setEspecificaciones] = useState<Especificaciones[]>(
    filtrosActuales.especificaciones
  );

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormFiltroItem>({
    resolver: zodResolver(esqFiltroItem),
    defaultValues: { entrega: filtrosActuales.entrega, tomado: filtrosActuales.tomado },
  });

  const entrega = watch('entrega');
  const tomado = watch('tomado');

  const tieneValores = (clave: CategoriaFiltro): boolean => {
    if (clave === 'estado') return estados.length > 0;
    if (clave === 'especificaciones') return especificaciones.length > 0;
    if (clave === 'entrega') return Boolean(entrega);
    return Boolean(tomado);
  };

  const limpiarFiltros = () => {
    dispatch(
      cambiarFiltrosPedidoLibro({ ...filtrosPedidoLibroInicial, estado: [], especificaciones: [] })
    );
    setEstados([]);
    setEspecificaciones([]);
    reset({ entrega: '', tomado: '' });
    setCategoria('estado');
  };

  const onSubmit = (data: FormFiltroItem) => {
    const filtros: PedidoLibroFiltrosProp = {
      estado: estados,
      especificaciones,
      entrega: data.entrega ?? '',
      tomado: data.tomado ?? '',
    };
    dispatch(cambiarFiltrosPedidoLibro(filtros));
    setModal(false);
  };

  return (
    <Formulario
      claseForm="filtro-item__form"
      onSubmit={handleSubmit(onSubmit)}
      textBtnConfirmar="Aplicar filtros"
      textBtnSecundario="Limpiar filtros"
      onClickSecundario={limpiarFiltros}
    >
      <div className="filtro-item">
        <div className="filtro-item__categorias">
          {categorias.map(c => (
            <button
              key={c.clave}
              type="button"
              className={`filtro-item__categoria ${categoria === c.clave ? 'filtro-item__categoria-activa' : ''}`}
              onClick={() => setCategoria(c.clave)}
            >
              <span>{c.label}</span>
              {tieneValores(c.clave) && <span className="filtro-item__check">✓</span>}
            </button>
          ))}
        </div>

        <div className="filtro-item__panel">
          {categoria === 'estado' && (
            <InputCheckFueraForm<Estado>
              lista={listaEstados}
              elementosSelect={estados}
              setelementosSelect={setEstados}
              nuevoEstilo="filtro-item__lista"
            />
          )}

          {categoria === 'especificaciones' && (
            <InputCheckFueraForm<Especificaciones>
              lista={listaEspecificaciones}
              elementosSelect={especificaciones}
              setelementosSelect={setEspecificaciones}
              normalizar={normalizarEspecificacionesFiltro}
              nuevoEstilo="filtro-item__lista"
            />
          )}

          {categoria === 'entrega' && (
            <Input<FormFiltroItem>
              name="entrega"
              control={control}
              label="Fecha de entrega"
              tipo="date"
              error={errors.entrega}
              esquema={esqFiltroItem}
            />
          )}

          {categoria === 'tomado' && (
            <Input<FormFiltroItem>
              name="tomado"
              control={control}
              label="Fecha de tomado"
              tipo="date"
              error={errors.tomado}
              esquema={esqFiltroItem}
            />
          )}
        </div>
      </div>
    </Formulario>
  );
};

export default FiltroItem;
