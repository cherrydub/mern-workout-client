import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from "axios";
import { Toaster, toast } from "sonner";
const serverURL = import.meta.env.VITE_SERVERURL;
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutDetails({ workout }) {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  async function deleteWorkout() {
    if (!user) {
      return;
    }
    try {
      const response = await axios.delete(
        `${serverURL}/api/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;
      //   console.log(data);
      dispatch({ type: "DELETE_WORKOUT", payload: data });
      toast.info(`Deleted ${workout.title}`);
    } catch (error) {
      console.log("error:", error, error.response.data.error);
      toast.error("Error Deleting Workout");
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={deleteWorkout}>
        <i className="las la-trash"></i>
      </span>
    </div>
  );
}
