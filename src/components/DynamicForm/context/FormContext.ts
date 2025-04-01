import React, { createContext, useContext } from "react";

import { IFormContextProps } from "../types";

// Form durumunu paylaşmak için context
const CustomFormContext = createContext<IFormContextProps | undefined>(undefined);

// Context hook'u
const useCustomFormContext = () => {
  const context = useContext(CustomFormContext);
  if (!context) {
    throw new Error("useCustomFormContext must be used within a CustomFormProvider");
  }
  return context;
};

export { CustomFormContext, useCustomFormContext };
