"use client";

import { reduxStore } from "./redux/redux-store";
import { Provider } from "react-redux";

export default function AppLayout({ children }) {
  return (
    <>
      <p>I load everywhere!</p>
      <Provider store={reduxStore}>{children}</Provider>
    </>
  );
}
