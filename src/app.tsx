import React from "react";
import Login from "features/auth/auth";
import { useAppSelector } from "store/hooks";
import OnlineDevice from "features/online-device/online-device";

function App() {
  const { token } = useAppSelector((state) => state.auth);
  return !token ? <Login /> : <OnlineDevice />;
}

export default App;
