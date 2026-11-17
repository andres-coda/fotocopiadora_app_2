import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { CategoriaProp, PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import Texto from '../../componente-estilo/texto/texto';
import CategoriaLateral from '../../privado/paginas/precio/componente/categoriaLateral';
import './preciosCategoria.css';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';

const PreciosCategoria = () => {
  // Las categorias llegan sin precios: el lateral solo necesita id + nombre y
  // `bloqueado` para decidir que mostrar. Los precios viven aparte, en la carga
  // inicial, que trae unicamente los de categorias bloqueadas.
  const categorias: CategoriaProp[] = useSelector((store: appStore) => store.categoria.datos);
  const precios: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );

  // El resto de las categorias (las que la empresa usa pero no estan bloqueadas)
  // se filtra desde el modal de la pagina de precios.
  const bloqueadas = useMemo(
    () =>
      (categorias ?? [])
        .filter(categoria => categoria.bloqueado === true)
        .sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [categorias]
  );

  if (bloqueadas.length === 0) return null;

  return (
    <ContenedorCentro scroll>
      <Texto texto='Precios' mediana negrita />
      {bloqueadas.map(categoria => (
        <CategoriaLateral
          key={categoria.id}
          categoria={categoria}
          precios={precios ?? []}
        />
      ))}

    </ContenedorCentro>
  );
};

export default PreciosCategoria;

/*


    <div className="precios-categoria">
      <Texto texto="Precios" mediana negrita />
      <div className="precios-categoria__lista">
      </div>
    </div>

    */