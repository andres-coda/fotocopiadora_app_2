import { ReactNode } from 'react';
import './App.css';
import Heder from './componente/heder/heder';
import LateralIzquierdo from './componente/lateral/lateralIzquierdo';
import LateralDerecho from './componente/lateral/lateralDerecho';

interface AppProp {
  children: ReactNode;
}
function App({ children }: AppProp) {
  return (
    <>
      <Heder />
      <div className="contenedor-general">
        <div className="lateral">
          <LateralIzquierdo />
        </div>
        <div className="general">{children}</div>
        <div className="lateral">
          <LateralDerecho />
        </div>
      </div>
    </>
  );
}

export default App;
