import { useEffect, useState } from "react";
import { CalcularPresupuestoRetorno, PresupuestoProp } from "../../modelo/presupuesto/presupuesto.interface";
import { useSelector } from "react-redux";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../redux/store";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { calcularPresupuesto, presupuestoFallido } from "../../utils/precio";

const usePresupuesto = ({ libro, nuevasEsp, libros }: PresupuestoProp) => {

  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);

  const [presupuesto, setPresupuesto] = useState<CalcularPresupuestoRetorno>(presupuestoFallido)

  const presupuestoTotal = (libroLocales: LibroProp[]): string => {
    if (libroLocales.length === 0) return 'No hay libros para calcular precio';
    let presupuestoParcial: string = '';
    let total: number = 0;
    for (const lc of libroLocales) {
      const presupuestoLocal: CalcularPresupuestoRetorno = calcularPresupuesto({ libro: lc, nuevasEsp: lc.especificacionesDefecto, precios });
      presupuestoParcial = `${presupuestoParcial}\n${presupuestoLocal.texto}`;
      total += presupuestoLocal.valor;
    }
    presupuestoParcial = `${presupuestoParcial}\n *Total: $${total}*`

    return presupuestoParcial;
  }


  const [presupuestoCompleto, setPresupuestoCompleto] = useState<string>(presupuestoTotal(libros ?? []))

  useEffect(() => {
    setPresupuesto(calcularPresupuesto({ libro, precios, nuevasEsp }));
  }, [nuevasEsp, precios]);

  useEffect(() => {
    setPresupuestoCompleto(presupuestoTotal(libros ?? []))
  }, [libros]);

  const copiarPresupuesto = () => {
    navigator.clipboard.writeText(presupuesto.texto);
  }

  const copiarPresupuestoLibros = () => {
    navigator.clipboard.writeText(presupuestoCompleto);
  }

  return { presupuesto: presupuesto.texto, copiarPresupuesto, presupuestoCompleto, copiarPresupuestoLibros, precioSolo: presupuesto.valor, especificaciones: nuevasEsp }
}

export default usePresupuesto;