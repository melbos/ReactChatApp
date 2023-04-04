import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);

serviceWorker.register();
