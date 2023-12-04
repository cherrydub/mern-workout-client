import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { Toaster, toast } from "sonner";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
    toast.info("Logged out");
  }

  return { logout };
}
