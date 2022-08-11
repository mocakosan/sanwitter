import React, { useEffect, useState } from "react";
import { dbservice } from "../fbase";
import { findAllByDisplayValue } from "@testing-library/react";
import Sweet from "../components/Sweet";

const Home = ({ userObj }) => {
  const [sweet,setSweet] = useState("");
  const [sweets,setSweets] = useState([]);

  useEffect(() => {
    dbservice.collection("sanweets").onSnapshot((snapshot) => {
      const sweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArray);
    })
  },[])
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbservice.collection("sanweets").add({
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  }
  console.log(sweets);
  return (
   <div>
      <form onSubmit={onSubmit}>
        <input value={sweet} onChange={onChange} type="text" placeholder="content" maxLength={120} />
        <input type="submit" value="Sanweet" />
      </form>
     <div>
       {sweets.map((sweet) => (
         <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid}/>
         )
       )}
     </div>
   </div>
  );
};
export default Home;
