import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { EmpresaAdapterProp, EmpresaProp } from "../../modelo/Entidades/empresa/empresa.interface";
import { baseAdapter } from "./base.adapter";

export const empresaAdapter = (empresa?: EmpresaAdapterProp): EmpresaProp | undefined => {
  if (!empresa) return undefined;

  const base: BaseProp | undefined = baseAdapter<EmpresaAdapterProp>({ base: empresa });

  if (!base) return undefined;

  const newEmpresa: EmpresaProp = {
    ...base,
    nombre: empresa.nombre,
    email: empresa.email,
    telefono: empresa.telefono,
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
