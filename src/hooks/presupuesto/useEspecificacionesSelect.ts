import { useSelector } from "react-redux";
import { useState } from "react";

import { appStore } from "../../redux/store";

import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";

import { transformarEspecificacinParticularATexto } from "../../utils/especificaciones";

interface GruposExlusivosProp {
  opciones: Especificaciones[];
  defecto?: Especificaciones;
  obligatorio: boolean,
}
const espDefaultInicial: Especificaciones[] = [
  Especificaciones.BLANCO_Y_NEGRO,
  Especificaciones.ABROCHADO,
  Especificaciones.DOBLE_FAZ,
];

const gruposExclusivos:GruposExlusivosProp[] = [
  {
    opciones: [
      Especificaciones.SIMPLE_FAZ,
      Especificaciones.DOBLE_FAZ,
    ],
    defecto: Especificaciones.DOBLE_FAZ,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.ANILLADO,
      Especificaciones.SUELTO,
      Especificaciones.ABROCHADO,
    ],
    defecto: Especificaciones.ABROCHADO,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.COLOR,
      Especificaciones.BLANCO_Y_NEGRO,
    ],
    defecto: Especificaciones.BLANCO_Y_NEGRO,
    obligatorio: true,
  },

  {
    opciones: [
      Especificaciones.ADHESIVO,
      Especificaciones.TROKELADO,
    ],
    obligatorio: false,
  },
] as const;

const normalizarEspecificaciones = (
  especificaciones: Especificaciones[]
): Especificaciones[] => {

  let resultado = [...new Set(especificaciones)];

  for (const grupo of gruposExclusivos) {

    const seleccionadas = resultado.filter(e =>
      grupo.opciones.includes(e)
    );

    // ninguna
    if (seleccionadas.length === 0) {

      if (grupo.obligatorio && grupo.defecto) {
        resultado.push(grupo.defecto);
      }

      continue;
    }

    // más de una
    if (seleccionadas.length > 1) {

      const ultima =
        seleccionadas[seleccionadas.length - 1];

      resultado = resultado.filter(
        e => !grupo.opciones.includes(e)
      );

      resultado.push(ultima);
    }
  }

  return resultado;
};

const useEspecificacionesSelect = (
  espDefault: Especificaciones[] = espDefaultInicial
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

  return {
    listaEspecificaciones,
    especificaciones,
    setEspecificaciones,
    toggleEspecificacion,
    normalizarEspecificaciones,
  };
};

export default useEspecificacionesSelect;