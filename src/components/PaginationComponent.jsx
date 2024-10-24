import { Button, IconButton } from '@material-tailwind/react';
import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Vô hiệu hóa nếu là trang đầu
        className="flex items-center gap-2 rounded-full"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton
            key={index + 1}
            onClick={() => onPageChange(index + 1)} // Thay đổi trang khi nhấn nút
            className={currentPage === index + 1 ? "bg-blue-500 text-white" : ""} // Đổi màu nếu là trang hiện tại
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Vô hiệu hóa nếu là trang cuối
        className="flex items-center gap-2 rounded-full"
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationComponent;
