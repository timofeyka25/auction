import {useEffect, useState} from "react";
import {axiosPrivate} from "../api/axios";
import BidCard from "./BidCard";
import React from "react";

const BID_URL = "/api/bid/"
export default function UserBids() {
    const [data, setData] = useState([]);
    const fetchBids =  () => {
        axiosPrivate.get(BID_URL)
            .then(r => {
                setData(r.data?.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchBids();
    }, [])

    return (
        <div className="d-flex col justify-content-center mt-3">
            {data && (
                <div className="row  w-50">
                    {data.map((el) => {
                        return <BidCard item={el} key={el.id}/>
                    })}
                </div>)
            }
            {!data && (<div className="card shadow-lg my-2">
                <div className="card-body d-flex justify-content-around align-items-center">
                    You have not made any bids.
                </div>
            </div>)}
        </div>
    )
}