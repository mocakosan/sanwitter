import React, { useEffect,useState } from "react";
import { authService, dbservice } from "../fbase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser,userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };
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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogout}>Log Out</button>
    </>
  )
}
