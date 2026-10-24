import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import './mensajeNombreCard.css';

interface Prop {
  mensaje: MensajeProp;
  onSelect: (mensaje: MensajeProp) => void;
}

/**
 * Opcion del buscador predictivo: se muestra dentro del desplegable y devuelve
 * el mensaje completo al elegirse.
 */
const MensajeNombreCard = ({ mensaje, onSelect }: Prop) => {
  return (
    <Card
      onClick={() => onSelect(mensaje)}
      tituloCard={mensaje.nombre}
      nuevoEstilo="card-mensaje-nombre"
    >
      <Texto texto={mensaje.nombre} chica />
      {mensaje.mensaje && (
        <Texto texto={mensaje.mensaje} chica nuevoEstilo="card-mensaje-nombre__texto" />
      )}
    </Card>
  );
};

export default MensajeNombreCard;
