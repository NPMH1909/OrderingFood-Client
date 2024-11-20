import React from 'react'
import "../css/components/order.css"
const OrderComponent = ({ order }) => {

    return (
        <div>
            <div className='container'>
                <div className='info-section'>
                    <p className='time-display'>
                        Time: {order?.createdAt
                            ? new Date(order.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })
                            : 'N/A'}
                    </p>
                    <p className='status-display'>Status: {order?.status}</p>
                    <p className='total-display'>Total: {Number(order?.totalAmount).toLocaleString('vi-VN')} vnd</p>
                    <p className='payment-display'>Payment method: {order?.paymentMethod}</p>
                    <p className='address-display'>Address: {order.deliveryAddress}</p>
                </div>
                <div className='items-display'>
                    <div className='item-row'>
                        <span className='item-name'>Sản phẩm</span>
                        <span className='item-quantity'>Số lượng</span>
                        <span className='item-price'>Đơn giá</span>
                        <span className='item-total'>Thành tiền</span>
                    </div>
                    {order.items.map((item, index) => (
                        <div key={index} className='item-row'>
                            <span className='item-name'>{item.menuItem.name}</span>
                            <span className='item-quantity'>x {item.quantity}</span>
                            <span className='item-price'>{Number(item.menuItem.price).toLocaleString('vi-VN')} vnd</span>
                            <span className='item-total'>
                                {Number(item.menuItem.price * item.quantity).toLocaleString('vi-VN')} vnd
                            </span>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )

}

export default OrderComponent