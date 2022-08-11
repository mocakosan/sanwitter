import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbservice } from "fbase";

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [attach, setAttach] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachUrl = "";
    if (attach !== "") {
      const attachRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const res = await attachRef.putString(attach, "data_url");
      attachUrl = await res.ref.getDownloadURL();
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachUrl,
    };
    await dbservice.collection("sanweets").add(sweetObj);
    setSweet("");
    setAttach("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttach(null);
  return(
    <form onSubmit={onSubmit}>
      <input
        value={sweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attach && (
        <div>
          <img src={attach} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default SweetFactory;
