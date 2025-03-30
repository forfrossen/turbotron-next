import { createStore, Provider as JotaiProvider } from "jotai";
import { DevTools, useAtomsDebugValue } from "jotai-devtools";
import "jotai-devtools/styles.css";

const myStore = createStore();

export function JotaiStoreProvider({ children }: { children: React.ReactNode }) {
  useAtomsDebugValue();

  return (
    <JotaiProvider store={myStore}>
      <DevTools store={myStore} position="bottom-right" />
      {children}
    </JotaiProvider>
  );
}
