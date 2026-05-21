import { useState } from "react";
import { PresupuestoProp } from "../../modelo/presupuesto/presupuesto.interface";
import { useSelector } from "react-redux";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { appStore } from "../../redux/store";
import { calcularPrecio } from "../../utils/precio";
import { transformarEspecificacinesATexto } from "../../utils/especificaciones";
import { transformarComponente } from "../../utils/componente";

const usePresupuesto = ({ libro, nuevasEsp }: PresupuestoProp) => {
  const [especificaciones, setEspecificaciones] = useState<Especificaciones[]>(nuevasEsp ?? libro?.especificacionesDefecto ?? [])
  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);

  const presupuesto = `El libro ${libro.nombre} ${libro.nivel}
        ${transformarComponente(libro.componentes)},
        ${transformarEspecificacinesATexto(especificaciones, libro)},
        te sale $${calcularPrecio({ libro, precios, especificaciones })}`;

  const copiarPresupuesto = () => {
    navigator.clipboard.writeText(presupuesto);
  }

  return { presupuesto, setEspecificaciones, especificaciones, copiarPresupuesto }
}

export default usePresupuesto;