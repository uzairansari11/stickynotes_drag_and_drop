import React, { useState } from "react";
import Modal from "./component/Modal";
import StickyNote from "./component/StickyNote";
import Navbar from "./component/Navbar";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 150) {
      setText(inputText);
    }
  };

  
  const addNote = () => {
    if(text.trim()===""){
      alert("Please enter notes");
      return;
    }
    const DEFAULT_NOTE_WIDTH = 200;
    const DEFAULT_NOTE_HEIGHT = 150;
    
    let nextX = 5;
    let nextY = 5;
  
    const lastPinnedNote = notes.find((note) => note.isPinned);
    const lastUnpinnedNote = notes.reverse().find((note) => !note.isPinned);
    const lastNote = lastPinnedNote || lastUnpinnedNote;
  
    if (lastNote) {
      nextX = lastNote.position.x + DEFAULT_NOTE_WIDTH + 20; 
      nextY = lastNote.position.y;
    }
  
    const newNote = {
      id: Math.random().toString(36).substring(7),
      content: text,
      isPinned: false,
      position: { x: nextX, y: nextY },
    };
  
    if (!lastNote) {
      let randomX = Math.floor(Math.random() * (window.innerWidth - DEFAULT_NOTE_WIDTH));
      let randomY = Math.floor(Math.random() * (window.innerHeight - DEFAULT_NOTE_HEIGHT));

      if (randomX + DEFAULT_NOTE_WIDTH > window.innerWidth) {
        randomX = window.innerWidth - DEFAULT_NOTE_WIDTH - 20; 
      }
      if (randomY + DEFAULT_NOTE_HEIGHT > window.innerHeight) {
        randomY = window.innerHeight - DEFAULT_NOTE_HEIGHT - 20; 
      }
  
      newNote.position.x = randomX > 0 ? randomX : nextX;
      newNote.position.y = randomY > 0 ? randomY : nextY;
    }
  
    setNotes((prevNotes) => [...prevNotes, newNote]);
    handleModal();
    setText("");
  };


  const pinNote = (id) => {
    const noteToPin = notes.find((note) => note.id === id);
    if (!noteToPin) return;
  
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
  
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isPinned: !note.isPinned, position: { x: nextX, y: nextY } };
      }
      return note;
    });
  
    setNotes(updatedNotes);
  };
  

  const handleDraggingOver = (e) => {
    e.preventDefault();
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("notesId");
    const updatedNote = notes.find((note) => note.id === noteId);
  
    if (updatedNote) {
      const { clientX, clientY } = e;
  
      
      const RANGE_THRESHOLD = 200; 
  
      const isPinnedAtPosition = notes.some(
        (note) => note.isPinned && Math.abs(note.position.x - clientX) < RANGE_THRESHOLD && Math.abs(note.position.y - clientY) < RANGE_THRESHOLD
      );
  
      if (!isPinnedAtPosition) {
        const updatedNoteWithPosition = {
          ...updatedNote,
          position: {
            x: clientX,
            y: clientY,
          },
        };
  
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? updatedNoteWithPosition : note
          )
        );
      } else {
       
        const originalNotePosition = { x: updatedNote.position.x, y: updatedNote.position.y };
  
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? { ...note, position: originalNotePosition } : note
          )
        );
      }
    }
  };
  

  
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id, newContent) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
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
