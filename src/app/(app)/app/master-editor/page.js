"use client"; // Very important thing to include lest some random completely unrelated error code appears

import { useContext } from "react";
import { MasterContext, MasterDispatchContext } from "@/redux/ContextsProvider";

export default function MasterEditor() {
  const masterResume = useContext(MasterContext);
  const dispatchMaster = useContext(MasterDispatchContext);

  return (
    <>
      <p>Test</p>
      <p>Value of Master: {masterResume.val}</p>

      <button onClick={() => dispatchMaster({ type: "add1" })}>Add1</button>
      <button onClick={() => dispatchMaster({ type: "sub1" })}>Sub1</button>
      <button onClick={() => dispatchMaster({ type: "set0" })}>Set0</button>
    </>
  );
}
