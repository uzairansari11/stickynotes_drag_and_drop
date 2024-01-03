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
  // State for managing editing mode and edited content of the note
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // Function to toggle editing mode when note is double-clicked
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Function to handle saving edited content and exit editing mode
  const handleEdit = () => {
    onDoubleClick(id, editedContent);
    setIsEditing(false);
  };

  // Function to handle changes in the textarea for note content
  const handleTextareaChange = (e) => {
    if (e.target.value.length <= 150) {
      setEditedContent(e.target.value);
    }
  };

  // Styling for the note element based on position and other properties
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

  // Styling for the text content within the note
  const textStyles = {
    width: "100%",
    overflowWrap: "break-word", 
    maxHeight: "150px", 
    marginBottom: "8px",
    height:'150px'
  };

  // Function to handle the drag start event for the note
  const handleDragStart = (e) => {
    // Calculate offsets for smooth dragging and set data for the drag event
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    e.dataTransfer.setData("offsetX", offsetX);
    e.dataTransfer.setData("offsetY", offsetY);
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
        // Render textarea for editing mode
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
        // Render text content and control buttons when not in editing mode
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
