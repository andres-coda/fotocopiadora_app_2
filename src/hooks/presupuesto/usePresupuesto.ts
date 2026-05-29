import { useEffect, useState } from "react";
import { PresupuestoProp } from "../../modelo/presupuesto/presupuesto.interface";
import { useSelector } from "react-redux";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { appStore } from "../../redux/store";
import { calcularPrecio } from "../../utils/precio";
import { transformarEspecificacinesATexto } from "../../utils/especificaciones";
import { transformarComponente } from "../../utils/componente";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";

interface CalcularPresupuestoRetorno {
  texto: string;
  valor: number;
}

const usePresupuesto = ({ libro, nuevasEsp, libros }: PresupuestoProp) => {

  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);

  const calcularPresupuesto = ({ libro: libroLocal, nuevasEsp: espLocales }: PresupuestoProp): CalcularPresupuestoRetorno => {
    const libLocal: LibroProp | undefined = libro ?? libroLocal ?? undefined;
    const esp: Especificaciones[] = espLocales ?? nuevasEsp ?? libro?.especificacionesDefecto ?? [];
    if (!libLocal) return { texto: 'No hay libro para presupuestar', valor: 0 }

    const precio: number = calcularPrecio({ libro: libLocal, precios, especificaciones: esp });

    const pres: string = `El libro ${libLocal.nombre} ${libLocal.nivel} ${transformarComponente(libLocal.componentes)}, ${transformarEspecificacinesATexto(esp, libLocal)}
        te sale """$${precio}"""`;
    return { texto: pres, valor: precio };
  }

  const [presupuesto, setPresupuesto] = useState<CalcularPresupuestoRetorno>(calcularPresupuesto({ libro }))

  const presupuestoTotal = (libroLocales: LibroProp[]): string => {
    if (libroLocales.length === 0) return 'No hay libros para calcular precio';
    let presupuestoParcial: string = '';
    let total: number = 0;
    for (const lc of libroLocales) {
      presupuestoParcial += `${calcularPresupuesto({ libro: lc, nuevasEsp: lc.especificacionesDefecto })}\n`;
      total += calcularPrecio({ libro: lc, precios, especificaciones: lc.especificacionesDefecto });
    }
    presupuestoParcial += `Total: $${total}`

    return presupuestoParcial;
  }


  const [presupuestoCompleto, setPresupuestoCompleto] = useState<string>(presupuestoTotal(libros ?? []))

  useEffect(() => {
      setPresupuesto(calcularPresupuesto({ libro }));
  }, [nuevasEsp]);

  useEffect(()=>{
    setPresupuestoCompleto(presupuestoTotal(libros ?? []))
  },[]);

  const copiarPresupuesto = () => {
    navigator.clipboard.writeText(presupuesto.texto);
  }

  const copiarPresupuestoLibros = () => {
    navigator.clipboard.writeText(presupuestoCompleto);
  }

  return { presupuesto:presupuesto.texto, copiarPresupuesto, presupuestoCompleto, copiarPresupuestoLibros, precioSolo:presupuesto.valor }
}

export default usePresupuesto;