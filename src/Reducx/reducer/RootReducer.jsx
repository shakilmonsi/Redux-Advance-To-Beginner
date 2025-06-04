// Constant
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const ADDUSER = "ADDUSER";

// Initial State
const initialState = {
  count: 0,
  users: [{ name: "Shakil Mosni" }],
};

// Reducer Function
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case ADDUSER:
      return { ...state, users: [...state.users, { name: action.payload }] };
    default:
      return state;
  }
};



