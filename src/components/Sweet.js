import React, { useEffect, useState } from "react";
import { dbservice, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {edit ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your Sweet"
                  value={newSweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachUrl && <img src={sweetObj.attachUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Sweet;
