import { useState } from "react";
import { InputStyle, BtnStyle } from "./LoginFormStyles.js";
import * as usersService from "../../Utilities/user-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)0
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container" onSubmit={handleSubmit}>
        <form autoComplete="off">
          <label>Username</label>
          <InputStyle
            type="text"
            name="user"
            value={credentials.user}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <InputStyle
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <BtnStyle type="submit" className="button">
            LOG IN
          </BtnStyle>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
