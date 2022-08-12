import React, { useEffect, useState } from "react";
import { dbservice, storageService } from "../fbase";
import Sweet from "../components/Sweet";
import SweetUpload from "../components/SweetUpload";
import { Link, useHistory } from "react-router-dom";
import up from "../up.png";

const Home = ({ userObj }) => {
  //Data read
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
  return (
    <div className="container-swapper">
      <div className="container">
        <div>
         {sweets.map((sweet) => (
           <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid}/>
           )
         )}
       </div>
      </div>
      <Link to="/sweetFactory">
        <div className="container-upload" ><img src={up} alt="" /></div>
      </Link>
    </div>
  );
};
export default Home;
