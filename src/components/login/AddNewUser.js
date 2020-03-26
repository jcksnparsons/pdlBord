import React, { useState } from "react";
import APIHandler from "../../modules/APIHandler";

const NewUserForm = props => {
  const [newUserInfo, setNewUserInfo] = useState({
    email: ""
  });
  const [isAvailable, setIsAvailable] = useState(false);

  const handleFieldChange = event => {
    const stateToChange = { ...newUserInfo };
    stateToChange[event.target.id] = event.target.value;
    setNewUserInfo(stateToChange);
  };

  const handleRegistration = event => {
    event.preventDefault();

    APIHandler.getUser().then(arrayOfUsers => {
      const filteredUsers = arrayOfUsers.filter(
        element => element.email === newUserInfo.email
      );

      if (filteredUsers.length !== 0) {
        alert("This is alread a registered user!");
      } else {
        if (newUserInfo.email === "") {
          alert("Please enter a valid email");
        } else {
          APIHandler.postUser(newUserInfo).then(() => {
            APIHandler.getUser().then(userArray => {
              const user = userArray.find(el => el.email === newUserInfo.email);
              props.setAsUser(user.id);
              setIsAvailable(false);
              props.history.push("/presets");
            });
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleRegistration}>
      <fieldset>
        <h3>Add New User</h3>
        <div className="formgrid">
          <label htmlFor="inputEmail">Email: </label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            required=""
            autoFocus=""
          />
        </div>
        <button disabled={isAvailable} type="submit">
          Add User
        </button>
      </fieldset>
    </form>
  );
};

export default NewUserForm;