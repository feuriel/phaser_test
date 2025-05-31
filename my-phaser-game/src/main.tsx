import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const copyright = `© ${new Date().getFullYear()} Gabriel Somogyi`;
setTimeout(() => {
    console.log(`made with ❤️ by Gabriel S.
  https://gabriel-somogyi.vercel.app/
  ${copyright}`);
}, 3000);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

