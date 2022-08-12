import React, { useEffect,useState } from "react";
import { dbservice } from "../fbase";
import Sweet from "../components/Sweet";

export default ({ refreshUser,userObj,sweetObj, isOwner }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [sweets, setSweets] = useState([]);
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
  const getMyNweets = async () => {
    const mysweets = await dbservice
      .collection("sanweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    setSweets(mysweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  console.log(sweets);
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
      {sweets.map((sweet) => (
          <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid}/>
        )
      )}
    </div>
  )
};
