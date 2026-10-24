import { DatoCobroAdapterProp, DatoCobroProp } from '../dato_cobro/datoCobro.interface';
import { MensajeAdapterProp, MensajeProp } from '../mensaje/mensaje.interface';
import { SedeAdapterProp, SedeProp } from '../sede/sede.interface';

// La tabla configuraciones no tiene id (su PK es id_empresa), ni deleted,
// ni fecha_creacion: por eso no extiende BaseAdapterProp/BaseProp.
export interface ConfiguracionAdapterProp {
  fechaActualizacion?: string;
  fechaEntrega?: string;
  horaEntrega?: number;
  msjRetiro?: boolean;
  msjEnvio?: boolean;
  msjRetirado?: MensajeAdapterProp;
  msjTomado?: MensajeAdapterProp;
  sede?: SedeAdapterProp;
  datoCobrado?: DatoCobroAdapterProp;
}

export interface ConfiguracionProp {
  fechaActualizacion?: string;
  fechaEntrega?: string;
  horaEntrega?: number;
  msjRetiro: boolean;
  msjEnvio: boolean;
  msjRetirado?: MensajeProp;
  msjTomado?: MensajeProp;
  sede?: SedeProp;
  datoCobrado?: DatoCobroProp;
}
