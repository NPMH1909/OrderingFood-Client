import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const PaymentComponent = () => {
  const [showQR, setShowQR] = useState(false);
  const paymentInfo = 'https://example.com/pay?amount=1000'; // Thay thế bằng URL hoặc thông tin thanh toán thực tế

  const handlePayNow = () => {
    setShowQR(true); // Hiển thị mã QR khi nhấn nút "PayNow"
  };

  return (
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePayNow}>
        PayNow
      </button>

      {showQR && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Quét mã QR để thanh toán:</h3>
          <QRCode value={paymentInfo} size={256} /> {/* Kích thước mã QR có thể điều chỉnh */}
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
