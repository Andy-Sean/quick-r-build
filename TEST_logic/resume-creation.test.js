import {
  EntryPool,
  addEntry,
  editEntry,
  toggleEntry,
  setEntryPool,
  addDesc,
  deleteEntry,
  deleteDesc,
  editDesc,
  toggleDesc,
  moveDescLocal,
  MoveDescGlobal,
  sortPool,
} from "./resume-creation";

test("EntryPool be empty?", () => {
  expect(EntryPool).toStrictEqual(new Map());
});

test("Add Entry", () => {
  addEntry("asd", "asd", "a", "Oct", "Nov", "");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e0",
        {
          entryID: "e0",
          active: false,
          desc: [],
          endDate: "Nov",
          link: "",
          section: "asd",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Add Entry (No section)", () => {
  setEntryPool(new Map());
  addEntry("", "asd", "a", "Oct", "Nov", "");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e1",
        {
          entryID: "e1",
          active: false,
          desc: [],
          endDate: "Nov",
          link: "",
          section: "Default",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Edit Entry", () => {
  setEntryPool(new Map());
  addEntry("", "asd", "a", "Oct", "Nov", "");
  editEntry("e2", "AAAAAAA", "asd", "a", "Oct", "Nov", "");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: false,
          desc: [],
          endDate: "Nov",
          link: "",
          section: "AAAAAAA",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Toggle and then Edit", () => {
  toggleEntry("e2");
  editEntry("e2", "BBBBBB", "asd", "a", "Oct", "Nov", "");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Add a Desc!", () => {
  addDesc("e2", "ATE FOOD LIKE A CHAMP.");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d0",
              entryID: "e2",
              active: false,
              desc: "ATE FOOD LIKE A CHAMP.",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("deleteEntry should not do anything and print", () => {
  deleteEntry("ashdf");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d0",
              entryID: "e2",
              active: false,
              desc: "ATE FOOD LIKE A CHAMP.",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("editDesc", () => {
  editDesc("e2", "d0", "FURRY");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d0",
              entryID: "e2",
              active: false,
              desc: "FURRY",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("toggleDesc", () => {
  toggleDesc("e2", "d0");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d0",
              entryID: "e2",
              active: true,
              desc: "FURRY",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Add and move", () => {
  addDesc("e2", "DRAGON");
  // console.dir(EntryPool.get("e2").desc);
  moveDescLocal("d0", "e2", 1);
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d1",
              entryID: "e2",
              active: false,
              desc: "DRAGON",
            },
            {
              descID: "d0",
              entryID: "e2",
              active: true,
              desc: "FURRY",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("deleteDesc", () => {
  deleteDesc("e2", "d0");
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [
            {
              descID: "d1",
              entryID: "e2",
              active: false,
              desc: "DRAGON",
            },
          ],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
    ])
  );
});

test("Global Move", () => {
  addEntry("A", "Two", "as", "", "", "");
  MoveDescGlobal("d1", "e2", "e3", 0);
  expect(EntryPool).toStrictEqual(
    new Map([
      [
        "e2",
        {
          entryID: "e2",
          active: true,
          desc: [],
          endDate: "Nov",
          link: "",
          section: "BBBBBB",
          startDate: "Oct",
          subtitle: "a",
          title: "asd",
        },
      ],
      [
        "e3",
        {
          entryID: "e3",
          active: false,
          desc: [
            {
              descID: "d1",
              entryID: "e2",
              active: false,
              desc: "DRAGON",
            },
          ],
          endDate: "",
          link: "",
          section: "A",
          startDate: "",
          subtitle: "as",
          title: "Two",
        },
      ],
    ])
  );
});

test('Do nothing', () => {
  sortDisplayPool();
  expect(1+1).toBe(2);
})
