import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ConfiguracionAdapterProp, ConfiguracionProp } from "../../modelo/Entidades/configuracion/configuracion.interface";
import { EmpresaAdapterProp, EmpresaProp } from "../../modelo/Entidades/empresa/empresa.interface";
import { baseAdapter } from "./base.adapter";
import { datoCobroAdapter } from "./datoCobro.adapter";
import { mensajeAdapter } from "./mensaje.adapter";
import { sedeAdapter } from "./sede.adapter";

export const configuracionAdapter = (configuracion?: ConfiguracionAdapterProp): ConfiguracionProp | undefined => {
  if (!configuracion) return undefined;

  const newConfiguracion: ConfiguracionProp = {
    idEmpresa: configuracion.idEmpresa,
    fechaActualizacion: configuracion.fechaActualizacion,
    fechaEntrega: configuracion.fechaEntrega,
    horaEntrega: configuracion.horaEntrega,
    msjRetiro: configuracion.msjRetiro ?? false,
    msjEnvio: configuracion.msjEnvio ?? false,
    msjRetirado: mensajeAdapter(configuracion.msjRetirado),
    msjTomado: mensajeAdapter(configuracion.msjTomado),
    sede: sedeAdapter(configuracion.sede),
    datoCobrado: datoCobroAdapter(configuracion.datoCobrado),
  }
  return newConfiguracion;
}

export const empresaAdapter = (empresa?: EmpresaAdapterProp): EmpresaProp | undefined => {
  if (!empresa) return undefined;

  const base: BaseProp | undefined = baseAdapter<EmpresaAdapterProp>({ base: empresa });

  if (!base) return undefined;

  const newEmpresa: EmpresaProp = {
    ...base,
    nombre: empresa.nombre,
    email: empresa.email,
    telefono: empresa.telefono,
    configuracion: configuracionAdapter(empresa.configuracion),
  }
  return newEmpresa;
}

export const empresaAdapterArray = (datos?: EmpresaAdapterProp[]): EmpresaProp[] => {
  const newEmpresas: EmpresaProp[] =
    datos?.flatMap(d => {
      const empresa = empresaAdapter(d);
      return empresa ? [empresa] : [];
    }) ?? [];

  return newEmpresas;
}
