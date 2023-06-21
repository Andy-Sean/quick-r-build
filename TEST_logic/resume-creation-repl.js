// This works with the REPL

// Immer makes State (with Map / Nesting) much MUCH less painful
const immer = require("immer");
immer.enableMapSet();
// const produce = require("immer");

// IDs
let entryID = 0;
let descID = 0;
const genEntryID = () => "e" + entryID++;
const genDescID = () => "d" + descID++;

// States
let EntryPool = new Map();
const setEntryPool = (thing) => {
  if (typeof thing === "function") EntryPool = thing(EntryPool);
  else EntryPool = thing;
};

// ----------------------------------------------------------------------

// Adding Entries to the Pool of Entries
function addEntry(section, title, subtitle, startDate, endDate, link) {
  const entryID = genEntryID();
  const newEntry = {
    entryID,
    section: section === "" ? "Default" : section,
    title,
    subtitle,
    startDate,
    endDate,
    link,
    desc: [],
    active: false,
  };
  const nextPool = immer.produce(EntryPool, (draft) => {
    draft.set(entryID, newEntry);
  });
  setEntryPool(nextPool);
  return;
}

// Deleting form the Pool
function deleteEntry(entryID) {
  let success;
  const nextPool = immer.produce(EntryPool, (draft) => {
    success = draft.delete(entryID);
  });
  if (!success) {
    console.log(`${entryID} didn't exist in Map. Try again, maybe a typo?`);
    return;
  }
  setEntryPool(nextPool);
  return;
}

// Edit an Entry
function editEntry(
  entryID,
  section,
  title,
  subtitle,
  startDate,
  endDate,
  link
) {
  if (!EntryPool.get(entryID)) {
    console.log(`Couldn't find entry ${entryID}. Try again?`);
    return;
  }
  const newEntry = {
    ...EntryPool.get(entryID),
    section: section === "" ? "Default" : section,
    title,
    subtitle,
    startDate,
    endDate,
    link,
  };
  const nextPool = immer.produce(EntryPool, (draft) => {
    draft.set(entryID, newEntry);
  });
  setEntryPool(nextPool);
  return;
}

// Toggle if a Given Entry is active (in use in the Resume)
function toggleEntry(entryID) {
  const nextPool = immer.produce(EntryPool, (draft) => {
    draft.get(entryID).active = !draft.get(entryID).active;
  });
  setEntryPool(nextPool);
  return;
}

// ----------------------------------------------------------------------

// Add a Description to a certain Entry
function addDesc(entryID, desc) {
  const newDesc = {
    entryID,
    desc,
    active: false,
    descID: genDescID(),
  };
  const nextPool = immer.produce(EntryPool, (draft) => {
    draft.get(entryID).desc.push(newDesc);
  });
  setEntryPool(nextPool);
  return;
}

function deleteDesc(entryID, descID) {
  if (!EntryPool.has(entryID)) {
    console.log("Invalid Entry ID, try again.");
    return;
  }
  const nextPool = immer.produce(EntryPool, (draft) => {
    const delIndex = draft
      .get(entryID)
      .desc.findIndex((x) => x.descID === descID);
    if (delIndex !== -1) draft.get(entryID).desc.splice(delIndex, 1);
  });
  setEntryPool(nextPool);
  return;
}

function editDesc(entryID, descID, desc) {
  if (!EntryPool.get(entryID)) {
    console.log(`Bad EntryID: ${entryID}. Try again?`);
    return;
  }
  if (
    EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID) === -1
  ) {
    console.log(`Couldn't find the Description ${descID}. Try again?`);
    return;
  }
  let index = EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID);
  const newDesc = {
    ...EntryPool.get(entryID).desc[index],
    desc,
  };
  const nextPool = immer.produce(EntryPool, (draft) => {
    console.log(EntryPool.get(entryID).desc);
    draft.get(entryID).desc[index] = newDesc;
  });
  setEntryPool(nextPool);
  return;
}

function toggleDesc(entryID, descID) {
  if (!EntryPool.get(entryID)) {
    console.log(`Bad EntryID: ${entryID}. Try again?`);
    return;
  }
  if (
    EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID) === -1
  ) {
    console.log(`Couldn't find the Description ${descID}. Try again?`);
    return;
  }
  const nextPool = immer.produce(EntryPool, (draft) => {
    const index = draft.get(entryID).desc.findIndex((x) => descID === x.descID);
    draft.get(entryID).desc[index].active =
      !draft.get(entryID).desc[index].active;
  });
  setEntryPool(nextPool);
  return;
}

function moveDescLocal(descID, entryID, newIndex) {
  if (!EntryPool.get(entryID)) {
    console.log(`Bad EntryID: ${entryID}. Try again?`);
    return;
  }
  if (
    EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID) === -1
  ) {
    console.log(`Couldn't find the Description ${descID}. Try again?`);
    return;
  }
  if (newIndex < 0 || newIndex > EntryPool.get(entryID).desc.length) {
    console.log(
      `Out of range! The length is ${
        EntryPool.get(entryID).desc.length
      }. Try again.`
    );
    return;
  }
  const nextPool = immer.produce(EntryPool, (draft) => {
    const oldIndex = draft
      .get(entryID)
      .desc.findIndex((x) => x.descID === descID);
    const [toMove] = draft.get(entryID).desc.splice(oldIndex, 1);
    draft.get(entryID).desc.splice(newIndex, 0, toMove);
  });
  setEntryPool(nextPool);
  return;
}

function moveDescGlobal(descID, entryID, newEntryID, newIndex) {
  if (!EntryPool.get(entryID)) {
    console.log(`Bad EntryID: ${entryID}. Try again?`);
    return;
  }
  if (!EntryPool.get(newEntryID)) {
    console.log(`Bad newEntryID: ${newEntryID}. Try again?`);
    return;
  }
  if (
    EntryPool.get(entryID).desc.findIndex((x) => x.descID === descID) === -1
  ) {
    console.log(`Couldn't find the Description ${descID}. Try again?`);
    return;
  }
  if (newIndex < 0 || newIndex > EntryPool.get(newEntryID).desc.length) {
    console.log(
      `Out of range! The length is ${
        EntryPool.get(newEntryID).desc.length
      }. Try again.`
    );
    return;
  }
  const nextPool = immer.produce(EntryPool, (draft) => {
    const oldIndex = draft
      .get(entryID)
      .desc.findIndex((x) => x.descID === descID);
    let [toMove] = draft.get(entryID).desc.splice(oldIndex, 1);
    toMove = {...toMove, entryID: newEntryID}
    draft.get(newEntryID).desc.splice(newIndex, 0, toMove);
  });
  setEntryPool(nextPool);
  return;
}

// ----------------------------------------------------------------------

// sort the Pool
function sortPool() {
  const sortFun = (a, b) => {
    if (a.section !== b.section) return a.section < b.section ? -1 : 1;
    else if (a.title !== b.title) return a.title < b.title ? -1 : 1;
    else if (a.entryID !== b.entryID) return a.entryID < b.entryID ? -1 : 1;
    else return 0;
  };
  const sortPool = immer.produce(EntryPool, (draft) => {
    const a = new Map([...draft.entries()].sort((a,b) => sortFun(a[1], b[1])));
    return a;
  });
  setEntryPool(sortPool);
  return;
}

function printPool() {
  const printInterator = EntryPool.entries();
  for (const kv of printInterator) {
    console.log(JSON.stringify(kv[1], null, 2))
  }
}
