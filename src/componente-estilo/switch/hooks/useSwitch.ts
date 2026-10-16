import { SwitchHookProp } from "../modelo/switch.interface";

function useSwitch({ activo, nuevoEstilo }: SwitchHookProp) {
  const clase = [
    activo && 'switch-on',
    !activo && 'switch-off',
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  return { clase };
}

export default useSwitch;
