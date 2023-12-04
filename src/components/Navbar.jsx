import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleLogout() {
    console.log("fuckkk");
    logout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WorkoutBuddy</h1>
        </Link>
        <nav>
          <div>
            {user ? (
              <>
                <span>{user.email}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">login</Link>
                //
                <Link to="/signup">signup</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
