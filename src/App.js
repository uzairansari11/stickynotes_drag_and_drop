import React, { useState } from "react";
import Modal from "./component/Modal";
import StickyNote from "./component/StickyNote";
import Navbar from "./component/Navbar";

const App = () => {

  /* States for storing the notes ,
     taking input from user and  showing modal
  */
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);


/* This piece of code is responsible for showing and hiding modal */
  const handleModal = () => {
    setShowModal(!showModal);
  };

  /* This piece of code is responsible for taking  new note data from user */
  const handleChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 150) {
      setText(inputText);
    }
  };

/* This function adds a new note to the board */
const addNote = () => {

  /* If textarea is empty, display an alert */
  if(text.trim()===""){
    alert("Please enter notes");
    return;
  }

  /* Define the default height and width for a new note */
  const DEFAULT_NOTE_WIDTH = 200;
  const DEFAULT_NOTE_HEIGHT = 150;
  
  /* Initialize nextX and nextY for positioning new notes */
  let nextX = 5;
  let nextY = 5;

  /* Find the last pinned and unpinned notes to determine the position of the new note */
  const lastPinnedNote = notes.find((note) => note.isPinned);
  const lastUnpinnedNote = notes.reverse().find((note) => !note.isPinned);
  const lastNote = lastPinnedNote || lastUnpinnedNote;
  
  /* Set position for the new note based on the last note */
  if (lastNote) {
    nextX = lastNote.position.x + DEFAULT_NOTE_WIDTH + 20; 
    nextY = lastNote.position.y;
  }
  
  /* Create a new note object with a unique ID, content, pin status, and position */
  const newNote = {
    id: Math.random().toString(36).substring(7),
    content: text,
    isPinned: false,
    position: { x: nextX, y: nextY },
  };
  
  /* If no last note exists, position the new note randomly within the window */
  if (!lastNote) {
    let randomX = Math.floor(Math.random() * (window.innerWidth - DEFAULT_NOTE_WIDTH));
    let randomY = Math.floor(Math.random() * (window.innerHeight - DEFAULT_NOTE_HEIGHT));

    if (randomX + DEFAULT_NOTE_WIDTH > window.innerWidth) {
      randomX = window.innerWidth - DEFAULT_NOTE_WIDTH - 20; 
    }
    if (randomY + DEFAULT_NOTE_HEIGHT > window.innerHeight) {
      randomY = window.innerHeight - DEFAULT_NOTE_HEIGHT - 20; 
    }

    /* Set position based on random values or defaults */
    newNote.position.x = randomX > 0 ? randomX : nextX;
    newNote.position.y = randomY > 0 ? randomY : nextY;
  }
  
  /* Update the notes state with the new note, close the modal, and reset the text */
  setNotes((prevNotes) => [...prevNotes, newNote]);
  handleModal();
  setText("");
};


/* This function handles pinning/unpinning a note */
const pinNote = (id) => {
  const noteToPin = notes.find((note) => note.id === id);
  if (!noteToPin) return;

  /* Filter pinned notes and calculate the next position for the pinned note */
  const pinnedNotes = notes.filter((note) => note.isPinned && note.id !== id);
  let nextX = 0;
  let nextY = 0;

  if (pinnedNotes.length > 0) {
    const lastPinnedNote = pinnedNotes.reduce((prev, current) =>
      (prev.position.y > current.position.y) ? prev : current
    );
    nextX = lastPinnedNote.position.x;
    nextY = lastPinnedNote.position.y + 250; 
  }

  /* Update the notes state with the pinned/unpinned status and new position */
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, isPinned: !note.isPinned, position: { x: nextX, y: nextY } };
    }
    return note;
  });

  setNotes(updatedNotes);
};



  const handleDrop = (e) => {
    // Prevent default drop behavior
    e.preventDefault();
  
    // Retrieve the dragged note's ID and offsets from dataTransfer
    const noteId = e.dataTransfer.getData("notesId");
    const offsetX = parseInt(e.dataTransfer.getData("offsetX"));
    const offsetY = parseInt(e.dataTransfer.getData("offsetY"));
  
    // Retrieve the current mouse position
    const dropX = e.clientX - offsetX;
    const dropY = e.clientY - offsetY;
  
    // Get the updated note based on its ID
    const updatedNote = notes.find((note) => note.id === noteId);
    
    // Define a threshold for determining overlapping positions
    const RANGE_THRESHOLD = 210;
  
    if (updatedNote) {
      // Check if any pinned note is at the drop position within the threshold
      const isPinnedAtPosition = notes.some(
        (note) =>
          note.isPinned &&
          Math.abs(note.position.x - dropX) < RANGE_THRESHOLD &&
          Math.abs(note.position.y - dropY) < RANGE_THRESHOLD
      );
  
      // Update note position if no overlapping pinned note is found
      if (!isPinnedAtPosition) {
        const updatedNoteWithPosition = {
          ...updatedNote,
          position: {
            x: dropX,
            y: dropY,
          },
        };
  
        // Update notes state with the modified note position
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? updatedNoteWithPosition : note
          )
        );
      } else {
        // If an overlapping pinned note is found, revert to the original position
        const originalNotePosition = {
          x: updatedNote.position.x,
          y: updatedNote.position.y,
        };
  
        // Update notes state to revert the note back to its original position
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId
              ? { ...note, position: originalNotePosition }
              : note
          )
        );
      }
    }
  };
  
  
  /* This piece of code is responsible for deleting notes */
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  /* This piece of code is responsible for editing notes */
  const editNote = (id, newContent) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
  };

  const handleDraggingOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar handleModal={handleModal} />
      {showModal && (
        <Modal
          handleModal={handleModal}
          textValue={text}
          handler={handleChange}
          addNotesHandler={addNote}
        />
      )}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor:'#DCF2F1',
         overflowY:'scroll'
        }}
        droppable={true}
        onDragOver={(e) => handleDraggingOver(e)}
        onDrop={handleDrop}
      >
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            content={note.content}
            isPinned={note.isPinned}
            onDelete={deleteNote}
            onDoubleClick={editNote}
            onPin={pinNote}
            position={note.position}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
