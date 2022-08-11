import React, { useEffect, useState } from "react";
import { dbservice, storageService } from "../fbase";

const Sweet = ({ sweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  //게시글 삭제
  const onDelete = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      try {
        //해당하는 트윗 파이어스토어에서 삭제
        await dbservice.doc(`sanweets/${sweetObj.id}`).delete();
        //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
        if (sweetObj.attachUrl !== "") {
          await storageService.refFromURL(sweetObj.attachUrl).delete();
        }
      } catch (error) {
        window.alert("트윗을 삭제하는 데 실패했습니다!");
      }
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
          {isOwner && (
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
          )}
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachUrl && (
            <img src={sweetObj.attachUrl} width="50px" height="50px" />
          )}
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
