import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const serverURL = import.meta.env.VITE_SERVERURL;

export default function Home() {
  //   const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await axios.get(`${serverURL}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = response.data;
        // setWorkouts(data);
        dispatch({ type: "SET_WORKOUTS", payload: data });
        console.log("payload data", data); // Move the log statement here
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
