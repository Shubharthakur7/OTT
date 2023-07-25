/**Imports modules and components */
import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import './pagination.css';

const PaginationComponent = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  pageButtonOnClick
}) => {
    // Round page count
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const changePage = (nextPage) => {
    if (currentPage === nextPage) return;
    pageButtonOnClick(nextPage);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      pageButtonOnClick(pagesCount);
    }
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =  currentPage < 5 ? 
      Math.abs(pageNumber - 1) <= 4 : pagesCount - currentPage < 4 ? Math.abs(pagesCount - pageNumber) <= 4 : Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}>
            {currentPage < 5 ? (pageNumber < 6 || pageNumber === pagesCount) && pageNumber : pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
        <Pagination>
         <Pagination.Prev disabled={currentPage === 1}
            onClick={onPreviousPageClick}><i className="fas fa-angle-left" /></Pagination.Prev>
          {pageNumbers}
          <Pagination.Next  onClick={onNextPageClick} disabled={currentPage === pagesCount} ><i className="fas fa-angle-right" /></Pagination.Next>
        </Pagination>
  );
};

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationComponent;
