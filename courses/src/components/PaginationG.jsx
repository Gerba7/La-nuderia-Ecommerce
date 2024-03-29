import { useState } from 'react';
import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';




const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .pageCard {
    height: 36px;
    padding: 0 15px;
    background: transparent;
    border: 1px solid #4c4f56;  //#b7bcce
    box-sizing: border-box;
    border-radius: 4px;
    margin: 0 6px;
    color: #4c4f56;   //#b9bdcf
    cursor: pointer;
    &:not([disabled]):hover {
      border: 1px solid #216E8C;  //#1e86ff
      color: #216E8C;
    }
  }
  .pageCard.active {
    background: #216E8C;
    border: 1px solid #216E8C;
    color: #fff;
  }
`;

const MorePaginationIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 36px;
  width: 36px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 0.5rem;
`;


export const PaginationG = ({currentPage, pageCount, setCurrentPage}) => {


  const getPageRange = (currentPage, pageCount) => {
    if (pageCount < 4) {
      return [];
    }
    let pageRange = [1, 2, 3];
    if (currentPage > 1 && currentPage !== pageCount) {
      pageRange.length = 0;
      pageRange.push(currentPage - 1);
      pageRange.push(currentPage);
      pageRange.push(currentPage + 1);
    } else if (currentPage === pageCount) {
      pageRange.length = 0;
      pageRange.push(currentPage - 2);
      pageRange.push(currentPage - 1);
      pageRange.push(currentPage);
    }
    return pageRange;
  };

  const renderPageButtons = () => {
    let result = [];
    for (let i = 1; i < pageCount + 1; i++) {
      result.push(
        <button
          key={i}
          className={currentPage === i ? `pageCard active` : `pageCard`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return result;
  };

  return (
    <PaginationContainer>
      <button
        className="pageCard"
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage <= 1}
      >{`<`}</button>
      {pageCount < 4 && renderPageButtons()}
      {currentPage >= pageCount - 2 && pageCount > 3 && (
        <>
          <button
            className={currentPage === 1 ? `pageCard active` : `pageCard`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <MorePaginationIconContainer
            style={{
              height: "36px",
              width: "36px"
            }}
          >
            <Icon
              style={{ width: "20px", height: "auto" }}
              alt="more"
              src={<MoreHorizIcon />}
            />
          </MorePaginationIconContainer>
        </>
      )}
      {getPageRange(currentPage, pageCount).map((page) => (
        <button
          key={page}
          className={page === currentPage ? `pageCard active` : `pageCard`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < pageCount - 2 && pageCount > 3 && (
        <>
          <MorePaginationIconContainer
            style={{
              height: "36px",
              width: "36px"
            }}
          >
            <Icon
              style={{ width: "20px", height: "auto" }}
              alt="more"
              src={<MoreHorizIcon />}
            />
          </MorePaginationIconContainer>
          <button
            className={
              pageCount === currentPage ? `pageCard active` : `pageCard`
            }
            onClick={() => setCurrentPage(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}
      <button
        className="pageCard"
        onClick={() => {
          if (currentPage < pageCount) setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === pageCount}
      >{`>`}</button>
    </PaginationContainer>
  );
};
