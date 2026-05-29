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

interface CalcularPresupuestoProp extends PresupuestoProp {
  precios: PrecioProp[]
}

const presupuestoFallido:CalcularPresupuestoRetorno = { texto: 'No hay libro para presupuestar', valor: 0 };

const calcularPresupuesto = ({ libro, nuevasEsp, precios }: CalcularPresupuestoProp): CalcularPresupuestoRetorno => {
    if(!libro) return presupuestoFallido;
    
    const esp: Especificaciones[] = nuevasEsp ?? libro?.especificacionesDefecto ?? [];

    const precio: number = calcularPrecio({ libro, precios, especificaciones: esp });

    const pres: string = `El libro ${libro.nombre} ${libro.nivel} ${transformarComponente(libro.componentes)}, ${transformarEspecificacinesATexto(esp, libro)}
        te sale *$${precio}*`;
    return { texto: pres, valor: precio };
  }


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

  useEffect(()=>{
    setPresupuestoCompleto(presupuestoTotal(libros ?? []))
  },[libros]);

  const copiarPresupuesto = () => {
    navigator.clipboard.writeText(presupuesto.texto);
  }

  const copiarPresupuestoLibros = () => {
    navigator.clipboard.writeText(presupuestoCompleto);
  }

  return { presupuesto:presupuesto.texto, copiarPresupuesto, presupuestoCompleto, copiarPresupuestoLibros, precioSolo:presupuesto.valor }
}

export default usePresupuesto;