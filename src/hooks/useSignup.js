import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { Toaster, toast } from "sonner";
const serverURL = import.meta.env.VITE_SERVERURL;

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function signup(email, password) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${serverURL}/api/user/signup`, {
        email,
        password,
      });
      const data = await response.data;

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        toast.success("Signup successful");
      } else {
        setError(response.data.error);
        toast.error("not 200");
      }
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }

  return { signup, isLoading, error };
}
