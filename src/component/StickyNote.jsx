import React, { useState } from "react";
import { RiPushpin2Fill, RiEdit2Line, RiUnpinLine } from "react-icons/ri";
import { MdSave } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import styles from "./Sticky.module.css";

const StickyNote = ({
  id,
  content,
  isPinned,
  onDelete,
  onDoubleClick,
  onPin,
  position,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
console.log(isPinned)
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEdit = () => {
    onDoubleClick(id, editedContent);
    setIsEditing(false);
  };

  const handleTextareaChange = (e) => {
    if (e.target.value.length <= 150) {
      setEditedContent(e.target.value);
    }
  };

  const noteStyles = {
    position: "absolute",
    backgroundColor: "#FFFF88",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: position?.y || 0,
    left: position?.x || 0,
    transition: "transform 0.2s ease-in-out",
    width: "200px", 
  };

  const textStyles = {
    width: "100%",
    overflowWrap: "break-word", 
    maxHeight: "150px", 
    marginBottom: "8px",
    height:'150px'
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("notesId", id);
  };

  return (
    <div
      style={noteStyles}
      draggable={!isPinned}
      onDoubleClick={handleDoubleClick}
      onDragStart={handleDragStart}
    >
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={handleTextareaChange}
            maxLength={150}
            style={{
              width: "100%",
              resize: "none",
              textAlign: "left",
              marginBottom: "8px",
              outline: "none",
              border: "none",
              backgroundColor: "#FFFF88",
              maxHeight: "150px",
              height:'150px'
            }}
            readOnly={!isEditing}
            autoFocus // Cursor starts here on edit
          />
          <button className={styles.buttonStyles} onClick={handleEdit}>
            <MdSave /> Save
          </button>
        </>
      ) : (
        <>
          <div style={textStyles}>{content}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className={styles.buttonStyles} onClick={() => onDelete(id)}>
              <TiDeleteOutline />
            </button>
            <button className={styles.buttonStyles} onClick={() => onPin(id)}>
              {isPinned ? <RiUnpinLine /> : <RiPushpin2Fill />}
            </button>
            <button
              className={styles.buttonStyles}
              onClick={() => setIsEditing(true)}
            >
              <RiEdit2Line />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StickyNote;
