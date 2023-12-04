import { createContext, useContext, useReducer } from "react";

const initialState = { workouts: null };

export const WorkoutContext = createContext();

export function workoutsReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS":
      console.log("setting workouts");
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout) => {
          return workout._id !== action.payload._id;
        }),
      };
    default:
      return state;
  }
}

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
