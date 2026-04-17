import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.querySelector<HTMLDivElement>("#root");

if (!rootElement) {
    throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);