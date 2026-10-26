import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import { cambiarFiltrosPedidoLibro } from '../../../../redux/state/pedido_libro.state';
import { PedidoLibroFiltrosProp } from '../../../../modelo/Entidades/pedido_libro/pedidoLibroFiltro.interface';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import { Especificaciones } from '../../../../modelo/Entidades/especificacion/especificacion.enum';
import { especificacionEnumXString } from '../../../../utils/especificaciones';
import { estadoXstring } from '../../../../utils/formatoDatos';
import { listaEspecificaciones, listaEstados } from './filtroItemOpciones';
import './filtrosActivos.css';

interface ChipProp {
  texto: string;
  titulo: string;
  onQuitar: () => void;
}

const Chip = ({ texto, titulo, onQuitar }: ChipProp) => (
  <button type="button" className="filtro-chip" title={titulo} onClick={onQuitar}>
    <span className="filtro-chip__texto">{texto}</span>
    <span className="filtro-chip__quitar" aria-hidden="true">
      ×
    </span>
  </button>
);

const fechaXtexto = (valor: string): string => {
  const [anio, mes, dia] = valor.split('-');
  if (!anio || !mes || !dia) return valor;
  return `${dia}/${mes}/${anio}`;
};

const FiltrosActivos = () => {
  const dispatch = useDispatch();
  const filtros = useSelector((store: appStore) => store.pedidoLibro.filtrosPedidoLibro);

  const cambiar = (parcial: Partial<PedidoLibroFiltrosProp>) =>
    dispatch(cambiarFiltrosPedidoLibro({ ...filtros, ...parcial }));

  const textoEstado = (estado: Estado): string =>
    listaEstados.find(l => l.nombre === estado)?.texto ?? estadoXstring(estado);

  const textoEspecificacion = (esp: Especificaciones): string =>
    listaEspecificaciones.find(l => l.nombre === esp)?.texto ?? especificacionEnumXString(esp);

  const hayEstado = filtros.estado.length > 0;
  const hayEspecificacion = filtros.especificaciones.length > 0;
  const hayEntrega = Boolean(filtros.entrega);
  const hayTomado = Boolean(filtros.tomado);

  if (!hayEstado && !hayEspecificacion && !hayEntrega && !hayTomado) return null;

  return (
    <div className="filtros-activos">
      {filtros.estado.map(estado => (
        <Chip
          key={`estado-${estado}`}
          texto={`Estado: ${textoEstado(estado)}`}
          titulo={`Quitar el filtro de estado ${textoEstado(estado)}`}
          onQuitar={() => cambiar({ estado: filtros.estado.filter(e => e !== estado) })}
        />
      ))}

      {filtros.especificaciones.map(esp => (
        <Chip
          key={`especificacion-${esp}`}
          texto={textoEspecificacion(esp)}
          titulo={`Quitar el filtro de especificación ${textoEspecificacion(esp)}`}
          onQuitar={() =>
            cambiar({
              especificaciones: filtros.especificaciones.filter(e => e !== esp),
            })
          }
        />
      ))}

      {hayEntrega && (
        <Chip
          texto={`Entrega: ${fechaXtexto(filtros.entrega)}`}
          titulo="Quitar el filtro de fecha de entrega"
          onQuitar={() => cambiar({ entrega: '' })}
        />
      )}

      {hayTomado && (
        <Chip
          texto={`Tomado: ${fechaXtexto(filtros.tomado)}`}
          titulo="Quitar el filtro de fecha de tomado"
          onQuitar={() => cambiar({ tomado: '' })}
        />
      )}
    </div>
  );
};

export default FiltrosActivos;
