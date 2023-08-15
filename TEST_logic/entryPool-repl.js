// Getting the Logic sorted, without having to deal with the UI.
// Alternatively, we can just make this app a Terminal interface (see -repl alternative)

// Immer makes State (with Map / Nesting) much MUCH less painful
const immer = require("immer");
immer.enableMapSet();

// IDs
let entryID = 0;
let descID = 0;
const genEntryID = () => entryID++;
const genDescID = () => descID++;
const resetEntryID = () => (entryID = 0);
const resetDescID = () => (descID = 0);

// States
let EntryPool = new Map();
const setEntryPool = (thing) => {
  EntryPool = thing;
  return;
};
//extra return to supress the fricking return value because its weird
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
function addEntry(section, title, subtitle, startDate, endDate, link) {
  const entryID = genEntryID();
  const newEntry = { entryID, section: section === "" ? "Default" : section, title, subtitle, startDate, endDate, link, desc: [], active: false };
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      draft.set(entryID, newEntry);
    })
  );
}

// Entry Pool - delete an entry. Throw an error if it doesn't exist (cuz that means the UI failed...)
function deleteEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      draft.delete(entryID);
    })
  );
}

// Entry Pool - edit an entry. Throw an error if it doesn't exist - that aint good!
function editEntry(entryID, section, title, subtitle, startDate, endDate, link) {
  errorIfNotInEntryPool(entryID);
  const newEntry = { ...EntryPool.get(entryID), section: section === "" ? "Default" : section, title, subtitle, startDate, endDate, link };
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      draft.set(entryID, newEntry);
    })
  );
}

// Entry Pool - toggle entry's active status. To use along with Resume Entries. Errors if not found.
function toggleEntry(entryID) {
  errorIfNotInEntryPool(entryID);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      draft.get(entryID).active = !draft.get(entryID).active;
    })
  );
}

// ----------------------------------------------------------------------

// Entry Pool - add a description to an entry. Also will error out if needed.
function addDesc(entryID, desc) {
  errorIfNotInEntryPool(entryID);
  const newDesc = { entryID, desc, active: false, descID: genDescID() };
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      grabDescArrFrom(draft, entryID).push(newDesc);
    })
  );
}

// Entry Pool - delete a description. Errors if entry, then description not found.
function deleteDesc(descID, entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      const delIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
      grabDescArrFrom(draft, entryID).splice(delIndex, 1);
    })
  );
}

// Entry Pool - description editing. Follows similarly.
function editDesc(descID, entryID, desc) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      let index = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
      const newDesc = { ...grabDescArrFrom(draft, entryID)[index], desc };
      grabDescArrFrom(draft, entryID)[index] = newDesc;
    })
  );
}

// Entry Pool - description toggle.
function toggleDesc(descID, entryID) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      const index = grabDescArrFrom(draft, entryID).findIndex((x) => descID === x.descID);
      grabDescArrFrom(draft, entryID)[index].active = !grabDescArrFrom(draft, entryID)[index].active;
    })
  );
}

// Entry Pool - move descriptions within the same list. This doesn't change the array size.
function moveDescLocal(descID, entryID, newIndex) {
  errorIfNotInEntryPool(entryID);
  errorIfDescNotFound(descID, entryID);
  errorIfConstIndexOutOfBound(entryID, newIndex);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      const oldIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
      const [toMove] = grabDescArrFrom(draft, entryID).splice(oldIndex, 1);
      grabDescArrFrom(draft, entryID).splice(newIndex, 0, toMove);
    })
  );
}

// Entry Pool - move a description to a whole new list! Diff. Error Handler since this can increase array size
function moveDescGlobal(descID, entryID, newEntryID, newIndex) {
  errorIfNotInEntryPool(entryID);
  errorIfNotInEntryPool(newEntryID);
  errorIfDescNotFound(descID, entryID);
  errorIfGrowableIndexOutOfBound(newEntryID, newIndex);
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      const oldIndex = grabDescArrFrom(draft, entryID).findIndex((x) => x.descID === descID);
      let [toMove] = grabDescArrFrom(draft, entryID).splice(oldIndex, 1);
      toMove = { ...toMove, entryID: newEntryID };
      grabDescArrFrom(draft, newEntryID).splice(newIndex, 0, toMove);
    })
  );
}

// ----------------------------------------------------------------------

// Entry Pool - Sort the Pool. Helps when displaying to UI for alphabeticization. That's about all though.
function sortPool() {
  const sortFun = (a, b) => {
    if (a.section !== b.section) return a.section < b.section ? -1 : 1;
    else if (a.title !== b.title) return a.title < b.title ? -1 : 1;
    else if (a.entryID !== b.entryID) return a.entryID < b.entryID ? -1 : 1;
    else return 0;
  };
  setEntryPool(
    immer.produce(EntryPool, (draft) => {
      const a = new Map([...draft.entries()].sort((a, b) => sortFun(a[1], b[1])));
      return a;
    })
  );
}

// Entry Pool - TUI Version of UI. Prints out everything you might need. Good for a REPL!
function printPool() {
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
  sortPool();
  const printInterator = EntryPool.entries();
  for (const kv of printInterator) {
    result += entryDisplayName(kv[1]) + "\n";
  }
  console.log(result);
}

// Entry Pool - Export Pool so user can save for later use. Array of Entry Objects.
function exportPool() {
  sortPool();
  console.log("Here is your current pool! Save it somewhere.");
  console.log(
    JSON.stringify(
      [...EntryPool.entries()].map((x) => x[1]),
      null,
      2
    )
  );
}

// Entry Pool - Create an Entry Pool object from the equivalent JSON. Doesn't load it in.
function createPool(json) {
  const entryArr = JSON.parse(json);
  const result = new Map();
  for (const entry of entryArr) {
    result.set(entry.entryID, entry);
    genEntryID();
    for (const desc in entry.desc) {
      genDescID;
    }
  }
  setEntryPool(result);
}
