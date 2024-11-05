import React from 'react'
import "../css/components/order.css"
const OrderComponent = ({order}) => {
    console.log(order)
    console.log(order?.deliveryAddress)
    return (
        <div>
            <div  key={order._id} className='container'>
            <p className = 'time-display'>{order?.createdAt}</p>
                <p className='total-display'>Total: {Number(order?.totalAmount).toLocaleString('vi-VN')} vnd</p>
                <p className = 'status-display'>Status: {order.status}</p>
                <div className = 'items-display'>
                    {order.items.map((item, index) => (
                        <span>{item.menuItem} {index !== (order.items.length - 1)? ', ' : ''}</span>
                    ))}
                </div>
                <p className='payment-display'>Payment method: {order?.paymentMethod}</p>
                <p className='address-display'>Adress: {order.deliveryAddress}</p>
            </div>
        </div>
    )
    return(
            <div className = 'container'>
                <p className = 'time-display'>{this.formatTime(this.state.time)}</p>
                <p className = 'status-display'>Status: {this.state.status}</p>
                <div className = 'items-display'>
                    {this.state.items.map((item, index) => (
                        <span>{item} {index !== (this.state.items.length - 1)? ', ' : ''}</span>
                    ))}
                </div>
                <p className = 'total-display'>Total: {Number(this.state.totalAmount).toLocaleString('vi-VN')} vnd</p>
                <p className = 'payment-display'>Payment method: {this.state.paymentMethod}</p>
                <p className = 'address-display'>Adress: {this.state.deliveryAdress}</p>
            </div>
        )
}

export default OrderComponent