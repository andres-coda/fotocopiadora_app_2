import Boton from '../../../componente-estilo/boton/boton';
import Botonera from '../../../componente-estilo/botonera/botonera';
import Card from '../../../componente-estilo/card/card';
import Texto from '../../../componente-estilo/texto/texto';
import { PeticionProp } from '../../../modelo/Entidades/solicitud/solicitud.interface';
import { estadoSolicitudTexto } from '../../../utils/solicitud';
import Arrow from '../../../assets/arrow.svg?react';
import { useForm } from 'react-hook-form';
import {
  formValuesPeticion,
  peticionEsq,
  peticionFormDefault,
} from '../../../modelo/Entidades/solicitud/esqSolicitud.esquema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from '../../../componente/formulario/textArea';
import './cardSolicitud.css';
import Formulario from '../../../componente/formulario/formulario';
import useSolicitudApi from '../../../servicio/solicitud/useSolicitudApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { seleccionarSolicitud } from '../../../redux/state/solicitud.state';

interface Props {
  peticion: PeticionProp;
}
const PeticionCard = ({ peticion }: Props) => {
  const dispatch= useDispatch()
  const {resolverSolicitud, responseSolicitud, errorFethcSolicitud, loadingSolicitud} = useSolicitudApi()

  useEffect(()=>{
    if(responseSolicitud){
      dispatch(seleccionarSolicitud(responseSolicitud))
    }

  },[responseSolicitud])

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<formValuesPeticion>({
    resolver: zodResolver(peticionEsq),
    defaultValues: peticionFormDefault,
  });
  return (
    <Card
      retirado={peticion.estado === 2 ? true : false}
      pendiente={peticion.estado === 1 ? true : false}
      cancelado={peticion.estado === 3 ? true : false}
      tituloCard={estadoSolicitudTexto(peticion.estado)}
      nuevoEstilo="card-solicitud"
    >
      <Texto texto={`Campo: ${peticion.campo}`} chica />
      <Texto texto={`Valor anterior: ${peticion.valorAnterior ?? '—'}`} chica />
      <Texto texto={`Valor nuevo: ${peticion.valorNuevo ?? '—'}`} chica />
      {peticion.observaciones && <Texto texto={`Obs: ${peticion.observaciones}`} chica />}
      {!peticion.observaciones && (
        <Formulario simple loading={loadingSolicitud} errorFetch={errorFethcSolicitud}>
          <TextArea<formValuesPeticion>
            name="observacion"
            control={control}
            label="Observaciones de la petición"
            error={errors.observacion}
            esquema={peticionEsq}
            nuevoEstiloInput='solicitud-input'
          />
        </Formulario>
      )}
      <Botonera derecha>
        <Boton titulo="Rechazar petición" secundario iconoChico icono={<Arrow />} />
        <Boton
          titulo="Aceptar petición"
          iconoChico
          texto={loadingSolicitud ? 'Proc...' : undefined}
          icono={!loadingSolicitud ? <Arrow /> : null}
          nuevoEstilo="btn-icono-derecha"
          onClick={()=> resolverSolicitud({id:peticion.id, observaciones: {observacion:watch().observacion}, estado:2})}
        />
      </Botonera>
    </Card>
  );
};

export default PeticionCard;
