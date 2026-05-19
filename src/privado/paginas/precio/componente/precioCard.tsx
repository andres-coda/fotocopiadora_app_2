import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import useEditar from "../../../../hooks/editar/useEditar";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import './precioCard.css'

interface Props {
  precio: PrecioProp
}

const PrecioCard = ({ precio }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_CARGAR}`,
    precio
  });

  return (
    <Card
      onClick={() => handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)}
      nuevoEstilo={'card-precio'}
    >
      <Texto texto={`${precio.nombre}`} chica/>
      <Texto texto={`$${Number(precio.importe)}`} chica negrita derecha ajustado/>
      
    </Card>
  )
}

export default PrecioCard