import React, { useEffect, useState } from "react"
import Order from "./order"
import './css/orderHistory.css'

// test data
const histories = [
    {time:'2024-10-08 14:08:23', status:'Da giao', items:['1 Food_1', '2 Food_2','1 Food_3', '1 Food_4'], totalAmount: 153000, paymentMethod:'Paypa', deliveryAdress:'1 Vo Van Ngan Street, Thu Duc, Ho Chi Minh City'}
];


const OrderHistory = () => {
    const [page, setPage] = useState(1);
    const [displayItems, setDisplayItems] = useState(histories.slice(0, 10))
    const numberOfPage = Math.ceil(histories.length / 10);
    const [pages, setPages] = useState([])

    useEffect(() => {
        updateDisplayItems()
        displayButton()
    }, [page])

    const displayButton = () => {
        const buttons = [];
        console.log()
        let startPage = 0
        page <= 2 ? startPage = 1 : startPage = page - 1
        if(startPage + 3 > numberOfPage) startPage = numberOfPage - 3;
        if(numberOfPage > 4){
            for (let i = startPage; i <= numberOfPage; i++) {
                buttons.push(
                    <button className={page === i ? 'active' : ''} key={i} onClick={() => handleChangePage(i)}> {i} </button>
                );
                if(i === startPage + 2 && startPage + 3 < numberOfPage){
                    buttons.push(
                        <button disabled={true}> ... </button>
                    );
                    buttons.push(
                        <button className={page === numberOfPage ? 'active' : ''} key={numberOfPage} onClick={() => handleChangePage(numberOfPage)}> {numberOfPage} </button>
                    );
                    break;
                }
            }
        }
        else{
            for (let i = 1; i <= numberOfPage; i++) {
                buttons.push(
                    <button className={page === i ? 'active' : ''} key={i} onClick={() => handleChangePage(i)}> {i} </button>
                );
            }
        }
        setPages(buttons);
    }

    const updateDisplayItems = () => {
        const startDex = (page - 1) * 10
        const endDex = startDex + 10
        const items = histories.slice(startDex, endDex).filter(Boolean);
        console.log(items)
        setDisplayItems(items)
    }

    const handleChangePage = (pageIndex) => {
        setPage(pageIndex);
    }

    return(
        <div>
            <h1>Order History</h1>
            {displayItems.map((history, index) => (
                <Order data = {history} key={index} />
            ))}
            <div className="page">
                <button onClick={() => handleChangePage(page - 1)} disabled={page === 1}> &lt; </button>
                {pages}
                <button onClick={() => handleChangePage(page + 1)} disabled={page === numberOfPage}> &gt; </button>
            </div>
        </div>
    )
}

export default OrderHistory