import { useState, SyntheticEvent } from "react";
import axios from "axios";  //in order to make API request

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {

  const [username, setUsername ]= useState("");
  const [password, setPassword ]= useState("");

  // creating a function, whenever you submit the form this function is called
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();     // Prevents form from reloading the page
    // in order to register the user, it is a post req
    await axios.post ("http://localhost:3001/user/register", {
      username,
      password
    });

    alert("Registration Completed! New Login.");
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>          {/* called the handleSubmit fn over here */}
        <h2> Register </h2>
        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input 
          type="text" 
          id="username" 
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(event)=> setPassword(event.target.value)}
          required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  return <div>Login</div>;
};

export default AuthPage;
