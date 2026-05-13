import { ReactNode } from "react";
import "./App.css";
import Heder from "./componente/heder/heder";

interface AppProp {
  children: ReactNode;
}
function App({ children }: AppProp) {

  return (
    <>
      <div className="general">
        <Heder />
        {children}
      </div>
    </>
  )
}

export default App
