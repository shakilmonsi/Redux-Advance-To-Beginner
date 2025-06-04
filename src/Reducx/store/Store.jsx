import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../reducer/RootReducer";

export const store = createStore(rootReducer);
