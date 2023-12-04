import React, { useState } from "react";
import axios from "axios";
const serverURL = import.meta.env.VITE_SERVERURL;
import { Toaster, toast } from "sonner";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, load, reps };
    try {
      const response = await axios.post(`${serverURL}/api/workouts`, workout, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = response.data;

      if (response.status === 200) {
        toast.success("Workout Added");
        dispatch({
          type: "CREATE_WORKOUT",
          payload: data,
        });
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
      }
    } catch (error) {
      console.log("error:", error, error.response.data.error);
      toast.error("Error Adding Workout");
      setError(error.response.data.error);
    }
  }

  return (
    <div>
      <form className="create">
        <h3>Add a new Workout</h3>

        <label htmlFor="title">Exercise Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />

        <label htmlFor="load">Load (in kg):</label>
        <input
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          type="number"
        />

        <label htmlFor="reps">Reps:</label>
        <input
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          type="number"
        />

        <button onClick={handleSubmit}>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
