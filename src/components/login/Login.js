import React, { useState } from "react";
import APIHandler from "../../modules/APIHandler";

const Login = props => {
  const [userCredentials, setUserCredentials] = useState({
    email: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...userCredentials };
    stateToChange[evt.target.id] = evt.target.value;
    setUserCredentials(stateToChange);
  };

  const handleLogin = e => {
    e.preventDefault();

    APIHandler.getUser().then(users => {
      const user = users.find(el => el.email === userCredentials.email);

      if (user !== undefined) {
        props.setAsUser(user.id);
        props.history.push("/presets");
      } else {
        alert("Please enter a valid email!");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <h3>Login</h3>
          <div className="formgrid">
            <label htmlFor="inputEmail">Email: </label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="email"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
          </div>
          <button type="submit">Log in</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;