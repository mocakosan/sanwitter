import React from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogout}>Log Out</button>
    </>
  )
}
