"use client";
// Display for Personal Information, and interface for editing/resetting PI data.

import { useContext, useRef } from "react";
import { useImmer } from "use-immer";

import { actionPersonalReset } from "@/redux/MasterReducer";
import { MasterContext, MasterDispatchContext } from "@/redux/ContextsProvider";
import PersonalInfoEditor from "./personal-edit";

export default function PersonalInfoDisplay() {
  const masterData = useContext(MasterContext);
  const dispatchMaster = useContext(MasterDispatchContext);
  const dialog = useRef(null);

  const [formData, setFormData] = useImmer(masterData.personalInfo);
  function preciseSetFormData(field, val) {
    setFormData((draft) => {
      draft[field] = val;
    });
  }
  function resetFormData() {
    setFormData(masterData.personalInfo);
  }

  return (
    <>
      <div className="bg-white text-black py-3 px-4 rounded-lg my-3">
        <h3 className="text-xl sm:text-2xl font-bold">Personal Info</h3>
        <p className="text-gray-600 text-sm">Default Section</p>

        {/* Button Div */}
        <div className="flex justify-between my-2">
          <button
            onClick={() => {
              setFormData((draft) => masterData.personalInfo);
              dialog.current.showModal();
            }}
            className="flex items-center gap-x-1 bg-green-500 px-2 py-0.5 rounded-md"
          >
            <span className="bi bi-pencil-fill" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() => {
              dispatchMaster(actionPersonalReset());
            }}
            className="flex items-center gap-x-1 bg-red-500 px-2 py-0.5 rounded-md"
          >
            <span className="bi bi-fire" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        {/* Main Display */}
        <table className="w-full max-w-full">
          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200 rounded-t-md">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-tag-fill mx-1" />
              Name:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.name}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-telephone-fill mx-1" />
              Phone:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.tel}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-linkedin mx-1" />
              LinkedIn:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.linkedin}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-github mx-1" />
              GitHub:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.github}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-envelope-at-fill mx-1" />
              Email:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.email}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-globe2 mx-1" />
              Website:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.website}</td>
          </tr>

          <tr className="flex flex-wrap justify-between py-2 max-w-full odd:bg-gray-50 even:bg-gray-200 rounded-b-md">
            <td className="flex basis-1/4 shrink-0">
              <span className="bi bi-geo-alt-fill mx-1" />
              Location:
            </td>
            <td className="max-w-full break-all grow">{masterData.personalInfo.address}</td>
          </tr>
        </table>
      </div>

      {/* Heres the Editor Modal that comes along for the ride (and can go parallel cuz it covers the screen anyways nice) */}
      <PersonalInfoEditor dialogRef={dialog} formData={formData} handleChange={preciseSetFormData} handleReset={resetFormData} />
    </>
  );
}
