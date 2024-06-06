import React from "react";
import styled from "styled-components";
import Note from "./Note";

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 5px;
`;

const NotesGrid = ({ notes, onEdit, onDelete }) => (
  <GridWrapper>
    {notes.map((note) => (
      <Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </GridWrapper>
);

export default NotesGrid;
