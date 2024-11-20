import { Button, IconButton } from '@material-tailwind/react';
import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  // Determine the range of page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 8;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we are at the end of the range
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="flex items-center gap-4">
      {/* First Page Button - only show if more than 8 pages */}
      {totalPages > 8 && (
        <IconButton
          variant="text"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center gap-0 rounded-full"
        >
          <ChevronDoubleLeftIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      )}

      {/* Previous Page Button */}
      <IconButton
        variant="text"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-0 rounded-full"
      >
        <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> 
      </IconButton>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page) => (
          <IconButton
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "bg-blue-500 text-white" : ""}
          >
            {page}
          </IconButton>
        ))}
      </div>

      {/* Next Page Button */}
      <IconButton
        variant="text"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-full"
      >
        <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      {/* Last Page Button - only show if more than 8 pages */}
      {totalPages > 8 && (
        <IconButton
          variant="text"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 rounded-full"
        >
          <ChevronDoubleRightIcon strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      )}
    </div>
  );
};

export default PaginationComponent;
