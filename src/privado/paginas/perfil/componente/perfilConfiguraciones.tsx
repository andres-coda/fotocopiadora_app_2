import Boton from "../../../../componente-estilo/boton/boton";
import Texto from "../../../../componente-estilo/texto/texto";
import { ConfiguracionProp } from "../../../../modelo/Entidades/configuracion/configuracion.interface";
import './perfilConfiguraciones.css'

interface Props {
  configuracion: ConfiguracionProp | undefined;
  onEditar: () => void;
}

const siNo = (valor: boolean): string => (valor ? 'Si' : 'No');

// Muestra el nombre de una relacion, o "Sin definir" si la configuracion no trae el dato.
const valorO = (valor: string | number | undefined): string =>
  valor === undefined || valor === '' ? 'Sin definir' : String(valor);

const PerfilConfiguraciones = ({ configuracion, onEditar }: Props) => {
  if (!configuracion) {
    return (
      <div className="perfil-configuraciones">
        <Texto texto="Sin configuracion" mediana centrado />
      </div>
    );
  }

  return (
    <div className="perfil-configuraciones">
      <div className="perfil-seccion__datos">
        <Texto texto={`Retiro: ${siNo(configuracion.msjRetiro)}`} chica />
        <Texto texto={`Envio: ${siNo(configuracion.msjEnvio)}`} chica />
        <Texto texto={`Fecha de entrega: ${valorO(configuracion.fechaEntrega)}`} chica />
        <Texto texto={`Hora de entrega: ${valorO(configuracion.horaEntrega)}`} chica />
        <Texto texto={`Sede: ${valorO(configuracion.sede?.nombre)}`} chica />
        <Texto texto={`Mensaje de pedido tomado: ${valorO(configuracion.msjTomado?.nombre)}`} chica />
        <Texto texto={`Mensaje de pedido retirado: ${valorO(configuracion.msjRetirado?.nombre)}`} chica />
        <Texto texto={`Dato de cobro: ${valorO(configuracion.datoCobrado?.nombre)}`} chica />
        <Boton texto="Editar" secundario onClick={onEditar} />
      </div>
    </div>
  );
}

export default PerfilConfiguraciones;
