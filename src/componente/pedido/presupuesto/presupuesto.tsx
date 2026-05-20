import { useSelector } from "react-redux";
import Boton from "../../../componente-estilo/boton/boton";
import Texto from "../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../modelo/Entidades/libro/libro.interface";
import { PrecioProp } from "../../../modelo/Entidades/precio/precio.interface";
import { transformarComponente } from "../../../utils/componente";
import { transformarEspecificacinesATexto } from "../../../utils/especificaciones";
import { calcularPrecio } from "../../../utils/precio";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";
import { appStore } from "../../../redux/store";
import { Especificaciones } from "../../../modelo/Entidades/especificacion/especificacion.enum";
import { useState } from "react";

interface Prop {
    libro: LibroProp;
    nuevasEsp?: Especificaciones[];
}

const Presupuesto = ({ libro, nuevasEsp }: Prop) => {
    const [especificaciones, setEspecificaciones] = useState<Especificaciones[]>(nuevasEsp ?? libro?.especificacionesDefecto ?? [])
    const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);

    const presupuestoTexto = `El libro ${libro.nombre} ${libro.nivel}
    ${transformarComponente(libro.componentes)},
    ${transformarEspecificacinesATexto(especificaciones, libro)},
    te sale $${calcularPrecio({ libro, precios, especificaciones })}`;

    return (
        <div className="copiado-presupuesto libro-select">
            <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
            <Texto texto={presupuestoTexto} />
            <EspecificacionesSelect setEspecificaciones={setEspecificaciones} especificaciones={especificaciones} />
            <Boton secundario texto="Copiar" onClick={() => navigator.clipboard.writeText(presupuestoTexto)}></Boton>
        </div>
    )
}

export default Presupuesto;