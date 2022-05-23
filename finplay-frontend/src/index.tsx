import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import App from "./App";
import Context from "./context";
import Store from "./store/store";

const store = new Store();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
ReactModal.setAppElement("#root");
root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>,
);
