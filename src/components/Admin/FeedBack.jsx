// src/pages/FeedbackPage.js
import React, { useEffect, useState } from "react";
import { useGetAllContactsQuery } from "../../apis/contactApi";
import { Input, Textarea, Button } from "@material-tailwind/react"; // Sử dụng Material Tailwind

const Feedback = () => {
  // Sử dụng hook để lấy tất cả các phản hồi
  const { data: feedbacks, isLoading, isError, error } = useGetAllContactsQuery();

  const [responseMessage, setResponseMessage] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    if (isError) {
      console.error("Lỗi khi lấy dữ liệu phản hồi: ", error);
    }
  }, [isError, error]);

  const handleResponse = (feedbackId) => {
    // Xử lý gửi phản hồi cho feedback
    if (!responseMessage.trim()) {
      alert("Vui lòng nhập thông điệp phản hồi.");
      return;
    }
    console.log("Phản hồi cho feedback ID", feedbackId, "với nội dung:", responseMessage);
    // Tiến hành gửi phản hồi (gọi API gửi phản hồi...)
    setResponseMessage(""); // Reset nội dung phản hồi sau khi gửi
    setSelectedFeedback(null); // Đóng form sau khi gửi
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="feedback-container max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Danh sách phản hồi</h1>

      {/* Hiển thị danh sách các phản hồi */}
      {feedbacks && feedbacks?.contacts?.length > 0 ? (
        <div>
          {feedbacks.contacts.map((feedback) => (
            <div
              key={feedback._id}
              className="feedback-card bg-white shadow-md rounded-lg p-6 mb-6"
            >
              <h2 className="text-2xl font-semibold">{feedback.name}</h2>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {feedback.email}</p>
              <p className="mt-4 text-lg"><strong>Nội dung:</strong> {feedback.message}</p>
              <p className="mt-2 text-sm text-gray-400">
                <strong>Ngày gửi:</strong> {new Date(feedback.createdAt).toLocaleString()}
              </p>

              {/* Nút để phản hồi */}
              {/* <Button
                color="light-blue"
                className="mt-4"
                onClick={() => setSelectedFeedback(feedback)}
              >
                Phản hồi
              </Button> */}
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có phản hồi nào.</p>
      )}

      {/* Hiển thị form phản hồi khi chọn feedback */}
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

          {/* <Button
            color="green"
            onClick={() => handleResponse(selectedFeedback._id)}
            disabled={!responseMessage.trim()}
          >
            Gửi phản hồi
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default Feedback;
