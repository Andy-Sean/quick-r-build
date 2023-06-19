import { useState } from "react";
import styles from "../styles/add-entry-styles.module.css"

function AddEntryForm() {
  return (
  <>
    <form id={styles.AddEntryPopup} method="dialog">
      <p>*Required</p>
      <label for="title">Title:</label> <input type="text" id="title" name="title" placeholder="Ex. Junior Intern"/>
      <label for="subtitle">Subtitle:</label> <input type="text" id="subtitle" name="subtitle" placeholder="Ex. FAANG Corp."/>
      <label for="section">Section (make this an option later lol)*:</label> <input type="text" id="section" name="section" placeholder="Ex. Work Experience" required/>

      <fieldset>
        <legend>Date:</legend>
        <label for="startDate">Starting Date:</label> <input type="date" id="startDate" name="startDate"/>
        <label for="endDate">End Date:</label> <input type="date" id="endDate" name="endDate"/>
        <input type="radio" id="default" name="date_tweak" value=""/><label for="default" checked="true">Default / No Date</label>
        <input type="radio" id="present" name="date_tweak" value=""/><label for="present">This entry continues to the present.</label>
        <input type="radio" id="one" name="date_tweak" value=""/><label for="one" >Only show 1 date instead of 2.</label>
      </fieldset>

      <fieldset>
        <legend>Descriptions</legend>

      </fieldset>
      <input type="submit" />
      <button>Close</button>
    </form>
    <div id={styles.PageBlock}></div>
  </>
  )
};

export { AddEntryForm }; 