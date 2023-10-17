import { useState, PropsWithChildren, createContext, useContext } from "react";

const FocusContext = createContext<{
  focusedId?: string;
  setFocusedId: Function;
}>({
  setFocusedId: () => {},
});

export const FocusProvider = ({ children }: PropsWithChildren) => {
  const [focusedId, setFocusedId] = useState<undefined | string>();

  return (
    <FocusContext.Provider value={{ focusedId, setFocusedId }}>
      <>{children}</>
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (typeof context === undefined) {
    throw new Error("useFocus must be used within an FocusProvider");
  }
  return context;
};
