import React, { useEffect,useState } from "react";
import { authService, dbservice } from "../fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser,userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (event) =>{
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    };
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          className="container-text"
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
        />
      </form>
    </div>
  )
};
