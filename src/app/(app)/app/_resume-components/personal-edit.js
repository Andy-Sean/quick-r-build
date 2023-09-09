"use client";
// Editor for Personal Info. Allows Setting of Personal Info Only.

import { useContext } from "react";

import { actionPersonalSet } from "@/redux/MasterReducer";
import { MasterDispatchContext } from "@/redux/ContextsProvider";

export default function PersonalInfoEditor({ dialogRef, formData, handleChange, handleReset }) {
  const dispatchMaster = useContext(MasterDispatchContext);

  function formSubmit(event) {
    event.preventDefault();
    dispatchMaster(actionPersonalSet(event));
    dialogRef.current.close();
  }

  return (
    <>
      <dialog ref={dialogRef} id="personalInfoDialog" className="p-8 rounded-xl backdrop:backdrop-blur-sm">
        {/* Top Description */}
        <div className="pb-4">
          <h3 className="text-xl sm:text-2xl font-bold">Edit Personal Info</h3>
          <p className="text-sm m-0 text-gray-600">This appears as a header on every resume you make!</p>
          <p className="text-sm m-0 text-gray-600 font-bold">Leave an entry blank if you do not have data for it.</p>
        </div>

        {/* Main Form Fields */}
        <form className="text-black" onSubmit={(e) => formSubmit(e)}>
          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap rounded-t-md">
            <label htmlFor="name">
              <span className="bi bi-tag-fill mx-1" />
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            />
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap">
            <label htmlFor="tel">
              <span className="bi bi-telephone-fill mx-1" />
              Telephone:
            </label>
            <input
              id="tel"
              type="tel"
              value={formData.tel}
              onChange={(e) => {
                handleChange("tel", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap">
            <label htmlFor="linkedin">
              <span className="bi bi-linkedin mx-1" />
              LinkedIn Username:
            </label>
            <input
              id="linkedin"
              type="text"
              value={formData.linkedin}
              onChange={(e) => {
                handleChange("linkedin", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap">
            <label htmlFor="github">
              <span className="bi bi-github mx-1" />
              GitHub Username:
            </label>
            <input
              id="github"
              type="text"
              value={formData.github}
              onChange={(e) => {
                handleChange("github", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap">
            <label htmlFor="email">
              <span className="bi bi-envelope-at-fill mx-1" />
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap">
            <label htmlFor="website">
              <span className="bi bi-globe2 mx-1" />
              Website URL:
            </label>
            <input
              id="website"
              type="text"
              value={formData.website}
              onChange={(e) => {
                handleChange("website", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          <div className="odd:bg-gray-50 even:bg-gray-200 py-2 px-1 flex gap-x-5 flex-wrap rounded-b-md">
            <label htmlFor="address">
              <span className="bi bi-geo-alt-fill mx-1" />
              Location:
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => {
                handleChange("address", e.target.value);
              }}
              className="bg-transparent grow max-w-full"
            ></input>
          </div>

          {/* Buttons! */}
          <div className="flex flex-wrap justify-center">
            <button className="rounded-md px-4 py-1 m-2 bg-green-600">
              <input type="submit" value="Save"></input>
            </button>

            <button
              className="rounded-md px-4 py-1 m-2 bg-red-500"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              Reset Form
            </button>
            <button
              className="rounded-md px-4 py-1 m-2 bg-zinc-400"
              onClick={(e) => {
                e.preventDefault();
                dialogRef.current.close();
              }}
            >
              Cancel
            </button>
          </div>

        </form>
      </dialog>
    </>
  );
}
