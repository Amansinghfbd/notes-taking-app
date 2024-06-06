import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  height: 60%;
  width: 40%;
  background-color: black;
  color: white;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const EditNoteModal = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [tagline, setTagline] = useState(note ? note.tagline : "");
  const [body, setBody] = useState(note ? note.body : "");
  const [pinned, setPinned] = useState(note ? note.pinned : false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTagline(note.tagline);
      setBody(note.body);
      setPinned(note.pinned);
    }
  }, [note]);

  const handleSave = () => {
    const noteData = { id: note?.id, title, tagline, body, pinned };
    console.log("Note data to save:", noteData);
    onSave(noteData);
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <div className="items">
          <label>TITLE</label> <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="fullwidth"
          />
        </div>
        <div className="items">
          <label>TAG LINE </label>
          <br />
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tagline"
            className="fullwidth"
          />
        </div>
        <div className="items">
          <label>BODY</label>
          <br />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            rows="10"
            cols="30"
            className="fullwidth"
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          PINNED
        </label>
        <div className="btn">
          <button onClick={handleSave} className="insidebtn">
            Save
          </button>
          <button onClick={onClose} className="insidebtn">
            Cancel
          </button>
        </div>
      </ModalWrapper>
    </>
  );
};

export default EditNoteModal;
