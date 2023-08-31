"use client";
// Editor for Personal Info. Allows Setting of Personal Info Only.

import { useContext } from "react";

import { actionPersonalSet, actionPersonalReset } from "@/redux/MasterReducer";
import { MasterDispatchContext } from "@/redux/ContextsProvider";

export default function PersonalInfoEditor() {
  const dispatchMaster = useContext(MasterDispatchContext);

  function formSubmit(event) {
    event.preventDefault();
    dispatchMaster(actionPersonalSet(event));
  }

  return (
    <>
      <form className="text-black" onSubmit={(e) => formSubmit(e)}>
        <label for="name">Name:</label>
        <input id="name" type="text"></input> <br />
        <label for="tel">Telephone:</label>
        <input id="tel" type="tel"></input> <br />
        <label for="linkedin">LinkedIn Username:</label>
        <input id="linkedin" type="text"></input> <br />
        <label for="github">GitHub Username:</label>
        <input id="github" type="text"></input> <br />
        <label for="email">Email:</label>
        <input id="email" type="email"></input> <br />
        <label for="website">Website URL:</label>
        <input id="website" type="text"></input> <br />
        <label for="address">Address or Location Info:</label>
        <input id="address" type="text"></input> <br />
        <input type="submit" value="Set Info"></input>
        <br />
        <input type="reset" value="Reset Form"></input>
      </form>
      <button onClick={() => dispatchMaster(actionPersonalReset())}>Reset Data</button>
    </>
  );
}
