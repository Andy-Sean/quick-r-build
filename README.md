# Quick R Build

Quick-R-Build an application that helps store resume data and quickly compile resumes into PDF.
It is designed to handle resume variants well - think of it as "Block Coding" for your resume!

## Current Status

Development still is greatly underway... UI not done.

However, we have something to show! You can use a Terminal Variant of the Program using a Node.js REPL.
To start:

1. You technically only need the file "entryPool-repl.js". Its in the TEST_logic folder.
2. Run the following on the terminal:

```
node
.load entryPool-repl.js // or otherwise navigate to the file
```

3. This will boot in the file and cause a bunch of terminal stuff to input. That's normal. You should see `undefined` when it's done.
4. Use like a REPL! :)

## Commands (ADT Interface?) (API?)

- Entries have an unique ID, the number in the square brackets. \[X\]. Descriptions under an entry are similarly tagged, their square brackets denoting the Description ID. Use `printPool()` to see them.
- Entries and Descriptions can be 'On' or 'Off'. The system for this has yet to be implemented so you can ignore it.

### Entries

- `printPool()` - prints out the current entries in the system. You want to have this handy after other commands, as it will give you the info needed to access entries.
- `addEntry(section, title, subtitle, startDate, endDate, link)` - add a new entry to the system. All fields are optional. If no section is specified, the section is switched to `Default` automatically.
- `deleteEntry(entryID)` - deletes the associated entry from the system.
- `editEntry(entryID, section, title, subtitle, startDate, endDate, link)` - rewrite an entry. Sadly, you **NEED TO DUPLICATE FIELDS EVEN IF YOU DON'T WANT TO EDIT THEM** (Only way that makes sense sadly in a terminal)
- `toggleEntry(entryID)` - toggles an Entry on/off. No real effect for now.

### Descriptions

- `addDesc(entryID, desc)` - adds a Description to an Entry! These are the contents of each item usually.
- `deleteDesc(descID, entryID)` - delete the Description with descID under entryID. Again, `printPool()` gives the details.
- `editDesc(descID, entryID, desc)` - similar to `editEntry(...)`, but descriptions.
- `toggleDesc(descID, entryID)` - also does nothing for now, just turns descriptions on/off.

### Description Shuffling

- Descriptions are internally stored as a zero indexed array. This means you can move them around if you want.
- `moveDescLocal(descID, entryID, newIndex)` - move a description with descID under entryID so that it is the `newIndex`th item in the array. It stays under the same entry.
  - _0 <= newIndex < (number of descriptions currently present)_
- `moveDescGlobal(descID, entryID, newEntryID, newIndex)` - moves description with descID under entryID so that it is now under `newEntryID` as the `newIndex`th item.
  - _0 <= newIndex <= (number of descriptions currently present)_

### Utilities

- `sortPool()` - sorts the entries alphabetically - first by section, then title, then entryID if no title was found. This is called automatically before `printPool()` and `exportPool()` calls, so don't really worry about this one.
- `printPool()` - nice display of the data stored in the system.
- `exportPool()` - returns a JSON file representing the data stored. Copy it down and keep this safe if you want to reuse the data!
  - (or alternatively use the Node REPL `.save` feature to let you save your code progress to a new file)
- `loadPool(json)` - give it a JSON string (from exportPool), and it will populate the system with the data inside. If you throw in your own data, we aren't responsible for anything strange that happens.


## Differences from non-REPL implementation (Development Details)

- functions do not directly manipulate internal state
- different names for functions
- will have a UI endpoint so it is more accessible lol
