import React from "react";
import Login from "features/auth";
import { useAppSelector } from "store/hooks";

function App() {
  const { token } = useAppSelector((state) => state.auth);
  return !token ? <Login /> : <h2>DEVICE LIST---{token}</h2>;
}

export default App;
