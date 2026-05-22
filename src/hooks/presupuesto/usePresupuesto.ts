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

const usePresupuesto = ({ libro, nuevasEsp, libros }: PresupuestoProp) => {

  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  
  const calcularPresupuesto = ({libro:libroLocal, nuevasEsp:espLocales}:PresupuestoProp): string => {
    const libLocal: LibroProp | undefined= libro ?? libroLocal ?? undefined;
    const esp:Especificaciones[] = espLocales ?? nuevasEsp ?? libro?.especificacionesDefecto ?? [];
    if(!libLocal) return 'No hay libro para presupuestar'
    
    const pres:string = `El libro ${libLocal.nombre} ${libLocal.nivel}
        ${transformarComponente(libLocal.componentes)},
        ${transformarEspecificacinesATexto(esp, libLocal)},
        te sale """$${calcularPrecio({ libro:libLocal, precios, especificaciones:esp })}"""`;
    return pres;
  }

  const [presupuesto, setPresupuesto] = useState<string>(calcularPresupuesto({libro}))

  const presupuestoTotal = (libroLocales:LibroProp[]):string => {
    if(libroLocales.length === 0) return 'No hay libros para calcular precio';
    let presupuestoParcial:string = '';
    let total:number = 0;
    for (const lc of libroLocales){
      presupuestoParcial+= `${calcularPresupuesto({libro:lc, nuevasEsp:lc.especificacionesDefecto})}/n`;
      total += calcularPrecio({ libro:lc, precios, especificaciones:lc.especificacionesDefecto });
    }
    presupuestoParcial+= `Total: $${total}`

    return presupuestoParcial;
  }  

  
  const [presupuestoCompleto, setPresupuestoCompleto] = useState<string>(presupuestoTotal(libros??[]))

  useEffect(()=>{
    setPresupuesto(calcularPresupuesto({libro}))
  },[nuevasEsp])

  const copiarPresupuesto = () => {
    navigator.clipboard.writeText(presupuesto);
  }

  const copiarPresupuestoLibros = () => {
    navigator.clipboard.writeText(presupuestoCompleto);
   }

  return { presupuesto, copiarPresupuesto, presupuestoCompleto, copiarPresupuestoLibros }
}

export default usePresupuesto;