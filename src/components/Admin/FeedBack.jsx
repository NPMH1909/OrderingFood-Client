import React, { useEffect, useState } from "react";
import { useGetAllContactsQuery } from "../../apis/contactApi";
import { Input, Textarea, Button } from "@material-tailwind/react"; // Sử dụng Material Tailwind
import PaginationComponent from "../PaginationComponent";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // State cho ngày chọn
  const limit = 10;

  const { data: feedbacksData, isLoading, isError, error } = useGetAllContactsQuery({
    page: currentPage,
    limit,
    date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
  });

  useEffect(() => {
    if (isError) {
      console.error("Lỗi khi lấy dữ liệu phản hồi: ", error);
    }
  }, [isError, error]);

  const handleResponse = (feedbackId) => {
    if (!responseMessage.trim()) {
      alert("Vui lòng nhập thông điệp phản hồi.");
      return;
    }

    console.log("Phản hồi cho feedback ID", feedbackId, "với nội dung:", responseMessage);
    setResponseMessage("");
    setSelectedFeedback(null);
  };

  // Hàm thay đổi ngày
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    setCurrentPage(1);
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  const feedbacks = feedbacksData.data.contacts;
  const totalPages = feedbacksData.data.totalPages;

  return (
    <div className="feedback-container max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Danh sách phản hồi</h1>

      {/* Chọn ngày từ select box */}
      <div className="flex items-center gap-4 relative mb-6">
        <div className="flex-1 flex justify-end">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Chọn ngày"
            dateFormat="dd/MM/yyyy"
            popperProps={{
              placement: 'bottom-start'
            }}

            className="border border-blue-gray-800 rounded pl-4 py-2 w-full z-50"
          />
          <Button
            onClick={handleClearDate}
            size="sm"
            variant="outlined"
            className="hidden md:flex"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {feedbacks && feedbacks.length > 0 ? (
        <div>
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="feedback-card shadow-md rounded-lg p-6 mb-6 bg-light-blue-100"
            >
              <h2 className="text-base text-gray-600 mb-1"><strong>Khách hàng:</strong> {feedback.name}</h2>
              <p className="text-base text-gray-600 mb-1"><strong>Email:</strong> {feedback.email}</p>
              <p className="text-base text-gray-600">
                <strong>Ngày gửi:</strong> {new Date(feedback.createdAt).toLocaleString()}
              </p>
              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">
                  <strong>Nội dung:</strong>
                </label>
                <div className="p-4 bg-white rounded shadow-inner text-gray-800">
                  {feedback.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có phản hồi nào.</p>
      )}

      {selectedFeedback && (
        <div className="feedback-response-form bg-gray-100 p-6 mt-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Phản hồi cho: {selectedFeedback.name}</h3>

          <div className="mb-4">
            <Input
              label="Email người phản hồi"
              value={selectedFeedback.email}
              disabled
              className="mb-4"
            />
            <Textarea
              label="Nội dung phản hồi"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              rows={4}
              className="mb-4"
            />
          </div>

          <Button
            color="green"
            onClick={() => handleResponse(selectedFeedback._id)}
            disabled={!responseMessage.trim()}
          >
            Gửi phản hồi
          </Button>
        </div>
      )}

      {totalPages !== 0 &&(
        <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      )}
    </div>
  );
};

export default Feedback;
