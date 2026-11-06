import { EmpresaDtoProp } from '../../modelo/Entidades/empresa/dtoEmpresa.interface';
import { formValuesEmpresa, formValuesEmpresaCrearSuper } from '../../modelo/Entidades/empresa/esqEmpresa.esquema';

export const empresaDtoAdapter = (p: formValuesEmpresa): EmpresaDtoProp => {
  const newEmpresa: EmpresaDtoProp = {
    nombre: p.nombre,
    email: p.email,
    telefono: p.telefono,
  };
  return newEmpresa;
};

// Adapter para el alta de empresa por super_admin (empresa + primer admin).
export interface EmpresaCrearSuperDtoProp {
  nombre: string;
  email: string;
  telefono: string;
  adminNombre: string;
  adminEmail: string;
  adminPassword: string;
}

export const empresaCrearSuperDtoAdapter = (p: formValuesEmpresaCrearSuper): EmpresaCrearSuperDtoProp => {
  return {
    nombre: p.nombre,
    email: p.email,
    telefono: p.telefono,
    adminNombre: p.adminNombre,
    adminEmail: p.adminEmail,
    adminPassword: p.adminPassword,
  };
};
