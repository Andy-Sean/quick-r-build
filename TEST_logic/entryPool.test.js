import { addEntry, deleteEntry, editEntry, toggleEntry, addDesc, deleteDesc, editDesc, toggleDesc, moveDescLocal, moveDescGlobal, sortPool, sortPrintPool, createPool, sortExportPool, EntryPool, setEntryPool, resetEntryID, resetDescID, setResumeEntries, appendSection, ResumeEntries, removeSection, renameSection, attachEntry, removeEntry, moveItem } from "./entryPool";

function EntryMaker(entryID, section, title, subtitle, startDate, endDate, link, desc, active) {
  return { entryID, section, title, subtitle, startDate, endDate, link, desc, active };
}
function DescMaker(descID, entryID, active, desc) {
  return { descID, entryID, active, desc };
}

describe("Basic Entry Manipulation", () => {
  beforeEach(() => {
    setEntryPool(new Map());
    resetEntryID();
    resetDescID();
  });

  it("addEntry should work", function () {
    setEntryPool(addEntry("Education", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", ""));
    const result = new Map();
    result.set(0, EntryMaker(0, "Education", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", "", [], false));
    expect(EntryPool).toEqual(result);
    setEntryPool(addEntry("", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", ""));
    result.set(1, EntryMaker(1, "Default", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", "", [], false));
    expect(EntryPool).toEqual(result);
  });

  it("deleteEntry should work - both error and normal case", function () {
    setEntryPool(addEntry("Education", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", ""));
    setEntryPool(addEntry("HJKS", "asdf", "High Skol Diploma", "Sept 2000", "Jun 2006", ""));
    setEntryPool(deleteEntry(1));
    const result = new Map();
    result.set(0, EntryMaker(0, "Education", "El High", "High Skol Diploma", "Sept 1000", "Jun 1006", "", [], false));
    expect(EntryPool).toEqual(result);

    expect(() => {
      setEntryPool(deleteEntry(2));
    }).toThrowError("Entry with ID 2 not found.");

    setEntryPool(deleteEntry(0));
    expect(EntryPool).toEqual(new Map());
  });

  it("editEntry should work - normal, default section, error", function () {
    setEntryPool(addEntry("Award", "First Place Euclid", "University of Waterloo", "", "Apr 2077", ""));
    setEntryPool(editEntry(0, "Awards", "First Place Euclid", "University of Waterloo", "", "Apr 2077", ""));
    const result = new Map();
    result.set(0, EntryMaker(0, "Awards", "First Place Euclid", "University of Waterloo", "", "Apr 2077", "", [], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(editEntry(0, "", "First Place Euclid", "University of Waterloo", "", "Apr 2077", ""));
    result.set(0, EntryMaker(0, "Default", "First Place Euclid", "University of Waterloo", "", "Apr 2077", "", [], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(editEntry(5, "", "A", "", "", "", ""))).toThrowError("Entry with ID 5 not found.");
  });

  it("toggleEntry should work - normal and error", function () {
    setEntryPool(addEntry("Experience", "Peer Math Tutor", "Self Employed/Volunteer", "20000 BC", "", "https://andoitutors.wordpress.com"));
    setEntryPool(toggleEntry(0));
    const result = new Map();
    result.set(0, EntryMaker(0, "Experience", "Peer Math Tutor", "Self Employed/Volunteer", "20000 BC", "", "https://andoitutors.wordpress.com", [], true));
    expect(EntryPool).toEqual(result);

    setEntryPool(toggleEntry(0));
    result.set(0, EntryMaker(0, "Experience", "Peer Math Tutor", "Self Employed/Volunteer", "20000 BC", "", "https://andoitutors.wordpress.com", [], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(toggleEntry(69))).toThrowError("Entry with ID 69 not found.");
  });
});

describe("Descriptions!", () => {
  beforeEach(() => {
    setEntryPool(new Map());
    resetEntryID();
    resetDescID();
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
  });

  it("Adding Descriptions (three). Also check for erroring if not found.", function () {
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(1, "Extracurriculars: Business Case Competitions"));
    setEntryPool(addDesc(0, "Extracurriculars: MathNEWS, Double Degree Club"));

    const result = new Map();
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0"), DescMaker(2, 0, false, "Extracurriculars: MathNEWS, Double Degree Club")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(1, 1, false, "Extracurriculars: Business Case Competitions")], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(addDesc(15, "IS TOTALLY NOT A FURRY WHAT ARE U TALKING ABOUT"))).toThrowError("Entry with ID 15 not found.");
  });

  it("Deleting Descriptions - 2 Potential Errors.", function () {
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(1, "Extracurriculars: Business Case Competitions"));
    setEntryPool(deleteDesc(0, 0));

    const result = new Map();
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(1, 1, false, "Extracurriculars: Business Case Competitions")], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(deleteDesc(0, 4))).toThrowError("Entry with ID 4 not found.");
    expect(() => setEntryPool(deleteDesc(5, 1))).toThrowError("Description with ID 5 not found under Entry with ID 1.");
  });

  it("Editing Descriptions - 2 Potential Errors.", function () {
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(1, "Extracurriculars: Business Case Competitions"));
    setEntryPool(editDesc(1, 1, "I DONT DO EXTRACURRICULARS!!!"));

    const result = new Map();
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(1, 1, false, "I DONT DO EXTRACURRICULARS!!!")], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(editDesc(0, 4, "Asdfasdf"))).toThrowError("Entry with ID 4 not found.");
    expect(() => setEntryPool(editDesc(5, 1, "asdfasdf"))).toThrowError("Description with ID 5 not found under Entry with ID 1.");
  });

  it("Toggling Descriptions - 2 Potential Errors ofc.", function () {
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(0, "GPA: 5.0"));
    setEntryPool(toggleDesc(1, 0));

    const result = new Map();
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [], false));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0"), DescMaker(1, 0, true, "GPA: 5.0")], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(toggleDesc(1, 0));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0"), DescMaker(1, 0, false, "GPA: 5.0")], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(toggleDesc(0, 4))).toThrowError("Entry with ID 4 not found.");
    expect(() => setEntryPool(toggleDesc(5, 1))).toThrowError("Description with ID 5 not found under Entry with ID 1.");
  });
});

describe("Descriptions now need to move around...", () => {
  beforeEach(function () {
    setEntryPool(new Map());
    resetEntryID();
    resetDescID();
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
  });

  it("moveDescLocal shuffling - also error checking but of course.", function () {
    const result = new Map();
    setEntryPool(addDesc(0, "GPA: 1.0"));
    setEntryPool(addDesc(0, "GPA: 2.0"));
    setEntryPool(addDesc(0, "GPA: 3.0"));
    setEntryPool(addDesc(0, "GPA: 4.0"));

    setEntryPool(moveDescLocal(0, 0, 3));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(2, 0, false, "GPA: 3.0"), DescMaker(3, 0, false, "GPA: 4.0"), DescMaker(0, 0, false, "GPA: 1.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(moveDescLocal(2, 0, 0));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(2, 0, false, "GPA: 3.0"), DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(3, 0, false, "GPA: 4.0"), DescMaker(0, 0, false, "GPA: 1.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(moveDescLocal(3, 0, 1));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(2, 0, false, "GPA: 3.0"), DescMaker(3, 0, false, "GPA: 4.0"), DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(0, 0, false, "GPA: 1.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(moveDescLocal(0, 4, 1))).toThrowError("Entry with ID 4 not found.");
    expect(() => setEntryPool(moveDescLocal(5, 1, 1))).toThrowError("Description with ID 5 not found under Entry with ID 1.");
    expect(() => setEntryPool(moveDescLocal(0, 0, -2))).toThrowError("Invalid Index. Index must be an integer between 0 and 3.");
    expect(() => setEntryPool(moveDescLocal(3, 0, 4))).toThrowError("Invalid Index. Index must be an integer between 0 and 3.");
    expect(() => setEntryPool(moveDescLocal(3, 0, "apples"))).toThrowError("Invalid Index. Index must be an integer between 0 and 3.");
  });

  it("moveDescGlobal shuffling - also error checking but of course. So many cases", function () {
    const result = new Map();
    setEntryPool(addDesc(0, "GPA: 1.0"));
    setEntryPool(addDesc(0, "GPA: 2.0"));
    setEntryPool(addDesc(0, "GPA: 3.0"));
    setEntryPool(addDesc(0, "GPA: 4.0"));

    setEntryPool(moveDescGlobal(0, 0, 1, 0));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(2, 0, false, "GPA: 3.0"), DescMaker(3, 0, false, "GPA: 4.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(0, 1, false, "GPA: 1.0")], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(moveDescGlobal(2, 0, 1, 0));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(3, 0, false, "GPA: 4.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(2, 1, false, "GPA: 3.0"), DescMaker(0, 1, false, "GPA: 1.0")], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(moveDescGlobal(3, 0, 1, 2));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(1, 0, false, "GPA: 2.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(2, 1, false, "GPA: 3.0"), DescMaker(0, 1, false, "GPA: 1.0"), DescMaker(3, 1, false, "GPA: 4.0")], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(moveDescGlobal(2, 1, 0, 1));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(1, 0, false, "GPA: 2.0"), DescMaker(2, 0, false, "GPA: 3.0")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(0, 1, false, "GPA: 1.0"), DescMaker(3, 1, false, "GPA: 4.0")], false));
    expect(EntryPool).toEqual(result);

    expect(() => setEntryPool(moveDescGlobal(0, 4, 1, 1))).toThrowError("Entry with ID 4 not found.");
    expect(() => setEntryPool(moveDescGlobal(0, 0, 47, 1))).toThrowError("Entry with ID 47 not found.");
    expect(() => setEntryPool(moveDescGlobal(5, 1, 0, 1))).toThrowError("Description with ID 5 not found under Entry with ID 1.");
    expect(() => setEntryPool(moveDescGlobal(1, 0, 1, -2))).toThrowError("Invalid Index. Index must be an integer between 0 and 2.");
    expect(() => setEntryPool(moveDescGlobal(2, 0, 1, 3))).toThrowError("Invalid Index. Index must be an integer between 0 and 2.");
    expect(() => setEntryPool(moveDescGlobal(3, 1, 0, "apples"))).toThrowError("Invalid Index. Index must be an integer between 0 and 2.");
  });
});

describe("Printing and Sorting ulitities", () => {
  beforeEach(function () {
    setEntryPool(new Map());
    resetEntryID();
    resetDescID();
  });

  it("sortPool should do it's thing", function () {
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
    setEntryPool(addEntry("Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(0, "Extracurriculars: idk things"));
    setEntryPool(addDesc(1, "Professional Fursuiter uh I mean MASCOT MASCOT"));
    setEntryPool(addDesc(1, "h"));
    setEntryPool(addDesc(2, "It was a small competition but we WON"));
    setEntryPool(addDesc(3, "I didn't learn DP :("));
    setEntryPool(addDesc(4, "Still didn't learn DP :("));
    setEntryPool(sortPool());
    const result = new Map();
    result.set(2, EntryMaker(2, "Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", "", [DescMaker(4, 2, false, "It was a small competition but we WON")], false));
    result.set(3, EntryMaker(3, "Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", "", [DescMaker(5, 3, false, "I didn't learn DP :(")], false));
    result.set(4, EntryMaker(4, "Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", "", [DescMaker(6, 4, false, "Still didn't learn DP :(")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(2, 1, false, "Professional Fursuiter uh I mean MASCOT MASCOT"), DescMaker(3, 1, false, "h")], false));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0"), DescMaker(1, 0, false, "Extracurriculars: idk things")], false));
    expect(EntryPool).toEqual(result);
  });

  it("Show Off Print", () => {
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
    setEntryPool(addEntry("Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(0, "Extracurriculars: idk things"));
    setEntryPool(addDesc(1, "Professional Fursuiter uh I mean MASCOT MASCOT"));
    setEntryPool(addDesc(1, "h"));
    setEntryPool(addDesc(2, "It was a small competition but we WON"));
    setEntryPool(addDesc(3, "I didn't learn DP :("));
    setEntryPool(addDesc(4, "Still didn't learn DP :("));
    setEntryPool(addEntry("Thing", "", "CEMC", "Aug 3000", "", "https://CCC"));
    setEntryPool(addEntry("Thing", "", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addEntry("Thing", "", "", "Aug 3000", "", ""));
    setEntryPool(addEntry("Thing", "", "", "", "", ""));
    setEntryPool(toggleEntry(1));
    setEntryPool(toggleDesc(1, 0));
    const result = sortPrintPool();
    // console.log(`printPool() result: \n${result}`)
    // I can't really... expect it to do anything...
  });

  it("Show Off sortExportPool", () => {
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
    setEntryPool(addEntry("Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(0, "Extracurriculars: idk things"));
    setEntryPool(addDesc(1, "Professional Fursuiter uh I mean MASCOT MASCOT"));
    setEntryPool(addDesc(1, "h"));
    setEntryPool(addDesc(2, "It was a small competition but we WON"));
    setEntryPool(addDesc(3, "I didn't learn DP :("));
    setEntryPool(addDesc(4, "Still didn't learn DP :("));
    setEntryPool(addEntry("Thing", "", "CEMC", "Aug 3000", "", "https://CCC"));
    setEntryPool(addEntry("Thing", "", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addEntry("Thing", "", "", "Aug 3000", "", ""));
    setEntryPool(addEntry("Thing", "", "", "", "", ""));
    setEntryPool(toggleEntry(1));
    setEntryPool(toggleDesc(1, 0));
    const result = sortExportPool();
    // console.log(`exportPool() result: \n${result}`)
  });

  it("createPool should work", function () {
    const data = `
    [
      {
        "entryID": 2,
        "section": "Awards",
        "title": "Business Case Competition Winner",
        "subtitle": "Some Student Association",
        "startDate": "",
        "endDate": "Jan 2023",
        "link": "",
        "desc": [
          {
            "entryID": 2,
            "desc": "It was a small competition but we WON",
            "active": false,
            "descID": 4
          }
        ],
        "active": false
      },
      {
        "entryID": 3,
        "section": "Awards",
        "title": "CCC Senior top 50% cuz I SUCK :(",
        "subtitle": "CEMC",
        "startDate": "Aug 2999",
        "endDate": "",
        "link": "",
        "desc": [
          {
            "entryID": 3,
            "desc": "I didn't learn DP :(",
            "active": false,
            "descID": 5
          }
        ],
        "active": false
      },
      {
        "entryID": 4,
        "section": "Awards",
        "title": "CCC Senior top 50% cuz I SUCK :(",
        "subtitle": "CEMC",
        "startDate": "Aug 3000",
        "endDate": "",
        "link": "",
        "desc": [
          {
            "entryID": 4,
            "desc": "Still didn't learn DP :(",
            "active": false,
            "descID": 6
          }
        ],
        "active": false
      },
      {
        "entryID": 1,
        "section": "Education",
        "title": "Bachelor of BA",
        "subtitle": "WLU",
        "startDate": "Sep 2022",
        "endDate": "",
        "link": "",
        "desc": [
          {
            "entryID": 1,
            "desc": "Professional Fursuiter uh I mean MASCOT MASCOT",
            "active": false,
            "descID": 2
          },
          {
            "entryID": 1,
            "desc": "h",
            "active": false,
            "descID": 3
          }
        ],
        "active": true
      },
      {
        "entryID": 0,
        "section": "Education",
        "title": "Bachelor of CS",
        "subtitle": "UW",
        "startDate": "Sep 2022",
        "endDate": "",
        "link": "",
        "desc": [
          {
            "entryID": 0,
            "desc": "GPA: 4.0",
            "active": false,
            "descID": 0
          },
          {
            "entryID": 0,
            "desc": "Extracurriculars: idk things",
            "active": true,
            "descID": 1
          }
        ],
        "active": false
      }
    ]
    `;
    setEntryPool(createPool(data));
    const result = new Map();
    result.set(2, EntryMaker(2, "Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", "", [DescMaker(4, 2, false, "It was a small competition but we WON")], false));
    result.set(3, EntryMaker(3, "Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", "", [DescMaker(5, 3, false, "I didn't learn DP :(")], false));
    result.set(4, EntryMaker(4, "Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", "", [DescMaker(6, 4, false, "Still didn't learn DP :(")], false));
    result.set(1, EntryMaker(1, "Education", "Bachelor of BA", "WLU", "Sep 2022", "", "", [DescMaker(2, 1, false, "Professional Fursuiter uh I mean MASCOT MASCOT"), DescMaker(3, 1, false, "h")], true));
    result.set(0, EntryMaker(0, "Education", "Bachelor of CS", "UW", "Sep 2022", "", "", [DescMaker(0, 0, false, "GPA: 4.0"), DescMaker(1, 0, true, "Extracurriculars: idk things")], false));
    expect(EntryPool).toEqual(result);

    setEntryPool(addEntry("", "A", "", "", "", ""));
    setEntryPool(addDesc(5, "H"));
    result.set(5, EntryMaker(5, "", "A", "", "", "", "", [DescMaker(7, 5, false, "H")], false));
  });
});

describe("Time for Resume Entries Array", () => {
  beforeEach(() => {
    setEntryPool(new Map());
    resetEntryID();
    resetDescID();
    setEntryPool(addEntry("Education", "Bachelor of CS", "UW", "Sep 2022", "", ""));
    setEntryPool(addEntry("Education", "Bachelor of BA", "WLU", "Sep 2022", "", ""));
    setEntryPool(addEntry("Awards", "Business Case Competition Winner", "Some Student Association", "", "Jan 2023", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 2999", "", ""));
    setEntryPool(addEntry("Awards", "CCC Senior top 50% cuz I SUCK :(", "CEMC", "Aug 3000", "", ""));
    setEntryPool(addDesc(0, "GPA: 4.0"));
    setEntryPool(addDesc(0, "Extracurriculars: idk things"));
    setEntryPool(addDesc(1, "Professional Fursuiter uh I mean MASCOT MASCOT"));
    setEntryPool(addDesc(1, "h"));
    setEntryPool(addDesc(2, "It was a small competition but we WON"));
    setEntryPool(addDesc(3, "I didn't learn DP :("));
    setEntryPool(addDesc(4, "Still didn't learn DP :("));
    setResumeEntries([[], ["Default"]]);
  });

  it("appendSections should work or error.", function () {
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    expect(ResumeEntries).toEqual([["Education", "Awards"], ["Default"]]);

    expect(() => setResumeEntries(appendSection("Default"))).toThrowError("Cannot alter/create Default section! It's built in, sorry.");
    expect(() => setResumeEntries(appendSection("Awards"))).toThrowError("Already a Section named Awards!");
  });

  it("removeSections - work and errors", function () {
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    setResumeEntries(removeSection("Awards"));
    expect(ResumeEntries).toEqual([["Education"], ["Default"]]);

    expect(() => setResumeEntries(removeSection("Default"))).toThrowError("Cannot alter/create Default section! It's built in, sorry.");
    expect(() => setResumeEntries(removeSection("Q"))).toThrowError('"Q" section not found!');
  });

  it("renameSections - work and errors", function () {
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    setResumeEntries(renameSection("Awards", "RAWR"));
    expect(ResumeEntries).toEqual([["Education", "RAWR"], ["Default"]]);

    expect(() => setResumeEntries(renameSection("Default", "asdf"))).toThrowError("Cannot alter/create Default section! It's built in, sorry.");
    expect(() => setResumeEntries(renameSection("Q", "ee"))).toThrowError('"Q" section not found!');
    expect(() => setResumeEntries(renameSection("Education", "RAWR"))).toThrowError("Already a Section named RAWR!");
    expect(() => setResumeEntries(renameSection("Education", "Default"))).toThrowError("Cannot alter/create Default section! It's built in, sorry.");
  });

  it("attachEntry should work plsplspls", function () {
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    setEntryPool(addEntry("", "Defaulty", "", "", "", "")); //entry 5
    setEntryPool(addEntry("Fuzzy", "Defaulty", "", "", "", "")); //entry 6

    setResumeEntries(attachEntry(5));
    expect(ResumeEntries).toEqual([
      ["Education", "Awards"],
      ["Default", 5],
    ]);
    setResumeEntries(attachEntry(2));
    setResumeEntries(attachEntry(4));
    setResumeEntries(attachEntry(0));
    expect(ResumeEntries).toEqual([
      ["Education", 0, "Awards", 2, 4],
      ["Default", 5],
    ]);
    setResumeEntries(attachEntry(6));
    expect(ResumeEntries).toEqual([
      ["Education", 0, "Awards", 2, 4],
      ["Default", 5, 6],
    ]);
    expect(() => setResumeEntries(attachEntry(0))).toThrowError("Entry with ID 0 already exists in the Entry List.");
    expect(() => setResumeEntries(attachEntry(19))).toThrowError("Entry with ID 19 not found.");
    // console.log("Post attachEntry:\n" + sortPrintPool());
  });

  it("removeEntry must also do things", function () {
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    setEntryPool(addEntry("", "Defaulty", "", "", "", "")); //entry 5
    setResumeEntries(attachEntry(5));
    setResumeEntries(attachEntry(2));
    setResumeEntries(attachEntry(4));
    // console.log("Pre removeEntry: \n" + sortPrintPool())
    setResumeEntries(removeEntry(2));
    setResumeEntries(removeEntry(5));
    expect(ResumeEntries).toEqual([["Education", "Awards", 4], ["Default"]]);
    // console.log("Post removeEntry: \n" + sortPrintPool());
    expect(() => setResumeEntries(removeEntry(69))).toThrowError("Entry with ID 69 not found.");
    expect(() => setResumeEntries(removeEntry(2))).toThrowError("You haven't added Entry with ID 2 to the Entry List.");
  });

  it("moveItem works", function () {
    setEntryPool(addEntry("", "Defaulty", "", "", "", "")); //entry 5
    setResumeEntries(appendSection("Education"));
    setResumeEntries(appendSection("Awards"));
    setResumeEntries(attachEntry(5));
    setResumeEntries(attachEntry(2)); // [ Education, Awards, 2, Default, 5 ]
    setResumeEntries(moveItem(0, 1));
    expect(ResumeEntries).toEqual([
      ["Awards", "Education", 2],
      ["Default", 5],
    ]);
    setResumeEntries(moveItem(2, 4));
    expect(ResumeEntries).toEqual([
      ["Awards", "Education"],
      ["Default", 5, 2],
    ]);
    setResumeEntries(moveItem(3, 1));
    expect(ResumeEntries).toEqual([
      ["Awards", 5, "Education"],
      ["Default", 2],
    ]);
    setResumeEntries(moveItem(3, 4));
    expect(ResumeEntries).toEqual([["Awards", 5, "Education", 2], ["Default"]]);

    expect(() => setResumeEntries(moveItem(0, 4))).toThrowError("Default must be the last section!");
    expect(() => setResumeEntries(moveItem(1, 0))).toThrowError("Must start with a Section!");
    expect(() => setResumeEntries(moveItem(-1, 0))).toThrowError("Index Out of Bounds! It must be between 0 and 4");
    expect(() => setResumeEntries(moveItem(999, 0))).toThrowError("Index Out of Bounds! It must be between 0 and 4");
    expect(() => setResumeEntries(moveItem(1, -1))).toThrowError("Index Out of Bounds! It must be between 0 and 4");
    expect(() => setResumeEntries(moveItem(1, 999))).toThrowError("Index Out of Bounds! It must be between 0 and 4");
  });
});
