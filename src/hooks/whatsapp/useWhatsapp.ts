import { isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import { BASE_WHATSAPP_WEB, urlWhatsapp } from '../../utils/whatsapp';

interface AbrirWhatsappProp {
  telefono?: string;
  mensaje?: string;
}

/**
 * Abre el chat de WhatsApp sin acumular pestanas:
 *
 * 1. `whatsapp://` reusa la ventana de la app de escritorio que ya esta abierta
 *    (si no lo esta, el sistema la levanta). Chrome no ofrece forma de enfocar
 *    una pestana existente, asi que este es el unico camino sin pestanas nuevas.
 * 2. Si no hay handler registrado para el protocolo, cae a WhatsApp Web.
 *
 * En `npm run dev` sin Tauri el opener nativo no existe: se va directo a la web
 * con `window.open` para no romper el flujo durante el desarrollo.
 */
const useWhatsapp = () => {
  const abrirWhatsapp = async ({ telefono, mensaje }: AbrirWhatsappProp): Promise<boolean> => {
    const urlApp = urlWhatsapp({ telefono, mensaje });
    if (!urlApp) return false;

    if (isTauri()) {
      try {
        await openUrl(urlApp);
        return true;
      } catch {
        // Sin app registrada para `whatsapp:`: se intenta la version web.
      }
    }

    const urlWeb = urlWhatsapp({ telefono, mensaje, base: BASE_WHATSAPP_WEB });
    if (!urlWeb) return false;

    try {
      if (isTauri()) await openUrl(urlWeb);
      else window.open(urlWeb, '_blank', 'noopener,noreferrer');
      return true;
    } catch (error) {
      console.error('No se pudo abrir WhatsApp', error);
      return false;
    }
  };

  return { abrirWhatsapp };
};

export default useWhatsapp;
