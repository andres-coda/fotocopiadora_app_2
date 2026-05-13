import { ReactNode } from "react";
import "./App.css";
import Heder from "./componente/heder/heder";

interface AppProp {
  children: ReactNode;
}
function App({ children }: AppProp) {

  return (
    <>
      <Heder />
      <div className="general">
        {children}
      </div>
    </>
  )
}

export default App
