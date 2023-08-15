// Getting the Logic sorted, without having to deal with the UI.
// Alternatively, we can just make this app a Terminal interface (see -repl alternative)

// Immer makes State (with Map / Nesting) much MUCH less painful
import { enableMapSet } from "immer";
enableMapSet();
import { produce } from "immer";

// IDs
let entryID = 0;
let descID = 0;
const genEntryID = () => entryID++;
const genDescID = () => descID++;
export const resetEntryID = () => (entryID = 0);
export const resetDescID = () => (descID = 0);

// States
export let EntryPool = new Map();
export const setEntryPool = (thing) => (EntryPool = thing);

export let ResumeEntries = [[], ["Default"]];
export const setResumeEntries = (thing) => (ResumeEntries = thing);

// ----------------------------------------------------------------------
// Helper Functions / Error Throwers
const errorIfNotInEntryPool = (entryID) => {
  if (!EntryPool.get(entryID)) throw Error(`Entry with ID ${entryID} not found.`);
};
const errorIfDescNotFound = (descID, entryID) => {
  if (EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID) === -1) {
    throw Error(`Description with ID ${descID} not found under Entry with ID ${entryID}.`);
  }
};
const errorIfConstIndexOutOfBound = (entryID, newIndex) => {
  if (EntryPool.get(entryID).desc.length == 0 && newIndex !== 0) {
    throw Error(`Invalid Index. Adding to an empty Description Array needs Index to be 0.`);
    // Does not account for tacking onto the end of a list, thus growing it
  } else if (EntryPool.get(entryID).desc.length !== 0 && (isNaN(newIndex) || newIndex < 0 || newIndex >= EntryPool.get(entryID).desc.length)) {
    throw Error(`Invalid Index. Index must be an integer between 0 and ${EntryPool.get(entryID).desc.length - 1}.`);
  }
};
const errorIfGrowableIndexOutOfBound = (entryID, newIndex) => {
  //Allows growing of array by attaching to end!
  if (EntryPool.get(entryID).desc.length == 0 && newIndex !== 0) {
    throw Error(`Invalid Index. Adding to an empty Description Array needs Index to be 0.`);
    // Accounts for descArray growth by attaching to the end of the list - thus Index can be one higher than usual.
  } else if (EntryPool.get(entryID).desc.length !== 0 && (isNaN(newIndex) || newIndex < 0 || newIndex > EntryPool.get(entryID).desc.length)) {
    throw Error(`Invalid Index. Index must be an integer between 0 and ${EntryPool.get(entryID).desc.length}.`);
  }
};
const grabDescArrFrom = (draft, entryID) => draft.get(entryID).desc;

// ----------------------------------------------------------------------
// This is ultimately going to become a reducer, so all functions will return the next state.
// You must additionally call setEntryPool as the "State manipulator"

// Entry Pool - add a new Entry, and initialize it to the barebones.
export function addEntry(section, title, subtitle, startDate, endDate, link) {
  const entryID = genEntryID();
  const newEntry = { entryID, section: section === "" ? "Default" : section, title, subtitle, startDate, endDate, link, desc: [], active: false };
  return produce(EntryPool, (draft) => {
    draft.set(entryID, newEntry);
  });
}

// Entry Pool - delete an entry. Throw an error if it doesn't exist (cuz that means the UI failed...)
export function deleteEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  return produce(EntryPool, (draft) => {
    draft.delete(entryID);
  });
}

// Entry Pool - edit an entry. Throw an error if it doesn't exist - that aint good!
export function editEntry(entryID, section, title, subtitle, startDate, endDate, link) {
  errorIfNotInEntryPool(entryID);
  const newEntry = { ...EntryPool.get(entryID), section: section === "" ? "Default" : section, title, subtitle, startDate, endDate, link };
  return produce(EntryPool, (draft) => {
    draft.set(entryID, newEntry);
  });
}

// Entry Pool - toggle entry's active status. To use along with Resume Entries. Errors if not found.
export function toggleEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  return produce(EntryPool, (draft) => {
    draft.get(entryID).active = !draft.get(entryID).active;
  });
}

// ----------------------------------------------------------------------

// Entry Pool - add a description to an entry. Also will error out if needed.
export function addDesc(entryID, desc) {
  errorIfNotInEntryPool(entryID);
  const newDesc = { entryID, desc, active: false, descID: genDescID() };
  return produce(EntryPool, (draft) => {
    grabDescArrFrom(draft, entryID).push(newDesc);
  });
}

// Entry Pool - delete a description. Errors if entry, then description not found.
export function deleteDesc(descID, entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  return produce(EntryPool, (draft) => {
    const delIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
    grabDescArrFrom(draft, entryID).splice(delIndex, 1);
  });
}

// Entry Pool - description editing. Follows similarly.
export function editDesc(descID, entryID, desc) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  return produce(EntryPool, (draft) => {
    let index = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
    const newDesc = { ...grabDescArrFrom(draft, entryID)[index], desc };
    grabDescArrFrom(draft, entryID)[index] = newDesc;
  });
}

// Entry Pool - description toggle.
export function toggleDesc(descID, entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  return produce(EntryPool, (draft) => {
    const index = grabDescArrFrom(draft, entryID).findIndex((x) => descID === x.descID);
    grabDescArrFrom(draft, entryID)[index].active = !grabDescArrFrom(draft, entryID)[index].active;
  });
}

// Entry Pool - move descriptions within the same list. This doesn't change the array size.
export function moveDescLocal(descID, entryID, newIndex) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  errorIfConstIndexOutOfBound(entryID, newIndex);
  return produce(EntryPool, (draft) => {
    const oldIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
    const [toMove] = grabDescArrFrom(draft, entryID).splice(oldIndex, 1);
    grabDescArrFrom(draft, entryID).splice(newIndex, 0, toMove);
  });
}

// Entry Pool - move a description to a whole new list! Diff. Error Handler since this can increase array size
export function moveDescGlobal(descID, entryID, newEntryID, newIndex) {
  errorIfNotInEntryPool(entryID);
  errorIfNotInEntryPool(newEntryID);
  errorIfDescNotFound(descID, entryID);
  errorIfGrowableIndexOutOfBound(newEntryID, newIndex);
  return produce(EntryPool, (draft) => {
    const oldIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
    let [toMove] = grabDescArrFrom(draft, entryID).splice(oldIndex, 1);
    toMove = { ...toMove, entryID: newEntryID };
    grabDescArrFrom(draft, newEntryID).splice(newIndex, 0, toMove);
  });
}

// ----------------------------------------------------------------------

// Entry Pool - Sort the Pool. Helps when displaying to UI for alphabeticization. That's about all though.
export function sortPool() {
  const sortFun = (a, b) => {
    if (a.section !== b.section) return a.section < b.section ? -1 : 1;
    else if (a.title !== b.title) return a.title < b.title ? -1 : 1;
    else if (a.entryID !== b.entryID) return a.entryID < b.entryID ? -1 : 1;
    else return 0;
  };
  return produce(EntryPool, (draft) => {
    const a = new Map([...draft.entries()].sort((a, b) => sortFun(a[1], b[1])));
    return a;
  });
}

// Entry Pool - TUI Version of UI. Prints out everything you might need. Good for a REPL!
export function sortPrintPool() {
  const descDisplayName = ({ entryID, descID, desc, active }) => {
    return `↪ [${descID}] ${active ? "[On]" : "[Off]"} ${desc}`;
  };
  const entryDisplayName = ({ entryID, section, title, subtitle, link, startDate, endDate, active, desc }) => {
    const display = `${section} | ${title ? title : "No Title"}: ${title ? title : "No Subtitle"} (Link: ${link ? link : "none"}) ${startDate || endDate ? startDate + " ~ " + endDate : "undated"}`;
    let result = `[${entryID}] ${active ? "[On]" : "[Off]"} ${display}\n`;
    for (const descObj of desc) {
      result += descDisplayName(descObj) + "\n";
    }
    return result;
  };
  let result = "";
  setEntryPool(sortPool());
  const printInterator = EntryPool.entries();
  for (const kv of printInterator) {
    result += entryDisplayName(kv[1]) + "\n";
  }
  return result;
}

// Entry Pool - Export Pool so user can save for later use. Array of Entry Objects.
export function sortExportPool() {
  setEntryPool(sortPool());
  return JSON.stringify(
    [...EntryPool.entries()].map((x) => x[1]),
    null,
    2
  );
}

// Entry Pool - Create an Entry Pool object from the equivalent JSON. Doesn't load it in.
export function createPool(json) {
  const entryArr = JSON.parse(json);
  const result = new Map();
  for (const entry of entryArr) {
    result.set(entry.entryID, entry);
    genEntryID();
    for (const desc in entry.desc) {
      genDescID();
    }
  }
  return result;
}

// ======================================================================================================
// More Helpers
const grabSectionIndex = (val) => ResumeEntries[0].findIndex((x) => x === val);
const errorIfMessingWithDefault = (secName) => {
  if (secName === "Default") {
    throw Error(`Cannot alter/create Default section! It's built in, sorry.`);
  }
};
const errorIfSectionNameExists = (secName) => {
  if (ResumeEntries[0].findIndex((x) => x === secName) !== -1) {
    throw Error(`Already a Section named ${secName}!`);
  }
};
const errorIfSectionNameNoExists = (secName) => {
  if (ResumeEntries[0].findIndex((x) => x === secName) === -1) {
    throw Error(`"${secName}" section not found!`);
  }
};
const errorIfNotInResumeEntries = (entryID) => {
  const inNorm = ResumeEntries[0].findIndex((x) => x === entryID) !== -1;
  const inDef = ResumeEntries[1].findIndex((x) => x === entryID) !== -1;
  if (!(inNorm || inDef)) {
    throw Error(`You haven't added Entry with ID ${entryID} to the Entry List.`);
  }
};
const errorIfInResumeEntries = (entryID) => {
  const inNorm = ResumeEntries[0].findIndex((x) => x === entryID) !== -1;
  const inDef = ResumeEntries[1].findIndex((x) => x === entryID) !== -1;
  if (inNorm || inDef) {
    throw Error(`Entry with ID ${entryID} already exists in the Entry List.`);
  }
};

// Resume Entries - append Section. Default section seperated cuz yeah.
export function appendSection(name) {
  errorIfMessingWithDefault(name);
  errorIfSectionNameExists(name);
  return produce(ResumeEntries, (draft) => {
    draft[0].push(name);
  });
}

// Resume Entries - remove Section. Cannot delete default.
export function removeSection(name) {
  errorIfMessingWithDefault(name);
  errorIfSectionNameNoExists(name);
  return produce(ResumeEntries, (draft) => {
    draft[0].splice(grabSectionIndex(name), 1);
  });
}

// Resume Entries - And Renaming of course!
export function renameSection(oldName, newName) {
  errorIfMessingWithDefault(oldName);
  errorIfMessingWithDefault(newName);
  errorIfSectionNameNoExists(oldName);
  errorIfSectionNameExists(newName);
  return produce(ResumeEntries, (draft) => {
    draft[0][grabSectionIndex(oldName)] = newName;
  });
}

// Resume Entries - Add an Entry in the correct section, or in Default if section not found.
// -> Must also call toggleEntry
export function attachEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfInResumeEntries(entryID);
  setEntryPool(toggleEntry(entryID));
  const section = EntryPool.get(entryID).section;
  return produce(ResumeEntries, (draft) => {
    if (section === "Default") {
      draft[1].push(entryID);
    } else {
      const sectionIndex = grabSectionIndex(section);
      if (grabSectionIndex(section) === -1) {
        draft[1].push(entryID);
      } else {
        let edited = false;
        for (let secSectIndex = sectionIndex + 1; secSectIndex < draft[0].length; secSectIndex++) {
          if (typeof draft[0][secSectIndex] === "string") {
            draft[0].splice(secSectIndex, 0, entryID);
            edited = true;
            break;
          }
        }
        if (!edited) draft[0].push(entryID);
      }
    }
  });
}

// Resume Entries - Remove an Entry. Check both arrays
export function removeEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfNotInResumeEntries(entryID);
  setEntryPool(toggleEntry(entryID));
  return produce(ResumeEntries, (draft) => {
    const next = draft[0].filter((x) => typeof x === "string" || x !== entryID);
    const neDe = draft[1].filter((x) => typeof x === "string" || x !== entryID);
    return [next, neDe];
  });
}

// Resume Entries - move items around! However, Default must be the last section.
export function moveItem(itemIndex, newIndex) {
  const errorIfOOB = (ind) => {
    let len = ResumeEntries[0].length + ResumeEntries[1].length;
    if (ind < 0 || ind >= len) {
      throw Error(`Index Out of Bounds! It must be between 0 and ${len - 1}`);
    }
  };
  errorIfOOB(itemIndex);
  errorIfOOB(newIndex);

  let flattedArr = ResumeEntries.flat();
  const [item] = flattedArr.splice(itemIndex, 1);
  flattedArr.splice(newIndex, 0, item);
  const defaultIndex = flattedArr.findIndex((x) => x === "Default");
  flattedArr = [flattedArr.slice(0, defaultIndex), flattedArr.slice(defaultIndex, flattedArr.length)];
  
  // These errors are best calculated here...
  if (flattedArr[1].filter((x) => typeof x === "string").length !== 1) {
    throw Error("Default must be the last section!");
  }
  if (typeof flattedArr[0][0] !== "string") {
    throw Error("Must start with a Section!")
  }
  return produce(ResumeEntries, (draft) => {
    draft = flattedArr; 
    return draft;
  });
}

