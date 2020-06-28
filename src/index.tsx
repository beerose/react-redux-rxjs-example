import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById("root");
render(<Main />, rootElement);
