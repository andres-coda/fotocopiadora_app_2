import { EmpresaDtoProp } from "../../modelo/Entidades/empresa/dtoEmpresa.interface";
import { formValuesEmpresa } from "../../modelo/Entidades/empresa/esqEmpresa.esquema";

export const empresaDtoAdapter = (p: formValuesEmpresa): EmpresaDtoProp => {
  const newEmpresa: EmpresaDtoProp = {
    nombre: p.nombre,
    email: p.email,
    telefono: p.telefono,
  }
  return newEmpresa;
}
