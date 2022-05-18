import { createContext } from "react";
import Store from "../store/store";

interface State {
  store: Store;
}

const Context = createContext<State>({} as State);

export default Context;
