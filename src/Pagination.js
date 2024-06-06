import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const PaginationButton = styled.button`
  margin: 0 8px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <PaginationWrapper>
    <PaginationButton
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </PaginationButton>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <PaginationButton
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </PaginationButton>
  </PaginationWrapper>
);

export default Pagination;
