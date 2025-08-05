import React from 'react';
import './Pagination.css';

const Pagination = ({ paginationData, onPageChange }) => {
  if (!paginationData || paginationData.last_page <= 1) {
    return null;
  }

  const { current_page, last_page } = paginationData;

  const pages = [];
  for (let i = 1; i <= last_page; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={() => onPageChange(current_page - 1)} disabled={current_page === 1}>
        Précédent
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === current_page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(current_page + 1)} disabled={current_page === last_page}>
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
