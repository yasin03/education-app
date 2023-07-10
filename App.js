import { NativeBaseProvider } from "native-base";
import Router from "./src/route/router";

export default function App() {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
}