// Initial State, Reducer, and Action Generators for Master Resume
export const initialMaster = {
  personalInfo: { name: null, tel: null, linkedin: null, github: null, email: null, website: null, address: null },
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
      // Empty Values should be turned into undefined
      name: name.value.trim() || null,
      tel: tel.value.trim() || null,
      linkedin: linkedin.value.trim() || null,
      github: github.value.trim() || null,
      email: email.value.trim() || null,
      website: website.value.trim() || null,
      address: address.value.trim() || null,
    },
  };
}

export function actionPersonalReset() {
  return {
    type: "personal/reset",
    payload: { name: null, tel: null, linkedin: null, github: null, email: null, website: null, address: null },
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
