import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import router from "./routers/router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <div className="w-full h-screen flex justify-center items-center">
        <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
