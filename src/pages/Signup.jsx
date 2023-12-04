import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { useSignup } from "../hooks/useSignup";
const serverURL = import.meta.env.VITE_SERVERURL;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(email, password);
  }

  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />

        <button disabled={isLoading}>Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
