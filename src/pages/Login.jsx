import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { useLogin } from "../hooks/useLogin";
const serverURL = import.meta.env.VITE_SERVERURL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>

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

        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
