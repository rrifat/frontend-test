import React from "react";

function useMount() {
  const [isMount, setMount] = React.useState(false);
  React.useEffect(() => {
    setMount(true);
    return () => {
      setMount(false);
    };
  }, []);
  return isMount;
}

export { useMount };
