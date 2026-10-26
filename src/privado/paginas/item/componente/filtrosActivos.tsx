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
import Boton from '../../../../componente-estilo/boton/boton';

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
        <Boton
          btnFiltro
          texto={`${textoEstado(estado)} ×`}
          onClick={() => cambiar({ estado: filtros.estado.filter(e => e !== estado) })}
          titulo={`Quitar el filtro de estado ${textoEstado(estado)}`}
          key={`estado-${estado}`}
        />
      ))}

      {filtros.especificaciones.map(esp => (
        <Boton
          btnFiltro
          texto={`${textoEspecificacion(esp)} ×`}
          onClick={() =>
            cambiar({ especificaciones: filtros.especificaciones.filter(e => e !== esp) })
          }
          titulo={`Quitar el filtro de especificación ${textoEspecificacion(esp)}`}
          key={`especificacion-${esp}`}
        />
      ))}

      {hayEntrega && (
        <Boton
          btnFiltro
          texto={`Entrega: ${fechaXtexto(filtros.entrega)} ×`}
          onClick={() => cambiar({ entrega: '' })}
          titulo={`Quitar el filtro de fecha de entrega`}
        />
      )}

      {hayTomado && (
        <Boton
          btnFiltro
          texto={`Tomado: ${fechaXtexto(filtros.tomado)} ×`}
          onClick={() => cambiar({ tomado: '' })}
          titulo={`Quitar el filtro de fecha de tomado`}
        />
      )}
    </div>
  );
};

export default FiltrosActivos;
