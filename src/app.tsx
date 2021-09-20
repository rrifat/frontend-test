import React from "react";
import { useAppSelector } from "store/hooks";
import { FullPageSpinner } from "common/components/Spinner";

const UnauthenticatedApp = React.lazy(() => import("features/auth/auth"));
const AuthenticatedApp = React.lazy(
  () => import("features/online-device/online-device")
);

function App() {
  const { token } = useAppSelector((state) => state.auth);
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {!token ? <UnauthenticatedApp /> : <AuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
