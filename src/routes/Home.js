import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbservice, storageService } from "../fbase";
import Sweet from "../components/Sweet";

const Home = ({ userObj }) => {
  const [sweet,setSweet] = useState("");
  const [sweets,setSweets] = useState([]);
  const [attach, setAttach] = useState("");
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
    let attachUrl = "";
    if(attach !== ""){
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const res = await fileRef.putString(attach,"data_url");
      attachUrl = await res.ref.getDownloadURL();
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachUrl,
    }
    await dbservice.collection("sanweets").add(sweetObj);
    setSweets("");
    setAttach("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  }
  const onFileChage = (event) =>{
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //파일을 가지고 reader를 만든다
    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const { currentTarget: { result },
      } = finishedEvent;
      setAttach(result);
    }
    //readAsDataURL를 사용해서 파일을 읽는다
    reader.readAsDataURL(theFile);
  }
  console.log(sweets);
  const  onClearPhoto = () => {
    setAttach(null);
  }
  return (
   <div>
      <form onSubmit={onSubmit}>
        <input value={sweet} onChange={onChange} type="text" placeholder="content" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChage}/>
        <input type="submit" value="Sanweet" />
        {attach && (
          <div>
            <img src={attach} width="50px" height="50px" />
            <button onClick={onClearPhoto}>Clear img</button>
          </div>
        )}
      </form>

       {sweets.map((sweet) => (
         <Sweet key={sweet.id} sweetObj={sweet} isOwner={sweet.creatorId === userObj.uid}/>
         )
       )}

   </div>
  );
};
export default Home;
