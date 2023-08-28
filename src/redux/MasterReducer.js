// This thing will will be put into an Immer Reducer
export function MasterReducer(draft, action) {
  switch (action.type) {
    case "add1":
      draft.val += 1;
      break;
    case "sub1":
      draft.val -= 1;
      break;
    case "set0":
      draft.val = 0;
      break;
    default:
      break;
  }
}
