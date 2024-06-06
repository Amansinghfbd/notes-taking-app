import React from "react";
import styled from "styled-components";

const NoteWrapper = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 30%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ff4d4d;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
`;

const PinnedIcon = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 20px;
  color: #ffbf00;
`;

const Note = ({ note, onEdit, onDelete }) => (
  <NoteWrapper>
    {note.pinned && <PinnedIcon>📌</PinnedIcon>}
    <h3 onClick={() => onEdit(note)}>{note.title}</h3>
    <h5 onClick={() => onEdit(note)}>{note.tagline}</h5>
    <p onClick={() => onEdit(note)}>{note.body}</p>
    <DeleteButton onClick={() => onDelete(note.id)}>Delete</DeleteButton>
  </NoteWrapper>
);

export default Note;
