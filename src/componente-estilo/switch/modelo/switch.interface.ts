export interface SwitchHookProp {
  nuevoEstilo?: string | undefined;
  activo: boolean;
}

export interface SwitchProp extends SwitchHookProp {
  onActivar: (nuevoActivo: boolean) => void;
  titulo?: string;
  texto?: string;
}
