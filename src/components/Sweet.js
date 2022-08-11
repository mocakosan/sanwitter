import React, { useEffect, useState } from "react";
import { dbservice } from "../fbase";

const Sweet = ({ sweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  //게시글 삭제
  const onDelete = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok){
      await dbservice.doc(`sanweets/${sweetObj.id}`).delete();
    }
  }
  //게시물 수정
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbservice.doc(`sanweets/${sweetObj.id}`).update({
      text: newSweet,
    });
    setEdit(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };
  return(
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Sweet"
              value={newSweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Sweet;
