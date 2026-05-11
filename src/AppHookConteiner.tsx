import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import App from "./App";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

const AppHookConteiner = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
          <Provider store={store}>
              <App>
                <AppRouter />
              </App>
          </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default AppHookConteiner;