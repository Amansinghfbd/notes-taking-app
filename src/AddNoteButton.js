import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AddNoteButton = ({ onClick }) => {
  return <Button onClick={onClick}>+</Button>;
};

export default AddNoteButton;
