"use client";

import { reduxStore } from "@/redux/redux-store";
import { Provider } from "react-redux";

export default function AppLayout({ children }) {
  return (
    <>
      <p>Within the App</p>
      <Provider store={reduxStore}>{children}</Provider>
    </>
  );
}
