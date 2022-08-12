import React, { useEffect,useState } from "react";
import { dbservice } from "../fbase";
import Sweet from "../components/Sweet";

export default ({ refreshUser,userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [sweets, setSweets] = useState([]);
  const onChangeName = (event) =>{
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }
  const onSubmitName = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    };
  };
  const getMySweets = async () => {
    const mySweets = await dbservice
      .collection("sanweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    setSweets(mySweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMySweets();
  }, []);
  console.log(sweets);
  return (
    <div className="container">
      <form onSubmit={onSubmitName} className="profileForm">
        <input
          className="container-text"
          onChange={onChangeName}
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
