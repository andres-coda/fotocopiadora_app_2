import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { actualizarMensajeRedux } from '../../redux/state/mensaje.state';
import useMensajeApi from '../../servicio/mensaje/useMensajeApi';
import Texto from '../../componente-estilo/texto/texto';
import MensajeFavoritoCard from './mensajeFavoritoCard';

const MensajesFavoritosLateral = () => {
  const { datosIniciales, busquedaActual } = useSelector((store: appStore) => store.mensaje);
  const { toggleFavorito, responseMensaje } = useMensajeApi();
  const dispatch = useDispatch();

  // Merge de las dos listas: la ultima version de cada id gana. Asi el cambio
  // de favorito se refleja sin recargar, este o no el mensaje en la busqueda.
  const favoritos = useMemo(() => {
    const mapa = new Map<string, MensajeProp>();
    [...datosIniciales.datosQuery, ...busquedaActual.datosQuery].forEach(mensaje => {
      if (mensaje.favorito) mapa.set(mensaje.id, mensaje);
      else mapa.delete(mensaje.id);
    });
    return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [datosIniciales.datosQuery, busquedaActual.datosQuery]);

  useEffect(() => {
    if (responseMensaje) dispatch(actualizarMensajeRedux(responseMensaje));
  }, [responseMensaje]);

  const handleToggleFavorito = (mensaje: MensajeProp) =>
    toggleFavorito(mensaje.id, !mensaje.favorito);

  return (
    <div className="mensajes-favoritos">
      <Texto texto="Mensajes favoritos" mediana negrita />
      {favoritos.length === 0 ? (
        <Texto texto="Todavía no tenés mensajes favoritos" chica sombra centrado />
      ) : (
        <div className="mensajes-favoritos__lista">
          {favoritos.map(mensaje => (
            <MensajeFavoritoCard
              key={mensaje.id}
              mensaje={mensaje}
              onToggleFavorito={handleToggleFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MensajesFavoritosLateral;
