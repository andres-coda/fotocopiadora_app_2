import { isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import { urlWhatsapp } from '../../utils/whatsapp';

interface AbrirWhatsappProp {
  telefono?: string;
  mensaje?: string;
}

/**
 * Entrega el protocolo `whatsapp:` desde el navegador.
 *
 * No se usa `window.open`: ese camino abre una pestana nueva y ademas un
 * protocolo externo no se carga en una pestana, se le entrega al sistema. Un
 * `<a>` real hace la entrega sin crear pestana, y si el manejador no existe la
 * pagina se queda como esta.
 */
const abrirPorProtocolo = (url: string): void => {
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.rel = 'noopener noreferrer';
  enlace.style.display = 'none';

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
};

/**
 * Abre el chat del cliente en la app de escritorio de WhatsApp con el mensaje ya
 * cargado; el operador decide si lo envia.
 *
 * El destino es `whatsapp://send`, que el manejador del sistema resuelve sobre
 * la ventana que ya esta abierta: no aparece una pestana nueva. La app armada
 * con Tauri entrega la URL directo al sistema; en `npm run dev` la entrega hace
 * el navegador, con el mismo protocolo, asi que lo que se prueba en desarrollo
 * es el mismo camino que en la app empaquetada.
 */
const useWhatsapp = () => {
  const abrirWhatsapp = async ({ telefono, mensaje }: AbrirWhatsappProp): Promise<boolean> => {
    const url = urlWhatsapp({ telefono, mensaje });
    if (!url) return false;

    try {
      if (isTauri()) await openUrl(url);
      else abrirPorProtocolo(url);
      return true;
    } catch (error) {
      console.error('No se pudo abrir WhatsApp', error);
      return false;
    }
  };

  return { abrirWhatsapp };
};

export default useWhatsapp;
