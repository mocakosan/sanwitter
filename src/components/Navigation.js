import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) =>{
  return(
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj?.displayName?.length
            ? `${userObj.displayName}'s Profile`
            : "Profile"}
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation;
