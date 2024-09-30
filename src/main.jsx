import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";

import "./index.css";
import Flow from "./App";
import { store } from "./store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </Provider>
  </StrictMode>
);
