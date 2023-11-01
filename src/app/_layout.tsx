import {Slot} from "expo-router";
import {store} from "../backEnd/store/Store";
import {Provider} from "react-redux";
export default function AppLayout() {
  return (
      <Provider store={store}>
        <Slot></Slot>
      </Provider>);
}
