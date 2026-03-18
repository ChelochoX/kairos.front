import { useEffect } from "react";
import { AppRouter } from "./App/Router/AppRouter";
import { applyTheme } from "./App/Theme/applyTheme";
import { defaultTheme } from "./App/Theme/defaultTheme";

function App() {
  useEffect(() => {
    applyTheme(defaultTheme);
  }, []);

  return <AppRouter />;
}

export default App;
