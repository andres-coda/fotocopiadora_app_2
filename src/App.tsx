import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Heder from './componente/heder/heder';
import LateralIzquierdo from './componente/lateral/lateralIzquierdo';
import LateralDerecho from './componente/lateral/lateralDerecho';
import './App.css';

interface AppProp {
  children: ReactNode;
}
function App({ children }: AppProp) {
  return (
    <>
      <Heder />
      <div className="contenedor-general">
        <LateralIzquierdo />
        <div className="general">{children}</div>
        <LateralDerecho />
      </div>
    </>
  );
}

export default App;
