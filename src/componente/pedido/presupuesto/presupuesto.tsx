import Boton from "../../../componente-estilo/boton/boton";
import Texto from "../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../modelo/Entidades/libro/libro.interface";
import EspecificacionesSelect from "../../especificaciones/especificacionesSelect";
import { Especificaciones } from "../../../modelo/Entidades/especificacion/especificacion.enum";
import usePresupuesto from "../../../hooks/presupuesto/usePresupuesto";

interface Prop {
    libro: LibroProp;
    nuevasEsp?: Especificaciones[];
}

const Presupuesto = ({ libro, nuevasEsp }: Prop) => {
    const {presupuesto, setEspecificaciones, especificaciones} = usePresupuesto({libro, nuevasEsp});

    return (
        <div className="copiado-presupuesto libro-select">
            <Texto texto={'Presupuesto'} centrado mediana negrita></Texto>
            <Texto texto={presupuesto} />
            <EspecificacionesSelect setEspecificaciones={setEspecificaciones} especificaciones={especificaciones} />
            <Boton secundario texto="Copiar" onClick={() => navigator.clipboard.writeText(presupuesto)}></Boton>
        </div>
    )
}

export default Presupuesto;