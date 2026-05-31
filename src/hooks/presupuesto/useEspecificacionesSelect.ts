import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { appStore } from "../../redux/store";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { espDefaultInicial, normalizarEspecificaciones, sonEspecificacionesIguales, transformarEspecificacinParticularATexto } from "../../utils/especificaciones";

const useEspecificacionesSelect = (
  espDefault: Especificaciones[] = espDefaultInicial,
  cambioLibro?: string
) => {

  const esp: EspecificacionProp[] = useSelector(
    (store: appStore) => store.especificacion.items
  );

  const [especificaciones, setEspecificaciones] =
    useState<Especificaciones[]>(
      () => normalizarEspecificaciones(espDefault)
    );

  const toggleEspecificacion = (
    especificacion: Especificaciones
  ) => {

    setEspecificaciones(prev => {

      const existe = prev.includes(especificacion);

      let nuevas: Especificaciones[];

      if (existe) {
        nuevas = prev.filter(e => e !== especificacion);
      } else {
        nuevas = [...prev, especificacion];
      }

      return normalizarEspecificaciones(nuevas);
    });
  };

  const listaEspecificaciones = esp.map(e => ({
    nombre: e.nombre,
    texto: transformarEspecificacinParticularATexto(e),
  }));

  useEffect(() => {
    setEspecificaciones(prev => {
      const nuevas = normalizarEspecificaciones(espDefault);

      return sonEspecificacionesIguales(prev, nuevas)
        ? prev
        : nuevas;
    });
  }, [cambioLibro])

  return {
    listaEspecificaciones,
    especificaciones,
    setEspecificaciones,
    toggleEspecificacion,
    normalizarEspecificaciones,
  };
};

export default useEspecificacionesSelect;