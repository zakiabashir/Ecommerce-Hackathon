// app/redux/Providers.tsx
"use client"; // Mark this file as a client component

import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}
