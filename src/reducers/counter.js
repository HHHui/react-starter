import { ADD_COUNTER } from "../actions/counter";

const initState = {
  value: 0
};

export default function Counter(state = initState, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return { value: state.value + action.value };
    default:
      return state;
  }
}
