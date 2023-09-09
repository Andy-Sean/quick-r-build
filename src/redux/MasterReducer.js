// Initial State, Reducer, and Action Generators for Master Resume
export const initialMaster = {
  personalInfo: { name: "", tel: "", linkedin: "", github: "", email: "", website: "", address: "" },
  entries: [],
};

export function MasterReducer(draft, action) {
  switch (action.type) {
    case "personal/set":
      draft.personalInfo = action.payload;
      break;
    case "personal/reset":
      draft.personalInfo = action.payload;
      break;
    default:
      break;
  }
}

export function actionPersonalSet(formSubmitEvent) {
  const { name, tel, linkedin, github, email, website, address } = formSubmitEvent.target.elements;
  return {
    type: "personal/set",
    payload: {
      // Empty Values should be turned into ""
      name: name.value.trim() || "",
      tel: tel.value.trim() || "",
      linkedin: linkedin.value.trim() || "",
      github: github.value.trim() || "",
      email: email.value.trim() || "",
      website: website.value.trim() || "",
      address: address.value.trim() || "",
    },
  };
}

export function actionPersonalReset() {
  return {
    type: "personal/reset",
    payload: { name: "", tel: "", linkedin: "", github: "", email: "", website: "", address: "" },
  };
}

// forms gonna come in like
// const { firstName, lastName, email, division, phone, cv, description } = event.target.elements;
//   const data = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     email: email.value,
//     division: division.value,
//     phone: phone.value,
//     cv: cv.value,
//     description: description.value,
//   };
