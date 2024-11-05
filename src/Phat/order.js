import { Component } from "react"
import './css/order.css'

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: props.data.time,
            status: props.data.status,
            items: props.data.items,
            totalAmount: props.data.totalAmount,
            paymentMethod: props.data.paymentMethod,
            deliveryAdress: props.data.deliveryAdress
        }
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    render(){
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
}

export default Order