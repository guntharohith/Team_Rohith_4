import React from 'react'
import styled from 'styled-components'
import BreadCrumb from '../components/BreadCrumb'
import { BsArrowRight } from 'react-icons/bs'

function Orders() {
    const orderStatus = ["Order accepted", "Shipped", "Out for delivery", "Delivered"]
    const orders = [
        {
            name: "Wooden table",
            image: "https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359",
            price: 5000,
            quantity: 5,
            subTotal: 25000,
            address: "Some street, nagarkurnool, telangana 509209",
            date: "Tue 12/10/2022"
        },
        {
            name: "Wooden table",
            image: "https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359",
            price: 5000,
            quantity: 5, subTotal: 25000,
            address: "Some street, nagarkurnool, telangana 509209",
            date: "Tue 12/10/2022"
        },
        {
            name: "Wooden table",
            image: "https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359",
            price: 5000,
            quantity: 5,
            subTotal: 25000,
            address: "Some street, nagarkurnool, telangana 509209",
            date: "Tue 12/10/2022"
        },
        {
            name: "Wooden table",
            image: "https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359",
            price: 5000,
            quantity: 5,
            subTotal: 25000,
            address: "Some street, nagarkurnool, telangana 509209",
            date: "Tue 12/10/2022"
        }
    ]
    const temp = 3;
    return (
        <Wrapper className='section'>
            <BreadCrumb title="Orders"></BreadCrumb>
            <div>
                {
                    orders.map((order) => {
                        const { name, image, price, quantity, subTotal, address, date } = order
                        return (
                            <div className='order-item' key={name}>
                                <img src={image} alt={name}></img>
                                <div>
                                    <h2 style={{ marginBottom: '0.5rem' }}>{name}</h2>
                                    <p className="info">
                                        <span>Price:</span>
                                        <span className='price'>Rs.{price}</span>
                                    </p>
                                    <p className="info">
                                        <span>Quantity:</span>
                                        {quantity}
                                    </p>
                                    <p className="info">
                                        <span>Subtotal:</span>
                                        <span className='price'>Rs.{subTotal}</span>
                                    </p>
                                    <p className="info">
                                        <span>Address:</span>
                                        {address}
                                    </p>
                                    <div className='status'>
                                        <span className='label'>Order Status:</span>
                                        {
                                            orderStatus.map((s,i) => {
                                                return (
                                                    <div className={i < temp-1 ? "active" : null}>
                                                        <span>{s}</span>
                                                        {i !== 3 && <BsArrowRight />}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p>Ordered on {date}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}

export default Orders

const Wrapper = styled.div`
    min-height:65vh;
    h1{
        text-align:center;
        margin-top:4rem;
    }
    .order-item{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        padding:2rem;
        border-radius:0.5rem;
        display:flex;
        align-items:center;
        margin-bottom:2rem;
        img{
            height:200px;
            width:200px;
            border-radius:1rem;
            margin-right:2rem;
        }
    }
    .info{
        display:grid;
        grid-template-columns:100px 1fr;
        column-gap:1rem;
        color:rgb(37, 37, 53);
        margin-bottom:0.5rem;
        span{
            font-weight:700;
        }
    }
    .status{
        display:flex;
        margin-bottom:1rem;
        .label{
            font-weight:700;
            margin-right:1rem;
        }
        div{
            display:flex;
            align-items:center;
            span{
                margin-right:1rem;
            }
            svg{
                margin-right:1rem;
            }
        }
        .active{
            font-weight:700;
        }
    }
`