"use client" // Very important thing to include lest some random completely unrelated error code appears

import { useSelector, useDispatch } from "react-redux";
import { add1, sub1, set0 } from "../../../../redux/masterSlice";
import { Provider } from 'react-redux'
import { reduxStore } from "@/redux/redux-store";

export default function MasterEditor() {
  const count = useSelector((reduxStore) => reduxStore.master.val);
  const dispatch = useDispatch();

  return (
    <>
      <Provider store={reduxStore}>
        <p>
          Here is the page where you would be edit your master resume,
          containing all possible resume combinations.
        </p>
        <p>The master counter says: {count}</p>
        <button onClick={() => dispatch(add1())}>Add1</button>
        <button onClick={() => dispatch(sub1())}>Sub1</button>
        <button onClick={() => dispatch(set0())}>Set0</button>
      </Provider>
    </>
  );
}
