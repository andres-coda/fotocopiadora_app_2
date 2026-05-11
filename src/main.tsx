import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppHookConteiner from './AppHookConteiner';

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppHookConteiner />
  </StrictMode>,
);
