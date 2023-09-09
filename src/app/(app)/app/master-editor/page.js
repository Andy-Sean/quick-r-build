"use client"; // Very important thing to include lest some random completely unrelated error code appears

import { useContext } from "react";
import { MasterContext, MasterDispatchContext } from "@/redux/ContextsProvider";

import PersonalInfoDisplay from "../_resume-components/personal-info";
import PersonalInfoEditor from "../_resume-components/personal-edit";

export default function MasterEditor() {
  const masterResume = useContext(MasterContext);
  const dispatchMaster = useContext(MasterDispatchContext);

  return (
    <>
      <p>Master Interface</p>
      <div className="mx-10">
        <PersonalInfoDisplay />
      </div>
      <p>Debug:</p>
      <pre>{JSON.stringify(masterResume, null, 2)}</pre>
    </>
  );
}
